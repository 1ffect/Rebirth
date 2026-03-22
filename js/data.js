// ========================================
// GAME DATA — extracted from G object
// ========================================

const APPS = [
  { id:'finance', name:'搞钱', icon:'💰' },
  { id:'shop',    name:'商城', icon:'🛒' },
  { id:'base',    name:'基建', icon:'🏗️' }
];

// 3-tier finance: 狂点信用卡→一键网贷→核弹抵押. 每级解锁带Phase2负面Tag
const FINANCE_BTNS = [
  { id:'credit',   name:'主权信用卡',         icon:'💳', amount:50000,    maxUses:10, desc:'国家担保，狂点刷卡',   amountLabel:'每次 ¥5万', unlockCheck: s => true },
  { id:'loan',     name:'无视风险·极速网贷',   icon:'📱', amount:0,  maxUses:2,  desc:'秒批秒到，催收会上门', amountLabel:'额度：200万~500万', unlockCheck: s => s.finCount.credit >= 5,
    rollAmount: () => 2000000 + Math.floor(Math.random() * 3000000) },
  { id:'mortgage', name:'一键抵押全部家当',    icon:'🏠', amount:0,        maxUses:1,  desc:'房产车子期权一键清空', amountLabel:'额度：5000万~1.5亿', unlockCheck: s => s.finCount.loan >= 2 && s.day >= -15,
    rollAmount: () => 50000000 + Math.floor(Math.random() * 100000000) },
  { id:'darkloan', name:'黑市高利贷',     icon:'🏴', amount:5000000, maxUses:2, desc:'暗网渠道 · 下辈子的债',  amountLabel:'每次 ¥500万', unlockCheck: s => META.has('darkloan') },
  { id:'crypto',   name:'加密货币梭哈',   icon:'₿',  amount:0,       maxUses:1, desc:'All in！一把定生死',     amountLabel:'投入全部现金', unlockCheck: s => META.has('crypto') && s.cash > 100000 },
];

// 4-tier base: 指数级吞金兽
const BASE_TIERS = [
  { lv:0, name:'简陋地下室',     cap:100,    cost:0,        desc:'初始空间。几袋大米就满了。' },
  { lv:1, name:'高级人防工程',   cap:500,    cost:200000,   desc:'总500m³ 钢筋混凝土加固。' },
  { lv:2, name:'地下生态堡垒',   cap:2500,   cost:2000000,  desc:'总2500m³ 独立供电供水。' },
  { lv:3, name:'末日地下乌托邦', cap:10000,  cost:50000000, desc:'总10000m³ 终极奢华空间。' }
];

// P/V Ratio Rebalance: 基础物资(低P高V)→防御(中P中V)→顶奢(极高P极低V)
const ITEMS = [
  // 🌾 生存打底 — P/V ≈ 500~3750. 极占空间，逼迫扩容
  { id:'rice',   cat:'🌾生存打底', name:'吨包大米/压缩饼干', icon:'🍚', price:5000,   vol:15,  chill:1,  drawType:'sack',      colors:['#c8b080','#a89060'] },
  { id:'water',  cat:'🌾生存打底', name:'纯净水立方矩阵',   icon:'💧', price:8000,   vol:15,  chill:1,  drawType:'watercube', colors:['#a0d8ff'] },
  { id:'med',    cat:'🌾生存打底', name:'抗生素医疗箱',     icon:'💊', price:30000,  vol:8,   chill:2,  drawType:'medcrate',  colors:['#fff','#ff2222'] },
  // 🛡️ 硬核防御 — P/V ≈ 33000~100000. 暴徒压测刚需
  { id:'door',   cat:'🛡️硬核防御', name:'钛合金防爆门',    icon:'🛡️', price:500000,  vol:5,   chill:10, drawType:'door',      colors:['#222'] },
  { id:'generator',cat:'🛡️硬核防御',name:'工业核能发电机', icon:'⚡',  price:2000000, vol:60,  chill:15, drawType:'generator', colors:['#555566'] },
  { id:'greenhouse',cat:'🛡️硬核防御',name:'无土栽培温室舱',icon:'🌱',  price:1500000, vol:50,  chill:20, drawType:'greenhouse',colors:['#a0ffa0'] },
  // ✨ 顶奢生活 — P/V ≈ 250000~5000000. 后期洗钱神器，极低体积
  { id:'meat',   cat:'✨顶奢生活', name:'A5和牛恒温柜',     icon:'🥩', price:800000,  vol:3,   chill:40, drawType:'fridge',    colors:['#6080a0','#cc4444','#ffd0d0'] },
  { id:'wine',   cat:'✨顶奢生活', name:'罗曼尼康帝酒窖',   icon:'🍷', price:3000000, vol:5,   chill:60, drawType:'wine',      colors:['#4a2810'] },
  { id:'bathtub',cat:'✨顶奢生活', name:'恒温SPA浴缸',      icon:'🛁', price:1200000, vol:4,   chill:50, drawType:'spa',       colors:['#f0f0f0'] },
  { id:'skincare',cat:'✨顶奢生活',name:'护肤彩妆库',       icon:'💄', price:500000,  vol:1,   chill:35, drawType:'beauty',    colors:['#f5e8f0'] },
  // 🎮 情绪羁绊 — 终极吞金兽，高P中低V
  { id:'cinema', cat:'🎮情绪羁绊', name:'沉浸式私人影院',   icon:'📽️', price:15000000,vol:20,  chill:100,drawType:'gaming',    colors:['#0a0a2a'] },
  { id:'ps5',    cat:'🎮情绪羁绊', name:'电竞舱+VR全息',    icon:'🎮', price:2000000, vol:5,   chill:55, drawType:'gaming',    colors:['#1a1a2a'] },
  { id:'pet',    cat:'🎮情绪羁绊', name:'恒温猫舍+自动喂食',icon:'🐱', price:300000,  vol:3,   chill:45, drawType:'pet',       colors:['#ff9944'] },
  { id:'massage',cat:'🎮情绪羁绊', name:'零重力按摩椅',     icon:'💆', price:800000,  vol:3,   chill:50, drawType:'cozy',      colors:['#5a4030','#d4b896'] },
  // 🔥 零食快乐 — 低价冲动消费，极小体积
  { id:'hotpot', cat:'🔥零食快乐', name:'自热火锅矩阵',     icon:'🍲', price:20000,  vol:2,   chill:12, drawType:'food',      colors:['#cc3300','#ff6633'], hot:true },
  { id:'coffee', cat:'🔥零食快乐', name:'蓝山咖啡库',       icon:'☕', price:15000,  vol:1,   chill:8,  drawType:'food',      colors:['#4a2a10','#8a6a40'], hot:true },
  { id:'choco',  cat:'🔥零食快乐', name:'进口巧克力',       icon:'🍫', price:10000,  vol:1,   chill:6,  drawType:'food',      colors:['#3a1a08','#6a4020'] },
];

