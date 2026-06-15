// ── 首次自動匯入 2026 生活費用資料 ───────────────────────
function autoImport() {
  if (localStorage.getItem('fin_imported_2026_v4')) return;
  const cats = [
    {id:'c1', type:'expense', name:'餐飲',    color:'#f97316', icon:'🍽️'},
    {id:'c2', type:'expense', name:'交通',    color:'#3b82f6', icon:'🚗'},
    {id:'c3', type:'expense', name:'購物',    color:'#ec4899', icon:'🛍️'},
    {id:'c4', type:'expense', name:'娛樂',    color:'#8b5cf6', icon:'🎮'},
    {id:'c5', type:'expense', name:'醫療',    color:'#ef4444', icon:'💊'},
    {id:'c6', type:'expense', name:'住房',    color:'#6b7280', icon:'🏠'},
    {id:'c7', type:'expense', name:'水電通訊', color:'#14b8a6', icon:'💡'},
    {id:'c8', type:'expense', name:'教育',    color:'#f59e0b', icon:'📚'},
    {id:'c9', type:'expense', name:'其他支出', color:'#94a3b8', icon:'📦'},
    {id:'cd1',type:'expense', name:'飲料',    color:'#0ea5e9', icon:'🧃'},
    {id:'cd2',type:'expense', name:'菸',      color:'#78716c', icon:'🚬'},
    {id:'cd3',type:'expense', name:'訂閱費',  color:'#7c3aed', icon:'📱'},
    {id:'i1', type:'income',  name:'薪資',    color:'#22c55e', icon:'💼'},
    {id:'i2', type:'income',  name:'獎金',    color:'#84cc16', icon:'🎁'},
    {id:'i3', type:'income',  name:'投資',    color:'#06b6d4', icon:'📈'},
    {id:'i4', type:'income',  name:'副業',    color:'#a78bfa', icon:'💻'},
    {id:'i5', type:'income',  name:'其他收入', color:'#94a3b8', icon:'💰'},
    {id:'ct1',type:'expense', name:'旅遊',     color:'#10b981', icon:'✈️'},
    {id:'ct2',type:'expense', name:'稅金',     color:'#dc2626', icon:'🏛️'},
  ];
  const raw = [
    ['2026-01-01','c2',3000,'expense','機車分期(14/24)'],['2026-01-01','cd3',479,'expense','Youtube訂閱'],['2026-01-01','cd3',380,'expense','Netflix'],['2026-01-01','c9',8000,'expense','給李幸津的(10/12)'],['2026-01-01','c3',6335,'expense','電競筆電(1/6)'],['2026-01-01','cd1',130,'expense','飲料'],['2026-01-01','c1',120,'expense','晚餐'],
    ['2026-01-02','c1',95,'expense','午餐'],['2026-01-02','c7',2997,'expense','凱擘大寬頻'],
    ['2026-01-03','c1',100,'expense','午餐'],['2026-01-03','c1',205,'expense','晚餐 滷味+魷魚羹'],['2026-01-03','cd2',1940,'expense','免稅菸*2'],
    ['2026-01-04','cd1',55,'expense','飲料'],['2026-01-04','c4',950,'expense','台北車展門票'],['2026-01-04','c2',100,'expense','加油'],
    ['2026-01-05','cd2',150,'expense','菸'],['2026-01-05','c1',65,'expense','早餐'],['2026-01-05','c2',25,'expense','停車費+飲料'],['2026-01-05','c1',140,'expense','晚餐'],
    ['2026-01-06','c1',151,'expense','午餐'],['2026-01-06','c1',165,'expense','晚餐'],
    ['2026-01-07','c1',69,'expense','早餐'],['2026-01-07','c1',53,'expense','午餐'],
    ['2026-01-08','c1',55,'expense','早餐'],['2026-01-08','cd1',32,'expense','飲料'],['2026-01-08','c1',107,'expense','午餐'],['2026-01-08','c1',140,'expense','晚餐 八方雲集'],
    ['2026-01-09','i1',47282,'income','12月薪資'],['2026-01-09','i2',20209,'income','分紅獎金'],['2026-01-09','c1',150,'expense','午餐'],['2026-01-09','cd1',24,'expense','飲料'],
    ['2026-01-10','c1',40,'expense','泡麵'],['2026-01-10','c1',72,'expense','麵包'],['2026-01-10','c4',1010,'expense','遊戲'],['2026-01-10','c2',80,'expense','停車費'],
    ['2026-01-11','cd1',35,'expense','綠茶'],
    ['2026-01-12','c1',40,'expense','早餐'],['2026-01-12','c1',61,'expense','午餐'],['2026-01-12','c1',160,'expense','晚餐'],
    ['2026-01-13','c1',60,'expense','早餐'],['2026-01-13','c1',160,'expense','晚餐'],
    ['2026-01-14','c1',40,'expense','點心'],['2026-01-14','c1',340,'expense','成功牛排'],['2026-01-14','cd1',85,'expense','飲料'],
    ['2026-01-15','c1',55,'expense','早餐'],['2026-01-15','c1',119,'expense','午餐'],
    ['2026-01-16','c1',40,'expense','早餐'],['2026-01-16','c1',170,'expense','午餐'],['2026-01-16','c1',180,'expense','消夜 神州窯烤'],
    ['2026-01-17','c1',135,'expense','早午餐'],['2026-01-17','cd1',105,'expense','飲料'],
    ['2026-01-18','cd1',1000,'expense','星巴克儲值'],['2026-01-18','c3',1000,'expense','蒜蒜屋蒜醬'],
    ['2026-01-19','c1',124,'expense','午餐'],['2026-01-19','c3',135,'expense','全聯 買菜'],
    ['2026-01-20','c2',100,'expense','加油'],['2026-01-20','c1',81,'expense','午餐'],['2026-01-20','cd1',15,'expense','飲料'],['2026-01-20','c1',140,'expense','晚餐'],
    ['2026-01-21','c1',30,'expense','早餐'],['2026-01-21','cd1',70,'expense','飲料'],['2026-01-21','c4',100,'expense','今彩539'],
    ['2026-01-22','c1',40,'expense','早餐'],['2026-01-22','c1',147,'expense','午餐+咖啡'],['2026-01-22','cd1',25,'expense','飲料'],
    ['2026-01-23','c1',100,'expense','早餐'],['2026-01-23','c1',105,'expense','午餐'],['2026-01-23','c7',683,'expense','電費'],['2026-01-23','c4',980,'expense','打麻將 輸給Cindy'],
    ['2026-01-24','c1',190,'expense','滷味'],['2026-01-24','c1',352,'expense','饅頭包子'],['2026-01-24','cd1',28,'expense','水'],
    ['2026-01-25','c1',80,'expense','肉丸'],['2026-01-25','cd1',70,'expense','迷克夏'],
    ['2026-01-26','c1',163,'expense','午餐'],['2026-01-26','c4',2500,'expense','英雄聯盟'],
    ['2026-01-27','c1',165,'expense','晚餐'],['2026-01-28','c1',250,'expense','晚餐'],['2026-01-30','c1',140,'expense','晚餐'],
    ['2026-02-01','c2',6000,'expense','機車分期(15、16/24)'],['2026-02-01','cd3',479,'expense','Youtube訂閱'],['2026-02-01','cd3',380,'expense','Netflix'],['2026-02-01','c9',8000,'expense','給李幸津的(11/12)'],['2026-02-01','c3',6333,'expense','電競筆電(2/6)'],['2026-02-01','c7',163,'expense','水費'],
    ['2026-02-02','c2',88,'expense','加油'],['2026-02-02','c1',35,'expense','早餐'],['2026-02-02','c1',79,'expense','午餐'],['2026-02-02','cd1',49,'expense','飲料'],
    ['2026-02-03','c1',76,'expense','午餐'],['2026-02-03','cd1',29,'expense','蠻牛'],['2026-02-03','c1',230,'expense','晚餐'],
    ['2026-02-04','c1',30,'expense','早餐'],['2026-02-04','cd1',20,'expense','綠茶'],
    ['2026-02-05','c1',170,'expense','午餐'],
    ['2026-02-06','i5',500,'income','發票中獎'],['2026-02-06','c1',9,'expense','早餐'],['2026-02-06','cd1',149,'expense','飲料'],['2026-02-06','c1',135,'expense','午餐'],['2026-02-06','cd1',202,'expense','五十嵐'],['2026-02-06','cd2',150,'expense','菸'],['2026-02-06','i5',150,'income','打麻將贏'],['2026-02-06','i2',15000,'income','年終會獎金'],['2026-02-06','i2',1000,'income','體檢禮金'],
    ['2026-02-07','c1',210,'expense','晚餐'],['2026-02-07','c2',1262,'expense','加油'],['2026-02-07','i4',10000,'income','賣筆電給大哥'],
    ['2026-02-08','c1',135,'expense','午餐'],['2026-02-08','c9',8000,'expense','贊助大哥的平板'],
    ['2026-02-09','c1',51,'expense','早餐'],['2026-02-09','c1',145,'expense','晚餐'],
    ['2026-02-10','i1',49625,'income','一月份薪資'],['2026-02-10','i2',149620,'income','年終獎金'],['2026-02-10','c9',50000,'expense','購買009816基金'],['2026-02-10','i4',4200,'income','過年代理值班'],['2026-02-10','c1',50,'expense','早餐'],['2026-02-10','c1',55,'expense','午餐'],
    ['2026-02-11','cd1',145,'expense','飲料'],['2026-02-11','c3',3100,'expense','外套'],['2026-02-11','c2',40,'expense','停車費'],['2026-02-11','c1',175,'expense','消夜'],
    ['2026-02-12','c1',97,'expense','午餐'],['2026-02-12','cd2',175,'expense','菸+飲料'],['2026-02-12','c1',210,'expense','消夜'],
    ['2026-02-13','c1',65,'expense','早餐'],['2026-02-13','cd1',45,'expense','飲料'],['2026-02-13','c2',101,'expense','加油'],['2026-02-13','c4',3080,'expense','打麻將'],
    ['2026-02-14','c3',5000,'expense','汽車頂棚'],['2026-02-14','cd1',84,'expense','午後紅茶'],['2026-02-14','c3',5800,'expense','行車紀錄器+腳踏墊'],['2026-02-14','c1',285,'expense','衛生紙+21點港式'],['2026-02-14','c2',1000,'expense','ETC儲值'],['2026-02-14','cd2',330,'expense','菸+水'],['2026-02-14','i5',560,'income','打麻將贏'],
    ['2026-02-15','c1',155,'expense','午餐'],['2026-02-15','c9',50,'expense','金紙'],['2026-02-15','c3',129,'expense','鑰匙套'],
    ['2026-02-16','c9',40,'expense','紅包袋'],['2026-02-16','c9',100,'expense','拜拜'],['2026-02-16','c4',1000,'expense','刮刮樂'],['2026-02-16','i5',5200,'income','父母紅包'],['2026-02-16','c2',50000,'expense','購買二手車 VW-GOLF'],
    ['2026-02-17','c4',200,'expense','大樂透'],['2026-02-17','cd2',365,'expense','菸+咖啡'],
    ['2026-02-18','i5',300,'income','刮刮樂中獎'],['2026-02-18','c1',21,'expense','蘿蔔'],['2026-02-18','i5',640,'income','射龍門'],
    ['2026-02-19','c4',320,'expense','寶可夢'],['2026-02-19','cd2',345,'expense','菸'],
    ['2026-02-20','c1',1000,'expense','麥當勞'],['2026-02-21','c1',195,'expense','午餐'],
    ['2026-02-22','c3',1000,'expense','買衣服'],['2026-02-22','c2',40,'expense','停車費'],['2026-02-22','cd1',20,'expense','水'],
    ['2026-02-23','c1',150,'expense','午餐'],
    ['2026-02-24','c1',30,'expense','早餐'],['2026-02-24','c1',119,'expense','午餐+飲料'],['2026-02-24','c2',94,'expense','加油'],['2026-02-24','c1',80,'expense','晚餐'],['2026-02-24','cd2',300,'expense','菸'],
    ['2026-02-25','c1',21,'expense','午餐'],['2026-02-25','c1',225,'expense','晚餐'],['2026-02-25','c1',52,'expense','零食'],
    ['2026-02-26','c7',1637,'expense','電話費'],['2026-02-26','c9',149,'expense','螺絲'],
    ['2026-02-27','c1',100,'expense','早午餐'],['2026-02-27','c2',1139,'expense','加油'],['2026-02-27','c9',300,'expense','虎爺廟'],['2026-02-27','cd2',2090,'expense','菸'],
    ['2026-02-28','c1',145,'expense','早午餐'],['2026-02-28','c4',1780,'expense','寶可夢'],['2026-02-28','cd1',30,'expense','咖啡'],['2026-02-28','c9',76,'expense','行動電源租借'],['2026-02-28','c2',50,'expense','停車費'],['2026-02-28','i5',300,'income','打麻將贏'],
    ['2026-03-01','cd3',479,'expense','Youtube訂閱'],['2026-03-01','cd3',380,'expense','Netflix'],['2026-03-01','c9',8000,'expense','給李幸津的(12/12)'],['2026-03-01','c3',6333,'expense','電競筆電(3/6)'],['2026-03-01','cd1',1000,'expense','星巴克儲值'],['2026-03-01','c1',265,'expense','午餐'],['2026-03-01','c1',54,'expense','冰淇淋'],['2026-03-01','c9',57,'expense','行動電源租借'],['2026-03-01','c4',600,'expense','寶可夢'],['2026-03-01','c1',150,'expense','晚餐'],
    ['2026-03-02','c9',829,'expense','驅蚊貼片'],['2026-03-02','c1',151,'expense','早午餐'],['2026-03-02','c1',199,'expense','晚餐'],
    ['2026-03-03','c1',94,'expense','午餐'],
    ['2026-03-04','c1',65,'expense','早餐'],['2026-03-04','c1',55,'expense','午餐'],['2026-03-04','c1',130,'expense','豆腐'],['2026-03-04','i5',411,'income','沙拉醬退款'],
    ['2026-03-05','c1',30,'expense','早餐'],['2026-03-05','cd1',115,'expense','飲料'],['2026-03-05','c1',94,'expense','午餐'],
    ['2026-03-06','c1',79,'expense','午餐'],['2026-03-06','c2',85,'expense','加油'],['2026-03-06','c1',197,'expense','炸雞外送'],
    ['2026-03-07','c1',160,'expense','早午餐'],
    ['2026-03-08','c2',1000,'expense','加油'],['2026-03-08','c3',1300,'expense','費仔T恤'],['2026-03-08','cd2',2200,'expense','洗車+菸'],
    ['2026-03-09','c1',40,'expense','早餐'],['2026-03-09','c1',200,'expense','午餐'],['2026-03-09','c3',4500,'expense','汽車腳踏墊'],
    ['2026-03-10','c1',104,'expense','午餐'],['2026-03-10','c1',170,'expense','晚餐'],['2026-03-10','i1',49531,'income','二月份薪資'],
    ['2026-03-11','c1',152,'expense','午餐'],['2026-03-11','c1',140,'expense','買菜'],
    ['2026-03-12','c1',85,'expense','早午餐'],['2026-03-13','c1',61,'expense','午餐'],
    ['2026-03-14','c1',100,'expense','午餐'],['2026-03-14','c2',195,'expense','UG++停車'],['2026-03-14','c1',100,'expense','晚餐'],
    ['2026-03-15','c1',80,'expense','肉圓'],['2026-03-16','c1',110,'expense','午餐'],
    ['2026-03-17','c1',109,'expense','午餐'],['2026-03-17','c9',3600,'expense','爸生日紅包'],
    ['2026-03-18','c1',30,'expense','早餐'],['2026-03-18','c1',189,'expense','午餐'],['2026-03-18','c2',100,'expense','加油'],
    ['2026-03-19','c1',94,'expense','午餐'],
    ['2026-03-20','c1',30,'expense','早餐'],['2026-03-20','c1',73,'expense','午餐'],['2026-03-20','c1',125,'expense','晚餐'],
    ['2026-03-21','c1',185,'expense','午餐'],['2026-03-21','c2',120,'expense','洗車'],['2026-03-21','c3',2503,'expense','愛買'],
    ['2026-03-22','c2',999,'expense','加油'],
    ['2026-03-23','c1',207,'expense','早午餐'],['2026-03-23','c1',130,'expense','蛤蠣'],
    ['2026-03-24','c1',30,'expense','早餐'],['2026-03-24','c7',792,'expense','電費'],
    ['2026-03-25','c1',170,'expense','午餐'],['2026-03-25','c7',2997,'expense','凱擘大寬頻'],
    ['2026-03-26','c1',99,'expense','午餐'],
    ['2026-03-27','cd1',1000,'expense','星巴克儲值'],['2026-03-27','c1',165,'expense','晚餐'],
    ['2026-03-28','c9',100,'expense','金紙'],['2026-03-28','c1',270,'expense','神州窯烤'],
    ['2026-03-29','c1',285,'expense','早餐'],['2026-03-29','c3',528,'expense','車罩'],['2026-03-29','c2',100,'expense','加油'],['2026-03-29','c9',1313,'expense','捕蚊燈'],['2026-03-29','c4',680,'expense','百靈果脫口秀'],
    ['2026-03-30','c1',30,'expense','早餐'],['2026-03-30','c1',149,'expense','午餐'],['2026-03-30','cd1',82,'expense','咖啡'],
    ['2026-03-31','c1',170,'expense','午餐'],
    ['2026-04-01','c2',6000,'expense','機車分期(17、18/24)'],['2026-04-01','cd3',479,'expense','Youtube訂閱'],['2026-04-01','cd3',380,'expense','Netflix'],['2026-04-01','c3',6333,'expense','電競筆電(4/6)'],['2026-04-01','c1',100,'expense','午餐'],['2026-04-01','c5',2600,'expense','按摩'],['2026-04-01','c4',2500,'expense','遊戲'],['2026-04-01','c9',150,'expense','郵局換卡'],
    ['2026-04-02','c1',73,'expense','午餐'],
    ['2026-04-03','cd1',105,'expense','飲料'],['2026-04-03','c1',140,'expense','炸雞'],
    ['2026-04-04','c4',999,'expense','金礦928'],['2026-04-04','cd1',873,'expense','濃萃美式*28杯'],
    ['2026-04-05','c1',205,'expense','炸雞'],['2026-04-05','c1',230,'expense','康康豬'],['2026-04-05','c7',170,'expense','水費'],
    ['2026-04-06','c1',130,'expense','飲料+肉丸'],['2026-04-06','c9',1160,'expense','擴香'],
    ['2026-04-07','c1',30,'expense','早餐'],['2026-04-07','c1',55,'expense','午餐'],['2026-04-07','c1',160,'expense','晚餐'],['2026-04-07','i5',500,'income','統一發票中獎'],
    ['2026-04-08','c1',139,'expense','午餐'],['2026-04-08','c1',190,'expense','晚餐'],
    ['2026-04-09','c1',150,'expense','午餐'],['2026-04-09','cd1',50,'expense','飲料'],
    ['2026-04-10','i1',49337,'income','3月薪資'],['2026-04-10','i2',20209,'income','分紅獎金'],['2026-04-10','c1',125,'expense','午餐'],['2026-04-10','c1',140,'expense','晚餐'],
    ['2026-04-11','c1',140,'expense','晚餐'],
    ['2026-04-12','c1',100,'expense','午餐'],['2026-04-12','c9',300,'expense','虎爺廟拜拜'],['2026-04-12','c4',150,'expense','洗車+今彩539'],['2026-04-12','c1',180,'expense','臭豆腐*3'],
    ['2026-04-13','c1',90,'expense','午餐'],['2026-04-13','c1',45,'expense','洋蔥'],
    ['2026-04-14','c1',71,'expense','午餐'],['2026-04-14','cd1',30,'expense','咖啡'],['2026-04-14','c2',130,'expense','洗車'],
    ['2026-04-15','c1',53,'expense','午餐'],['2026-04-15','c2',95,'expense','加油'],
    ['2026-04-16','c1',135,'expense','午餐'],
    ['2026-04-17','c1',80,'expense','早餐'],['2026-04-17','c1',175,'expense','午餐'],['2026-04-17','c1',175,'expense','晚餐'],
    ['2026-04-18','cd1',80,'expense','西西里咖啡'],['2026-04-18','c5',300,'expense','按摩'],['2026-04-18','cd1',185,'expense','麥香奶茶1箱'],
    ['2026-04-20','c1',30,'expense','早餐'],['2026-04-20','c1',128,'expense','午餐'],['2026-04-20','c1',70,'expense','晚餐'],
    ['2026-04-21','c1',95,'expense','早餐'],['2026-04-21','c7',1416,'expense','電話費'],['2026-04-21','c1',170,'expense','晚餐'],
    ['2026-04-22','c1',35,'expense','早餐'],['2026-04-22','c1',143,'expense','午餐'],
    ['2026-04-23','c1',118,'expense','午餐'],
    ['2026-04-24','c1',183,'expense','早+午餐'],['2026-04-24','cd2',1550,'expense','菸*2條'],
    ['2026-04-25','c1',160,'expense','午餐'],['2026-04-25','c1',66,'expense','高湯包'],['2026-04-25','c4',160,'expense','寶可夢'],
    ['2026-04-27','c1',139,'expense','午餐'],
    ['2026-04-28','c2',93,'expense','加油'],['2026-04-28','cd1',50,'expense','飲料'],['2026-04-28','c2',675,'expense','台中→台北'],['2026-04-28','c6',1943,'expense','洛基大飯店'],['2026-04-28','c1',350,'expense','炸物'],
    ['2026-04-29','c4',120,'expense','扭蛋'],['2026-04-29','c1',120,'expense','得正'],['2026-04-29','c3',1580,'expense','襯衫'],['2026-04-29','c7',46,'expense','水費'],['2026-04-29','c1',763,'expense','晚餐'],['2026-04-29','c2',675,'expense','台北→台中'],['2026-04-29','c2',300,'expense','停車費'],
    ['2026-04-30','c1',45,'expense','早餐'],['2026-04-30','c1',108,'expense','午餐'],['2026-04-30','cd1',70,'expense','飲料'],
    // ── 5 月 ──
    ['2026-05-01','c2',3000,'expense','機車分期(19/24)'],['2026-05-01','cd3',479,'expense','Youtube訂閱'],['2026-05-01','cd3',380,'expense','Netflix'],['2026-05-01','c3',6333,'expense','電競筆電(5/6)'],
    ['2026-05-02','ct2',10632,'expense','114年綜合所得稅'],
    ['2026-05-04','c1',153,'expense','午餐'],
    ['2026-05-05','c1',119,'expense','午餐'],['2026-05-05','c1',65,'expense','晚餐'],
    ['2026-05-06','c1',30,'expense','早餐'],['2026-05-06','c1',161,'expense','午餐'],['2026-05-06','c1',180,'expense','晚餐'],['2026-05-06','ct1',8188,'expense','換日幣4萬 沖繩用'],
    ['2026-05-07','c1',125,'expense','早午餐'],
    ['2026-05-08','c1',30,'expense','早餐'],['2026-05-08','c1',190,'expense','午餐'],['2026-05-08','i1',52191,'income','4月薪資'],
    ['2026-05-09','c1',2171,'expense','母親節吃飯'],
    ['2026-05-10','ct2',8007,'expense','114年房屋稅'],['2026-05-10','c2',120,'expense','洗車'],['2026-05-10','cd2',214,'expense','菸+飲料'],
    ['2026-05-11','c1',137,'expense','午餐'],['2026-05-11','c1',175,'expense','晚餐'],
    ['2026-05-12','c1',139,'expense','午餐'],
    ['2026-05-13','c1',105,'expense','午餐'],
    ['2026-05-14','c1',150,'expense','午餐'],['2026-05-14','c1',140,'expense','炸雞'],
    ['2026-05-15','c1',130,'expense','午餐'],['2026-05-15','c2',140,'expense','停車費'],
    ['2026-05-16','c1',115,'expense','早餐'],['2026-05-16','cd1',175,'expense','飲料'],['2026-05-16','c1',161,'expense','麵包'],['2026-05-16','cd1',2000,'expense','星巴克儲值'],['2026-05-16','ct1',22776,'expense','沖繩機票*2張'],
    ['2026-05-17','c2',560,'expense','停車費'],
    ['2026-05-18','c1',115,'expense','午餐'],
    ['2026-05-19','c1',100,'expense','早餐'],['2026-05-19','c1',170,'expense','午餐'],
    ['2026-05-20','c1',170,'expense','午餐'],
    ['2026-05-21','c1',54,'expense','點心'],
    ['2026-05-22','c1',60,'expense','早餐'],['2026-05-22','c1',84,'expense','午餐'],['2026-05-22','cd1',130,'expense','飲料'],
    ['2026-05-23','cd1',135,'expense','飲料'],['2026-05-23','c9',300,'expense','虎爺廟拜拜'],['2026-05-23','c3',330,'expense','手機保護貼'],['2026-05-23','ct1',6776,'expense','沖繩住宿'],
    ['2026-05-25','c1',63,'expense','早餐'],['2026-05-25','c1',108,'expense','午餐'],
    ['2026-05-26','c1',65,'expense','早餐'],['2026-05-26','c1',214,'expense','晚餐'],
    ['2026-05-27','c1',70,'expense','早餐'],['2026-05-27','c1',126,'expense','午餐'],['2026-05-27','c1',155,'expense','晚餐'],
    ['2026-05-28','c1',30,'expense','早餐'],['2026-05-28','c1',133,'expense','午餐'],['2026-05-28','i3',26054,'income','賣股票'],
    ['2026-05-29','c1',80,'expense','早餐'],['2026-05-29','c1',150,'expense','午餐'],
    ['2026-05-30','cd2',180,'expense','菸+水'],['2026-05-30','c1',295,'expense','晚餐'],
    ['2026-05-31','cd1',50,'expense','飲料'],['2026-05-31','c3',4589,'expense','洗車用品'],['2026-05-31','c7',623,'expense','電費'],
    // ── 6 月 ──
    ['2026-06-01','c2',3000,'expense','機車分期(20/24)'],
    ['2026-06-01','cd3',479,'expense','Youtube訂閱'],
    ['2026-06-01','cd3',380,'expense','Netflix'],
    ['2026-06-01','c3',6333,'expense','電競筆電(6/6) 最後一期'],
    ['2026-06-01','cd2',150,'expense','菸'],
    ['2026-06-01','c1',81,'expense','午餐'],
    ['2026-06-01','cd3',628,'expense','訂閱 Claude Code'],
    ['2026-06-02','c1',75,'expense','早餐'],
    ['2026-06-02','c1',94,'expense','午餐'],
    ['2026-06-02','cd1',50,'expense','飲料'],
    ['2026-06-02','cd2',1940,'expense','免稅菸*2條'],
    ['2026-06-03','cd1',70,'expense','飲料'],
    ['2026-06-03','c1',140,'expense','午餐'],
    ['2026-06-03','c7',147,'expense','水費'],
    ['2026-06-03','i5',500,'income','發票中獎'],
  ];
  const txs = raw.map((r,i)=>({id:'imp'+String(i).padStart(4,'0'),date:r[0],categoryId:r[1],amount:r[2],type:r[3],note:r[4]}));
  localStorage.setItem('fin_cats', JSON.stringify(cats));
  localStorage.setItem('fin_tx',   JSON.stringify(txs));
  localStorage.setItem('fin_budgets', JSON.stringify({}));
  localStorage.setItem('fin_imported_2026_v4', '1');
}
autoImport();

