// ========================================
// COMPANIONS DATA + COMPANION SYSTEM (CS)
// ========================================
const COMPANIONS = [
  // ===== SSR: 三位核心女性同伴 =====
  { id:'hunter', name:'楚狄', code:'月狩', title:'黑市第一杀手', icon:'🗡️', rarity:'SSR',
    passive:{ defense:18, foodSave:0, exposureDecay:2, euphPerDay:0, defBonus:0,
             dailyScavenge:true, rightSwipeBonus:1.5 },
    desc:'黑色作战服、短发、伤疤从左眉划到下巴。通缉令上的赏金够买三套别墅。身中数枪倒在你门外，手里还攥着一把开了刃的军刀。',
    hook:'你刷爆信用卡时得罪的黑市债主，雇了她来杀你抢避难所。结果雇主先给了她三枪灭口。你用A5和牛和顶级医疗舱把她从鬼门关拉了回来。',
    chatIntro:'……你救错人了。我本来是来杀你的。但那个狗日的雇主先给了我三枪。所以——暂且两清。',
    chatLines:[
      '出去转了一圈。带回来一箱军粮和两瓶净水。别问我怎么搞到的。',
      '门口三个持枪的。已清除。你继续吃你的和牛。',
      '（楚狄在角落擦军刀，刀面映出你的倒影）',
      '外面零下六十度。我穿短袖都比那些暴徒扛冻。',
      '你做的那个和牛……还行。比军粮好咽。'
    ],
    bondLines: {
      0: ['别靠太近。我咬人。','帮你杀人是因为你救了我。仅此而已。','（她蜷在离你最远的角落，但眼睛始终盯着门的方向）'],
      1: ['有人敲门你别开。让我先看。','……你做的饭不难吃。就这样。','（你半夜醒来发现她坐在你房门口，攥着刀）……路过。'],
      2: ['浴缸水温调到42度了。别问我怎么知道你喜欢这个温度。','那个疤？无所谓。反正末日了谁还看脸。……你在看。','（她第一次背对着你睡着了）'],
      3: ['外面的世界脏透了，但我会保住你这方干净的乌托邦。','（暴徒攻城时，她单枪匹马杀出去，回来时浑身是血）——没受伤。别哭。','如果末日结束……我可以继续当你的保镖吗？免费的那种。']
    }
  },
  { id:'owl', name:'宁鸮', code:'夜鸮', title:'财阀千金·天才黑客', icon:'💎', rarity:'SSR',
    passive:{ defense:8, foodSave:0, exposureDecay:3, euphPerDay:5, defBonus:0,
             exposureSlowdown:0.3, autoBlockRaid:true },
    desc:'你以前高攀不起的顶级富家女。精通代码，掌控着半个城市的卫星网络。末日爆发时她的私人直升机被击落，唯一幸存，带着一箱子芯片倒在你门外。',
    hook:'她家族的卫星网络还在运转。只要她接入你的避难所系统，无人机空投、雷达预警、远程打击——全部解锁。以前你刷爆信用卡屯物资，现在她直接包养你的避难所。',
    chatIntro:'……我的直升机被打下来了。我需要一个有发电机的地方接入卫星链路。你这里条件一般，但勉强能用。',
    chatLines:[
      '调了一批无人机空投过来。别谢我，谢我家的卫星。',
      '已经接管了周围三公里的监控。有人靠近我会知道。',
      '你的系统太原始了。我优化了一下，省了一半电。',
      '外面那些暴徒的通讯全被我监听了。一群蠢货。',
      '（宁鸮盯着屏幕，蓝光映在镜片上，嘴角微微上扬）'
    ],
    bondLines: {
      0: ['你的避难所……勉强及格吧。我住过的最差的地方。','别跟我说话。我在接卫星。','你知道我以前一顿饭多少钱吗？你囤的这些和牛只够当前菜。'],
      1: ['你这个人运气不错，囤货眼光也还行。','咖啡。黑的。不加糖。这是命令。','你的基建方案……不算太蠢。'],
      2: ['别死。你死了这破避难所没人交电费。','……我帮你盯着雷达。去睡吧。','（她把自己的羊绒大衣搭在你肩上，假装什么都没发生）'],
      3: ['以前我觉得钱能买到一切。现在发现，买不到你这种人。','我家的卫星、无人机、武器库——全是你的了。反正我只需要你和Wi-Fi。','（她第一次对你笑了）末日最好的投资，就是救了你。']
    }
  },
  { id:'seed', name:'黎冥', code:'冥种', title:'病娇天才女医生', icon:'💉', rarity:'SSR',
    passive:{ defense:0, foodSave:0.2, waterSave:0.2, exposureDecay:0, euphPerDay:12, defBonus:0,
             greenhouse:true, darkNutrient:true },
    desc:'温声细语的顶尖医学博士，穿着染血的白大褂倒在门外。看起来柔弱无害，但她的急救箱里有你见过最齐全的药品——包括几支来路不明的试剂。',
    hook:'只要有她在，你永远不会生病，任何伤都能治。但代价是——所有上门求救的女邻居、前任，都会被她以"携带病毒风险"为由，微笑着拒之门外。她的温柔只属于你一个人。',
    chatIntro:'你受伤了……让我看看。别动。（她的手很稳，缝合伤口时哼着歌）……好了，以后有我在，你不会死的。',
    chatLines:[
      '今天给大家做了体检。你的指标最好，因为我给你加了特调营养液。',
      '门外有个女人求救？……别开门。我检测到她携带未知病原体。',
      '（黎冥在配药，试管里的液体发着淡蓝色的光）',
      '你今天气色不太好。来，把这个喝了。不许不喝。',
      '我改良了水培系统。食物产量翻倍了哦。都是为了你。'
    ],
    bondLines: {
      0: ['你的伤口我来处理就好。不用找别人。','（她看着门外求救的女人，微笑着关上了监控）……外面太危险了。','这些药只够给你一个人用的。'],
      1: ['我专门为你调了营养液配方。你会越来越健康的。','有邻居想过来蹭药？我说我们的药用完了。你别拆穿我。','你喜欢草莓吗？我在温室里种了你爱吃的。'],
      2: ['你不许受伤。受伤了只有我能治。别人的药你不许吃。','那个来搭讪的女幸存者？我跟她说你有高度传染性疾病。她跑得很快呢。','（你发现自己的饮食、作息、体检全被她安排得明明白白）'],
      3: ['你是我的病人。永远的。我不接受出院。','这个避难所里所有人的命都是我救的。但我只在乎你一个。','（她从背后抱住你）整个世界都烂掉了也没关系。只要你在我身边，哪里都是天堂。']
    }
  },
  // ===== SR: 辅助同伴 =====
  { id:'chef', name:'陈婉', code:null, title:'米其林主厨', icon:'👩‍🍳', rarity:'SR',
    passive:{ defense:0, foodSave:0.25, exposureDecay:0, euphPerDay:8, defBonus:0 },
    desc:'前米其林三星主厨。"世界毁灭也要吃得有尊严。"',
    hook:null,
    chatIntro:'你的食材储备……天哪，我能把压缩饼干做出法餐口感。',
    chatLines:['今晚菜单：和牛寿喜烧配松露酱。','用咖啡渣做了提拉米苏！','吃饱才有力气活，这是科学。','给大家炖了骨头汤，暖身子。'],
    bondLines:null },
  { id:'dog', name:'阿黄', code:null, title:'忠犬护卫', icon:'🐕', rarity:'SR',
    passive:{ defense:10, foodSave:0, exposureDecay:1, euphPerDay:5, defBonus:0 },
    desc:'伤痕累累的德牧。眼神全是警惕，但对你摇了尾巴。',
    hook:null,
    chatIntro:null,
    chatLines:['（阿黄在门口巡逻，耳朵竖直）','（阿黄叼来一只兔子！加餐）','（阿黄突然低吼——有人靠近）','（阿黄蜷在你脚边睡着了）'],
    bondLines:null },
];