// INTEL: 60秒内4条精简弹窗，不打断心流
const INTEL = [
  { day:-28, type:'tip',      tag:'内部消息', head:'狂点信用卡！', detail:'每次+5万，点5次解锁【极速网贷】500万秒到！先把避难所升级——大米太占地方了！' },
  { day:-20, type:'breaking', tag:'重大事件', head:'全球恐慌：物价加速飙升', detail:'网贷花完别慌——花光后【一键抵押全部家当】就会亮起！一键变现5000万起！' },
  { day:-10, type:'breaking', tag:'最终手段', head:'【一键抵押】已解锁！', detail:'房产车子期权全部变现！5000万~1.5亿一键到账。末日后钱就是废纸——全梭哈！升Lv3乌托邦！' },
  { day:-5,  type:'tip',      tag:'倒计时',   head:'最后5天！终极扫货', detail:'食物/水/发电/防御/和牛/影院——有钱全砸进避难所！倒计时结束后钱=废纸！' },
];

const EVENTS = [
  { id:'ex_cash', name:'🔥 前任爆金币', trigger:()=>G.s.day<=-20&&!G.s.flags.ex_cash&&!META.has('expack'),
    desc:'你的前任微信显示"正在输入"。对方说想商量联名账户的事。',
    choices:[
      { txt:'虚与委蛇骗对方过户房产 (+40万)', reward:()=>{G.s.cash+=400000;G.s.euphoria+=100}},
      { txt:'直接要求50万转账 (+50万)', reward:()=>{G.s.cash+=500000;G.s.euphoria+=60}}
    ]},
  { id:'family_beg', name:'📞 堂妹找上门哭穷', trigger:()=>G.s.day<=-15&&!G.s.flags.family_beg,
    desc:'堂妹打来电话：表哥跑路了，要借10万……',
    choices:[
      { txt:'直接砸20万 (-20万 松弛+100)', reward:()=>{G.s.cash-=200000;G.s.euphoria+=100}},
      { txt:'给5万打发 (-5万)', reward:()=>{G.s.cash-=50000;G.s.euphoria+=20}}
    ]},
  { id:'panic_explosion', name:'📊 末日恐慌大爆发', trigger:()=>G.s.panic>=70&&!G.s.flags.panic_explosion,
    desc:'论坛爆炸："72小时后全球断电"。所有物价瞬间翻倍。',
    choices:[
      { txt:'最后一轮融资买到底 (+600万)', reward:()=>{G.s.cash+=6000000;G.s.debt+=6600000;G.s.euphoria+=200}},
      { txt:'谨慎观望', reward:()=>{G.s.euphoria+=30}}
    ]},
  { id:'black_market_tip', name:'🕵️ 黑市线人', trigger:()=>G.s.day<=-22&&!G.s.flags.black_market_tip,
    desc:'一个戴墨镜的男人塞给你一张名片："姐，末日囤货找我，批发价，比超市便宜一半。但只收现金。"',
    choices:[
      { txt:'立刻拿30万现金进货 (-30万 物资打折)', reward:()=>{G.s.cash-=300000;G.s.euphoria+=50;G.s.flags.blackMarketDiscount=true}},
      { txt:'不信任陌生人', reward:()=>{G.s.euphoria+=10}}
    ]},
  { id:'insurance_scam', name:'💼 保险理赔大师', trigger:()=>G.s.day<=-18&&!G.s.flags.insurance_scam&&G.s.cash>=100000,
    desc:'你突然想起来——你三年前买的重疾险、意外险、财产险……全都还没理赔过。末日算不算"意外"？',
    choices:[
      { txt:'疯狂打电话理赔 (+80万)', reward:()=>{G.s.cash+=800000;G.s.euphoria+=80}},
      { txt:'算了，保险公司估计也跑路了 (+20松弛)', reward:()=>{G.s.euphoria+=20}}
    ]},
  { id:'neighbor_wholesale', name:'🏪 邻居清仓甩卖', trigger:()=>G.s.day<=-12&&!G.s.flags.neighbor_wholesale,
    desc:'楼下超市老板娘跑路前把钥匙扔给你了："随便拿，带不走的。反正明天这栋楼就没人了。"',
    choices:[
      { txt:'搬空整个超市 (松弛+150，但要有空间)', reward:()=>{const space=G.s.capacity-G.s.used;if(space<=0){G.s.euphoria+=50;G.notif('⚠️ 空间不足，只拿了一点','danger');return;}const bonus=Math.min(space,50);const riceQty=Math.floor(bonus/15);const actualVol=riceQty*15;G.s.used+=actualVol;G.s.stock.rice=(G.s.stock.rice||0)+riceQty;G.s.euphoria+=150;const riceItem=G.ITEMS.find(x=>x.id==='rice');if(riceItem&&riceQty>0)WH.addItem(riceItem,riceQty);G.notif('🏪 超市物资入库！','success')}},
      { txt:'只拿点零食就走', reward:()=>{G.s.stock.choco=(G.s.stock.choco||0)+3;G.s.used+=3;G.s.euphoria+=30}}
    ]},
  { id:'crypto_tip', name:'📈 币圈大佬的临终遗言', trigger:()=>G.s.day<=-8&&!G.s.flags.crypto_tip&&G.s.cash>=500000,
    desc:'朋友圈刷到一条消息：某币圈大佬在末日前把所有比特币换成了实物黄金，藏在一个公开坐标里。"留给有缘人。反正我带不走。"',
    choices:[
      { txt:'花200万雇人去挖 (+500万黄金)', reward:()=>{G.s.cash-=2000000;G.s.cash+=5000000;G.s.euphoria+=120}},
      { txt:'肯定是骗子', reward:()=>{G.s.euphoria+=15}}
    ]}
];