// ── 預設分類 ─────────────────────────────────────────────
const DEFAULT_CATEGORIES = [
  { id:'c1', type:'expense', name:'餐飲',   color:'#f97316', icon:'🍔' },
  { id:'c2', type:'expense', name:'交通',   color:'#3b82f6', icon:'🚌' },
  { id:'c3', type:'expense', name:'購物',   color:'#ec4899', icon:'🛍️' },
  { id:'c4', type:'expense', name:'娛樂',   color:'#8b5cf6', icon:'🎮' },
  { id:'c5', type:'expense', name:'醫療',   color:'#ef4444', icon:'💊' },
  { id:'c6', type:'expense', name:'住房',   color:'#6b7280', icon:'🏠' },
  { id:'c7', type:'expense', name:'水電',   color:'#14b8a6', icon:'💡' },
  { id:'c8', type:'expense', name:'教育',   color:'#f59e0b', icon:'📚' },
  { id:'c9', type:'expense', name:'其他支出',color:'#94a3b8',icon:'📦' },
  { id:'i1', type:'income',  name:'薪資',   color:'#22c55e', icon:'💼' },
  { id:'i2', type:'income',  name:'獎金',   color:'#84cc16', icon:'🎁' },
  { id:'i3', type:'income',  name:'投資',   color:'#06b6d4', icon:'📈' },
  { id:'i4', type:'income',  name:'副業',   color:'#a78bfa', icon:'💻' },
  { id:'i5', type:'income',  name:'其他收入',color:'#94a3b8',icon:'💰' },
];

