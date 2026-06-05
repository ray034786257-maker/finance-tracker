// 此檔案由每日排程自動更新，請勿手動修改
window.STOCK_PRICES = {
  "0050":   106.10,
  "0056":   52.90,
  "00918":  31.73,
  "006208": 245.95,
  "00878":  32.68,
  "009816": 15.20
};
// 昨日收盤價（用於計算當日漲跌幅）
window.STOCK_PREV_PRICES = {
  "0050":   105.50,
  "0056":   52.60,
  "00918":  31.45,
  "006208": 244.50,
  "00878":  32.45,
  "009816": 15.05
};
window.STOCK_DIVIDENDS = {
  // timesPerYear: 每年配息次數；lastDiv: 最近一次單次配息金額（元/股）
  // 資料來源：wantgoo.com，更新日期：2026-06-05
  "0050":   { lastDiv: 1.00,  timesPerYear: 2,  frequency: '每半年配息' }, // 2026/01 配 $1.00，每半年配一次
  "0056":   { lastDiv: 0.866, timesPerYear: 4,  frequency: '每季配息'   }, // 2026/04 配 $0.866，每季穩定配
  "00918":  { lastDiv: 0.62,  timesPerYear: 4,  frequency: '每季配息'   }, // 2026/xx 配 $0.62
  "006208": { lastDiv: 3.448, timesPerYear: 2,  frequency: '每半年配息' }, // 2025/11 配 $3.448，每半年配一次
  "00878":  { lastDiv: 0.66,  timesPerYear: 4,  frequency: '每季配息'   }, // 2026/05 配 $0.66
  "009816": { lastDiv: 0.17,  timesPerYear: 4,  frequency: '每季配息'   }  // 新 ETF，暫無更多資料
};
window.PRICES_UPDATED = "2026-06-04 14:30";