const META_ITEMS = [
  { id:'loanshark',  name:'高利贷小广告',   icon:'💸', cost:200,  desc:'开局直接多100万启动资金！' },
  { id:'darkloan',   name:'黑市借贷APP',    icon:'🏴', cost:300,  desc:'解锁新搞钱按钮：500万额度×2次，但末日后每天多耗1食物' },
  { id:'vipcard',    name:'VIP仓储会员卡',  icon:'🏷️', cost:350,  desc:'商城所有物价永久打8折' },
  { id:'blueprint',  name:'地下扩容图纸',   icon:'📐', cost:400,  desc:'开局直升Lv1人防工程(500m³)，省下20万升级费' },
  { id:'medreserve', name:'应急医疗储备',   icon:'💉', cost:500,  desc:'末日降临时额外获得10单位医疗物资' },
  { id:'expack',     name:'前任来访卡包',   icon:'💔', cost:500,  desc:'解锁极品前任连环事件链，拒绝可获爆量爽度！' },
  { id:'crypto',     name:'加密货币终端',   icon:'₿',  cost:600,  desc:'解锁搞钱新按钮：投入全部现金，50%翻倍 / 50%清零！' },
  { id:'nuclear',    name:'微型核聚变电池', icon:'☢️', cost:800,  desc:'发电机不再消耗食物作为燃料' },
  { id:'helicopter', name:'直升机救援线索', icon:'🚁', cost:1500, desc:'解锁隐藏结局：存活45天+防御≥80→直升机来接你！' },
  { id:'dungeon',    name:'地下城蓝图碎片', icon:'🏚️', cost:1200, desc:'解锁隐藏结局：存活50天+2位SSR同伴→发现地下城入口！' },
];

// Repeatable meta upgrades (infinite scaling)
const META_REPEATS = [
  { id:'rep_food',  name:'额外食物储备',  icon:'🍚', baseCost:200, costScale:100, desc:'末日降临时额外+4食物', perLv:'食物+4' },
  { id:'rep_water', name:'额外净水储备',  icon:'💧', baseCost:200, costScale:100, desc:'末日降临时额外+3水', perLv:'水+3' },
  { id:'rep_def',   name:'强化防御装甲',  icon:'🛡️', baseCost:300, costScale:150, desc:'末日降临时额外+12防御', perLv:'防御+12' },
  { id:'rep_euph',  name:'爽度加速器',    icon:'⚡', baseCost:250, costScale:125, desc:'末日后每日额外+3爽度', perLv:'+3/天' },
];