// ── LocalStorage 存取 ─────────────────────────────────────
function load(k, def) { try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch { return def; } }
function save(k, v)   { localStorage.setItem(k, JSON.stringify(v)); }

let transactions = load('fin_tx', []);
let categories   = load('fin_cats', DEFAULT_CATEGORIES);
let budgets      = load('fin_budgets', {});

function persist() {
  save('fin_tx', transactions);
  save('fin_cats', categories);
  save('fin_budgets', budgets);
  cloudSave();
}

function persistStock() {
  save('fin_stock_tx', stockTxs);
  save('fin_dividends', dividends);
  save('fin_stock_prices', stockPrices);
  if (stockDividends) save('fin_stock_dividends_v3', stockDividends);
  cloudSave();
}

function setSyncStatus(status) {
  const dot   = document.getElementById('sync-dot');
  const label = document.getElementById('sync-label');
  if (!dot || !label) return;
  const map = {
    syncing: { color:'#f59e0b', text:'同步中…' },
    ok:      { color:'#22c55e', text:'已同步 ✓' },
    offline: { color:'#94a3b8', text:'離線模式' },
    error:   { color:'#ef4444', text:'同步失敗' },
  };
  const s = map[status] || map.offline;
  dot.style.background = s.color;
  label.textContent    = s.text;
}

function cloudSave() {
  if (!window.cloudSync) return Promise.resolve();
  // 未登入時不儲存（頁面初始化階段）
  try { if (!firebase.auth().currentUser) return Promise.resolve(); } catch(e) { return Promise.resolve(); }
  setSyncStatus('syncing');
  // 安全取值（避免變數尚未宣告時出錯）
  const _recurring = typeof recurring !== 'undefined' ? recurring : [];
  return Promise.all([
    window.cloudSync.save('transactions', transactions),
    window.cloudSync.save('categories',   categories),
    window.cloudSync.save('budgets',      budgets),
    window.cloudSync.save('stockTxs',     stockTxs),
    window.cloudSync.save('dividends',    dividends),
    window.cloudSync.save('stockPrices',  stockPrices),
    window.cloudSync.save('recurring',    _recurring),
  ]).then(() => setSyncStatus('ok'))
    .catch(e => { console.error('[cloudSave]', e); setSyncStatus('error'); });
}

async function cloudLoad() {
  if (!window.cloudSync) { setSyncStatus('offline'); return; }
  setSyncStatus('syncing');
  try {
    const data = await window.cloudSync.loadAll();
    if (!data || !data.transactions || data.transactions.length < 5) {
      // 雲端無資料或資料太少 → 把本地資料推上去
      if (transactions.length > 0) {
        await cloudSave();
        setSyncStatus('ok');
      } else {
        setSyncStatus('offline');
      }
      return;
    }
    // 雲端有資料（以筆數較多者為主）
    if (data.transactions.length >= transactions.length) {
      transactions = data.transactions;
      categories   = data.categories   || categories;
      budgets      = data.budgets      || budgets;
      stockTxs     = data.stockTxs     || stockTxs;
      dividends    = data.dividends    || dividends;
      stockPrices  = data.stockPrices  || stockPrices;
      recurring    = data.recurring    || recurring;
      save('fin_tx',          transactions);
      save('fin_cats',        categories);
      save('fin_budgets',     budgets);
      save('fin_stock_tx',    stockTxs);
      save('fin_dividends',   dividends);
      save('fin_stock_prices',stockPrices);
      save('fin_recurring',   recurring);
      setSyncStatus('ok');
      renderAll();
    } else {
      // 本地資料比雲端多 → 推上去
      await cloudSave();
      setSyncStatus('ok');
    }
  } catch(e) {
    console.error('[cloudLoad]', e);
    setSyncStatus('error');
  }
}

// ── 工具 ─────────────────────────────────────────────────
const uid   = () => Date.now().toString(36) + Math.random().toString(36).slice(2);
const fmt   = n  => '$' + Number(n).toLocaleString('zh-TW');
const today = () => new Date().toISOString().slice(0,10);
const mStr  = d  => d.toISOString().slice(0,7);
const mAdd  = (s, d) => { const dt = new Date(s+'-01'); dt.setMonth(dt.getMonth()+d); return mStr(dt); };
const mLabel= s  => { const [y,m]=s.split('-'); return `${y} 年 ${+m} 月`; };
const getCat= id => categories.find(c=>c.id===id) || {name:'未分類',color:'#94a3b8',icon:'❓'};
const esc   = s  => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const fmtN  = n  => Number(n).toLocaleString('zh-TW'); // 無 $ 號純數字格式
const pnlClass = n => n > 0 ? 'pnl-pos' : n < 0 ? 'pnl-neg' : 'pnl-zero';
const pnlSign  = n => n > 0 ? '+' : '';
const txOfMonth = m => transactions.filter(t=>t.date.startsWith(m));
const sum   = (txs, type) => txs.filter(t=>t.type===type).reduce((a,t)=>a+t.amount,0);
const groupByCat = txs => {
  const m = {};
  txs.forEach(t=>{ m[t.categoryId] = (m[t.categoryId]||0) + t.amount; });
  return Object.entries(m).map(([id,total])=>({id,total})).sort((a,b)=>b.total-a.total);
};

// ── 狀態 ─────────────────────────────────────────────────
// ── 股票資料存取 ─────────────────────────────────────────
let stockTxs       = load('fin_stock_tx', []);          // 買賣記錄
let dividends      = load('fin_dividends', []);          // 股息記錄
let stockPrices    = load('fin_stock_prices', {});       // { code: currentPrice }
let stockDividends = load('fin_stock_dividends_v3', null);  // 配息資訊（v2 修正 00918 為季配 $0.62）

// 從 prices.js 自動載入最新股價與預設配息資料
function applyExternalPrices() {
  if (!window.STOCK_PRICES) return;
  Object.entries(window.STOCK_PRICES).forEach(([code, price]) => {
    stockPrices[code] = price;
  });
  // 若 localStorage 無配息資料，使用 prices.js 的靜態預設值
  if (!stockDividends && window.STOCK_DIVIDENDS) {
    stockDividends = { ...window.STOCK_DIVIDENDS };
  }
  persistStock();
}

function autoImportStocks() {
  if (stockTxs.length > 0) return; // 已有資料就不重複匯入
  stockTxs = [
    {id:'s001',type:'buy',code:'0050',  name:'元大台灣50',      shares:4000,price:44.71, fee:0,date:'2025-01-01',note:'元大帳戶'},
    {id:'s002',type:'buy',code:'0056',  name:'元大高股息',       shares:3270,price:35.87, fee:0,date:'2025-01-01',note:'元大帳戶'},
    {id:'s003',type:'buy',code:'00918', name:'大華優利高填息30',  shares:4300,price:22.88, fee:0,date:'2025-01-01',note:'元大帳戶'},
    {id:'s004',type:'buy',code:'006208',name:'富邦台50',         shares:4,   price:244.5, fee:0,date:'2025-01-01',note:'國泰帳戶'},
    {id:'s005',type:'buy',code:'00878', name:'國泰永續高股息',    shares:1200,price:22.28, fee:0,date:'2025-01-01',note:'國泰帳戶'},
    {id:'s006',type:'buy',code:'009816',name:'凱基台灣TOP50',    shares:5000,price:10.00, fee:0,date:'2026-02-10',note:'國泰帳戶'},
  ];
  stockPrices = {'0050':107.60,'0056':53.80,'00918':31.73,'006208':249,'00878':33.92,'009816':15.72};
  persistStock();
}
autoImportStocks();
applyExternalPrices();

