// ========================================
// GAME ENGINE — PHASE 2: SURVIVAL SYSTEMS
// ========================================

// Attach P2_EVENTS to G
G.P2_EVENTS = P2_EVENTS;

Object.assign(G, {
  P2_COMPANION_EVENT_SET: {
    recruit_owl: true, recruit_hunter: true, recruit_chef: true, recruit_seed: true,
    owl_bond_up: true, hunter_bond_up: true, seed_bond_up: true, triple_bond: true,
    owl_airdrop: true
  },
  P2_SCUM_EVENT_SET: {
    ex_bf: true, ex_colleague: true, ex_rescue: true, ex_discover: true, ex_betrayal: true,
    ex_revenge: true, ex_redemption: true, livestream_drama: true, revenge_delivery: true,
    influencer_beg: true, moral_kidnap: true, debt_collector: true, gang_threat: true,
    neighbor_revenge: true
  },
  P2_PRIVATE_NOTES: [
    { id:'hunter_l1_log', companion:'hunter', level:1, title:'生存牢骚',
      text:'今天在C区废墟，雷达扫到一个小孩。侧脸……很像我妹。我没敢上前探查生命体征，但躺在那个地方恐怕早已……' },
    { id:'hunter_l2_firetalk', companion:'hunter', level:2, title:'火堆对话',
      text:'上上次碰到个孩子，我连上前确认的勇气都没有。带回来又怎样？拿什么养？我不敢赌，只能选择视而不见。在现在的处境下，那是理智的决定，对吧？……可是，我已经连着好几夜不敢合眼了。' },
    { id:'hunter_l3_battlelog', companion:'hunter', level:3, title:'行动日志-已作废',
      text:'目标区域无高价值物资。遭遇一名女童，疑似难民，体征与……与我妹妹高度重合。未能执行抵近侦察，我……没敢去。已按原计划撤离。\n\n我到底怎么了？是假装一切为了生存，还是不敢去确认她已经变成了一具尸体。没有了“人”的底线，活着的这堆血肉究竟算什么东西？' },

    { id:'owl_l1_encrypted', companion:'owl', level:1, title:'加密文件夹',
      text:'《关于如何一键炸掉这个避难所的10种方法》' },
    { id:'owl_l2_chatfrag', companion:'owl', level:2, title:'聊天记录残片',
      text:'妈，虽然服务器已经停了，但我每天还是想给你发一句“我过得很好”。' },
    { id:'owl_l3_will', companion:'owl', level:3, title:'给玩家的遗书',
      text:'别哭，太占用水分了。我已经写了一段自动代码，死后我会把你的避难所信号伪装成一块废铁，这是我最后的防火墙。' },

    { id:'seed_l1_oath', companion:'seed', level:1, title:'洗得发白的白大褂',
      text:'口袋里有一张折叠的医生誓词，上面被红笔划掉了一个“救”字。' },
    { id:'seed_l2_rx', companion:'seed', level:2, title:'处方单背面',
      text:'第128天，用自己的口粮换了一支退烧药。我是个理智的疯子。' },
    { id:'seed_l3_will', companion:'seed', level:3, title:'给玩家的遗书',
      text:'其实我一直怕死。但如果是为了让你多活一秒，这具残破的身体也算完成了最后的临床实验。' },

    { id:'chef_l1_recipe', companion:'chef', level:1, title:'泛黄食谱',
      text:'全人类消失前，我一定要复刻出妈妈做的那碗面。' },
    { id:'chef_l2_stocksheet', companion:'chef', level:2, title:'物资盘点表',
      text:'明明只剩一罐黄桃了，但我骗那个笨蛋玩家说还有一箱。看着大家吃得开心，我居然不觉得饿。' },
    { id:'chef_l3_will', companion:'chef', level:3, title:'给玩家的遗书',
      text:'锅里还有最后一份煎蛋，火候刚刚好。别管我，趁热吃。吃饱了，才有力气去见明天的太阳。' }
  ],
  // Portrait index semantics:
  // comp: 0=机械工程系, 1=科研生物系, 2=医疗行动系
  // scum: 0=暴戾男, 1=操控女, 2=怯懦男
  P2_COMPANION_PORTRAIT_BY_EVENT: {
    recruit_hunter: 0,
    hunter_old_enemy: 0,
    hunter_bond_up: 0,
    recruit_seed: 1,
    seed_bond_up: 1,
    recruit_owl: 2,
    owl_bond_up: 2,
    owl_airdrop: 2,
    recruit_chef: 2,
    triple_bond: 1
  },
  P2_SCUM_PORTRAIT_BY_EVENT: {
    gang_threat: 0,
    debt_collector: 0,
    neighbor_revenge: 0,
    moral_kidnap: 0,
    revenge_delivery: 0,
    ex_bf: 0,
    ex_rescue: 2,
    ex_discover: 2,
    ex_redemption: 2,
    ex_colleague: 2,
    ex_betrayal: 1,
    ex_revenge: 1,
    livestream_drama: 1,
    influencer_beg: 1
  },
  P2_LEGACY_TYPE_TO_PORTRAIT: {
    bond: 1,
    bond_event: 1,
    resource: 2,
    random: 2,
    emotional: 2,
    tech: 1,
    drama: 1,
    threat: 0,
    trap: 0,
    horror: 0,
    companion_exclusive: 1
  },
  P2_NPC_PORTRAIT_MAP: {
    // Companion / bond lines
    recruit_owl: 1,
    recruit_hunter: 0,
    recruit_chef: 1,
    recruit_seed: 2,
    owl_bond_up: 1,
    hunter_bond_up: 0,
    seed_bond_up: 2,
    triple_bond: 1,
    hunter_old_enemy: 0,
    owl_airdrop: 1,

    // Ex / drama lines
    ex_bf: 1,
    ex_colleague: 1,
    ex_rescue: 1,
    ex_discover: 1,
    ex_betrayal: 1,
    ex_revenge: 1,
    ex_redemption: 1,
    livestream_drama: 1,
    revenge_delivery: 1,
    influencer_beg: 1,
    moral_kidnap: 0,

    // Threat lines
    gang_threat: 0,
    debt_collector: 0,
    neighbor_revenge: 0,
    organ_failure: 2,
    child_cry: 2
  },
  p2ResolvePortraitSheet(evt) {
    if (
      this.P2_COMPANION_PORTRAIT_BY_EVENT[evt.id] !== undefined ||
      this.P2_COMPANION_EVENT_SET[evt.id]
    ) return 'comp';
    if (
      this.P2_SCUM_PORTRAIT_BY_EVENT[evt.id] !== undefined ||
      this.P2_SCUM_EVENT_SET[evt.id]
    ) return 'scum';
    return '';
  },
  p2ResolvePortraitIdx(evt, sheet) {
    if (sheet === 'comp') {
      const byEvent = this.P2_COMPANION_PORTRAIT_BY_EVENT[evt.id];
      if (typeof byEvent === 'number') return byEvent;
      return -1;
    }
    if (sheet === 'scum') {
      const byEvent = this.P2_SCUM_PORTRAIT_BY_EVENT[evt.id];
      if (typeof byEvent === 'number') return byEvent;
      return -1;
    }
    return -1;
  },
  p2BuildNpcCard(evt) {
    const hooks = [
      '开口先借物资，结尾必反转。',
      '话术离谱，但总能戳中人性弱点。',
      '看起来不靠谱，却可能带来关键收益。',
      '每次选择都在赌你的避难所未来。'
    ];
    const src = evt.id || evt.title || 'npc';
    let hash = 0;
    for (let i = 0; i < src.length; i++) hash = (hash * 31 + src.charCodeAt(i)) >>> 0;
    const tag = evt.npcTag || '';
    const hook = evt.npcHook || hooks[hash % hooks.length];
    const code = String((evt.npcCode ?? (hash % 9999))).padStart(4, '0');
    const avatar = evt.avatar || '🫥';
    const sheet = this.p2ResolvePortraitSheet(evt);
    const portraitIdx = this.p2ResolvePortraitIdx(evt, sheet);
    const portraitCls = (evt.id === 'stray_dog')
      ? 'custom straydog'
      : (evt.id === 'influencer_beg')
      ? 'custom influencerbeg'
      : (code === '4974')
      ? 'custom wangdaye'
      : (code === '4539')
        ? 'custom scavenger'
        : (code === '3310')
          ? 'custom chefwoman'
        : (code === '1930')
          ? 'custom linainai'
        : (code === '1800')
          ? 'custom mentor'
        : (code === '3175')
          ? 'custom colleague'
        : (code === '4671')
          ? 'custom exbf'
        : ((sheet && portraitIdx >= 0) ? `sprite ${sheet} p${portraitIdx}` : '');
    const portraitInner = (portraitCls ? '' : '&nbsp;');
    return `
      <div class="npc-card">
        <div class="npc-portrait ${portraitCls}">${portraitInner}</div>
        <div class="npc-meta">
          <div class="npc-row-top"><span class="npc-id">NPC-${code}</span>${tag ? `<span class="npc-tag">${tag}</span>` : ''}</div>
          <div class="npc-name">${evt.title || '匿名幸存者'}</div>
          <div class="npc-hook">${hook}</div>
        </div>
      </div>`;
  },
  p2BuildArcProgress(evt) {
    const mentorIds = ['livestream_drama', 'mentor_masterclass', 'mentor_collapse'];
    const idx = mentorIds.indexOf(evt.id);
    if (idx < 0) return '';
    const doneCount =
      (this.s.p2Flags.includes('mentor_seeded') ? 1 : 0) +
      (this.s.p2Flags.includes('mentor_countered') ? 1 : 0);
    let active = 0;
    if (evt.id === 'livestream_drama') active = 1;
    else if (evt.id === 'mentor_masterclass') active = 2;
    else active = 3;
    const stepCls = (n) => n <= doneCount ? 'arc-step done' : (n === active ? 'arc-step active' : 'arc-step');
    return `<div class="arc-progress">
      <div class="arc-title">剧情线：废土鸡汤骗局 ${active}/3</div>
      <div class="arc-steps">
        <div class="${stepCls(1)}"></div>
        <div class="${stepCls(2)}"></div>
        <div class="${stepCls(3)}"></div>
      </div>
    </div>`;
  },

  showPhase2Transition() {
    const s = this.s;
    const temp = '-' + (47 + Math.floor(Math.random()*20)) + '°C';
    // Preview converted resources
    const preFood = (s.stock.rice||0)*3 + (s.stock.hotpot||0)*2 + (s.stock.choco||0)*1 +
                    (s.stock.coffee||0)*1 + (s.stock.meat||0)*2;
    const preWater = (s.stock.water||0)*4 + (s.stock.bathtub||0)*1 + (s.stock.coffee||0)*1;
    const hasPow = (s.stock.generator||0) > 0;
    const foodWarn = preFood < 120 ? ' ⚠️' : preFood < 200 ? ' ⚡' : ' ✓';
    const waterWarn = preWater < 100 ? ' ⚠️' : preWater < 160 ? ' ⚡' : ' ✓';
    document.getElementById('p2Sub').innerHTML = `地表温度: ${temp}<br>避难所: Lv${s.baseLv} ${this.BASE_TIERS[s.baseLv].name}<br>食物储备: ${preFood}${foodWarn} | 水: ${preWater}${waterWarn}<br>${hasPow?'⚡ 发电机: 已装备':'🥶 发电机: <span style="color:#ff453a">无！将持续冻伤</span>'}`;
    document.getElementById('phase2Transition').classList.add('show');
    SFX.play('alert');
  },

  enterPhase2() {
    document.getElementById('phase2Transition').classList.remove('show');
    WH.stopLoop();
    if (typeof this.stopCapacityFx === 'function') this.stopCapacityFx();
    // Clean up any Phase 1 tutorial leftovers on mobile.
    if (typeof this.removeTip === 'function') this.removeTip();
    document.querySelectorAll('.tutorial-highlight').forEach(e => e.classList.remove('tutorial-highlight'));
    const s = this.s;
    s.phase = 2;
    s.p2day = 0; s.exposure = 0; s.hp = 100;
    s.companions = []; s.companionBond = {}; s.chatLog = []; s.starveDays = 0;
    s.bonusEuphPerDay = 0; s.usedEvents = []; s.eventCooldowns = {};
    s.pendingEvent = null; s.p2app = 'swipe'; s.p2ChatFilter = 'all';
    // Carry Phase 1 debt flags into Phase 2 event system
    s.p2Flags = [];
    if (s.flags.heavy_debt) s.p2Flags.push('heavy_debt');
    if (s.flags.extreme_debt) s.p2Flags.push('extreme_debt');

    // Convert stock to resource pools (tight budget — every unit matters)
    s.foodPool = (s.stock.rice||0)*3 + (s.stock.hotpot||0)*2 + (s.stock.choco||0)*1 +
                 (s.stock.coffee||0)*1 + (s.stock.meat||0)*2;
    s.waterPool = (s.stock.water||0)*4 + (s.stock.bathtub||0)*1 + (s.stock.coffee||0)*1;
    s.medPool = (s.stock.med||0)*2;
    if (META.has('medreserve')) s.medPool += 10;
    // Apply repeatable meta bonuses
    const repFood = META.getRepeatLv('rep_food');
    const repWater = META.getRepeatLv('rep_water');
    const repDef = META.getRepeatLv('rep_def');
    const repEuph = META.getRepeatLv('rep_euph');
    if (repFood > 0) s.foodPool += repFood * 4;
    if (repWater > 0) s.waterPool += repWater * 3;

    s.hasPower = (s.stock.generator||0) > 0;
    s.hasGreenhouse = (s.stock.greenhouse||0) > 0;

    // Defense from Phase 1
    s.defense = s.baseLv * 15 + (s.stock.door||0) * 25 + (s.stock.generator||0) * 10;
    if (repDef > 0) s.defense += repDef * 12;

    // Daily euphoria production from luxury items
    s.euphProd = 0;
    if (s.hasPower) {
      s.euphProd += (s.stock.cinema||0)*10 + (s.stock.ps5||0)*5 +
                    (s.stock.bathtub||0)*5 + (s.stock.massage||0)*4;
    }
    s.euphProd += (s.stock.skincare||0)*3 + (s.stock.wine||0)*4 + (s.stock.pet||0)*3;
    if (repEuph > 0) s.euphProd += repEuph * 3;

    // Carry over euphoria
    s.euphCurrency = Math.floor(s.euphoria / 2);

    // Init chat
    this.p2Chat('📡','系统','末日降临。地表已不适合人类生存。避难所系统启动。','sys');
    this.p2Chat('📡','系统',`食物储备: ${s.foodPool} | 水: ${s.waterPool} | 医疗: ${s.medPool}`,'sys');
    this.p2Chat('📡','系统','保持警惕。外面的人会找上门来。','sys');
    if (s.flags.usedDarkLoan) this.p2Chat('📡','系统','⚠ 黑市高利贷条款：每日额外消耗1单位食物','sys');

    // Update UI
    document.getElementById('exposureWrap').classList.add('show');
    document.getElementById('crtOverlay').classList.add('active');
    document.getElementById('appBar').classList.add('four-col');
    document.getElementById('warehouseWrap').style.display = 'none';
    document.getElementById('p2StatusArea').classList.add('show');
    document.querySelector('.topbar .title').textContent = 'SURVIVAL';
    document.getElementById('storyPane').innerHTML = '';
    this.s.logs = [];
    this.log('🔴 末日降临。避难所已启动。');

    this.render();
    this.startClock();

    // Phase 2 tutorial: step 1 after a short delay
    if (s.p2TutStep === 0) setTimeout(() => this.p2Tutorial(1), 1200);
  },

  // ===== PHASE 2 TUTORIAL =====
  p2Tutorial(step) {
    const s = this.s;
    if (s.p2TutStep >= step) return;
    s.p2TutStep = step;

    const tips = {
      1: {
        title: '📡 避难所生存指南',
        body: `<div style="text-align:left;line-height:1.8;font-size:12px;color:#aaa">
          <div style="color:#ff453a;font-weight:700;margin-bottom:6px">▎核心目标：活过60天</div>
          <div><span style="color:#F5F5F5">🍚 FOOD / 💧 WATER</span> — 每日消耗，归零则狂掉HP</div>
          <div><span style="color:#32d74b">🛡️ DEF</span> — 防御值，抵挡暴徒袭击</div>
          <div><span style="color:#ff453a">🔴 暴露度</span> — <strong>每天自动上涨</strong>，后期涨速翻倍！≥40就会招来暴徒</div>
          <div><span style="color:#0af">⚡ 发电机</span> — <strong>最重要的物资！</strong>没有发电机=每天冻伤掉HP，奢侈品也无法产出爽度</div>
          <div style="color:#ff9f0a;font-size:11px;margin-top:6px;font-weight:700">⚠ 每收留一位同伴，每日食物和水的消耗都会增加！量力而行。</div>
          <div style="color:#888;font-size:11px;margin-top:3px">后期气温骤降，消耗会加速——别以为物资够就稳了。</div>
        </div>`,
        btn: '明白了',
        auto: 8
      },
      2: {
        title: '🃏 事件卡片',
        body: `<div style="text-align:left;line-height:1.8;font-size:12px;color:#aaa">
          <div style="color:#CCFF00;font-weight:700;margin-bottom:6px">▎左滑接纳 / 右滑拒绝</div>
          <div><span style="color:#32d74b">← 接纳</span> — 消耗资源，但可能获得同伴、物资、防御</div>
          <div><span style="color:#ff9f0a">→ 拒绝</span> — 免费获得<span style="color:#CCFF00">爽度</span>，但会<strong>增加暴露度</strong></div>
          <div style="color:#888;font-size:11px;margin-top:6px">也可以直接点底部按钮选择，不一定要滑动。</div>
          <div style="color:#ff453a;font-size:11px;margin-top:3px">💡 暴露度只增不减？试试收留能降低暴露度的同伴！</div>
        </div>`,
        btn: '收到',
        auto: 6
      },
      3: {
        title: '💜 爽度 & 黑市',
        body: `<div style="text-align:left;line-height:1.8;font-size:12px;color:#aaa">
          <div style="color:#bf5af2;font-weight:700;margin-bottom:6px">▎爽度 = 末日货币</div>
          <div>奢侈品每日产出爽度，右滑拒绝也能获得爽度</div>
          <div>点底部 <span style="color:#F5F5F5">🏪 黑市</span> 用爽度购买紧急补给</div>
          <div style="color:#888;font-size:11px;margin-top:6px">物资吃紧时，黑市是你的救命稻草。</div>
        </div>`,
        btn: '开始生存',
        auto: 5
      }
    };

    const tip = tips[step];
    if (!tip) return;

    this.pauseGame();
    SFX.play('alert');
    document.getElementById('modal').innerHTML = `
      <h2>${tip.title}</h2>
      <div class="modal-desc">${tip.body}</div>
      <div class="modal-options">
        <button class="option-btn" onclick="G.p2TutClose(${step})" style="text-align:center;font-weight:700">${tip.btn} <span id="p2TutCD" style="color:#555">(${tip.auto}s)</span></button>
      </div>`;
    document.getElementById('modalOverlay').classList.add('show');

    // Auto-close countdown
    let sec = tip.auto;
    if (this._p2TutTimer) clearInterval(this._p2TutTimer);
    this._p2TutTimer = setInterval(() => {
      sec--;
      const cd = document.getElementById('p2TutCD');
      if (cd) cd.textContent = `(${sec}s)`;
      if (sec <= 0) {
        clearInterval(this._p2TutTimer); this._p2TutTimer = null;
        if (document.getElementById('modalOverlay').classList.contains('show')) this.p2TutClose(step);
      }
    }, 1000);
  },

  p2TutClose(step) {
    if (this._p2TutTimer) { clearInterval(this._p2TutTimer); this._p2TutTimer = null; }
    document.getElementById('modalOverlay').classList.remove('show');
    // After step 2 (event card tutorial), the pending event needs to show
    if (step === 2 && this.s.pendingEvent) {
      this.pauseGame();
      SFX.play('alert');
      this.render();
    } else {
      this.resumeGame();
    }
  },

  // ===== DAILY PROCESSING =====
  p2ProcessDay() {
    const s = this.s;
    if (s.done) return;

    // 1. Consumption — use CS helpers (includes late-game cold escalation)
    const foodNeed = CS.calcFoodNeed(s);
    const waterNeed = CS.calcWaterNeed(s);

    // Greenhouse: works with power (nerfed: +1/+1)
    if (s.hasGreenhouse && s.hasPower) { s.foodPool += 1; s.waterPool += 1; }

    // Generator fuel cost: every day without nuclear battery
    if (s.hasPower && !s.flags.nuclearBattery) s.foodPool = Math.max(0, s.foodPool - 1);

    // Cold damage: no power = freezing
    if (!s.hasPower) {
      const coldDmg = s.p2day >= 40 ? 8 : 5;
      s.hp -= coldDmg;
      if (s.p2day % 5 === 1) this.log(`🥶 没有发电机！极寒侵蚀 HP-${coldDmg}`);
    }

    s.foodPool = Math.max(0, s.foodPool - foodNeed);
    s.waterPool = Math.max(0, s.waterPool - waterNeed);
    if (s.flags.usedDarkLoan) s.foodPool = Math.max(0, s.foodPool - 2);

    // Starvation (accelerating damage)
    if (s.foodPool <= 0 || s.waterPool <= 0) {
      s.starveDays++;
      const dmg = 15 + 10 * s.starveDays;
      s.hp -= dmg;
      const what = s.foodPool<=0&&s.waterPool<=0?'食物和水':s.foodPool<=0?'食物':'水';
      this.log(`⚠️ ${what}耗尽！HP-${dmg} (连续${s.starveDays}天)`);
      this.notif(`⚠️ ${what}耗尽！HP:${s.hp}`,'danger');
    } else { s.starveDays = 0; }

    if (s.hp <= 0) { s.done=true; this.pauseGame(); this.endGame(); return; }

    // 2. Euphoria production — use CS helpers
    const passives = CS.getActivePassives(s);
    let dailyEuph = s.euphProd + s.bonusEuphPerDay + passives.euphPerDay;
    s.euphCurrency += dailyEuph;

    // 3. Exposure: accelerating natural growth — late game is dangerous
    const naturalGrowth = 1 + Math.min(4, Math.floor(s.p2day / 12));
    s.exposure = Math.min(100, s.exposure + naturalGrowth);

    let decay = 1 + passives.exposureDecay;
    s.exposure = Math.max(0, s.exposure - decay);

    // 3.5 SSR Special: 月狩 daily scavenging (disabled during debuff, 35% chance)
    if (CS.isActive(s, 'hunter') && Math.random() < 0.35) {
      const scavFood = 1 + Math.floor(Math.random()*3);
      const scavWater = 1 + Math.floor(Math.random()*2);
      s.foodPool += scavFood;
      s.waterPool += scavWater;
      if (Math.random() < 0.15) {
        const special = ['防弹衣碎片','医疗箱','信号弹','军用罐头'][Math.floor(Math.random()*4)];
        if (special === '防弹衣碎片') s.defense += 2;
        else if (special === '医疗箱') s.medPool += 1;
        else if (special === '信号弹') s.exposure = Math.max(0, s.exposure - 3);
        else s.foodPool += 2;
        this.p2Chat('🏹','楚狄',`出去转了一圈。带回来${special}。别问怎么搞的。`);
      } else {
        this.log(`🏹 月狩狩猎：食物+${scavFood}${scavWater?' 水+'+scavWater:''}`);
      }
    }

    // 3.6 SSR Special: 冥种 dark nutrient (disabled during debuff)
    if (CS.isActive(s, 'seed')) {
      const seedBond = s.companionBond.seed || 0;
      if (Math.random() < 0.5) s.foodPool += 1;
      if (seedBond >= 2 && Math.random() < 0.15) {
        s.hp = Math.min(100, s.hp + 2);
        this.p2Chat('🌺','黎冥','今天的营养液加了新配方哦。喝完会觉得很舒服的。');
      }
    }

    // 3.8 Bond level systemic effects
    this.p2RunBondLevelEffects();

    // 4. Companion chat (bond-aware)
    if (s.companions.length > 0 && Math.random() < 0.35) {
      const cid = s.companions[Math.floor(Math.random()*s.companions.length)];
      const comp = COMPANIONS.find(x => x.id === cid);
      if (comp) {
        const bond = s.companionBond[cid] || 0;
        const level = this.p2GetCompanionDisplayLevel(cid);
        let line = this.p2GetCoreCompanionContextLine(cid) || this.p2GetBondAwareChatLine(comp, level);
        if (comp.bondLines && comp.bondLines[bond] && Math.random() < 0.25) {
          line = comp.bondLines[bond][Math.floor(Math.random()*comp.bondLines[bond].length)];
        }
        this.p2Chat(comp.icon, comp.name, line);
      }
    }

    // 4.5 Bond natural progression (slow daily growth for SSR companions)
    s.companions.forEach(cid => {
      const comp = COMPANIONS.find(x => x.id === cid);
      if (comp && comp.rarity === 'SSR' && comp.bondLines) {
        const currentBond = s.companionBond[cid] || 0;
        if (currentBond < 3 && Math.random() < 0.08) {
          s.companionBond[cid] = currentBond + 1;
          const newBond = s.companionBond[cid];
          this.notif(`💕 ${comp.code||comp.name} 羁绊 → Lv${newBond}`,'success');
          if (comp.bondLines[newBond]) {
            const line = comp.bondLines[newBond][0];
            setTimeout(() => this.p2Chat(comp.icon, comp.name, line), 300);
          }
        }
      }
    });

    // 5. Raid check — use CS helpers (lowered thresholds, higher frequency)
    if (s.exposure >= 70) {
      if (CS.checkRaidDowngrade(s)) {
        this.log('🦉 夜鸮干扰了敌方通讯，攻势降级！');
        this.p2Chat('🦉','宁鸮','截获了他们的指挥频道，部分兵力被我调走了。');
        this.p2TriggerRaid('medium');
      } else {
        this.p2TriggerRaid('major');
      }
      return;
    } else if (s.exposure >= 40 && Math.random() < 0.45) {
      this.p2TriggerRaid('medium'); return;
    } else if (s.exposure >= 20 && Math.random() < 0.3) {
      this.p2TriggerRaid('minor'); return;
    }

    // 5.5 Process debuffs (after raids so debuffs apply to same-day raids)
    if (s.defDebuffDays > 0) { s.defDebuffDays--; if (s.defDebuffDays === 0) this.log('🔧 防御系统恢复正常。'); }
    Object.keys(s.companionDebuffs).forEach(cid => {
      if (s.companionDebuffs[cid] > 0) {
        s.companionDebuffs[cid]--;
        if (s.companionDebuffs[cid] === 0) {
          const c = COMPANIONS.find(x=>x.id===cid);
          if (c) this.log(`✅ ${c.code||c.name} 恢复正常状态。`);
        }
      }
    });

    // 6. Event check (guarantee: force event if 2+ days without one)
    let evt = this.p2SelectEvent();
    if (!evt && s.noEventDays >= 2) {
      // Force-select with relaxed day range
      evt = this.p2SelectEvent(true);
    }
    if (evt) {
      s.pendingEvent = evt;
      if (evt.once) s.usedEvents.push(evt.id);
      if (evt.cooldown) s.eventCooldowns[evt.id] = s.p2day;
      s.noEventDays = 0;
      // Tutorial step 2: first event card
      if (s.p2TutStep === 1) { this.p2Tutorial(2); return; }
      this.pauseGame();
      SFX.play('alert');
    } else {
      s.noEventDays++;
    }

    // 7. Multi-ending checks (offer as choice, not forced)
    if (META.has('helicopter') && s.p2day >= 45 && s.defense >= 80 && !s.flags.heliOffered) {
      s.flags.heliOffered = true;
      this.pauseGame();
      this.showSpecialEnding('helicopter'); return;
    }
    if (META.has('dungeon') && s.p2day >= 50 && !s.flags.dungeonOffered) {
      const ssrIds = COMPANIONS.filter(c=>c.rarity==='SSR').map(c=>c.id);
      const ssrCount = ssrIds.filter(id => s.companions.includes(id)).length;
      if (ssrCount >= 2) {
        s.flags.dungeonOffered = true;
        this.pauseGame();
        this.showSpecialEnding('dungeon'); return;
      }
    }
    // Standard win: survive 60 days
    if (s.p2day >= 60) { s.done=true; this.pauseGame(); this.endGame(); return; }

    // 8. Cold escalation warnings
    if (s.p2day === 20) { this.log('🌡️ 气温骤降！食物消耗增加。'); this.notif('🌡️ 气温骤降！消耗↑','danger'); }
    if (s.p2day === 35) { this.log('🌡️ 极寒加剧！食物和水消耗大幅增加！'); this.notif('🌡️ 极寒加剧！消耗↑↑','danger'); }
    if (s.p2day === 50) { this.log('🌡️ 终极寒潮！物资消耗达到极限！'); this.notif('🌡️ 终极寒潮！消耗↑↑↑','danger'); }

    // 9. Log & render
    this.log(`📅 第${s.p2day}天 | 🍚${s.foodPool} 💧${s.waterPool} | 暴露${s.exposure}%`);
    this.render();
  },

  // ===== DYNAMIC WEIGHT EVENT ENGINE =====
  p2SelectEvent(forceRelax) {
    const s = this.s;

    // Step 1: Filter
    const candidates = this.P2_EVENTS.filter(e => {
      const pool = e.pool_id || 'base';
      if (pool !== 'base' && !META.has(pool)) return false;
      if (e.excludeIfMeta && META.has(e.excludeIfMeta)) return false;

      if (s.p2day < e.day[0]) return false;
      if (!forceRelax && s.p2day > e.day[1]) return false;

      if (e.once && s.usedEvents.includes(e.id)) return false;
      if (!e.once && e.cooldown && (s.p2day - (s.eventCooldowns[e.id]||0)) < e.cooldown) return false;

      if (e.companionId && s.companions.includes(e.companionId)) return false;
      if (e.requiresCompanion && !s.companions.includes(e.requiresCompanion)) return false;
      if (e.left && e.left.requireCompanion && s.companions.length === 0) return false;
      if (e.left && e.left.requireMinSSR) {
        const ssrIds = COMPANIONS.filter(c=>c.rarity==='SSR').map(c=>c.id);
        const ssrCount = ssrIds.filter(id => s.companions.includes(id)).length;
        if (ssrCount < e.left.requireMinSSR) return false;
      }

      const cond = e.conditions || {};
      if (cond.required_flags && cond.required_flags.some(f => !s.p2Flags.includes(f))) return false;
      if (cond.exclude_flags && cond.exclude_flags.some(f => s.p2Flags.includes(f))) return false;
      if (cond.min_exposure !== undefined && s.exposure < cond.min_exposure) return false;
      if (cond.min_food !== undefined && s.foodPool < cond.min_food) return false;
      if (cond.required_bond) {
        const needBond = Object.entries(cond.required_bond);
        if (needBond.some(([cid, lv]) => (s.companionBond[cid] || 0) < lv)) return false;
      }

      return true;
    });

    if (candidates.length === 0) return null;

    // Step 2: Dynamic weight calculation
    const weighted = candidates.map(e => {
      let w = e.base_weight || 100;
      const cond = e.conditions || {};

      if (s.foodPool <= 8) {
        if (e.type === 'resource' || e.type === 'trap') w *= 1.5;
      }
      if (s.waterPool <= 8) {
        if (e.type === 'resource' || e.type === 'trap') w *= 1.5;
      }
      if (s.exposure >= 50) {
        if (e.type === 'threat') w *= 1.8;
      }
      if (s.companions.length >= 2) {
        if (e.type === 'companion_exclusive' || e.type === 'bond_event') w *= 1.5;
      }
      // Make companion arcs more noticeable once companions join.
      if (s.companions.length >= 1) {
        if (e.type === 'bond_event') w *= 2.8;
        if (e.type === 'companion_exclusive') w *= 2.3;
        if (e.requiresCompanion && (s.companionBond[e.requiresCompanion] || 0) < 3) w *= 1.35;
      }
      // Personal quest style events should surface quickly after unlock.
      if (cond.required_bond) {
        const needBond = Object.entries(cond.required_bond);
        const exactlyReady = needBond.some(([cid, lv]) => (s.companionBond[cid] || 0) === lv);
        if (exactlyReady) w *= 2.4;
      }
      if (e.type === 'bond') w *= 1.3;
      if (e.type === 'companion_exclusive') w *= 1.3;
      if (e.type === 'drama') w *= 1.08;
      if (e.type === 'horror' && s.p2day >= 20) w *= 1.2;
      if (s.p2day >= 40 && (e.type === 'threat' || e.type === 'trap')) w *= 1.4;

      return { event: e, weight: Math.max(1, w) };
    });

    // Step 3: Weighted random selection (roulette wheel)
    const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);
    let roll = Math.random() * totalWeight;
    for (const w of weighted) {
      roll -= w.weight;
      if (roll <= 0) return w.event;
    }
    return weighted[weighted.length - 1].event;
  },

  p2GetCompanionFilter(evt) {
    const s = this.s;
    const hints = [];
    let buff = null;

    const pushHint = (cid, text, tone) => {
      if (!CS.isActive(s, cid)) return;
      const comp = COMPANIONS.find(c => c.id === cid);
      if (!comp) return;
      hints.push({ icon: comp.icon, name: comp.name, text, tone: tone || 'neutral' });
    };

    if (evt.id === 'neighbor') {
      pushHint('hunter', '要么给足，要么关门。犹豫只会把你拖死。', 'harsh');
    }

    if (evt.id === 'ex_colleague') {
      pushHint('seed', '她在高烧。先救人，再谈风险。', 'support');
    }

    // 高羁绊黑客干预：诈骗短信事件解锁第三选项
    if (evt.id === 'sms_scam' && CS.isActive(s, 'owl') && (s.companionBond.owl || 0) >= 3) {
      buff = {
        key: 'owl_hackback',
        label: '【反向黑入】白嫖一笔物资',
        actor: { icon: '💎', name: '宁鸮' },
        text: '宁鸮截获了钓鱼后台，反手抽走了对方的物资钱包。你甚至没出门。',
        exposureReduce: 4,
        reward: { food: 6, water: 4, med: 1, euph: 18 }
      };
      hints.push({ icon: '💎', name: '宁鸮', text: '这条我来处理。给我 20 秒。', tone: 'buff' });
    }

    return { hints, buff };
  },

  p2GetCompanionDisplayLevel(cid) {
    const raw = this.s.companionBond[cid] || 0;
    return Math.max(1, raw);
  },

  p2CompanionLeave(cid, reason) {
    const s = this.s;
    if (!s.companions.includes(cid)) return;
    const comp = COMPANIONS.find(x => x.id === cid);
    s.companions = s.companions.filter(x => x !== cid);
    delete s.companionDebuffs[cid];
    delete s.companionBond[cid];

    if (comp && comp.passive) {
      if (comp.passive.defense) s.defense = Math.max(0, s.defense - comp.passive.defense);
      if (comp.passive.defBonus) s.defense = Math.max(0, s.defense - comp.passive.defBonus);
    }

    const who = comp ? `${comp.icon}${comp.name}` : '一名同伴';
    this.log(`💔 ${who} 离队：${reason}`);
    this.notif(`${who} 因恐惧离队`,'danger');
    this.p2Chat('📡','系统', `${who} 离开了避难所。${reason}`, 'sys');
  },

  p2GetBondAwareChatLine(comp, level) {
    const commandLines = {
      hunter: ['收到。守门。', '命令确认。外圈清扫。', '已执行。保持静默。'],
      owl: ['收到。开始监听。', '命令确认。路由已切换。', '指令执行中。'],
      seed: ['明白。我去处理。', '收到。按你的方案来。', '已记录，立刻执行。'],
      chef: ['收到，按计划配给。', '执行中。厨房先稳住。', '明白，优先保温和供餐。'],
      dog: ['（阿黄立刻起身，守在门边）', '（阿黄低吼一声，执行巡逻）', '（阿黄蹭了蹭你，随后去警戒）']
    };
    const trustLines = {
      hunter: ['我以前在黑市接过同类单子。这个路口通常有暗哨。你怎么看？', '我查到一条旧补给线，想听你判断要不要冒险。'],
      owl: ['我家旧服务器里挖到一段封存日志。关于这座城的。你要先看吗？', '我在卫星回放里发现一个异常热源，像是隐藏仓。要不要我带你赌一把？'],
      seed: ['我过去做过一项被叫停的实验……现在也许能救我们。你愿意听完吗？', '我在病历库里找到了一个线索，但风险不低。你拍板，我就做。'],
      chef: ['我以前给高层做过应急菜单，里面藏着一条物资仓库的旧路径。你想试试吗？', '我知道一间封着的冷库入口，得你决定是否开启。'],
      dog: ['（阿黄叼来一块写着旧仓库编号的金属牌）', '（阿黄在地上刨出一段旧电缆，像是在提示你什么）']
    };
    const loyaltyLines = {
      hunter: ['你下令，我就执行。错了也一起扛。', '路线有风险？无所谓，我在前面开路。'],
      owl: ['我不同意你的判断，但我站你这边。链路我来兜底。', '你决策，我兜风险。今天照你的来。'],
      seed: ['这方案很冒险……但你选了，我就陪你到底。', '就算会输，我也不会让你一个人扛。'],
      chef: ['再难我也会把后勤撑住。你只管往前走。', '你做决定，我守住厨房和补给，不掉链子。'],
      dog: ['（阿黄贴着你站定，死活不挪步）', '（阿黄冲你叫了一声，随后挡在你前面）']
    };
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];

    if (level <= 1 && commandLines[comp.id]) return pick(commandLines[comp.id]);
    if (level === 2 && trustLines[comp.id] && Math.random() < 0.65) return pick(trustLines[comp.id]);
    if (level >= 3 && loyaltyLines[comp.id] && Math.random() < 0.7) return pick(loyaltyLines[comp.id]);
    if (comp.chatLines && comp.chatLines.length > 0) return pick(comp.chatLines);
    return '……';
  },

  p2RunBondLevelEffects() {
    const s = this.s;
    if (!s.companions.length) return;

    const pressureHigh = s.exposure >= 58 || s.hp <= 35 || s.foodPool <= 6 || s.waterPool <= 6;
    if (pressureHigh) {
      const lv1List = s.companions.filter(cid => this.p2GetCompanionDisplayLevel(cid) === 1);
      lv1List.forEach(cid => {
        if (!s.companions.includes(cid)) return;
        const leaveChance = 0.05 + (s.exposure >= 75 ? 0.05 : 0);
        if (Math.random() < leaveChance) {
          this.p2CompanionLeave(cid, '高压环境触发恐惧反应，选择撤离');
        }
      });
    }

    const lv2plus = s.companions.filter(cid => this.p2GetCompanionDisplayLevel(cid) >= 2 && !s.companionDebuffs[cid]);
    if (lv2plus.length > 0 && Math.random() < 0.22) {
      const scoutId = lv2plus[Math.floor(Math.random() * lv2plus.length)];
      const comp = COMPANIONS.find(c => c.id === scoutId);
      const found = {
        food: 1 + Math.floor(Math.random() * 4),
        water: 1 + Math.floor(Math.random() * 3),
        med: Math.random() < 0.4 ? 1 : 0
      };
      s.foodPool += found.food;
      s.waterPool += found.water;
      if (found.med) s.medPool += found.med;
      this.log(`🔎 ${comp ? comp.name : '同伴'} 发现隐藏补给：食物+${found.food} 水+${found.water}${found.med ? ` 医疗+${found.med}` : ''}`);
      if (comp) this.p2Chat(comp.icon, comp.name, '在废墟缝隙里翻到暗格了。补给拿回来了。');
      this.notif('🔎 同伴发现隐藏物资','success');
    }

    this.p2TryCollectPrivateNote();
  },

  p2GetResourcePressure() {
    const s = this.s;
    const low = s.foodPool <= 8 || s.waterPool <= 8;
    const rich = s.foodPool >= 28 && s.waterPool >= 24;
    return { low, rich };
  },

  p2GetCoreCompanionContextLine(cid) {
    const p = this.p2GetResourcePressure();
    if (cid === 'hunter') {
      if (p.rich) return '防弹插板换好了。今晚你可以睡个好觉，我会睁着一只眼守门。';
      if (p.low) return '腰带又往里勒了一格。别看我，我吃过树皮，死不了，倒是你别先倒下。';
    }
    if (cid === 'owl') {
      if (p.rich) return '带宽和电力都拉满了。我刚黑进附近监控，要看他们抢方便面的直播吗？';
      if (p.low) return '脑细胞因为低血糖罢工了。如果我饿死，防火墙会立刻崩。';
    }
    if (cid === 'seed') {
      if (p.rich) return '维C片记得吃。我可不想在物资爆仓的时候，还要处理你的一具坏血病尸体。';
      if (p.low) return '心率过慢，代谢下降。你要是晕倒，别压到我的手。';
    }
    if (cid === 'chef') {
      if (p.rich) return '和牛A5、松露都在。即便明天末日，今晚胃不能受委屈。';
      if (p.low) return '罐头汤里兑了三倍的水，这简直是对厨师人格的侮辱。如果你想把我煮了，记得多放点盐。';
    }
    return '';
  },

  p2TriggerSwipeCompanionReaction(dir) {
    const s = this.s;
    if (dir === 'left') {
      if (CS.isActive(s, 'hunter')) {
        this.p2Chat('🗡️', '楚狄', '善良在末世是慢性毒药。我不认同你这样做。');
      }
      if (CS.isActive(s, 'seed')) {
        this.p2Chat('💉', '黎冥', '救他？治好他要用掉的抗生素，够我们换两箱牛肉。');
      }
    }
    if (dir === 'right' && CS.isActive(s, 'owl')) {
      this.p2Chat('💎', '宁鸮', '我顺便把他们的求救信号也屏蔽了。');
    }
  },

  p2TryCollectPrivateNote() {
    const s = this.s;
    if (Math.random() > 0.11) return;
    const unlocked = new Set(s.privateNotes || []);
    const candidates = this.P2_PRIVATE_NOTES.filter(note => {
      if (unlocked.has(note.id)) return false;
      if (!s.companions.includes(note.companion)) return false;
      const lv = this.p2GetCompanionDisplayLevel(note.companion);
      return lv >= note.level;
    });
    if (!candidates.length) return;

    const note = candidates[Math.floor(Math.random() * candidates.length)];
    s.privateNotes.push(note.id);
    s.noteUnread = (s.noteUnread || 0) + 1;
    const comp = COMPANIONS.find(c => c.id === note.companion);
    const skin = this.p2GetNoteSkin(note);
    this.notif('🗂️ 发现私密碎片（去通讯-碎片档案查看）','success');
    this.log(`🗂️ 收集：${note.title}`);
    this.p2Chat('🗂️', '碎片回收', `【${note.title}】${note.text}`, `note:${skin}`);
    if (comp) this.p2Chat(comp.icon, comp.name, '……这不是给别人看的。算了，你已经看到了。');
    this.p2RenderAppBar();
    if (this.s.p2app === 'chat') this.p2RenderModule();
  },

  p2GetNoteSkin(note) {
    if (!note || !note.companion) return 'paper';
    if (note.companion === 'owl') return 'screen';
    if (note.companion === 'seed') return 'rx';
    return 'paper';
  },

  p2ResolveNoteMeta(noteId) {
    return this.P2_PRIVATE_NOTES.find(n => n.id === noteId);
  },

  p2GetNoteTitlePrefix(note) {
    if (!note || !note.companion) return '碎片';
    if (note.companion === 'hunter') return '战损记录';
    if (note.companion === 'owl') return '加密残片';
    if (note.companion === 'seed') return '处方残页';
    if (note.companion === 'chef') return '后厨手记';
    return '碎片';
  },

  p2SetChatFilter(mode) {
    this.s.p2ChatFilter = mode === 'notes' ? 'notes' : 'all';
    if (this.s.p2ChatFilter === 'notes') this.s.noteUnread = 0;
    this.p2RenderAppBar();
    if (this.s.p2app === 'chat') this.p2RenderModule();
  },

  // ===== SWIPE RESOLUTION =====
  p2Swipe(dir) {
    const s = this.s;
    const evt = s.pendingEvent;
    if (!evt) return;
    let resultModalText = '';
    let resultChoiceLabel = '';

    const filter = this.p2GetCompanionFilter(evt);
    const buff = filter.buff;

    if (dir === 'left') { resultChoiceLabel = evt.left.label; this.p2Chat('🫣','你', '← ' + evt.left.label); }
    else if (dir === 'right') { resultChoiceLabel = evt.right.label; this.p2Chat('🫣','你', evt.right.label + ' →'); }
    else if (dir === 'buff' && buff) { resultChoiceLabel = buff.label; this.p2Chat('🫣','你', '★ ' + buff.label); }

    if (dir === 'left') {
      const l = evt.left;
      const costs = l.cost || {};
      // Check resources
      if ((costs.food||0)>s.foodPool || (costs.water||0)>s.waterPool || (costs.med||0)>s.medPool) {
        SFX.play('error'); this.notif('❌ 资源不足！','danger'); return;
      }
      SFX.play('buy');
      s.foodPool -= (costs.food||0);
      s.waterPool -= (costs.water||0);
      s.medPool -= (costs.med||0);

      // Trap check — use CS helpers for exposure multiplier
      if (l.trapChance && Math.random() < l.trapChance) {
        const exposureMul = CS.getExposureMultiplier(s);
        s.exposure = Math.min(100, s.exposure + Math.round((l.trapExposure||0)*exposureMul));
        if (l.trapDefCheck) {
          const atk = 20 + Math.floor(Math.random()*15);
          if (s.defense >= atk) {
            this.log(`⚠️ ${l.trapText} 但防御成功拦截！`);
            this.notif('🛡️ 防御成功！','success');
          } else {
            const loss = 5 + Math.floor(Math.random()*10);
            s.foodPool = Math.max(0, s.foodPool-loss);
            s.waterPool = Math.max(0, s.waterPool-loss);
            this.log(`💀 ${l.trapText} 损失物资！`);
            this.notif('💀 被抢劫了！','danger');
          }
        } else {
          this.log(`⚠️ ${l.trapText}`);
          this.notif('⚠️ 上当了！暴露度+' + (l.trapExposure||0),'danger');
        }
        this.p2Chat('⚠️','系统', l.trapText, 'sys');
        resultModalText = l.trapText || '你触发了陷阱。';
      } else {
        // Safe / success
        const lText = typeof l.text === 'function' ? l.text() : l.text;
        this.log(`✓ ${l.safeText || lText}`);
        resultModalText = (l.safeText || lText || '').trim();

        // Random outcomes
        if (l.randomOutcomes) {
          let roll = Math.random(), cumul = 0;
          for (const o of l.randomOutcomes) {
            cumul += o.chance;
            if (roll <= cumul) {
              this.log(`🎲 ${o.text}`);
              this.notif(o.text,'success');
              if (o.reward) this.p2ApplyReward(o.reward);
              this.p2Chat('📦','系统', o.text);
              resultModalText = (resultModalText ? (resultModalText + '\n\n' + o.text) : o.text);
              break;
            }
          }
        }

        // Companion recruitment
        if (evt.companionId && !s.companions.includes(evt.companionId)) {
          s.companions.push(evt.companionId);
          s.companionBond[evt.companionId] = 0;
          const comp = COMPANIONS.find(c => c.id === evt.companionId);
          if (comp) {
            const codeStr = comp.code ? `「${comp.code}」` : '';
            this.notif(`🎉 ${codeStr}${comp.name}(${comp.title}) 加入！`,'success');
            this.log(`👤 ${comp.icon} ${codeStr}${comp.name}【${comp.rarity}】加入避难所`);
            if (comp.passive.defense) s.defense += comp.passive.defense;
            if (comp.passive.defBonus) s.defense += comp.passive.defBonus;
            if (comp.passive.greenhouse) { s.hasGreenhouse = true; this.log('💉 医疗级营养管理系统已启动！'); }
            if (comp.chatIntro) setTimeout(() => this.p2Chat(comp.icon, comp.name, comp.chatIntro), 500);
          }
        }
        // Bond deepening events
        if (evt.type === 'bond_event' && evt.requiresCompanion) {
          const cid = evt.requiresCompanion;
          s.companionBond[cid] = Math.min(3, (s.companionBond[cid]||0) + 1);
          const comp = COMPANIONS.find(c => c.id === cid);
          if (comp) {
            const bl = s.companionBond[cid];
            this.notif(`💕 ${comp.code||comp.name} 羁绊等级 → Lv${bl}`,'success');
            this.log(`💕 ${comp.icon} ${comp.code||comp.name} 羁绊深化 → Lv${bl}`);
            if (comp.bondLines && comp.bondLines[bl]) {
              const line = comp.bondLines[bl][Math.floor(Math.random()*comp.bondLines[bl].length)];
              setTimeout(() => this.p2Chat(comp.icon, comp.name, line), 800);
            }
          }
        }

        // Event bonuses
        if (l.defBonus) s.defense += l.defBonus;
        if (l.euphPerDay) s.bonusEuphPerDay += l.euphPerDay;
        if (l.exposureReduce) s.exposure = Math.max(0, s.exposure - l.exposureReduce);
        if (l.safeReward) this.p2ApplyReward(l.safeReward);
        if (l.safeEuph) s.euphCurrency += l.safeEuph;
        if (l.reward) this.p2ApplyReward(l.reward);
        // Special effects
        if (l.special) this.p2HandleSpecial(l.special);
        if (l.add_flags) l.add_flags.forEach(f => { if (!s.p2Flags.includes(f)) s.p2Flags.push(f); });
        if (l.cost_after) {
          s.medPool = Math.max(0, s.medPool - (l.cost_after.med||0));
          s.foodPool = Math.max(0, s.foodPool - (l.cost_after.food||0));
          s.waterPool = Math.max(0, s.waterPool - (l.cost_after.water||0));
        }
      }
    } else if (dir === 'buff') {
      if (!buff) {
        SFX.play('error');
        this.notif('❌ 当前事件无可用干预选项','danger');
        return;
      }
      SFX.play('upgrade');
      if (buff.exposureReduce) s.exposure = Math.max(0, s.exposure - buff.exposureReduce);
      if (buff.reward) this.p2ApplyReward(buff.reward);
      if (buff.add_flags) buff.add_flags.forEach(f => { if (!s.p2Flags.includes(f)) s.p2Flags.push(f); });
      this.log(`★ ${buff.text}`);
      this.p2Chat(buff.actor.icon, buff.actor.name, buff.text);
      this.notif(`${buff.actor.name} 干预成功`,'success');
      resultModalText = (buff.text || '').trim();
    } else {
      // Right swipe — use CS helpers
      SFX.play('cash');
      const r = evt.right;
      const rightSwipeBonus = CS.getRightSwipeBonus(s);
      if (r.euph) s.euphCurrency += Math.round(r.euph * rightSwipeBonus);
      const exposureMul = CS.getExposureMultiplier(s);
      const tacWarn = s.tacticalWarning ? 0.5 : 1;
      s.exposure = Math.min(100, s.exposure + Math.round((r.exposure||0)*exposureMul*tacWarn));
      if (r.penalty) {
        if (r.penalty.med) s.medPool = Math.max(0, s.medPool - r.penalty.med);
        if (r.penalty.food) s.foodPool = Math.max(0, s.foodPool - r.penalty.food);
        if (r.penalty.water) s.waterPool = Math.max(0, s.waterPool - r.penalty.water);
        if (r.penalty.hp) s.hp = Math.max(1, s.hp - r.penalty.hp);
      }
      // Special effects for right swipe
      if (r.special) this.p2HandleSpecial(r.special);
      if (r.add_flags) r.add_flags.forEach(f => { if (!s.p2Flags.includes(f)) s.p2Flags.push(f); });

      const hasLoyalFollower = s.companions.some(cid => this.p2GetCompanionDisplayLevel(cid) >= 3 && !s.companionDebuffs[cid]);
      if (hasLoyalFollower && ((r.exposure || 0) >= 5 || (r.euph || 0) < 0 || r.penalty)) {
        const loyalId = s.companions.find(cid => this.p2GetCompanionDisplayLevel(cid) >= 3 && !s.companionDebuffs[cid]);
        const loyalComp = COMPANIONS.find(c => c.id === loyalId);
        s.exposure = Math.max(0, s.exposure - 3);
        this.log(`🤝 生死之交兜底：${loyalComp ? loyalComp.name : '同伴'} 为你的决策擦尾，暴露度-3`);
        if (loyalComp) this.p2Chat(loyalComp.icon, loyalComp.name, '这步很险，但我跟你。后果我来一起扛。');
      }

      this.log(`→ ${r.text}`);
      this.p2Chat('📡','系统', r.text);
      resultModalText = (r.text || '').trim();

      // 事件滤镜：老兵在关键拒绝事件上给出即时反馈并追加爽度
      if (evt.id === 'neighbor' && CS.isActive(s, 'hunter')) {
        const line = '干得漂亮，仁慈是末世的自杀慢性药。';
        const bonus = 12;
        s.euphCurrency += bonus;
        this.p2Chat('🗡️', '楚狄', line);
        this.log(`🗡️ 月狩点评：${line}（爽度+${bonus}）`);
        this.notif(`🗡️ 月狩点评触发：爽度+${bonus}`,'success');
        resultModalText = `${resultModalText}\n\n🗡️ 楚狄：${line}（爽度+${bonus}）`.trim();
      }
    }

    this.p2TriggerSwipeCompanionReaction(dir);

    s.pendingEvent = null;
    // Tutorial step 3: after first swipe
    if (s.p2TutStep === 2) { this.render(); setTimeout(() => this.p2Tutorial(3), 600); return; }
    this.render();
    if (resultModalText) this.p2ShowResultToast(evt.title || '事件结果', resultChoiceLabel, resultModalText);
    this.resumeGame();
  },

  p2ShowResultToast(title, choiceLabel, text) {
    let el = document.getElementById('p2ResultToast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'p2ResultToast';
      el.className = 'p2-result-toast';
      document.body.appendChild(el);
    }
    const safeTitle = title || '事件结果';
    const choice = choiceLabel ? `<div class="rt-choice">你的选择：<span class="rt-choice-val">${choiceLabel}</span></div>` : '';
    const body = (text || '').replace(/\n/g, '<br>');
    el.innerHTML = `<div class="rt-title">${safeTitle}</div>${choice}<div class="rt-body">${body}</div>`;
    el.classList.remove('show');
    // force reflow to restart animation
    void el.offsetWidth;
    el.classList.add('show');
    if (!this._p2ToastScreenDismissHandler) {
      this._p2ToastScreenDismissHandler = () => {
        const cur = document.getElementById('p2ResultToast');
        if (!cur || !cur.classList.contains('show')) return;
        clearTimeout(this._p2ResultToastTimer);
        cur.classList.remove('show');
      };
      document.addEventListener('pointerdown', this._p2ToastScreenDismissHandler, true);
    }
    clearTimeout(this._p2ResultToastTimer);
    this._p2ResultToastTimer = setTimeout(() => {
      const cur = document.getElementById('p2ResultToast');
      if (cur) cur.classList.remove('show');
    }, 2000);
  },

  p2ApplyReward(rw) {
    const s = this.s;
    if (rw.food) s.foodPool += rw.food;
    if (rw.water) s.waterPool += rw.water;
    if (rw.med) s.medPool += rw.med;
    if (rw.defense) s.defense += rw.defense;
    if (rw.euph) s.euphCurrency += rw.euph;
  },

  p2HandleSpecial(type) {
    const s = this.s;
    switch(type) {
      case 'tacticalWarning':
        s.tacticalWarning = true;
        this.log('🛰️ 战术预警系统永久上线！右滑暴露度惩罚减半。');
        this.notif('🛰️ 战术预警解锁！','success');
        break;
      case 'defDebuff':
        s.defDebuffDays = 3;
        this.log('⚠️ 防爆门响应延迟！防御力临时下降3天。');
        this.notif('⚠️ 防御力临时-30%','danger');
        break;
      case 'companionDebuffAll':
        s.companions.forEach(cid => { s.companionDebuffs[cid] = 3; });
        this.log('😰 全体同伴进入神经衰弱状态！被动技能失效3天。');
        this.notif('😰 同伴技能失效3天！','danger');
        break;
      case 'hunterBondDown':
        if (s.companionBond.hunter !== undefined) {
          s.companionBond.hunter = Math.max(0, s.companionBond.hunter - 1);
          this.p2Chat('🏹','楚狄','……你把我关在笼子里。','');
        }
        break;
      case 'hunterBondMax':
        s.companionBond.hunter = 3;
        this.notif('💕 月狩 羁绊 → Lv3 共生','success');
        this.log('💕 🏹 月狩羁绊直接升至 Lv3！');
        this.p2Chat('🏹','楚狄','（她第一次主动握住了你的手）……谢谢你让我出去。');
        break;
      case 'owlBondUp':
        s.companionBond.owl = Math.min(3, (s.companionBond.owl||0) + 1);
        var owlBond = s.companionBond.owl;
        this.notif(`💕 夜鸮 羁绊 → Lv${owlBond}`,'success');
        break;
      case 'owlLeaves':
        s.companions = s.companions.filter(c => c !== 'owl');
        delete s.companionBond.owl;
        s.defense += 20;
        this.log('💔 宁鸮离开了避难所。但她留下了永久防御协议。防御+20。');
        this.notif('💔 夜鸮离开了……','danger');
        this.p2Chat('📡','系统','宁鸮已离开避难所。自动防御协议已激活。','sys');
        break;
      case 'seedBondMax':
        s.companionBond.seed = 3;
        this.notif('💕 冥种 羁绊 → Lv3 共生','success');
        this.log('💕 🌺 冥种羁绊直接升至 Lv3！');
        this.p2Chat('🌺','黎冥','（她在你怀里笑了）下次……别这么莽了。');
        break;
      case 'tripleSync':
        s.defense = Math.floor(s.defense * 1.15);
        s.bonusEuphPerDay += 20;
        this.log('💫 三人组合技【共生协议】解锁！全属性+15%，爽度+20/天');
        this.notif('💫 共生协议解锁！','success');
        this.p2Chat('🦉','宁鸮','从今以后，这里的一切——');
        setTimeout(() => this.p2Chat('🏹','楚狄','——我们一起守护。'), 400);
        setTimeout(() => this.p2Chat('🌺','黎冥','花茶凉了哦。快喝。'), 800);
        break;
      case 'courierAmbush':
        // "Weapon durability" equivalent in current systems:
        // apply direct HP damage + temporary defense debuff.
        s.hp = Math.max(1, s.hp - 26);
        s.defDebuffDays = Math.max(s.defDebuffDays || 0, 3);
        s.foodPool = Math.max(0, s.foodPool - 3);
        s.waterPool = Math.max(0, s.waterPool - 2);
        this.log('💥 快递骗局伏击！入侵战导致你重伤，防御系统受损。');
        this.notif('💥 伏击命中：HP-26，防御受损3天','danger');
        break;
      case 'exBfBreach': {
        // Two darkly comic outcomes, both bad for player.
        if (Math.random() < 0.5) {
          s.defense = Math.max(0, s.defense - 30);
          s.defDebuffDays = Math.max(s.defDebuffDays || 0, 3);
          this.log('💣 软饭男引暴徒强拆外层气闸，防御设施重创。');
          this.notif('💣 防御设施受损：DEF-30（临时）','danger');
          this.p2Chat('📡','系统','入侵已清除，但外层气闸电机损坏。建议立即修复防线。','sys');
        } else {
          s.foodPool = Math.max(0, s.foodPool - 15);
          s.euphCurrency = Math.max(0, s.euphCurrency - 50);
          this.log('☣️ 软饭男突袭被清除，但走廊污染严重，补给与情绪双降。');
          this.notif('☣️ 环境污染：食物-15，爽度-50','danger');
          this.p2Chat('📡','系统','恒温走廊与水培区受污染，已启动净化流程。','sys');
        }
        break;
      }
    }
  },

  // ===== RAID SYSTEM =====
  p2TriggerRaid(level) {
    this.pauseGame();
    SFX.play('alert');
    const s = this.s;
    const str = {minor:[20,40],medium:[45,70],major:[75,120]};
    const names = {minor:'小股暴徒',medium:'武装团伙',major:'重火力攻城'};
    const [lo,hi] = str[level];
    const atk = lo + Math.floor(Math.random()*(hi-lo));
    const def = s.defDebuffDays > 0 ? Math.floor(s.defense * 0.7) : s.defense;
    const win = def >= atk;
    const catastrophe = !win && def < atk * 0.5;

    let resultHtml, cls;
    if (win) {
      const loot = 2 + Math.floor(Math.random()*4);
      s.foodPool += loot;
      s.exposure = Math.max(0, s.exposure - 10);
      resultHtml = `防御成功！缴获食物+${loot}<br>暴露度-10`; cls='win';
      this.log(`🛡️ 击退${names[level]}！防御${def} vs 攻击${atk}`);
    } else if (catastrophe) {
      s.hp -= 40;
      s.foodPool = Math.max(0, Math.floor(s.foodPool*0.4));
      s.waterPool = Math.max(0, Math.floor(s.waterPool*0.4));
      s.medPool = Math.max(0, s.medPool - 3);
      resultHtml = `防线崩溃！损失60%物资，HP-40<br>HP: ${s.hp}`; cls='lose';
      this.log(`💀 ${names[level]}攻破防线！HP:${s.hp}`);
      if (s.hp <= 0) s.done = true;
    } else {
      const fl = 8+Math.floor(Math.random()*12), wl = 5+Math.floor(Math.random()*10);
      s.foodPool = Math.max(0, s.foodPool-fl);
      s.waterPool = Math.max(0, s.waterPool-wl);
      s.medPool = Math.max(0, s.medPool - 1);
      s.exposure = Math.max(0, s.exposure-5);
      resultHtml = `勉强抵挡！食物-${fl} 水-${wl} 医疗-1`; cls='lose';
      this.log(`⚔️ ${names[level]}来袭！损失物资`);
    }

    document.getElementById('raidBox').innerHTML = `
      <h2>⚠️ ${names[level]}来袭！</h2>
      <div class="raid-desc">攻击力: ${atk} | 你的防御: ${def}</div>
      <div class="raid-result ${cls}">${resultHtml}</div>
      <button class="raid-btn" onclick="G.p2CloseRaid()">继续</button>`;
    document.getElementById('raidOverlay').classList.add('show');
  },

  p2CloseRaid() {
    document.getElementById('raidOverlay').classList.remove('show');
    if (this.s.done) { this.endGame(); return; }
    this.resumeGame();
    this.render();
  },

  // ===== CHAT =====
  p2Chat(icon, name, text, type) {
    this.s.chatLog.push({ icon, name, text, type:type||'normal', day:this.s.p2day });
    if (this.s.chatLog.length > 50) this.s.chatLog.shift();
    if (this.s.p2app === 'chat') this.p2RenderModule();
  },

  // ===== BLACK MARKET =====
  p2BuyMarket(type) {
    const s = this.s;
    const items = {
      supply: { cost:40, fn:()=>{
        const r=Math.random();
        if(r<0.4){s.foodPool+=5;s.waterPool+=4;this.notif('📦 食物+5 水+4','success');}
        else if(r<0.7){s.medPool+=2;this.notif('📦 医疗+2','success');}
        else{s.foodPool+=3;s.waterPool+=3;s.medPool+=1;this.notif('📦 混合补给','success');}
      }},
      defense: { cost:70, fn:()=>{s.defense+=8;this.notif('🛡️ 防御+8','success');} },
      medkit: { cost:25, fn:()=>{s.medPool+=3;s.hp=Math.min(100,s.hp+8);this.notif('💊 医疗+3 HP+8','success');} }
    };
    const it = items[type];
    if (!it || s.euphCurrency < it.cost) { SFX.play('error'); this.notif('爽度不足！','danger'); return; }
    s.euphCurrency -= it.cost;
    it.fn();
    SFX.play('buy');
    this.render();
  },

  // ===== PHASE 2 RENDERING =====
  p2Render() {
    if (typeof this.updateDynamicBackgrounds === 'function') this.updateDynamicBackgrounds();
    this.p2RenderStatus();
    this.p2RenderExposure();
    this.p2RenderAppBar();
    this.p2RenderModule();
    this.p2RenderStatusArea();
    this.updateCountdown();
  },

  p2RenderStatusArea() {
    const s = this.s;
    // HP bar
    const hpPct = Math.max(0, Math.min(100, s.hp));
    const hpFill = document.getElementById('p2HpFill');
    const hpVal = document.getElementById('p2HpVal');
    hpFill.style.width = hpPct + '%';
    hpFill.className = 'p2-hp-fill ' + (hpPct > 50 ? 'healthy' : hpPct > 25 ? 'warn' : 'critical');
    hpVal.textContent = hpPct + '%';
    hpVal.style.color = hpPct > 50 ? '#32d74b' : hpPct > 25 ? '#ff9f0a' : '#FF3B30';
    // Day bar
    const dayPct = Math.min(100, (s.p2day / 60) * 100);
    document.getElementById('p2DayFill').style.width = dayPct + '%';
    document.getElementById('p2DayVal').textContent = s.p2day + ' / 60';
    // Companion icons
    const allComps = COMPANIONS;
    const icons = allComps.map(c => {
      const active = s.companions.includes(c.id);
      return `<span class="${active?'active':''}" title="${active?c.name:'???'}">${active?c.icon:'？'}</span>`;
    }).join('');
    document.getElementById('p2CompIcons').innerHTML = icons;
  },

  p2RenderStatus() {
    const s = this.s;
    const fd = s.foodPool<=10, wd = s.waterPool<=10;
    const passives = CS.getActivePassives(s);
    const prod = s.euphProd + s.bonusEuphPerDay + passives.euphPerDay;
    const fNeed = CS.calcFoodNeed(s), wNeed = CS.calcWaterNeed(s);
    document.getElementById('statusBar').innerHTML = `
      <div class="status-item"><div class="label">FOOD</div><div class="value" style="color:${fd?'#FF3B30':'#F5F5F5'}">${s.foodPool}<span style="font-size:7px;color:#555"> -${fNeed}/d</span></div></div>
      <div class="status-item"><div class="label">WATER</div><div class="value" style="color:${wd?'#FF3B30':'#F5F5F5'}">${s.waterPool}<span style="font-size:7px;color:#555"> -${wNeed}/d</span></div></div>
      <div class="status-item"><div class="label">DEF</div><div class="value" style="color:${s.defDebuffDays>0?'#ff9f0a':'#32d74b'}">${s.defDebuffDays>0?Math.floor(s.defense*0.7)+'⚠':s.defense}</div></div>
      <div class="status-item"><div class="label">EUPH</div><div class="value" style="color:#CCFF00">${s.euphCurrency}<span style="font-size:7px;color:#333"> +${prod}/d</span></div></div>`;
  },

  p2RenderExposure() {
    const pct = Math.min(100, this.s.exposure);
    document.getElementById('exposureFill').style.width = pct+'%';
    document.getElementById('exposureFill').classList.toggle('danger', pct>=60);
    document.getElementById('exposureVal').textContent = pct+'%';
  },

  p2RenderAppBar() {
    const s = this.s;
    const apps = [{id:'swipe',name:'事件',icon:'📋'},{id:'chat',name:'通讯',icon:'💬'},{id:'companion',name:'同伴',icon:'👥'},{id:'market',name:'黑市',icon:'🏪'}];
    document.getElementById('appBar').innerHTML = apps.map(a =>
      {
        const noteBadge = (a.id === 'chat' && (s.noteUnread || 0) > 0) ? `<span style="color:#ff453a;font-size:10px;margin-left:3px">+${s.noteUnread}</span>` : '';
        return `<button class="app-btn ${s.p2app===a.id?'active':''}" onclick="G.p2SwitchApp('${a.id}')">
        <div class="icon">${a.icon}</div><div class="name">${a.name}${noteBadge}</div></button>`;
      }
    ).join('');
  },

  p2SwitchApp(id) {
    this.s.p2app = id;
    this.p2RenderAppBar();
    this.p2RenderModule();
  },

  p2RenderModule() {
    const panel = document.getElementById('modulePanel');
    switch(this.s.p2app) {
      case 'swipe': this.p2RenderSwipe(panel); break;
      case 'chat': this.p2RenderChat(panel); break;
      case 'companion': this.p2RenderCompanions(panel); break;
      case 'market': this.p2RenderMarket(panel); break;
    }
  },

  p2RenderSwipe(panel) {
    const s = this.s;
    panel.style.display='';panel.style.flexDirection='';
    if (!s.pendingEvent) {
      panel.innerHTML = `<div class="no-event"><div class="big-icon">📡</div>
        <div>等待信号中……</div>
        <div style="margin-top:8px;font-size:11px;color:#444">外面很安静。检查物资和同伴吧。</div>
        <div style="margin-top:12px;font-size:10px;color:#333">第${s.p2day}天 / 60天</div></div>`;
      return;
    }
    const evt = s.pendingEvent;
    const filter = this.p2GetCompanionFilter(evt);
    const icons = {food:'🍚',water:'💧',med:'💊'};
    const costStr = Object.entries(evt.left.cost||{}).map(([k,v])=>
      `<span>${icons[k]||k} -${v}</span>`).join('') || '<span>免费</span>';
    const evtDesc = typeof evt.desc === 'function' ? evt.desc() : evt.desc;
    const filterHintsHtml = filter.hints.map(h =>
      `<div class="filter-item ${h.tone || 'neutral'}"><span class="who">${h.icon} ${h.name}</span><span class="line">${h.text}</span></div>`
    ).join('');
    const buffBtn = filter.buff
      ? `<button class="swipe-btn buff" onclick="G.p2Swipe('buff')">★ ${filter.buff.label}</button>`
      : '';

    panel.style.display='flex';panel.style.flexDirection='column';
    panel.innerHTML = `
      <div class="swipe-area" id="swipeArea">
        <div class="swipe-card ${filter.buff ? 'card-buffed' : ''}" id="swipeCard">
          <span class="swipe-label lbl-left">接纳</span>
          <span class="swipe-label lbl-right">拒绝</span>
          ${this.p2BuildNpcCard(evt)}
          ${this.p2BuildArcProgress(evt)}
          ${filterHintsHtml ? `<div class="companion-filter">${filterHintsHtml}</div>` : ''}
          <div class="card-desc">${evtDesc}</div>
          <div class="card-costs">${costStr}</div>
        </div>
      </div>
      <div class="swipe-btns">
        <button class="swipe-btn accept" onclick="G.p2Swipe('left')">← ${evt.left.label}</button>
        ${buffBtn}
        <button class="swipe-btn reject" onclick="G.p2Swipe('right')">${evt.right.label} →</button>
      </div>`;
    setTimeout(() => this.p2InitSwipeTouch(), 50);
  },

  p2InitSwipeTouch() {
    const card = document.getElementById('swipeCard');
    if (!card || card.dataset.init) return;
    card.dataset.init = '1';
    let sx=0, sy=0, dx=0, dy=0, drag=false, axisLocked='';
    const onS = (x,y)=>{
      sx=x; sy=y; dx=0; dy=0; drag=true; axisLocked='';
      card.classList.add('dragging');
    };
    const onM = x=>{
      if(!drag)return; dx=x-sx;
      card.style.transform=`translateX(${dx}px) rotate(${dx*0.08}deg)`;
      card.classList.toggle('swiping-left',dx<-30);
      card.classList.toggle('swiping-right',dx>30);
    };
    const onE = ()=>{
      if(!drag)return; drag=false; card.classList.remove('dragging');
      if(dx<-80) this.p2Swipe('left');
      else if(dx>80) this.p2Swipe('right');
      else{card.style.transform='';card.classList.remove('swiping-left','swiping-right');}
      dx=0;
    };
    card.addEventListener('touchstart',e=>{
      const t = e.touches[0];
      onS(t.clientX, t.clientY);
    },{passive:true});
    card.addEventListener('touchmove',e=>{
      if (!drag) return;
      const t = e.touches[0];
      dx = t.clientX - sx;
      dy = t.clientY - sy;
      if (!axisLocked) {
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          axisLocked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        } else {
          return;
        }
      }
      // Vertical gesture: let container scroll naturally on mobile.
      if (axisLocked === 'y') return;
      e.preventDefault();
      onM(t.clientX);
    },{passive:false});
    card.addEventListener('touchend',onE);
    card.addEventListener('mousedown',e=>{
      onS(e.clientX, e.clientY);
      const mm=ev=>onM(ev.clientX);
      const mu=()=>{onE();document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);};
      document.addEventListener('mousemove',mm);
      document.addEventListener('mouseup',mu);
    });
  },

  p2RenderChat(panel) {
    const s = this.s;
    const filter = s.p2ChatFilter || 'all';
    const allCls = filter === 'all' ? 'on' : '';
    const notesCls = filter === 'notes' ? 'on' : '';
    const notesBadge = (s.noteUnread || 0) > 0 ? ` <span style="color:#ff453a">(${s.noteUnread})</span>` : '';

    let html = `<div class="m-header"><span>💬 加密通讯录</span>
      <div class="chat-tools">
        <button class="chat-filter ${allCls}" onclick="G.p2SetChatFilter('all')">全部</button>
        <button class="chat-filter ${notesCls}" onclick="G.p2SetChatFilter('notes')">碎片档案${notesBadge}</button>
      </div></div>`;

    if (filter === 'notes') {
      const notes = (s.privateNotes || []).map(id => this.p2ResolveNoteMeta(id)).filter(Boolean);
      html += '<div class="note-archive">';
      notes.slice().reverse().forEach(n => {
        const skin = this.p2GetNoteSkin(n);
        const lv = `Lv.${n.level}`;
        const owner = COMPANIONS.find(c => c.id === n.companion);
        const prefix = this.p2GetNoteTitlePrefix(n);
        html += `<div class="note-card ${skin}">
          <div class="note-top"><span>【${prefix}】${n.title}</span><span>${lv}</span></div>
          <div class="note-body">${n.text}</div>
          <div class="note-owner">${owner ? owner.icon + ' ' + owner.name : '未知来源'}</div>
        </div>`;
      });
      if (notes.length === 0) html += '<div style="text-align:center;color:#444;padding:20px">暂无碎片</div>';
      html += '</div>';
      panel.innerHTML = html;
      panel.scrollTop = 0;
      return;
    }

    html += '<div class="chat-wrap">';
    s.chatLog.forEach(m => {
      const isSys = m.type === 'sys';
      const noteSkin = (m.type && m.type.startsWith('note:')) ? m.type.split(':')[1] : '';
      const cls = `${isSys ? 'sys' : ''} ${noteSkin ? `note ${noteSkin}` : ''}`.trim();
      html += `<div class="chat-msg ${cls}">
        <div class="c-avatar">${m.icon}</div>
        <div class="c-bubble"><div class="c-name">${m.name} · 第${m.day}天</div><div class="c-text">${m.text}</div></div></div>`;
    });
    if (s.chatLog.length===0) html += '<div style="text-align:center;color:#444;padding:20px">暂无消息</div>';
    html += '</div>';
    panel.innerHTML = html;
    panel.scrollTop = panel.scrollHeight;
  },

  p2RenderCompanions(panel) {
    const s = this.s;
    let html = `<div class="m-header"><span>👥 同伴 (${s.companions.length})</span><span style="color:${s.hp<=30?'#ff453a':'#555'};font-size:10px">HP: ${s.hp}%</span></div>`;
    if (s.companions.length===0) {
      html += '<div style="text-align:center;color:#444;padding:20px;font-size:12px">暂无同伴。在事件中选择接纳可能遇到同伴。</div>';
    }
    s.companions.forEach(cid => {
      const c = COMPANIONS.find(x=>x.id===cid);
      if (!c) return;
      const bond = s.companionBond[cid] || 0;
      const level = this.p2GetCompanionDisplayLevel(cid);
      const bondNames = ['预备','初识','信任','生死之交'];
      const bondColors = ['#666','#0a84ff','#bf5af2','#ff2d55'];
      const eff = [];
      if (c.passive.defense) eff.push(`防御+${c.passive.defense}`);
      if (c.passive.defBonus) eff.push(`防御加成+${c.passive.defBonus}`);
      if (c.passive.foodSave) eff.push(`省粮${Math.round(c.passive.foodSave*100)}%`);
      if (c.passive.waterSave) eff.push(`节水${Math.round(c.passive.waterSave*100)}%`);
      if (c.passive.exposureDecay) eff.push(`暴露衰减+${c.passive.exposureDecay}`);
      if (c.passive.euphPerDay) eff.push(`爽度+${c.passive.euphPerDay}/天`);
      // SSR special abilities
      if (c.passive.exposureSlowdown) eff.push(`暴露增速-${Math.round(c.passive.exposureSlowdown*100)}%`);
      if (c.passive.autoBlockRaid) eff.push('可降级敌方攻势');
      if (c.passive.dailyScavenge) eff.push('每日狩猎带回物资');
      if (c.passive.rightSwipeBonus) eff.push(`右滑爽度×${c.passive.rightSwipeBonus}`);
      if (c.passive.greenhouse) eff.push('医疗级营养管理');
      if (c.passive.darkNutrient) eff.push('特调营养液回HP');

      const isSSR = c.rarity === 'SSR';
      const codeStr = c.code ? `「${c.code}」` : '';
      const bondBar = isSSR ? `<div class="bond-wrap"><div class="bond-label" style="color:${bondColors[bond]}">♥ ${bondNames[bond]} Lv${level}</div><div class="bond-bar"><div class="bond-fill" style="width:${bond*33.3}%;background:${bondColors[bond]}"></div></div></div>` : '';
      const hookStr = c.hook && level >= 2 ? `<div class="comp-hook">${c.hook}</div>` : '';

      html += `<div class="comp-card ${isSSR?'ssr':''}"><div class="comp-av">${c.icon}</div>
        <div class="comp-info">
          <div class="comp-name">${codeStr}${c.name} <span class="comp-rarity ${c.rarity}">${c.rarity}</span></div>
          <div class="comp-title">${c.title}</div>
          ${bondBar}
          <div class="comp-eff">${eff.join(' | ')}</div>
          ${hookStr}
        </div></div>`;
    });
    const unr = COMPANIONS.filter(c=>!s.companions.includes(c.id));
    if (unr.length>0) {
      html += '<div style="margin-top:12px;color:#444;font-size:10px;text-align:center">— 未发现 —</div>';
      unr.forEach(c => {
        const isSSR = c.rarity === 'SSR';
        html += `<div class="comp-card mystery ${isSSR?'ssr-mystery':''}">
          <div class="comp-av" style="filter:brightness(0.3)">${c.icon}</div>
          <div class="comp-info"><div class="comp-name" style="color:#333">??? <span class="comp-rarity ${c.rarity}" style="opacity:0.3">${c.rarity}</span></div>
          <div class="comp-title" style="color:#222">???</div></div></div>`;
      });
    }
    panel.innerHTML = html;
  },

  p2RenderMarket(panel) {
    const s = this.s;
    const items = [
      {id:'supply',name:'🎲 盲盒补给',desc:'随机获得食物/水/医疗',cost:40},
      {id:'defense',name:'🛡️ 加固防御',desc:'防御力 +8',cost:70},
      {id:'medkit',name:'💊 急救药包',desc:'医疗 +3，HP +8',cost:25}
    ];
    let html = `<div class="m-header"><span>🏪 黑市</span><span style="color:#bf5af2;font-size:10px">爽度: ${s.euphCurrency}</span></div>`;
    items.forEach(it => {
      const ok = s.euphCurrency>=it.cost;
      html += `<div class="mkt-item ${ok?'':'disabled'}" onclick="G.p2BuyMarket('${it.id}')">
        <div class="mkt-name">${it.name}</div><div class="mkt-desc">${it.desc}</div>
        <div class="mkt-cost">💜 ${it.cost} 爽度</div></div>`;
    });
    html += '<div style="margin-top:10px;color:#333;font-size:9px;text-align:center">爽度由奢侈品每日产出 + 右滑获得</div>';
    panel.innerHTML = html;
  },
});
