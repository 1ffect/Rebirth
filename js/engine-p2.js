// ========================================
// GAME ENGINE — PHASE 2: SURVIVAL SYSTEMS
// ========================================

// Attach P2_EVENTS to G
G.P2_EVENTS = P2_EVENTS;

Object.assign(G, {

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
    const s = this.s;
    s.phase = 2;
    s.p2day = 0; s.exposure = 0; s.hp = 100;
    s.companions = []; s.companionBond = {}; s.chatLog = []; s.starveDays = 0;
    s.bonusEuphPerDay = 0; s.usedEvents = []; s.eventCooldowns = {};
    s.pendingEvent = null; s.p2app = 'swipe';
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

    // 4. Companion chat (bond-aware)
    if (s.companions.length > 0 && Math.random() < 0.35) {
      const cid = s.companions[Math.floor(Math.random()*s.companions.length)];
      const comp = COMPANIONS.find(x => x.id === cid);
      if (comp) {
        const bond = s.companionBond[cid] || 0;
        let line;
        if (comp.bondLines && comp.bondLines[bond] && Math.random() < 0.4) {
          line = comp.bondLines[bond][Math.floor(Math.random()*comp.bondLines[bond].length)];
        } else {
          line = comp.chatLines[Math.floor(Math.random()*comp.chatLines.length)];
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

      return true;
    });

    if (candidates.length === 0) return null;

    // Step 2: Dynamic weight calculation
    const weighted = candidates.map(e => {
      let w = e.base_weight || 100;

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
      if (e.type === 'bond') w *= 1.3;
      if (e.type === 'companion_exclusive') w *= 1.3;
      if (e.type === 'drama') w *= 1.2;
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

  // ===== SWIPE RESOLUTION =====
  p2Swipe(dir) {
    const s = this.s;
    const evt = s.pendingEvent;
    if (!evt) return;

    this.p2Chat('🫣','你', dir==='left' ? '← '+evt.left.label : evt.right.label+' →');

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
      } else {
        // Safe / success
        const lText = typeof l.text === 'function' ? l.text() : l.text;
        this.log(`✓ ${l.safeText || lText}`);

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
      this.log(`→ ${r.text}`);
      this.p2Chat('📡','系统', r.text);
    }

    s.pendingEvent = null;
    // Tutorial step 3: after first swipe
    if (s.p2TutStep === 2) { this.render(); setTimeout(() => this.p2Tutorial(3), 600); return; }
    this.resumeGame();
    this.render();
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
      `<button class="app-btn ${s.p2app===a.id?'active':''}" onclick="G.p2SwitchApp('${a.id}')">
        <div class="icon">${a.icon}</div><div class="name">${a.name}</div></button>`
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
    const icons = {food:'🍚',water:'💧',med:'💊'};
    const costStr = Object.entries(evt.left.cost||{}).map(([k,v])=>
      `<span>${icons[k]||k} -${v}</span>`).join('') || '<span>免费</span>';
    const evtDesc = typeof evt.desc === 'function' ? evt.desc() : evt.desc;

    panel.style.display='flex';panel.style.flexDirection='column';
    panel.innerHTML = `
      <div class="swipe-area" id="swipeArea">
        <div class="swipe-card" id="swipeCard">
          <span class="swipe-label lbl-left">接纳</span>
          <span class="swipe-label lbl-right">拒绝</span>
          <div class="card-avatar">${evt.avatar}</div>
          <div class="card-title">${evt.title}</div>
          <div class="card-desc">${evtDesc}</div>
          <div class="card-costs">${costStr}</div>
        </div>
      </div>
      <div class="swipe-btns">
        <button class="swipe-btn accept" onclick="G.p2Swipe('left')">← ${evt.left.label}</button>
        <button class="swipe-btn reject" onclick="G.p2Swipe('right')">${evt.right.label} →</button>
      </div>`;
    setTimeout(() => this.p2InitSwipeTouch(), 50);
  },

  p2InitSwipeTouch() {
    const card = document.getElementById('swipeCard');
    if (!card || card.dataset.init) return;
    card.dataset.init = '1';
    let sx=0,dx=0,drag=false;
    const onS = x=>{sx=x;drag=true;card.classList.add('dragging');};
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
    card.addEventListener('touchstart',e=>onS(e.touches[0].clientX),{passive:true});
    card.addEventListener('touchmove',e=>{e.preventDefault();onM(e.touches[0].clientX);},{passive:false});
    card.addEventListener('touchend',onE);
    card.addEventListener('mousedown',e=>{
      onS(e.clientX);
      const mm=ev=>onM(ev.clientX);
      const mu=()=>{onE();document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);};
      document.addEventListener('mousemove',mm);
      document.addEventListener('mouseup',mu);
    });
  },

  p2RenderChat(panel) {
    let html = '<div class="m-header"><span>💬 加密通讯录</span><span style="color:#555;font-size:10px">群聊</span></div><div class="chat-wrap">';
    this.s.chatLog.forEach(m => {
      html += `<div class="chat-msg ${m.type==='sys'?'sys':''}">
        <div class="c-avatar">${m.icon}</div>
        <div class="c-bubble"><div class="c-name">${m.name} · 第${m.day}天</div><div class="c-text">${m.text}</div></div></div>`;
    });
    if (this.s.chatLog.length===0) html += '<div style="text-align:center;color:#444;padding:20px">暂无消息</div>';
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
      const bondNames = ['陌生','信任','羁绊','共生'];
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
      const bondBar = isSSR ? `<div class="bond-wrap"><div class="bond-label" style="color:${bondColors[bond]}">♥ ${bondNames[bond]} Lv${bond}</div><div class="bond-bar"><div class="bond-fill" style="width:${bond*33.3}%;background:${bondColors[bond]}"></div></div></div>` : '';
      const hookStr = c.hook && bond >= 1 ? `<div class="comp-hook">${c.hook}</div>` : '';

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