// 計算持倉：回傳 { code: { name, shares, totalCost, avgCost } }
function calcHoldings() {
  const h = {};
  stockTxs.forEach(t => {
    if (!h[t.code]) h[t.code] = { name: t.name, shares: 0, totalCost: 0 };
    if (t.type === 'buy') {
      h[t.code].shares    += t.shares;
      h[t.code].totalCost += t.shares * t.price + (t.fee || 0);
    } else if (t.type === 'sell') {
      const avgC = h[t.code].shares > 0 ? h[t.code].totalCost / h[t.code].shares : 0;
      h[t.code].totalCost -= avgC * t.shares;
      h[t.code].shares    -= t.shares;
    }
  });
  // 移除已清倉
  Object.keys(h).forEach(k => { if (h[k].shares <= 0) delete h[k]; });
  return h;
}

// 計算已實現損益
function calcRealizedPnl() {
  const avgCostTrack = {}; // 追蹤每支股票平均成本
  const realized = [];
  stockTxs.forEach(t => {
    if (!avgCostTrack[t.code]) avgCostTrack[t.code] = { shares: 0, totalCost: 0 };
    const ac = avgCostTrack[t.code];
    if (t.type === 'buy') {
      ac.totalCost += t.shares * t.price + (t.fee || 0);
      ac.shares    += t.shares;
    } else if (t.type === 'sell') {
      const avgC = ac.shares > 0 ? ac.totalCost / ac.shares : 0;
      const pnl  = (t.price - avgC) * t.shares - (t.fee || 0);
      realized.push({ date: t.date, code: t.code, name: t.name, shares: t.shares, sellPrice: t.price, avgCost: avgC, pnl, fee: t.fee || 0 });
      ac.totalCost -= avgC * t.shares;
      ac.shares    -= t.shares;
    }
  });
  return realized;
}

let curMonth   = mStr(new Date());
let curYear    = new Date().getFullYear();
let addType    = 'expense';
let editingId  = null;
let catMeta    = {};
let currentPage = 'home';
const charts   = {};

// ── 頁面切換 ─────────────────────────────────────────────
function showPage(page) {
  currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById('page-' + page).classList.remove('hidden');
  document.querySelectorAll('.nav-item').forEach(b =>
    b.classList.toggle('active', b.dataset.page === page));
  // 切換到新頁面時重新渲染（確保圖表在可見狀態下正確繪製）
  if (page === 'home')     { renderStats(); renderHealth(); renderCharts(); }
  if (page === 'ledger')   { renderTable(); }
  if (page === 'invest')   { renderInvest(); }
  if (page === 'analysis') { renderCompare(); renderAnnual(); }
  if (page === 'settings') { renderRecurring(); renderCats(); }
}

function destroyChart(id) { if(charts[id]){ charts[id].destroy(); delete charts[id]; } }

// ── 年度總覽 ──────────────────────────────────────────────
function renderAnnual() {
  document.getElementById('year-label').textContent = curYear + ' 年';
  const txs     = transactions.filter(t => t.date.startsWith(String(curYear)));
  const income  = sum(txs, 'income');
  const expense = sum(txs, 'expense');
  const balance = income - expense;

  document.getElementById('yr-income').textContent  = fmt(income);
  document.getElementById('yr-expense').textContent = fmt(expense);
  document.getElementById('yr-count').textContent   = txs.length + ' 筆';
  const balEl = document.getElementById('yr-balance');
  balEl.textContent  = fmt(balance);
  balEl.style.color  = balance >= 0 ? 'var(--balance-fg)' : 'var(--expense-fg)';

  // 月份趨勢圖
  const months = Array.from({length:12}, (_,i) => String(curYear)+'-'+String(i+1).padStart(2,'0'));
  const mLabels = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  const mInc = months.map(m => sum(txs.filter(t=>t.date.startsWith(m)),'income'));
  const mExp = months.map(m => sum(txs.filter(t=>t.date.startsWith(m)),'expense'));

  destroyChart('annual-trend');
  charts['annual-trend'] = new Chart(document.getElementById('chart-annual-trend'), {
    type: 'line',
    data: {
      labels: mLabels,
      datasets: [
        { label:'收入', data: mInc, borderColor:'#22c55e', backgroundColor:'#22c55e22', tension:.35, fill:true, pointRadius:4, pointHoverRadius:6 },
        { label:'支出', data: mExp, borderColor:'#ef4444', backgroundColor:'#ef444422', tension:.35, fill:true, pointRadius:4, pointHoverRadius:6 },
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ labels:{ font:{size:12}, padding:12, boxWidth:14 }} },
      scales:{
        y:{ beginAtZero:true, ticks:{ callback:v=>'$'+v.toLocaleString(), font:{size:11} } },
        x:{ ticks:{ font:{size:11} } }
      },
      interaction:{ mode:'index', intersect:false },
    }
  });

  // 收入明細
  renderAnnualCatList('annual-income-list', txs, 'income', income);
  // 支出明細
  renderAnnualCatList('annual-expense-list', txs, 'expense', expense);
  // 薪資獎金明細
  renderSalaryTable();
}

function renderSalaryTable() {
  const months  = Array.from({length:12}, (_,i) => String(curYear)+'-'+String(i+1).padStart(2,'0'));
  const mLabels = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

  const getAmt = (m, catId) =>
    transactions.filter(t => t.date.startsWith(m) && t.categoryId === catId)
                .reduce((s, t) => s + t.amount, 0);

  const salaryArr = months.map(m => getAmt(m, 'i1'));
  const bonusArr  = months.map(m => getAmt(m, 'i2'));
  const totalSalary = salaryArr.reduce((a, b) => a + b, 0);
  const totalBonus  = bonusArr.reduce((a, b) => a + b, 0);

  // 統計卡
  document.getElementById('yr-salary').textContent       = fmt(totalSalary);
  document.getElementById('yr-bonus').textContent        = fmt(totalBonus);
  document.getElementById('yr-salary-total').textContent = fmt(totalSalary + totalBonus);

  // 長條圖（堆疊）
  destroyChart('salary-bonus');
  charts['salary-bonus'] = new Chart(document.getElementById('chart-salary-bonus'), {
    type: 'bar',
    data: {
      labels: mLabels,
      datasets: [
        { label:'薪資', data: salaryArr, backgroundColor:'#86efac', borderRadius:3 },
        { label:'獎金', data: bonusArr,  backgroundColor:'#fcd34d', borderRadius:3 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { font:{size:11}, padding:8, boxWidth:12 } } },
      scales: {
        x: { stacked: true, ticks:{ font:{size:10} } },
        y: { stacked: true, beginAtZero: true, ticks:{ callback: v => '$' + v.toLocaleString(), font:{size:10} } },
      },
      interaction: { mode:'index', intersect:false },
    }
  });

  // 月份表格（只顯示有資料的月份）
  const tableRows = months.map((m, i) => {
    const salary = salaryArr[i];
    const bonus  = bonusArr[i];
    if (!salary && !bonus) return '';
    const total = salary + bonus;
    return `<div class="salary-row">
      <span>${mLabels[i]}</span>
      <span class="salary-col income">${salary ? fmt(salary) : '—'}</span>
      <span class="salary-col bonus">${bonus  ? fmt(bonus)  : '—'}</span>
      <span class="salary-col total">${fmt(total)}</span>
    </div>`;
  }).join('');

  document.getElementById('salary-table').innerHTML =
    `<div class="salary-row salary-header">
      <span>月份</span><span>💼 薪資</span><span>🎁 獎金</span><span>合計</span>
    </div>
    ${tableRows || '<div style="color:var(--text3);font-size:13px;padding:12px 0">本年度無薪資獎金記錄</div>'}
    <div class="salary-row salary-footer">
      <span>年度合計</span>
      <span class="salary-col income">${fmt(totalSalary)}</span>
      <span class="salary-col bonus">${fmt(totalBonus)}</span>
      <span class="salary-col total">${fmt(totalSalary + totalBonus)}</span>
    </div>`;
}

function renderAnnualCatList(elId, txs, type, grandTotal) {
  const el   = document.getElementById(elId);
  const rows = groupByCat(txs.filter(t=>t.type===type));
  if (!rows.length) { el.innerHTML = '<div style="color:var(--text3);font-size:13px;padding:8px 0">無記錄</div>'; return; }

  const isIncome = type === 'income';
  const color    = isIncome ? 'var(--income-fg)' : 'var(--expense-fg)';

  el.innerHTML = rows.map(r => {
    const cat  = getCat(r.id);
    const pct  = grandTotal ? Math.round(r.total / grandTotal * 100) : 0;
    return `<div class="annual-row">
      <div class="annual-dot" style="background:${cat.color}"></div>
      <div class="annual-name">${cat.icon} ${cat.name}</div>
      <div class="annual-bar-wrap">
        <div class="annual-bar-bg">
          <div class="annual-bar-fill" style="width:${pct}%;background:${cat.color}"></div>
        </div>
      </div>
      <div class="annual-amount" style="color:${cat.color}">${fmt(r.total)}</div>
      <div class="annual-pct">${pct}%</div>
    </div>`;
  }).join('') +
  `<div class="annual-total-row">
    <span>合計</span>
    <span style="color:${color}">${fmt(grandTotal)}</span>
  </div>`;
}

// ── 渲染 ─────────────────────────────────────────────────
function renderAll() {
  renderStats();
  renderHealth();
  if (currentPage === 'home')     renderCharts();
  if (currentPage === 'ledger')   renderTable();
  if (currentPage === 'invest')   renderInvest();
  if (currentPage === 'analysis') { renderCompare(); renderAnnual(); }
  if (currentPage === 'settings') { renderRecurring(); renderCats(); }
}

// ── 財務健康指標 ──────────────────────────────────────────
function renderHealth() {
  const txs     = txOfMonth(curMonth);
  const income  = sum(txs, 'income');
  const expense = sum(txs, 'expense');
  if (!income && !expense) { document.getElementById('health-row').innerHTML = ''; return; }

  const badges = [];

  // 儲蓄率
  if (income > 0) {
    const rate = Math.round((income - expense) / income * 100);
    const cls  = rate >= 20 ? 'hb-green' : rate >= 10 ? 'hb-yellow' : 'hb-red';
    badges.push(`<div class="health-badge ${cls}">💰 儲蓄率 ${rate}%</div>`);
  }

  // 餐飲佔比
  const foodAmt = txs.filter(t=>t.type==='expense'&&t.categoryId==='c1').reduce((s,t)=>s+t.amount,0);
  if (expense > 0) {
    const pct = Math.round(foodAmt / expense * 100);
    const cls = pct <= 30 ? 'hb-green' : pct <= 45 ? 'hb-yellow' : 'hb-red';
    badges.push(`<div class="health-badge ${cls}">🍽️ 餐飲佔支出 ${pct}%</div>`);
  }

  // 娛樂+菸佔比
  const funAmt = txs.filter(t=>t.type==='expense'&&['c4','cd2'].includes(t.categoryId)).reduce((s,t)=>s+t.amount,0);
  if (expense > 0 && funAmt > 0) {
    const pct = Math.round(funAmt / expense * 100);
    const cls = pct <= 10 ? 'hb-green' : pct <= 20 ? 'hb-yellow' : 'hb-red';
    badges.push(`<div class="health-badge ${cls}">🎮 娛樂+菸 ${pct}%</div>`);
  }

  // 與上月比較
  const prevMonth = mAdd(curMonth, -1);
  const prevExp   = sum(txOfMonth(prevMonth), 'expense');
  if (prevExp > 0 && expense > 0) {
    const diff = Math.round((expense - prevExp) / prevExp * 100);
    const cls  = diff <= 0 ? 'hb-green' : diff <= 10 ? 'hb-yellow' : 'hb-red';
    const sign = diff > 0 ? '▲' : '▼';
    badges.push(`<div class="health-badge ${cls}">${sign} 比上月支出${diff > 0 ? '多' : '少'} ${Math.abs(diff)}%</div>`);
  }

  // 結餘狀態
  const bal = income - expense;
  if (income > 0) {
    badges.push(`<div class="health-badge ${bal >= 0 ? 'hb-blue' : 'hb-red'}">${bal >= 0 ? '✅ 本月正結餘' : '⚠️ 本月負結餘'}</div>`);
  }

  document.getElementById('health-row').innerHTML = badges.join('');
}

