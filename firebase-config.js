// Firebase 設定 — 自動生成，請勿手動修改 API Key
const firebaseConfig = {
  apiKey: "AIzaSyDCW76CU9V-Q72UVHg-LK6VIHr2-mhs_Xs",
  authDomain: "personal-finance-tracker-1a4e1.firebaseapp.com",
  projectId: "personal-finance-tracker-1a4e1",
  storageBucket: "personal-finance-tracker-1a4e1.firebasestorage.app",
  messagingSenderId: "844161296084",
  appId: "1:844161296084:web:277c09942236bb24e0bd41",
  measurementId: "G-P8LYLM31R1"
};

firebase.initializeApp(firebaseConfig);
const db   = firebase.firestore();
const auth = firebase.auth();

// ── Google 登入 ──────────────────────────────────────────
const provider = new firebase.auth.GoogleAuthProvider();

function showLoginScreen(show) {
  const el = document.getElementById('login-screen');
  if (el) el.classList.toggle('hidden', !show);
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // 已登入 → 隱藏登入畫面，從雲端載入資料
    showLoginScreen(false);
    const syncLabel = document.getElementById('sync-label');
    if (syncLabel) syncLabel.textContent = user.displayName || '已登入';
    // 登入後才同步雲端資料
    if (typeof cloudLoad === 'function') cloudLoad();
  } else {
    // 未登入 → 顯示登入畫面
    showLoginScreen(true);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-google-login');
  if (btn) {
    btn.addEventListener('click', () => {
      auth.signInWithPopup(provider).catch(e => {
        alert('登入失敗：' + e.message);
      });
    });
  }
});

window.cloudSync = {
  enabled: true,

  userCol() {
    const user = firebase.auth().currentUser;
    if (!user) throw new Error('尚未登入');
    return db.collection('users').doc(user.uid).collection('finance');
  },

  // 儲存到 Firestore
  async save(key, data) {
    if (!this.enabled) return;
    try {
      await this.userCol().doc(key).set({ data: JSON.parse(JSON.stringify(data)) });
    } catch(e) {
      console.warn('[CloudSync] 儲存失敗:', key, e.message);
    }
  },

  // 從 Firestore 讀取單一項目
  async load(key) {
    if (!this.enabled) return null;
    try {
      const doc = await this.userCol().doc(key).get();
      return doc.exists ? doc.data().data : null;
    } catch(e) {
      console.warn('[CloudSync] 讀取失敗:', key, e.message);
      return null;
    }
  },

  // 一次讀取全部資料
  async loadAll() {
    if (!this.enabled) return null;
    try {
      const snapshot = await this.userCol().get();
      const result = {};
      snapshot.forEach(doc => { result[doc.id] = doc.data().data; });
      return result;
    } catch(e) {
      console.warn('[CloudSync] 全量讀取失敗:', e.message);
      return null;
    }
  }
};
