// 此檔案由每日排程自動更新，請勿手動修改
window.STOCK_PRICES = {
  "0050":   106.20,
  "0056":   52.15,
  "00918":  31.67,
  "006208": 246.50,
  "00878":  32.97,
  "009816": 15.29
};
// 昨日收盤價（用於計算當日漲跌幅）
window.STOCK_PREV_PRICES = {
  "0050":   108.25,
  "0056":   53.25,
  "00918":  32.06,
  "006208": 251.35,
  "00878":  33.49,
  "009816": 15.65
};
window.STOCK_DIVIDENDS = {
  // timesPerYear: 每年配息次數；lastDiv: 最近一次單次配息金額（元/股）
  // 資料來源：各大財經網站，更新日期：2026-07-07
  "0050":   { lastDiv: 0.60,  timesPerYear: 2,  frequency: '每半年配息' }, // 2026/07/21 除息 $0.60（H1 2026，尚未除息），每半年配一次
  "0056":   { lastDiv: 1.35,  timesPerYear: 4,  frequency: '每季配息'   }, // 2026/07/21 除息 $1.35（Q2 2026，尚未除息），每季配息
  "00918":  { lastDiv: 1.26,  timesPerYear: 4,  frequency: '每季配息'   }, // 2026/Q2 配 $1.26，每季配息
  "006208": { lastDiv: 4.75,  timesPerYear: 2,  frequency: '每半年配息' }, // 2026/07/16 除息 $4.75（尚未除息），每半年配一次
  "00878":  { lastDiv: 0.66,  timesPerYear: 4,  frequency: '每季配息'   }, // 2026/05 配 $0.66，每季配息
  "009816": { lastDiv: 0.17,  timesPerYear: 4,  frequency: '每季配息'   }  // 新 ETF，暫無更多資料
};
window.PRICES_UPDATED = "2026-07-07 23:28";