// ── 月份比較 ──────────────────────────────────────────────
function renderCompare() {
  const ma = document.getElementById('cmp-month-a').value;
  const mb = document.getElementById('cmp-month-b').value;
  if (!ma || !mb) return;

  function colHTML(month) {
    const txs    = txOfMonth(month);
    const income = sum(txs, 'income');
    const exp    = sum(txs, 'expense');
    const bal    = income - exp;
    const expCats= groupByCat(txs.filter(t=>t.type==='expense')).slice(0,6);
    return `<div class="compare-col">
      <div class="compare-col-title">${mLabel(month)}</div>
      <div class="compare-stat"><span>收入</span><span style="color:var(--income-fg);font-weight:700">${fmt(income)}</span></div>
      <div class="compare-stat"><span>支出</span><span style="color:var(--expense-fg);font-weight:700">${fmt(exp)}</span></div>
      <div class="compare-stat"><span>結餘</span><span style="color:${bal>=0?'var(--balance-fg)':'var(--expense-fg)'};font-weight:700">${fmt(bal)}</span></div>
      <div style="margin-top:10px;font-size:11px;color:var(--text3);font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px">支出分類</div>
      ${expCats.map(r=>{
        const cat=getCat(r.id);
        return `<div class="compare-stat">
          <span>${cat.icon} ${cat.name}</span>
          <span style="font-weight:600;color:${cat.color}">${fmt(r.total)}</span>
        </div>`;
      }).join('')}
    </div>`;
  }
  document.getElementById('compare-grid').innerHTML = colHTML(ma) + colHTML(mb);
}

// ── 固定費用（重複記帳） ──────────────────────────────────
let recurring = load('fin_recurring', [
  {id:'rc1', name:'機車分期',        categoryId:'c2',  amount:3000},
  {id:'rc2', name:'Youtube訂閱',     categoryId:'cd3', amount:479},
  {id:'rc3', name:'Netflix',         categoryId:'cd3', amount:380},
  {id:'rc4', name:'訂閱 Claude Code',categoryId:'cd3', amount:628},
]);
let rcMeta = {};

function renderRecurring() {
  const el = document.getElementById('recurring-list');
  el.innerHTML = recurring.length ? recurring.map(r => {
    const cat = getCat(r.categoryId);
    return `<div class="recurring-row">
      <div class="recurring-name">${cat.icon} ${esc(r.name)}</div>
      <div style="font-size:12px;color:var(--text2)">${cat.name}</div>
      <div class="recurring-amount">-${fmt(r.amount)}</div>
      <button class="icon-btn" onclick="deleteRecurring('${r.id}')">🗑️</button>
    </div>`;
  }).join('') : '<div class="empty-state" style="padding:16px">尚無固定費用，點「＋ 新增固定費用」新增</div>';

  // 檢查本月是否已匯入
  const flag = 'fin_rec_imported_' + curMonth;
  const imported = localStorage.getItem(flag);
  document.getElementById('recurring-imported-tag').classList.toggle('hidden', !imported);
  document.getElementById('btn-import-recurring').disabled = !!imported;
}

function deleteRecurring(id) {
  if (!confirm('確定刪除此固定費用？')) return;
  recurring = recurring.filter(r => r.id !== id);
  save('fin_recurring', recurring);
  renderRecurring();
}

function openAddRecurring() {
  rcMeta = { editId: null };
  document.getElementById('recurring-modal-title').textContent = '新增固定費用';
  document.getElementById('rc-name').value   = '';
  document.getElementById('rc-amount').value = '';
  populateCatSelect('rc-cat', 'expense');
  document.getElementById('recurring-overlay').classList.remove('hidden');
}

function importRecurring() {
  const flag = 'fin_rec_imported_' + curMonth;
  if (localStorage.getItem(flag)) { alert('本月已匯入過了！'); return; }
  const d = today();
  recurring.forEach(r => {
    transactions.push({ id: uid(), type: 'expense', amount: r.amount, categoryId: r.categoryId, date: d, note: r.name });
  });
  persist();
  localStorage.setItem(flag, '1');
  renderAll();
  alert(`✅ 已匯入 ${recurring.length} 筆固定費用！`);
}

// ── 每月提醒橫幅 ─────────────────────────────────────────
function checkMonthlyReminder() {
  const d = new Date();
  const day = d.getDate();
  if (day > 5) return; // 只在每月 1~5 號顯示
  const flagKey = 'fin_reminder_' + mStr(d);
  if (localStorage.getItem(flagKey)) return;
  const names = recurring.map(r => r.name).join('、');
  const el    = document.getElementById('reminder-banner');
  document.getElementById('reminder-text').innerHTML =
    `📌 <strong>月初提醒：</strong>固定費用尚未匯入（${names}），記得到「固定費用管理」點一鍵匯入！`;
  el.classList.remove('hidden');
  document.getElementById('reminder-close').onclick = () => {
    el.classList.add('hidden');
    localStorage.setItem(flagKey, '1');
  };
}

// ── 各股除息歷史模式（用於預估下次除息日）──────────────
const STOCK_DIV_PATTERNS = {
  '0050':   { name: '元大台灣50',        lastEx: '2026-01-22', lastPerShare: 1.00,  intervalDays: 182, payOffset: 20 },
  '0056':   { name: '元大高股息',         lastEx: '2026-04-23', lastPerShare: 1.00,  intervalDays: 91,  payOffset: 21 },
  '006208': { name: '富邦台50',           lastEx: '2025-11-18', lastPerShare: 3.448, intervalDays: 241, payOffset: 23 },
  '00878':  { name: '國泰永續高股息',     lastEx: '2026-05-19', lastPerShare: 0.66,  intervalDays: 91,  payOffset: 24 },
  '009816': { name: '凱基台灣TOP50',      lastEx: null,         lastPerShare: null,  intervalDays: 91,  payOffset: 25 },
  '00918':  { name: '大華優利高填息30',   lastEx: '2026-03-19', lastPerShare: 0.62,  intervalDays: 91,  payOffset: 25 },
};

let upcomingDivSchedule = [];

