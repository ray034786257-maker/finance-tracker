// 此檔案由每日排程自動更新，請勿手動修改
window.STOCK_PRICES = {
  "0050":   108.35,
  "0056":   52.25,
  "00918":  32.03,
  "006208": 250.20,
  "00878":  33.33,
  "009816": 15.64
};
// 昨日收盤價（用於計算當日漲跌幅）
window.STOCK_PREV_PRICES = {
  "0050":   107.90,
  "0056":   52.60,
  "00918":  31.82,
  "006208": 250.85,
  "00878":  33.22,
  "009816": 15.78
};
window.STOCK_DIVIDENDS = {
  // timesPerYear: 每年配息次數；lastDiv: 最近一次單次配息金額（元/股）
  // 資料來源：各大財經網站，更新日期：2026-07-03
  "0050":   { lastDiv: 1.00,  timesPerYear: 2,  frequency: '每半年配息' }, // 2026/01 配 $1.00，每半年配一次
  "0056":   { lastDiv: 1.00,  timesPerYear: 4,  frequency: '每季配息'   }, // 2026/Q2 配 $1.00（創近9個月新高），每季配息
  "00918":  { lastDiv: 1.26,  timesPerYear: 4,  frequency: '每季配息'   }, // 2026/Q2 配 $1.26（較上季翻倍），每季配息
  "006208": { lastDiv: 4.75,  timesPerYear: 2,  frequency: '每半年配息' }, // 2026/07/16 除息 $4.75（創歷史新高），每半年配一次
  "00878":  { lastDiv: 0.66,  timesPerYear: 4,  frequency: '每季配息'   }, // 2026/05 配 $0.66，每季配息
  "009816": { lastDiv: 0.17,  timesPerYear: 4,  frequency: '每季配息'   }  // 新 ETF，暫無更多資料
};
window.PRICES_UPDATED = "2026-07-03 14:30";
