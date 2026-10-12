// 此檔案由每日排程自動更新，請勿手動修改
window.STOCK_PRICES = {
  "0050":   114.80,
  "0056":   58.60,
  "00918":  34.28,
  "006208": 260.10,
  "00878":  35.28,
  "009816": 16.85
};
// 昨日收盤價（用於計算當日漲跌幅）
window.STOCK_PREV_PRICES = {
  "0050":   114.95,
  "0056":   58.30,
  "00918":  33.97,
  "006208": 263.40,
  "00878":  34.99,
  "009816": 16.87
};
window.STOCK_DIVIDENDS = {
  // timesPerYear: 每年配息次數；lastDiv: 最近一次單次配息金額（元/股）
  // 資料來源：各大財經網站，更新日期：2026-10-12（配息資料與 10-02 相同，無新公告）
  "0050":   { lastDiv: 0.60,  timesPerYear: 2,  frequency: '每半年配息' }, // 2026/07/21 除息 $0.60，2026/08/10 發放
  "0056":   { lastDiv: 1.35,  timesPerYear: 4,  frequency: '每季配息'   }, // 2026 Q3 配 $1.35（08/10發放）；Q4已公告 $1.72，10/22 除息（尚未除息）
  "00918":  { lastDiv: 1.75,  timesPerYear: 4,  frequency: '每季配息'   }, // 2026/09/18 除息 $1.75（Q3），2026/10/15 發放
  "006208": { lastDiv: 4.75,  timesPerYear: 2,  frequency: '每半年配息' }, // 2026/07/16 除息 $4.75，2026/08/10 發放
  "00878":  { lastDiv: 1.01,  timesPerYear: 4,  frequency: '每季配息'   }, // 2026/08/18 除息 $1.01（Q3），2026/09/11 已發放；Q4預定11/17除息（金額未公告）
  "009816": { lastDiv: 0,     timesPerYear: 0,  frequency: '不配息（累積型）' } // 009816 為不配息累積型ETF
};
window.PRICES_UPDATED = "2026-10-12 13:37";

// 即將除息提醒 — 由每月排程自動更新（確認資料優先於 app.js 中的預估值）
// 格式：{ code, name, exDate, payDate, perShare, confirmed }
window.UPCOMING_DIVIDENDS = [
  // 00918 Q3：2026/09/18 已除息，2026/10/15 發放（尚未入帳）
  { code: '00918', name: '大華優利高填息30', exDate: '2026-09-18', payDate: '2026-10-15', perShare: 1.75, confirmed: true  },
  // 0056 Q4：已公告 $1.72，創單季新高，2026/10/22 除息，2026/11/11 發放
  { code: '0056',  name: '元大高股息',       exDate: '2026-10-22', payDate: '2026-11-11', perShare: 1.72, confirmed: true  },
];