function _fmtD(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function buildScheduleFromPatterns() {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const schedule = [];

  // 00918 已公告的確認除息日
  if (new Date('2026-07-13') >= today) {
    schedule.push({ code: '00918', name: '大華優利高填息30', exDate: '2026-06-18', payDate: '2026-07-13', perShare: 1.26, confirmed: true });
  }

  Object.entries(STOCK_DIV_PATTERNS).forEach(([code, cfg]) => {
    if (code === '00918') return;
    if (!cfg.lastEx) return;
    const nextExD = new Date(cfg.lastEx);
    nextExD.setDate(nextExD.getDate() + cfg.intervalDays);
    const nextPayD = new Date(nextExD);
    nextPayD.setDate(nextPayD.getDate() + cfg.payOffset);
    if (nextExD >= today) {
      schedule.push({ code, name: cfg.name, exDate: _fmtD(nextExD), payDate: _fmtD(nextPayD), perShare: cfg.lastPerShare, confirmed: false });
    }
  });

  return schedule.sort((a, b) => a.exDate.localeCompare(b.exDate));
}

function initUpcomingDivSchedule() {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const saved = load('fin_upcoming_divs', null);
  upcomingDivSchedule = (saved && saved.length) ? saved : buildScheduleFromPatterns();
  // 過濾掉配息日已過的項目
  upcomingDivSchedule = upcomingDivSchedule.filter(d => new Date(d.payDate) >= today);
  save('fin_upcoming_divs', upcomingDivSchedule);
}

function renderUpcomingDividends() {
  const el = document.getElementById('upcoming-div-rows');
  if (!el) return;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const upcoming = upcomingDivSchedule.filter(d => new Date(d.payDate) >= today);

  if (!upcoming.length) {
    el.innerHTML = '<div style="color:var(--text3);font-size:13px;padding:8px 0">近期無除息計畫</div>';
    return;
  }

  const holdings = calcHoldings();
  el.innerHTML =
    `<div class="div-sched-head">
      <span>股票</span><span>除息日</span><span>距今</span><span>配息日</span><span>每股</span><span>預計收益</span>
    </div>` +
    upcoming.map(d => {
      const exD = new Date(d.exDate); exD.setHours(0, 0, 0, 0);
      const daysToEx = Math.round((exD - today) / 86400000);
      const daysLabel = daysToEx > 0 ? `${daysToEx} 天後` : daysToEx === 0 ? '今天！' : '已除息';
      const urgent = daysToEx >= 0 && daysToEx <= 5;
      const h = holdings[d.code];
      const estIncome = h && d.perShare ? Math.round(d.perShare * h.shares) : null;
      const badge = d.confirmed ? '' : ' <span class="div-est-badge">預估</span>';
      return `<div class="div-sched-row${urgent ? ' div-sched-urgent' : ''}">
        <div><div class="stock-name">${esc(d.name)}${badge}</div><div class="stock-code">${esc(d.code)}</div></div>
        <div>${d.exDate}</div>
        <div class="${urgent ? 'pnl-pos' : ''}" style="font-weight:${urgent?700:400}">${daysLabel}</div>
        <div>${d.payDate}</div>
        <div>${d.perShare != null ? '$'+d.perShare : '—'}</div>
        <div class="pnl-pos">${estIncome !== null ? fmt(estIncome) : '—'}</div>
      </div>`;
    }).join('');
}

// 按下「更新股價」時同步查詢 TWSE 當日除息事件，自動更新排程
async function fetchAndUpdateDividendSchedule() {
  const today = new Date();
  const ds = `${today.getFullYear()}${String(today.getMonth()+1).padStart(2,'0')}${String(today.getDate()).padStart(2,'0')}`;
  try {
    const res  = await fetch(`https://www.twse.com.tw/exchangeReport/TWT49U?response=json&strDate=${ds}&endDate=${ds}`);
    const data = await res.json();
    if (data.stat !== 'OK' || !data.data) return;

    let changed = false;
    data.data.forEach(row => {
      const code = row[1];
      if (!STOCK_DIV_PATTERNS[code]) return;
      const m = row[0].match(/(\d+)年(\d+)月(\d+)日/);
      if (!m) return;
      const exDate     = `${parseInt(m[1])+1911}-${m[2].padStart(2,'0')}-${m[3].padStart(2,'0')}`;
      const perShare   = parseFloat(row[5]);
      const cfg        = STOCK_DIV_PATTERNS[code];
      cfg.lastEx       = exDate;
      cfg.lastPerShare = perShare;

      const nextExD  = new Date(exDate); nextExD.setDate(nextExD.getDate() + cfg.intervalDays);
      const nextPayD = new Date(nextExD); nextPayD.setDate(nextPayD.getDate() + cfg.payOffset);

      // 移除同代號舊預估項目，加入新預測項目
      upcomingDivSchedule = upcomingDivSchedule.filter(e => e.code !== code);
      upcomingDivSchedule.push({ code, name: cfg.name, exDate: _fmtD(nextExD), payDate: _fmtD(nextPayD), perShare, confirmed: false });
      changed = true;
      console.log(`[DivSchedule] ${code} 今日除息 $${perShare}，下次預估 ${_fmtD(nextExD)}`);
    });

    if (changed) {
      upcomingDivSchedule.sort((a, b) => a.exDate.localeCompare(b.exDate));
      save('fin_upcoming_divs', upcomingDivSchedule);
      renderUpcomingDividends();
    }
  } catch(e) {
    console.warn('[DivSchedule] TWSE 查詢失敗:', e.message);
  }
}

// ── 投資追蹤渲染 ─────────────────────────────────────────
function renderInvest() {
  const holdings = calcHoldings();
  const realized = calcRealizedPnl();

  // 統計卡
  let totalCost = 0, totalValue = 0;
  Object.entries(holdings).forEach(([code, h]) => {
    const cur = parseFloat(stockPrices[code] || 0);
    totalCost  += h.totalCost;
    totalValue += cur * h.shares;
  });
  const unrealized   = totalValue - totalCost;
  const realizedTotal = realized.reduce((s, r) => s + r.pnl, 0);
  const divTotal      = dividends.reduce((s, d) => s + d.total, 0);

  document.getElementById('inv-cost').textContent      = fmt(Math.round(totalCost));
  document.getElementById('inv-value').textContent     = fmt(Math.round(totalValue));
  document.getElementById('inv-dividend-total').textContent = fmt(divTotal);

  const urEl = document.getElementById('inv-unrealized');
  urEl.textContent = (unrealized >= 0 ? '+' : '') + fmt(Math.round(unrealized));
  urEl.className   = 'stat-value ' + pnlClass(unrealized);

  const reEl = document.getElementById('inv-realized');
  reEl.textContent = (realizedTotal >= 0 ? '+' : '') + fmt(Math.round(realizedTotal));
  reEl.className   = 'stat-value ' + pnlClass(realizedTotal);

  // 持倉表
  const holdEl = document.getElementById('holdings-table');
  const holdEntries = Object.entries(holdings);
  if (!holdEntries.length) {
    holdEl.innerHTML = '<div class="empty-state">尚無持倉，點「＋ 新增交易」買入股票</div>';
  } else {
    const prevPrices = window.STOCK_PREV_PRICES || {};
    holdEl.innerHTML = holdEntries.map(([code, h]) => {
      const avgC = h.shares > 0 ? h.totalCost / h.shares : 0;
      const cur  = parseFloat(stockPrices[code] || 0);
      const prev = parseFloat(prevPrices[code] || 0);
      const mval = cur * h.shares;
      const pnl  = mval - h.totalCost;
      const pct  = h.totalCost > 0 ? (pnl / h.totalCost * 100) : 0;
      const daily = cur && prev ? (cur - prev) / prev * 100 : null;
      const dailyHTML = daily !== null
        ? `<span class="${pnlClass(daily)}">${pnlSign(daily)}${daily.toFixed(2)}%</span>`
        : '—';
      return `<div class="holding-row">
        <div><div class="stock-name">${esc(h.name)}</div><div class="stock-code">${esc(code)}</div></div>
        <div>${fmtN(h.shares)}</div>
        <div>$${fmtN(Math.round(avgC))}</div>
        <div>${cur ? '$' + fmtN(cur) : '—'}</div>
        <div>${dailyHTML}</div>
        <div>${cur ? fmt(Math.round(mval)) : '—'}</div>
        <div class="${pnlClass(pnl)}">${cur ? pnlSign(pnl)+fmt(Math.round(pnl)) : '—'}</div>
        <div class="${pnlClass(pct)}">${cur ? pnlSign(pct)+pct.toFixed(2)+'%' : '—'}</div>
      </div>`;
    }).join('');
  }

  // 股息記錄
  const divEl = document.getElementById('dividend-list');
  const sortedDiv = [...dividends].sort((a,b) => b.date.localeCompare(a.date)).slice(0, 8);
  divEl.innerHTML = sortedDiv.length ? sortedDiv.map(d =>
    `<div class="inv-stat-row">
      <span>${d.date} <span class="stock-code">${esc(d.code)}</span> ${esc(d.name)}</span>
      <span class="inv-stat-val income">+${fmt(d.total)}</span>
    </div>`
  ).join('') : '<div style="color:var(--text3);font-size:13px;padding:8px 0">尚無股息記錄</div>';

  // 已實現損益
  const realEl = document.getElementById('realized-list');
  realEl.innerHTML = realized.length ? [...realized].reverse().slice(0,8).map(r =>
    `<div class="inv-stat-row">
      <span>${r.date} <span class="stock-code">${esc(r.code)}</span> ${esc(r.name)} ×${fmtN(r.shares)}</span>
      <span class="inv-stat-val ${pnlClass(r.pnl)}">${pnlSign(r.pnl)}${fmt(Math.round(r.pnl))}</span>
    </div>`
  ).join('') : '<div style="color:var(--text3);font-size:13px;padding:8px 0">尚無已實現損益</div>';

  // 股價更新時間
  document.getElementById('prices-update-time').textContent =
    window.PRICES_UPDATED || '尚未更新';
  document.getElementById('prices-update-note').textContent =
    window.PRICES_UPDATED && window.PRICES_UPDATED !== '尚未更新' ? '✅ 今日已更新' : '';

  // 配息資訊表
  const divInfoEl = document.getElementById('dividend-info-rows');
  const divData   = stockDividends || window.STOCK_DIVIDENDS || {};
  // 先算各股動態殖利率
  const calcYield = (code, cur) => {
    const info = divData[code] || {};
    if (!cur || !info.lastDiv) return 0;
    const times = info.timesPerYear || 1;
    return info.lastDiv * times / cur * 100;
  };
  const calcAnnual = (code, cur, shares) => {
    const info = divData[code] || {};
    if (!cur || !info.lastDiv) return 0;
    const times = info.timesPerYear || 1;
    return Math.round(info.lastDiv * times * shares);
  };
  const totalAnnualDiv = holdEntries.reduce((s,[c,hh]) => {
    const cp = parseFloat(stockPrices[c]||0);
    return s + calcAnnual(c, cp, hh.shares);
  }, 0);

  divInfoEl.innerHTML = holdEntries.map(([code, h]) => {
    const cur    = parseFloat(stockPrices[code] || 0);
    const info   = divData[code] || {};
    const yield_ = calcYield(code, cur);
    const lastD  = info.lastDiv || 0;
    const freq   = info.frequency || '—';
    const annual = calcAnnual(code, cur, h.shares);
    const pct    = totalAnnualDiv > 0 ? Math.round(annual/totalAnnualDiv*100) : 0;
    return `<div class="holding-row" style="grid-template-columns:1.6fr 0.8fr 0.9fr 1fr 1fr 1fr 0.8fr">
      <div><div class="stock-name">${esc(h.name)}</div><div class="stock-code">${esc(code)}</div></div>
      <div>${cur ? '$'+fmtN(cur) : '—'}</div>
      <div style="font-size:12px;color:var(--text2)">${freq}</div>
      <div class="${yield_ > 0 ? 'pnl-pos' : 'pnl-zero'}">${yield_ ? yield_.toFixed(2)+'%' : '—'}</div>
      <div>${lastD ? '$'+fmtN(lastD) : '—'}</div>
      <div class="pnl-pos">${annual ? fmt(annual) : '—'}</div>
      <div style="color:var(--text3)">${pct ? pct+'%' : '—'}</div>
    </div>`;
  }).join('') +
  `<div class="annual-total-row" style="margin-top:6px">
    <span>預估年度總配息收入</span>
    <span class="pnl-pos">${fmt(totalAnnualDiv)}</span>
  </div>`;

  // 交易記錄
  const txEl = document.getElementById('stock-tx-list');
  txEl.innerHTML = [...stockTxs].sort((a,b) => b.date.localeCompare(a.date)).map(t =>
    `<div class="inv-tx-row">
      <span style="color:var(--text2);font-size:12px">${t.date}</span>
      <span><span class="inv-type-badge inv-type-${t.type}">${t.type==='buy'?'買入':'賣出'}</span></span>
      <span><span class="stock-name">${esc(t.name)}</span> <span class="stock-code">${esc(t.code)}</span></span>
      <span>${fmtN(t.shares)}</span>
      <span>$${fmtN(t.price)}</span>
      <span>${t.fee ? '$'+fmtN(t.fee) : '—'}</span>
      <span style="font-weight:600">${fmt(Math.round(t.shares*t.price + (t.type==='buy'?1:-1)*(t.fee||0)))}</span>
      <span><button class="icon-btn" onclick="deleteStockTx('${t.id}')">🗑️</button></span>
    </div>`
  ).join('') || '<div class="empty-state">尚無交易記錄</div>';

  renderUpcomingDividends();
}

function updatePrice(code, val) {
  const n = parseFloat(val);
  if (!isNaN(n) && n > 0) stockPrices[code] = n;
  else delete stockPrices[code];
  persistStock();
  const holdings = calcHoldings();
  const h = holdings[code]; if (!h) return;
  const mval = n * h.shares;
  const pnl  = mval - h.totalCost;
  const pct  = h.totalCost > 0 ? pnl / h.totalCost * 100 : 0;

  // 更新頂部統計卡
  let totalCost=0, totalValue=0;
  Object.entries(holdings).forEach(([c,hh]) => {
    const cp = parseFloat(stockPrices[c]||0);
    totalCost += hh.totalCost; totalValue += cp*hh.shares;
  });
  const ur = totalValue - totalCost;
  const urEl = document.getElementById('inv-unrealized');
  urEl.textContent = (ur>=0?'+':'')+fmt(Math.round(ur));
  urEl.className   = 'stat-value '+pnlClass(ur);
  document.getElementById('inv-value').textContent = fmt(Math.round(totalValue));
}

// 從 Yahoo Finance 抓單支股票的配息歷史，回傳 { lastDiv, timesPerYear, frequency }
async function fetchDividendInfo(code) {
  const yUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${code}.TW?interval=1d&range=2y&events=dividends`;
  const res  = await fetch(`https://corsproxy.io/?${encodeURIComponent(yUrl)}`);
  const data = await res.json();
  const result = data?.chart?.result?.[0];
  if (!result?.events?.dividends) return null;

  const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000;
  const divList = Object.values(result.events.dividends)
    .map(d => ({ amount: parseFloat(d.amount) || 0, date: d.date * 1000 }))
    .filter(d => d.amount > 0)
    .sort((a, b) => b.date - a.date); // 最新排前

  if (!divList.length) return null;

  const recentCount = divList.filter(d => d.date >= oneYearAgo).length;
  const timesPerYear = recentCount >= 10 ? 12 : recentCount >= 3 ? 4 : recentCount >= 2 ? 2 : 1;
  const frequency    = timesPerYear === 12 ? '每月配息' : timesPerYear === 4 ? '每季配息' : timesPerYear === 2 ? '每半年配息' : '每年配息';
  const lastDiv      = Math.round(divList[0].amount * 1000) / 1000;

  return { lastDiv, timesPerYear, frequency };
}

async function refreshPrices() {
  const btn = document.getElementById('btn-refresh-prices');
  if (btn) { btn.textContent = '🔄 更新中…'; btn.disabled = true; }

  const codes = Object.keys(calcHoldings());
  if (!codes.length) {
    if (btn) { btn.textContent = '🔄 更新股價'; btn.disabled = false; }
    return;
  }

  const newPrices     = {};
  const newPrevPrices = {};

  // ── 方法一：台灣證交所即時行情（股價 + 昨日收盤）──
  try {
    const ex_ch = codes.map(c => `tse_${c}.tw`).join('%7C');
    const res = await fetch(
      `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=${ex_ch}&json=1&delay=0`
    );
    const data = await res.json();
    (data.msgArray || []).forEach(s => {
      const p = s.z !== '-' ? parseFloat(s.z) : NaN;
      const y = parseFloat(s.y);
      if (!isNaN(p) && p > 0) newPrices[s.c]     = Math.round(p * 100) / 100;
      if (!isNaN(y) && y > 0) newPrevPrices[s.c] = Math.round(y * 100) / 100;
    });
  } catch(e) {
    console.warn('[refreshPrices] 證交所即時 API 失敗:', e.message);
  }

  // ── 方法二：Yahoo Finance + CORS Proxy（補足缺失的股價，並同步抓配息）──
  const missing = codes.filter(c => !newPrices[c]);
  const yResults = await Promise.allSettled(codes.map(async code => {
    const needPrice = missing.includes(code);
    const yUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${code}.TW?interval=1d&range=2y&events=dividends`;
    const res  = await fetch(`https://corsproxy.io/?${encodeURIComponent(yUrl)}`);
    const data = await res.json();
    const result = data?.chart?.result?.[0];
    const meta   = result?.meta;

    // 股價（只補缺）
    if (needPrice && meta?.regularMarketPrice > 0)
      newPrices[code]     = Math.round(meta.regularMarketPrice * 100) / 100;
    if (needPrice && meta?.previousClose > 0)
      newPrevPrices[code] = Math.round(meta.previousClose * 100) / 100;

    // 配息
    const divEvents = result?.events?.dividends;
    if (!divEvents) return { code, divInfo: null };

    const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000;
    const divList = Object.values(divEvents)
      .map(d => ({ amount: parseFloat(d.amount) || 0, date: d.date * 1000 }))
      .filter(d => d.amount > 0)
      .sort((a, b) => b.date - a.date);

    if (!divList.length) return { code, divInfo: null };

    const recentCount  = divList.filter(d => d.date >= oneYearAgo).length;
    const timesPerYear = recentCount >= 10 ? 12 : recentCount >= 3 ? 4 : recentCount >= 2 ? 2 : 1;
    const frequency    = timesPerYear === 12 ? '每月配息' : timesPerYear === 4 ? '每季配息' : timesPerYear === 2 ? '每半年配息' : '每年配息';
    const lastDiv      = Math.round(divList[0].amount * 1000) / 1000;

    return { code, divInfo: { lastDiv, timesPerYear, frequency } };
  }));

  // 整合配息結果
  const newDividends = { ...(stockDividends || window.STOCK_DIVIDENDS || {}) };
  yResults.forEach(r => {
    if (r.status === 'fulfilled' && r.value?.divInfo) {
      newDividends[r.value.code] = r.value.divInfo;
    }
  });

  const successCount = codes.filter(c => newPrices[c]).length;

  if (successCount > 0) {
    Object.assign(stockPrices, newPrices);
    window.STOCK_PREV_PRICES = { ...(window.STOCK_PREV_PRICES || {}), ...newPrevPrices };
    const now = new Date();
    window.PRICES_UPDATED = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  }

  // 不論股價是否成功，只要有配息資料就更新
  const divUpdated = yResults.some(r => r.status === 'fulfilled' && r.value?.divInfo);
  if (divUpdated) stockDividends = newDividends;

  if (successCount > 0 || divUpdated) {
    persistStock();
    renderInvest();
  }

  if (btn) { btn.textContent = '🔄 更新股價'; btn.disabled = false; }

  // 同步查詢 TWSE 當日除息事件，自動更新除息排程
  fetchAndUpdateDividendSchedule();

  if (successCount === 0 && !divUpdated) {
    alert('無法取得資料\n\n可能原因：\n• 非台股交易時間（09:00–13:30）\n• 網路或 CORS 問題\n\n請稍後再試');
  }
}

function deleteStockTx(id) {
  if (!confirm('確定刪除此交易記錄？')) return;
  stockTxs = stockTxs.filter(t => t.id !== id);
  persistStock(); renderInvest();
}

// 股票交易 Modal
let curSType = 'buy';
function openStockTxModal() {
  document.getElementById('st-date').value  = today();
  document.getElementById('st-code').value  = '';
  document.getElementById('st-name').value  = '';
  document.getElementById('st-shares').value= '';
  document.getElementById('st-price').value = '';
  document.getElementById('st-fee').value   = '';
  document.getElementById('st-note').value  = '';
  document.getElementById('st-total-preview').textContent = '總金額：$0';
  setCurSType('buy');
  document.getElementById('stock-tx-overlay').classList.remove('hidden');
}

function setCurSType(t) {
  curSType = t;
  document.querySelectorAll('.type-tab[data-stype]').forEach(b => {
    b.classList.toggle('active', b.dataset.stype === t);
  });
  document.getElementById('stock-tx-confirm').textContent = t === 'buy' ? '新增買入' : '新增賣出';
}

function calcStockPreview() {
  const shares = parseFloat(document.getElementById('st-shares').value) || 0;
  const price  = parseFloat(document.getElementById('st-price').value)  || 0;
  const fee    = parseFloat(document.getElementById('st-fee').value)    || 0;
  const total  = shares * price + (curSType === 'buy' ? fee : -fee);
  document.getElementById('st-total-preview').textContent = `總金額：${fmt(Math.round(total))}`;
}

// 股息 Modal
function openDividendModal() {
  document.getElementById('div-date').value     = today();
  document.getElementById('div-code').value     = '';
  document.getElementById('div-name').value     = '';
  document.getElementById('div-per-share').value= '';
  document.getElementById('div-shares').value   = '';
  document.getElementById('div-total').value    = '';
  document.getElementById('div-note').value     = '';
  document.getElementById('dividend-overlay').classList.remove('hidden');
}

function calcDivPreview() {
  const ps = parseFloat(document.getElementById('div-per-share').value) || 0;
  const sh = parseFloat(document.getElementById('div-shares').value)    || 0;
  if (ps && sh && !document.getElementById('div-total').value) {
    document.getElementById('div-total').value = Math.round(ps * sh);
  }
}

// 統計卡
function renderStats() {
  document.getElementById('current-month-label').textContent = mLabel(curMonth);
  const txs     = txOfMonth(curMonth);
  const income  = sum(txs,'income');
  const expense = sum(txs,'expense');
  const balance = income - expense;
  const allInc  = sum(transactions,'income');
  const allExp  = sum(transactions,'expense');

  document.getElementById('stat-income').textContent  = fmt(income);
  document.getElementById('stat-expense').textContent = fmt(expense);

  const balEl = document.getElementById('stat-balance');
  balEl.textContent = fmt(balance);
  balEl.style.color = balance >= 0 ? 'var(--balance-fg)' : 'var(--expense-fg)';

  document.getElementById('stat-total').textContent = fmt(allInc - allExp);
}

// 圖表
function renderCharts() {
  const txs = txOfMonth(curMonth);

  // 支出圓餅
  const expGroups = groupByCat(txs.filter(t=>t.type==='expense'));
  destroyChart('pie');
  if (expGroups.length) {
    charts['pie'] = new Chart(document.getElementById('chart-expense-pie'), {
      type: 'doughnut',
      data: {
        labels: expGroups.map(r=>getCat(r.id).name),
        datasets: [{ data: expGroups.map(r=>r.total),
          backgroundColor: expGroups.map(r=>getCat(r.id).color),
          borderWidth: 2, borderColor:'#fff' }]
      },
      options: {
        cutout:'58%',
        plugins:{ legend:{ position:'bottom', labels:{ font:{size:11}, padding:8, boxWidth:12 }} },
      }
    });
  } else {
    const ctx = document.getElementById('chart-expense-pie').getContext('2d');
    ctx.clearRect(0,0,300,300);
  }

  // 每日長條圖（本月）
  destroyChart('bar');
  const d0  = new Date(curMonth+'-01');
  const days= new Date(d0.getFullYear(), d0.getMonth()+1, 0).getDate();
  const labels=[], incArr=[], expArr=[];
  for(let i=1;i<=days;i++){
    const ds = curMonth+'-'+String(i).padStart(2,'0');
    const dt = txs.filter(t=>t.date===ds);
    labels.push(i);
    incArr.push(sum(dt,'income'));
    expArr.push(sum(dt,'expense'));
  }
  charts['bar'] = new Chart(document.getElementById('chart-daily-bar'),{
    type:'bar',
    data:{
      labels,
      datasets:[
        {label:'收入',data:incArr,backgroundColor:'#86efac',borderRadius:3},
        {label:'支出',data:expArr,backgroundColor:'#fca5a5',borderRadius:3},
      ]
    },
    options:{
      plugins:{ legend:{ labels:{ font:{size:11}, padding:8, boxWidth:12 }} },
      scales:{ y:{ beginAtZero:true, ticks:{ callback:v=>'$'+v.toLocaleString(), font:{size:10} }},
               x:{ ticks:{ font:{size:10} }} },
      responsive:true, maintainAspectRatio:false,
    }
  });
}

function renderBudgetMini() {
  const txs = txOfMonth(curMonth);
  const expCats = categories.filter(c=>c.type==='expense');
  const rows = expCats.map(c=>{
    const key = curMonth+'-'+c.id;
    const budget = budgets[key];
    if(!budget) return null;
    const spent = txs.filter(t=>t.type==='expense'&&t.categoryId===c.id).reduce((a,t)=>a+t.amount,0);
    const pct = Math.min(Math.round(spent/budget*100),100);
    const color = spent>budget?'#ef4444':pct>80?'#f59e0b':'#22c55e';
    return `<div class="budget-mini-item">
      <div class="budget-mini-head"><strong>${c.icon} ${c.name}</strong><span>${fmt(spent)}/${fmt(budget)}</span></div>
      <div class="prog-bg"><div class="prog-fill" style="width:${pct}%;background:${color}"></div></div>
    </div>`;
  }).filter(Boolean);
  document.getElementById('budget-mini-list').innerHTML =
    rows.length ? rows.join('') : '<div style="color:var(--text3);font-size:12px;padding:8px 0">尚未設定預算</div>';
}

// 記帳明細表
function renderTable() {
  document.getElementById('ledger-month-label').textContent = mLabel(curMonth);
  const type  = document.getElementById('filter-type').value;
  const catId = document.getElementById('filter-cat').value;

  // 填充分類篩選
  const catSel = document.getElementById('filter-cat');
  const prev   = catSel.value;
  catSel.innerHTML = '<option value="all">全部分類</option>' +
    categories.map(c=>`<option value="${c.id}">${c.icon} ${c.name}</option>`).join('');
  catSel.value = prev;

  const keyword = (document.getElementById('search-tx')?.value || '').trim().toLowerCase();
  let txs = txOfMonth(curMonth).sort((a,b)=>b.date.localeCompare(a.date));
  if(type!=='all') txs = txs.filter(t=>t.type===type);
  if(catId!=='all') txs = txs.filter(t=>t.categoryId===catId);
  if(keyword) txs = txs.filter(t => {
    const cat = getCat(t.categoryId);
    return (t.note||'').toLowerCase().includes(keyword) || cat.name.toLowerCase().includes(keyword);
  });

  const body = document.getElementById('tx-table-body');
  if(!txs.length){
    body.innerHTML = '<div class="empty-state">本月還沒有記錄，點右上角「＋ 新增記錄」開始吧！</div>';
  } else {
    body.innerHTML = txs.map(t=>{
      const cat = getCat(t.categoryId);
      const typeLbl = t.type==='income' ? '收入' : '支出';
      const sign = t.type==='income' ? '+' : '-';
      const catBg = cat.color+'22';
      return `<div class="tx-row" data-id="${t.id}">
        <span class="col-date">${t.date}</span>
        <span class="col-type"><span class="type-badge ${t.type}">${typeLbl}</span></span>
        <span class="col-cat"><span class="cat-badge" style="background:${catBg};color:${cat.color}">${cat.icon} ${cat.name}</span></span>
        <span class="col-note">${t.note ? esc(t.note) : '<span class="col-note-empty">—</span>'}</span>
        <span class="col-amount ${t.type}">${sign}${fmt(t.amount)}</span>
        <span class="col-actions">
          <button class="icon-btn" onclick="openEditModal('${t.id}')">✏️</button>
          <button class="icon-btn" onclick="deleteTx('${t.id}')">🗑️</button>
        </span>
      </div>`;
    }).join('');
  }
  document.getElementById('tx-count').textContent = txs.length + ' 筆記錄';
}

// 分類管理
function renderCats() {
  ['expense','income'].forEach(type=>{
    const id = 'cat-'+type+'-list';
    const cats = categories.filter(c=>c.type===type);
    document.getElementById(id).innerHTML = cats.map(c=>`
      <div class="cat-row" data-id="${c.id}">
        <div class="cat-dot" style="background:${c.color}"></div>
        <span class="cat-name">${c.icon} ${c.name}</span>
        <button class="cat-action" onclick="openEditCat('${c.id}')">✏️</button>
        <button class="cat-action" onclick="deleteCat('${c.id}')">🗑️</button>
      </div>`).join('');
  });
}

// ── 新增記錄 ─────────────────────────────────────────────
function openAddModal() {
  document.getElementById('f-amount').value = '';
  document.getElementById('f-note').value   = '';
  document.getElementById('f-date').value   = today();
  setAddType(addType);
  document.getElementById('add-overlay').classList.remove('hidden');
  document.getElementById('f-amount').focus();
}

function setAddType(type) {
  addType = type;
  document.querySelectorAll('.type-tab').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.type===type);
  });
  populateCatSelect('f-cat', type);
  document.getElementById('add-submit-btn').textContent = type==='expense' ? '新增支出' : '新增收入';
}

