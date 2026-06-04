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

// ── 判斷環境 ─────────────────────────────────────────────
const IS_LOCAL = location.protocol === 'file:';

function showLoginScreen(show) {
  const el = document.getElementById('login-screen');
  if (el) el.classList.toggle('hidden', !show);
}

if (IS_LOCAL) {
  // 本機 file:// → 直接略過登入，純 localStorage 模式
  window.cloudSync = null;
  document.addEventListener('DOMContentLoaded', () => {
    showLoginScreen(false);
    const syncLabel = document.getElementById('sync-label');
    const dot       = document.getElementById('sync-dot');
    if (syncLabel) syncLabel.textContent = '本機模式';
    if (dot) dot.style.background = '#94a3b8';
  });
} else {
  // 網頁版（GitHub Pages）→ 需要 Google 登入
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      showLoginScreen(false);
      const syncLabel = document.getElementById('sync-label');
      if (syncLabel) syncLabel.textContent = user.displayName || '已登入';
      if (typeof cloudLoad === 'function') cloudLoad();
    } else {
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

    async save(key, data) {
      if (!this.enabled) return;
      try {
        await this.userCol().doc(key).set({ data: JSON.parse(JSON.stringify(data)) });
      } catch(e) {
        console.warn('[CloudSync] 儲存失敗:', key, e.message);
      }
    },

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
}
