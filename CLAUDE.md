# 個人記帳本 — 專案說明

## 專案概覽
純靜態 HTML/CSS/JS 個人記帳 App，無建置流程。
- 本機 `file://` 開啟：純 localStorage 模式，不登入、不同步。
- 網頁版（GitHub Pages `https://ray034786257-maker.github.io/finance-tracker/`）：Google 登入後，資料以 Firebase Firestore 雲端同步，多裝置共用。
- 使用者不熟 git，部署一律由 Claude 處理。

## 檔案結構
```
finance-tracker/
├── index.html         # 主頁面（單頁，所有功能區塊由上到下排列）
├── style.css          # 樣式（Notion 風格，白底極簡）
├── app.js             # 所有邏輯（資料、渲染、事件、雲端同步）
├── firebase-config.js # Firebase 初始化、Google 登入、cloudSync（save/load/loadAll）
├── prices.js          # 股價／配息資料（由排程自動覆寫）
└── import.html        # 一次性資料匯入頁（已使用，可忽略）
```

## 部署流程
- `finance-tracker` 是 git repo（remote: `ray034786257-maker/finance-tracker`，分支 `main`）。
- 修改後 `git add` → `commit` → `git push origin main`，GitHub Pages 約 1～2 分鐘更新；使用者需 `Ctrl+Shift+R` 強制重整（手機易卡舊快取）。
- 這台電腦沒有 Node/Python，無法用 `node --check` 檢查語法；可在瀏覽器 `javascript_tool` 用 `new Function(src)` 驗證片段。
- commit 訊息結尾加 `Co-Authored-By` 行。

## 雲端同步（Firestore）
- 同步單位是「整包資料」，`cloudSave()` 一次寫入所有資料集，`cloudLoad()`（登入後觸發）以雲端為準覆蓋本機。
- **新增要同步的資料時，`cloudSave` 與 `cloudLoad` 兩處都要改**，否則該資料不會跨裝置。目前同步：transactions、categories、budgets、stockTxs、dividends、stockPrices、recurring、fxHoldings、fxTxs、fxRates、fxUpdated、dripRecords、upcomingDivSchedule。
- 防護機制（勿移除）：
  - `cloudLoaded` 旗標：本次尚未成功讀過雲端前，`cloudSave()` 不上傳（避免舊資料覆蓋新資料）。
  - 雲端覆蓋本機前，內容不同會先備份到 `fin_backups`（保留最近 3 份）。
  - `cloudSync.save/loadAll` 失敗會丟出錯誤並以 toast 顯示，不可再靜默吞掉（曾造成「顯示已同步但其實沒寫入」）。
  - 頂列按鈕：⬆上傳（強制以本機覆蓋雲端）、⬇載入（強制以雲端覆蓋本機）、💾備份（下載 JSON）、📂還原。
- 事故教訓：2026-11 曾因舊裝置的整包資料覆蓋雲端，導致 10/23～11/2 的收支遺失且無法還原。不要改回「最後寫入者贏」且無防護的做法；若 Firestore 啟用 Point-in-time recovery 才有可能還原。

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
| `fin_recurring` | 固定費用 |
| `fin_fx_v2` | 外幣持倉 `[{id, code, amount, avgBuyRate}]` |
| `fin_fx_tx` | 外幣交易 `[{id, date, code, amount, type:'buy'\|'spend', buyRate, twdCost, note}]`；無 `type` 視為 buy；刪除 spend 會還原持倉 |
| `fin_fx_rates` / `fin_fx_updated` | 外幣匯率與更新時間 |
| `fin_drip` | 股息再投入記錄 |
| `fin_upcoming_divs_v2` | 即將除息提醒（含 `recorded` / `recordedShares`） |
| `fin_backups` | 雲端載入前的本機備份（不同步） |
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
- **daily-stock-price-update**：每天 09:00 自動查詢股價並更新 `prices.js`（會覆寫整個檔案，手動修改 `prices.js` 時注意排程是否已更新過）
- `prices.js` 的 `UPCOMING_DIVIDENDS`（已確認的除息資料）原則上每月更新；手動更新配息時，需用網路搜尋核對除息日、發放日、金額

## 新增月份資料的方式
1. 在 `app.js` 的 `autoImport()` 的 `raw` 陣列末尾加入新月份資料
2. 將 flag `fin_imported_2026_vN` 的版本號 +1
3. 使用者開啟頁面後在 Console 執行 `localStorage.clear()` 再重整即可
- ⚠️ 已有雲端同步：網頁版重整後會被雲端資料覆蓋，且清除前務必先 💾備份；不要在未確認雲端資料的情況下清除並上傳。

## 配息提醒設計
- 已確認資料：`prices.js` 的 `window.UPCOMING_DIVIDENDS`（`confirmed: true`，payDate 已過會自動隱藏）。
- 預估資料：`app.js` 的 `STOCK_DIV_PATTERNS`（`lastEx` + `intervalDays` 推算，顯示「預估 ±7天」）。有確認項目的代號，會以該確認除息日為起點再推算下一週期，兩者並存。
- 除息月份：0050＝1、7 月；006208＝7、11 月（半年配，間隔不固定，`intervalDays` 需在每次除息後依實際月份調整，目前 241 天用於 11 月→隔年 7 月）；0056、00878、00918 為季配。
- 股數在記錄配息後又變動，會出現 ⚠️ 與「更新記錄」按鈕（比對 `recordedShares`）。
- 「記錄配息」只寫入 `fin_dividends`，**不會**自動新增記帳明細的收入（使用者刻意維持）。

## 成本與回收率計算
- 預設（方法 B）：股息再投入（`reinvest`）只增加股數，不增加成本，平均成本下降；`calcHoldings()`。
- 對照（方法 A，會計角度）：再投入同時增加股數與成本；`calcHoldingsMethodA()`，顯示於 DRIP 分析頁。
- 本金回收率：分母為 `calcHistoricalInvested()`（只加總歷史 `buy`，賣股後不縮小），拆成股息、價差、合計三條。

## 使用者偏好
- 偏好繁體中文對話；回答簡短直接。
- 0056 等股息不再投入，用於生活開銷；記帳時股息與支出分開記，除非使用者要求自動化。
- 提出方案後，使用者常回「好 / 就這樣做」再實作；未同意前不要先改程式。

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
