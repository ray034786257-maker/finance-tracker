# 個人記帳本 — 專案說明

## 專案概覽
純靜態 HTML/CSS/JS 個人記帳 App，雙擊 `index.html` 即可使用，無需伺服器。
資料儲存在瀏覽器 localStorage，完全離線。

## 檔案結構
```
finance-tracker/
├── index.html       # 主頁面（單頁，所有功能區塊由上到下排列）
├── style.css        # 樣式（Notion 風格，白底極簡）
├── app.js           # 所有邏輯（資料、渲染、事件）
├── prices.js        # 股價資料（由每日排程自動覆寫）
└── import.html      # 一次性資料匯入頁（已使用，可忽略）
```

## localStorage 資料結構
| Key | 內容 |
|-----|------|
| `fin_tx` | 收支交易記錄 `[{id, date, type, amount, categoryId, note}]` |
| `fin_cats` | 分類清單 `[{id, type, name, color, icon}]` |
| `fin_budgets` | 預算（目前未使用，功能已移除）|
| `fin_stock_tx` | 股票買賣記錄 `[{id, type, code, name, shares, price, fee, date, note}]` |
| `fin_dividends` | 股息記錄 `[{id, code, name, date, perShare, shares, total, note}]` |
| `fin_stock_prices` | 股票現價 `{code: price}` |
| `fin_stock_dividends_v3` | 配息資訊 `{code: {lastDiv, timesPerYear, frequency}}`（v3 = 最新版） |
| `fin_imported_2026_v4` | 匯入版本 flag |
| `fin_stocks_imported_v1` | 股票初始匯入 flag |

## 分類 ID 對照
### 支出
| ID | 名稱 | Icon |
|----|------|------|
| c1 | 餐飲 | 🍽️ |
| c2 | 交通 | 🚗 |
| c3 | 購物 | 🛍️ |
| c4 | 娛樂 | 🎮 |
| c5 | 醫療 | 💊 |
| c6 | 住房 | 🏠 |
| c7 | 水電通訊 | 💡 |
| c8 | 教育 | 📚 |
| c9 | 其他支出 | 📦 |
| cd1 | 飲料 | 🧃 |
| cd2 | 菸 | 🚬 |
| cd3 | 訂閱費 | 📱 |
| ct1 | 旅遊 | ✈️ |
| ct2 | 稅金 | 🏛️ |

### 收入
| ID | 名稱 |
|----|------|
| i1 | 薪資 |
| i2 | 獎金 |
| i3 | 投資 |
| i4 | 副業 |
| i5 | 其他收入 |

## 持有股票（兩個券商帳戶）
| 代號 | 名稱 | 帳戶 |
|------|------|------|
| 0050 | 元大台灣50 | 元大 |
| 0056 | 元大高股息 | 元大 |
| 00918 | 大華優利高填息30 | 元大 |
| 006208 | 富邦台50 | 國泰 |
| 00878 | 國泰永續高股息 | 國泰 |
| 009816 | 凱基台灣TOP50 | 國泰 |

## prices.js 結構（每日排程自動覆寫）
```javascript
window.STOCK_PRICES      = { code: price }           // 今日股價
window.STOCK_PREV_PRICES = { code: prevPrice }        // 昨日收盤（用於漲跌幅）
window.STOCK_DIVIDENDS   = { code: { lastDiv, timesPerYear, frequency } }
window.PRICES_UPDATED    = "YYYY-MM-DD HH:MM"
```
- `lastDiv`：最近一次單次配息金額（元/股）
- `timesPerYear`：每年配息次數（1/2/4/12）
- 年化殖利率由 app.js 動態計算：`lastDiv × timesPerYear / 現價 × 100%`
- 更新排程時需同時更新 `STOCK_PREV_PRICES`（昨收）才能顯示今日漲跌幅

## 每日排程
- **daily-stock-price-update**：每天 09:00 自動查詢股價並更新 `prices.js`

## 新增月份資料的方式
1. 在 `app.js` 的 `autoImport()` 的 `raw` 陣列末尾加入新月份資料
2. 將 flag `fin_imported_2026_vN` 的版本號 +1
3. 使用者開啟頁面後在 Console 執行 `localStorage.clear()` 再重整即可

## 投資追蹤功能說明
- **更新股價按鈕**：優先呼叫台灣證交所即時 API（`mis.twse.com.tw`），備援 Yahoo Finance + corsproxy.io
  - 同時更新今日漲跌幅（需 `STOCK_PREV_PRICES`）及配息資訊（抓 2 年歷史自動計算頻率）
- **持倉表格欄位**：股票 / 股數 / 平均成本 / 現價（可編輯）/ 今日漲跌 / 市值 / 未實現損益 / 報酬率
- **配息資訊欄位**：股票 / 現價 / 配息頻率 / 年化殖利率 / 最近單次配息 / 預估年配息 / 佔比
- 現價手動編輯後，市值/損益/報酬率即時更新（不需重整）

## 可收放的區塊
以下區塊預設收起，點標題列展開：
- 月份比較（`toggleSection('cmp-section-body','cmp-toggle-icon')`）
- 固定費用管理（`toggleSection('rec-section-body','rec-toggle-icon')`）
- 分類管理（`toggleCatSection()`）

## 手機版重點
- 記帳明細 tx-row 使用明確 class（`col-type` / `col-cat` / `col-note` / `col-amount` / `col-actions`）勿改回 nth-child
- 手機版卡片排版：第1行=分類+金額、第2行=備註+類型badge、第3行=日期+按鈕
- 篩選列 ID 為 `ledger-header`，手機版直向排列

## 重要注意事項
- 凱擘大寬頻 → 分類應為 `c7`（水電通訊），不是住房
- 電競筆電分期已於 2026/6/1（第6期）繳清，之後不再記錄
- 給李幸津的每月8000元已於 2026/3/1（第12期）繳清
- 機車分期每月3000元（部分月份補繳），24期中目前已繳至第20期（2026/6）
- 月份預算功能已移除（使用者不需要）
- `fin_stock_dividends` localStorage key 升版時需同步更新 app.js 兩處（load 和 save）