function populateCatSelect(selId, type) {
  const sel  = document.getElementById(selId);
  const cats = categories.filter(c=>c.type===type);
  sel.innerHTML = cats.map(c=>`<option value="${c.id}">${c.icon} ${c.name}</option>`).join('');
}

function closeAddModal() { document.getElementById('add-overlay').classList.add('hidden'); }

document.addEventListener('DOMContentLoaded', ()=>{

  // 導覽列切換
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => showPage(btn.dataset.page));
  });

  // 新增按鈕
  document.getElementById('btn-add-quick').addEventListener('click', openAddModal);
  document.getElementById('add-modal-close').addEventListener('click', closeAddModal);
  document.getElementById('add-overlay').addEventListener('click', e=>{
    if(e.target===document.getElementById('add-overlay')) closeAddModal();
  });

  // type tab
  document.querySelectorAll('.type-tab').forEach(btn=>{
    btn.addEventListener('click', ()=>setAddType(btn.dataset.type));
  });

  // 新增表單提交
  document.getElementById('add-form').addEventListener('submit', e=>{
    e.preventDefault();
    const amount = parseFloat(document.getElementById('f-amount').value);
    if(isNaN(amount)||amount<=0){ alert('請輸入有效金額'); return; }
    transactions.push({
      id: uid(), type: addType, amount,
      categoryId: document.getElementById('f-cat').value,
      date: document.getElementById('f-date').value,
      note: document.getElementById('f-note').value.trim(),
    });
    persist();
    closeAddModal();
    renderAll();
  });

  // 月份切換（首頁）
  document.getElementById('prev-month').addEventListener('click', ()=>{ curMonth=mAdd(curMonth,-1); renderAll(); });
  document.getElementById('next-month').addEventListener('click', ()=>{ curMonth=mAdd(curMonth, 1); renderAll(); });
  // 月份切換（明細頁）
  document.getElementById('ledger-prev-month').addEventListener('click', ()=>{ curMonth=mAdd(curMonth,-1); renderAll(); });
  document.getElementById('ledger-next-month').addEventListener('click', ()=>{ curMonth=mAdd(curMonth, 1); renderAll(); });
  document.getElementById('prev-year').addEventListener('click', ()=>{ curYear--; renderAnnual(); });
  document.getElementById('next-year').addEventListener('click', ()=>{ curYear++; renderAnnual(); });

  // 投資追蹤 ── 開啟 Modal
  document.getElementById('btn-add-stock-tx').addEventListener('click', openStockTxModal);
  document.getElementById('btn-add-dividend').addEventListener('click', openDividendModal);

  // 股票類型切換
  document.querySelectorAll('.type-tab[data-stype]').forEach(btn => {
    btn.addEventListener('click', () => setCurSType(btn.dataset.stype));
  });

  // 金額即時預覽
  ['st-shares','st-price','st-fee'].forEach(id => {
    document.getElementById(id).addEventListener('input', calcStockPreview);
  });
  ['div-per-share','div-shares'].forEach(id => {
    document.getElementById(id).addEventListener('input', calcDivPreview);
  });

  // 關閉 Modal
  document.getElementById('stock-tx-modal-close').addEventListener('click', () =>
    document.getElementById('stock-tx-overlay').classList.add('hidden'));
  document.getElementById('stock-tx-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('stock-tx-overlay'))
      document.getElementById('stock-tx-overlay').classList.add('hidden');
  });
  document.getElementById('dividend-modal-close').addEventListener('click', () =>
    document.getElementById('dividend-overlay').classList.add('hidden'));
  document.getElementById('dividend-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('dividend-overlay'))
      document.getElementById('dividend-overlay').classList.add('hidden');
  });

  // 確認新增交易
  document.getElementById('stock-tx-confirm').addEventListener('click', () => {
    const code   = document.getElementById('st-code').value.trim().toUpperCase();
    const name   = document.getElementById('st-name').value.trim();
    const shares = parseFloat(document.getElementById('st-shares').value);
    const price  = parseFloat(document.getElementById('st-price').value);
    const fee    = parseFloat(document.getElementById('st-fee').value) || 0;
    const date   = document.getElementById('st-date').value;
    const note   = document.getElementById('st-note').value.trim();
    if (!code || !name || !shares || !price || !date) { alert('請填寫完整資料'); return; }
    stockTxs.push({ id: uid(), type: curSType, code, name, shares, price, fee, date, note });
    persistStock();
    document.getElementById('stock-tx-overlay').classList.add('hidden');
    renderInvest();
  });

  // 確認新增股息
  document.getElementById('dividend-confirm').addEventListener('click', () => {
    const code = document.getElementById('div-code').value.trim().toUpperCase();
    const name = document.getElementById('div-name').value.trim();
    const date = document.getElementById('div-date').value;
    const perShare = parseFloat(document.getElementById('div-per-share').value) || 0;
    const shares   = parseFloat(document.getElementById('div-shares').value)    || 0;
    const total    = parseFloat(document.getElementById('div-total').value) || Math.round(perShare * shares);
    const note     = document.getElementById('div-note').value.trim();
    if (!code || !name || !date || !total) { alert('請填寫完整資料'); return; }
    dividends.push({ id: uid(), code, name, date, perShare, shares, total, note });
    persistStock();
    document.getElementById('dividend-overlay').classList.add('hidden');
    renderInvest();
  });

  // 篩選
  ['filter-type','filter-cat'].forEach(id=>{
    document.getElementById(id).addEventListener('change', renderTable);
  });

  // 匯出 CSV
  document.getElementById('btn-export-csv').addEventListener('click', ()=>{
    const txs = txOfMonth(curMonth);
    const rows = [['日期','類型','分類','金額','備註'],
      ...txs.map(t=>{
        const c = getCat(t.categoryId);
        return [t.date, t.type==='income'?'收入':'支出', c.name, t.amount, t.note||''];
      })
    ];
    const csv  = rows.map(r=>r.join(',')).join('\n');
    const blob = new Blob(['﻿'+csv],{type:'text/csv;charset=utf-8;'});
    const a    = document.createElement('a');
    a.href     = URL.createObjectURL(blob);
    a.download = `記帳_${curMonth}.csv`;
    a.click();
  });

  // 分類新增按鈕
  document.querySelectorAll('.add-cat-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>openAddCat(btn.dataset.type));
  });

  // ── 快捷鍵 ──
  document.addEventListener('keydown', e => {
    const tag = document.activeElement.tagName;
    if (['INPUT','SELECT','TEXTAREA'].includes(tag)) return;
    if (e.key === 'n' || e.key === 'N') openAddModal();
    if (e.key === 'Escape') document.querySelectorAll('.overlay:not(.hidden)').forEach(o => o.classList.add('hidden'));
  });

  // ── 搜尋 ──
  document.getElementById('search-tx').addEventListener('input', renderTable);

  // ── 月份比較初始化 ──
  const prevM = mAdd(curMonth, -1);
  document.getElementById('cmp-month-a').value = prevM;
  document.getElementById('cmp-month-b').value = curMonth;
  document.getElementById('cmp-month-a').addEventListener('change', renderCompare);
  document.getElementById('cmp-month-b').addEventListener('change', renderCompare);

  // ── 重複記帳 ──
  document.getElementById('btn-add-recurring').addEventListener('click', openAddRecurring);
  document.getElementById('btn-import-recurring').addEventListener('click', importRecurring);
  document.getElementById('recurring-modal-close').addEventListener('click', () =>
    document.getElementById('recurring-overlay').classList.add('hidden'));
  document.getElementById('recurring-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('recurring-overlay'))
      document.getElementById('recurring-overlay').classList.add('hidden');
  });
  document.getElementById('recurring-confirm').addEventListener('click', () => {
    const name   = document.getElementById('rc-name').value.trim();
    const amount = parseFloat(document.getElementById('rc-amount').value);
    const catId  = document.getElementById('rc-cat').value;
    if (!name || !amount) { alert('請填寫名稱與金額'); return; }
    recurring.push({ id: uid(), name, categoryId: catId, amount });
    save('fin_recurring', recurring);
    document.getElementById('recurring-overlay').classList.add('hidden');
    renderRecurring();
  });

  // ── 每月提醒 ──
  checkMonthlyReminder();

  // 編輯記錄 modal
  document.getElementById('edit-modal-close').addEventListener('click', closeEditModal);
  document.getElementById('edit-overlay').addEventListener('click', e=>{
    if(e.target===document.getElementById('edit-overlay')) closeEditModal();
  });
  document.getElementById('edit-confirm-btn').addEventListener('click', confirmEdit);

  // 分類 modal
  document.getElementById('cat-modal-close').addEventListener('click', closeCatModal);
  document.getElementById('cat-overlay').addEventListener('click', e=>{
    if(e.target===document.getElementById('cat-overlay')) closeCatModal();
  });
  document.getElementById('cat-confirm-btn').addEventListener('click', confirmCat);

  initUpcomingDivSchedule();
  renderAll();
  // 雲端同步由 firebase-config.js 的 onAuthStateChanged 觸發
});

