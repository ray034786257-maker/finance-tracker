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
  "0050":   { lastDiv: 3.50,  timesPerYear: 1,  frequency: '每年配息' },
  "0056":   { lastDiv: 0.95,  timesPerYear: 4,  frequency: '每季配息' },
  "00918":  { lastDiv: 0.26,  timesPerYear: 12, frequency: '每月配息' },
  "006208": { lastDiv: 6.30,  timesPerYear: 1,  frequency: '每年配息' },
  "00878":  { lastDiv: 0.55,  timesPerYear: 4,  frequency: '每季配息' },
  "009816": { lastDiv: 0.17,  timesPerYear: 4,  frequency: '每季配息' }
};
window.PRICES_UPDATED = "2026-06-04 14:30";