// ========================================
// COMPANION SYSTEM (CS) — helper methods
// ========================================
const CS = {
  get(id) { return COMPANIONS.find(c => c.id === id); },
  isActive(s, id) { return s.companions.includes(id) && !s.companionDebuffs[id]; },

  getActivePassives(s) {
    // Aggregate all active companion passives into one object
    const result = { defense:0, foodSave:0, waterSave:0, exposureDecay:0, euphPerDay:0, defBonus:0, exposureSlowdown:0, autoBlockRaid:false, dailyScavenge:false, rightSwipeBonus:1, greenhouse:false, darkNutrient:false };
    s.companions.forEach(cid => {
      const c = COMPANIONS.find(x => x.id === cid);
      if (!c || s.companionDebuffs[cid]) return;
      const p = c.passive;
      result.defense += p.defense || 0;
      result.foodSave += p.foodSave || 0;
      result.waterSave += p.waterSave || 0;
      result.exposureDecay += p.exposureDecay || 0;
      result.euphPerDay += p.euphPerDay || 0;
      result.defBonus += p.defBonus || 0;
      result.exposureSlowdown = Math.max(result.exposureSlowdown, p.exposureSlowdown || 0);
      if (p.autoBlockRaid) result.autoBlockRaid = true;
      if (p.dailyScavenge) result.dailyScavenge = true;
      result.rightSwipeBonus = Math.max(result.rightSwipeBonus, p.rightSwipeBonus || 1);
      if (p.greenhouse) result.greenhouse = true;
      if (p.darkNutrient) result.darkNutrient = true;
    });
    return result;
  },

  calcFoodNeed(s) {
    const people = 1 + s.companions.length;
    const passives = this.getActivePassives(s);
    return Math.max(1, Math.round(people * 1.0 * (1 - Math.min(0.4, passives.foodSave))));
  },

  calcWaterNeed(s) {
    const people = 1 + s.companions.length;
    const passives = this.getActivePassives(s);
    return Math.max(1, Math.round(people * 1.0 * (1 - Math.min(0.4, passives.waterSave))));
  },

  getExposureMultiplier(s) {
    const passives = this.getActivePassives(s);
    return 1 - passives.exposureSlowdown;
  },

  getRightSwipeBonus(s) {
    return this.getActivePassives(s).rightSwipeBonus;
  },

  checkRaidDowngrade(s) {
    const passives = this.getActivePassives(s);
    return passives.autoBlockRaid && Math.random() < 0.4;
  }
};