// ── 刪除記錄 ─────────────────────────────────────────────
function deleteTx(id){
  if(!confirm('確定刪除此筆記錄？')) return;
  transactions = transactions.filter(t=>t.id!==id);
  persist(); renderAll();
}

// ── 編輯記錄 ─────────────────────────────────────────────
function openEditModal(id){
  const t = transactions.find(x=>x.id===id);
  if(!t) return;
  editingId = id;
  document.getElementById('e-amount').value = t.amount;
  document.getElementById('e-date').value   = t.date;
  document.getElementById('e-note').value   = t.note||'';
  populateCatSelect('e-cat', t.type);
  document.getElementById('e-cat').value    = t.categoryId;
  document.getElementById('edit-overlay').classList.remove('hidden');
}
function closeEditModal(){ document.getElementById('edit-overlay').classList.add('hidden'); editingId=null; }
function confirmEdit(){
  const t = transactions.find(x=>x.id===editingId);
  if(!t) return;
  const amt = parseFloat(document.getElementById('e-amount').value);
  if(isNaN(amt)||amt<0){ alert('請輸入有效金額'); return; }
  t.amount     = amt;
  t.categoryId = document.getElementById('e-cat').value;
  t.date       = document.getElementById('e-date').value;
  t.note       = document.getElementById('e-note').value.trim();
  persist(); closeEditModal(); renderAll();
}

// ── 分類管理 ─────────────────────────────────────────────
function toggleSection(bodyId, iconId) {
  const body = document.getElementById(bodyId);
  const icon = document.getElementById(iconId);
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  icon.textContent   = isOpen ? '▶ 展開編輯' : '▼ 收起';
}

function toggleCatSection() { toggleSection('cat-section-body', 'cat-toggle-icon'); }

function openAddCat(type){
  catMeta = { type, editId:null };
  document.getElementById('cat-modal-title').textContent = '新增'+(type==='expense'?'支出':'收入')+'分類';
  document.getElementById('cm-name').value  = '';
  document.getElementById('cm-icon').value  = '';
  document.getElementById('cm-color').value = '#4f7cff';
  document.getElementById('cat-overlay').classList.remove('hidden');
}
function openEditCat(id){
  const c = categories.find(x=>x.id===id);
  if(!c) return;
  catMeta = { type:c.type, editId:id };
  document.getElementById('cat-modal-title').textContent = '編輯分類';
  document.getElementById('cm-name').value  = c.name;
  document.getElementById('cm-icon').value  = c.icon||'';
  document.getElementById('cm-color').value = c.color;
  document.getElementById('cat-overlay').classList.remove('hidden');
}
function closeCatModal(){ document.getElementById('cat-overlay').classList.add('hidden'); }
function confirmCat(){
  const name  = document.getElementById('cm-name').value.trim();
  const icon  = document.getElementById('cm-icon').value.trim()||'📌';
  const color = document.getElementById('cm-color').value;
  if(!name){ alert('請輸入分類名稱'); return; }
  if(catMeta.editId){
    const c = categories.find(x=>x.id===catMeta.editId);
    if(c){ c.name=name; c.icon=icon; c.color=color; }
  } else {
    categories.push({ id:uid(), type:catMeta.type, name, icon, color });
  }
  persist(); closeCatModal(); renderCats();
}
function deleteCat(id){
  if(!confirm('確定刪除此分類？（相關記錄不受影響）')) return;
  categories = categories.filter(c=>c.id!==id);
  persist(); renderCats();
}
