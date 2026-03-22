// ========================================
// GAME ENGINE — ENDINGS, DARK MARKET, SAVE
// ========================================
Object.assign(G, {

  endGame() {
    WH.stopLoop();
    this.clearSave();
    const s = this.s;
    if (s.phase === 1) { this.showPhase2Transition(); return; }

    const survived = s.p2day;
    const alive = s.hp > 0;

    // ===== 计分 =====
    const dayScore = survived * 50;
    const assetScore = s.foodPool * 3 + s.waterPool * 3 + s.medPool * 5 + s.defense * 2;
    const euphScore = s.euphCurrency;
    const compScore = s.companions.length * 200;
    const bondScore = Object.values(s.companionBond).reduce((a,b)=>a+b,0) * 150;
    const surviveBonus = alive && survived >= 60 ? 2000 : 0;
    const endingBonus = s.flags.heliTriggered ? 3000 : s.flags.dungeonTriggered ? 5000 : 0;
    const totalScore = dayScore + assetScore + euphScore + compScore + bondScore + surviveBonus + endingBonus;

    // 评级
    META.load();
    META.data.runCount++;
    META.addPoints(totalScore);
    if (totalScore > META.data.bestScore) META.data.bestScore = totalScore;

    let rank, rankColor, rankLine;
    if (s.flags.dungeonTriggered) { rank='SSS'; rankColor='#bf5af2'; rankLine='第七次文明继承者 · 超越末日'; }
    else if (s.flags.heliTriggered) { rank='SS'; rankColor='#00aaff'; rankLine='天选之人 · 直升机已到达'; }
    else if (totalScore >= 6000) { rank='S'; rankColor='#CCFF00'; rankLine='废土霸主 · 降维打击一切'; }
    else if (totalScore >= 4500) { rank='A'; rankColor='#CCFF00'; rankLine='末日大亨 · 活得比末日前还爽'; }
    else if (totalScore >= 3000) { rank='B'; rankColor='#32d74b'; rankLine='避难所苟王 · 苟到最后就是胜利'; }
    else if (totalScore >= 1500) { rank='C'; rankColor='#556'; rankLine='末日菜鸟 · 至少活了一阵子'; }
    else { rank='D'; rankColor='#FF3B30'; rankLine='街头饿殍 · 重新做人吧'; }

    // 一句话总结
    let headline;
    if (s.flags.heliTriggered) headline = '🚁 直升机从天而降。你是被选中的幸存者。';
    else if (s.flags.dungeonTriggered) headline = '🏚️ 第七次文明的遗产。末日不是终点。';
    else if (!alive && s.starveDays > 0 && !s.hasPower) headline = '在百万浴缸里被冻死了。下次先买发电机。';
    else if (!alive && s.starveDays > 0) headline = '物资耗尽。大米和纯净水才是硬通货。';
    else if (!alive && s.exposure >= 70) headline = '暴徒破门。你的和牛被别人吃了。';
    else if (!alive) headline = `撑了${survived}天。差一点。`;
    else if (survived >= 60 && s.companions.length >= 3) headline = '满仓物资 + 满级战力 = 废土霸主。';
    else if (survived >= 60 && s.companions.length >= 1) headline = '苟过60天。末日土皇帝。';
    else if (survived >= 60) headline = '活下来了。一个人。安静得像坟墓。';
    else headline = `第${survived}天倒下了。下次会更好。`;

    // 同伴列表
    const compStr = s.companions.map(id=>{
      const c=COMPANIONS.find(x=>x.id===id);if(!c)return'';
      const b=s.companionBond[id]||0;const bn=['','♥','♥♥','♥♥♥'];
      return c.icon+c.name+(bn[b]?' '+bn[b]:'');
    }).filter(Boolean).join('  ') || '无';

    document.getElementById('endScreen').innerHTML = `
      <div class="content" style="max-width:360px;max-height:90vh;overflow-y:auto">
        <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:4px;color:#333;margin-bottom:8px;text-transform:uppercase">DOOMSDAY SURVIVAL RECEIPT</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:72px;font-weight:700;color:${rankColor};line-height:1;letter-spacing:4px">${rank}</div>
        <div style="color:${rankColor};font-size:11px;font-weight:700;margin:6px 0 12px;font-family:'JetBrains Mono',monospace;letter-spacing:1px">${rankLine}</div>
        <p style="color:#666;font-size:12px;margin-bottom:16px">${headline}</p>
        <div style="border-top:1px dashed #222;border-bottom:1px dashed #222;padding:14px 0;text-align:left;font-size:11px;line-height:2.4;color:#666;font-family:'JetBrains Mono',monospace">
          <div style="display:flex;justify-content:space-between"><span>存活天数</span><span style="color:#F5F5F5;font-weight:700">${survived}/60 <span style="color:#333">+${dayScore}</span></span></div>
          <div style="display:flex;justify-content:space-between"><span>剩余资产</span><span style="color:#32d74b;font-weight:700">F:${s.foodPool} W:${s.waterPool} D:${s.defense} <span style="color:#333">+${assetScore}</span></span></div>
          <div style="display:flex;justify-content:space-between"><span>爽度累计</span><span style="color:#CCFF00;font-weight:700">${s.euphCurrency} <span style="color:#333">+${euphScore}</span></span></div>
          <div style="display:flex;justify-content:space-between"><span>同伴</span><span style="color:#F5F5F5;font-weight:700">${compStr} <span style="color:#333">+${compScore+bondScore}</span></span></div>
          ${surviveBonus?'<div style="display:flex;justify-content:space-between"><span>通关加成</span><span style="color:#CCFF00;font-weight:700">+'+surviveBonus+'</span></div>':''}
          ${endingBonus?'<div style="display:flex;justify-content:space-between"><span>'+(s.flags.heliTriggered?'直升机救援':'地下城发现')+'</span><span style="color:#bf5af2;font-weight:700">+'+endingBonus+'</span></div>':''}
          <div style="border-top:1px dashed #222;margin-top:8px;padding-top:8px;display:flex;justify-content:space-between;font-size:16px"><span style="color:#F5F5F5;font-weight:700">TOTAL</span><span style="color:${rankColor};font-weight:700;font-size:20px">${totalScore.toLocaleString()}</span></div>
        </div>
        <button class="restart-btn" style="margin-top:16px;width:100%" onclick="G.enterDarkMarket()">REBOOT →</button>
      </div>`;
    setTimeout(() => document.getElementById('endScreen').classList.add('show'), 300);
  },

  // ========================================
  // MULTI-ENDING SYSTEM
  // ========================================
  showSpecialEnding(type) {
    const s = this.s;
    const box = document.getElementById('endingBox');
    const overlay = document.getElementById('endingOverlay');

    if (type === 'helicopter') {
      overlay.style.background = 'linear-gradient(180deg,#000,#001030)';
      box.innerHTML = `
        <div class="ending-icon">🚁</div>
        <div class="ending-title" style="color:#00aaff">直升机救援</div>
        <div style="color:#00aaff;font-size:11px;margin-bottom:12px">隐藏结局 A · 天空之路</div>
        <div class="ending-desc">
          第${s.p2day}天凌晨。你被一阵由远及近的轰鸣声吵醒。<br><br>
          不是暴徒——是螺旋桨。<br><br>
          冲到监控前，画面里一架军用直升机正在你的避难所上方盘旋。探照灯打在防爆门上，对讲机响了：<br><br>
          <span style="color:#00aaff;font-weight:900">"幸存者注意。这里是极光计划搜救队。你的高防御信号被我们的卫星锁定。准备撤离。"</span><br><br>
          ${s.companions.length > 0 ? '你看了一眼身后的同伴们。楚狄已经开始收拾军刀了。宁鸮关掉了所有屏幕。黎冥把最后一批药品装进急救箱。<br><br>' : ''}
          防爆门缓缓打开。零下六十度的风夹着雪花灌进来。但你第一次觉得——外面的世界，好像没那么冷了。<br><br>
          <span style="color:#ffd700;font-weight:900">你活着离开了。</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <button class="ending-btn" style="border-color:#00aaff;color:#00aaff" onclick="G.resolveSpecialEnding('helicopter')">登上直升机 →</button>
          <button class="ending-btn" style="border-color:#333;color:#555;font-size:12px" onclick="G.declineSpecialEnding()">这里就是我的家。我哪也不去。</button>
        </div>`;
    } else if (type === 'dungeon') {
      overlay.style.background = 'linear-gradient(180deg,#000,#1a0a20)';
      box.innerHTML = `
        <div class="ending-icon">🏚️</div>
        <div class="ending-title" style="color:#bf5af2">地下城入口</div>
        <div style="color:#bf5af2;font-size:11px;margin-bottom:12px">隐藏结局 B · 深渊之下</div>
        <div class="ending-desc">
          第${s.p2day}天。${s.companions.includes('owl')?'宁鸮的无人机':'你的监控系统'}在地下深处发现了一个巨大的空间——不是天然洞穴，是人工建造的。<br><br>
          ${s.companions.includes('hunter')?'楚狄带队突入。回来时她的表情很复杂。':'你鼓起勇气独自探入。眼前的景象让你呆住了。'}<br><br>
          <span style="color:#bf5af2;font-weight:900">"下面有一座城。"</span><br><br>
          有电，有水，有完整的生态循环系统。空无一人，但所有设备都在运转。墙上刻着一行字：<br><br>
          <span style="color:#ffd700;font-style:italic">"欢迎回家。——第七次文明遗赠"</span><br><br>
          ${s.p2Flags.includes('found_floor_below') ? '你想起了那个被凿开的地板、那张照片上和你一模一样的面孔、那句"第三次了，希望这次能成功"。<br>现在你明白了——那不是第三次。是第六次。而你，是第七次。<br><br>' : ''}
          ${s.usedEvents.includes('dead_radio') ? '收音机里那个女人的声音回响在你脑海里："不要打开门。无论听到什么声音。"<br>她不是在警告你远离这里——她是在警告上一批来客。她失败了。而你，找到了她没能找到的入口。<br><br>' : ''}
          ${s.companions.includes('seed')?'黎冥检测了水和空气。一切正常。不，不只是正常——比你的避难所好十倍。<br><br>':'你检查了水和空气。奇迹般地，一切正常。比你的避难所好十倍。<br><br>'}
          ${s.companions.includes('owl')?'宁鸮推了推眼镜："搬家？"<br>':''}
          ${s.companions.includes('hunter')?'楚狄把军刀插在桌上："我去开路。"<br>':''}
          ${s.companions.includes('seed')?'黎冥微笑着提起药箱："新家需要一个诊所。"<br><br>':'<br>'}
          <span style="color:#ffd700;font-weight:900">末日不是终点。是入口。</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <button class="ending-btn" style="border-color:#bf5af2;color:#bf5af2" onclick="G.resolveSpecialEnding('dungeon')">进入地下城 →</button>
          <button class="ending-btn" style="border-color:#333;color:#555;font-size:12px" onclick="G.declineSpecialEnding()">地下的东西……还是别碰了。</button>
        </div>`;
    }

    overlay.classList.add('show');
    SFX.play('upgrade');
  },

  resolveSpecialEnding(type) {
    document.getElementById('endingOverlay').classList.remove('show');
    const s = this.s;
    s.done = true;
    // Special endings get massive bonus scores
    if (type === 'helicopter') {
      s.flags.heliTriggered = true;
      s.euphCurrency += 3000;
      s.p2day = 60; // Count as full survival
    } else if (type === 'dungeon') {
      s.flags.dungeonTriggered = true;
      s.euphCurrency += 5000;
      s.p2day = 60;
    }
    this.endGame();
  },

  declineSpecialEnding() {
    document.getElementById('endingOverlay').classList.remove('show');
    this.log('你选择留下。这里就是你的战场。');
    this.notif('继续生存……','success');
    this.resumeGame();
    this.render();
  },

  // ========================================
  // META DARK MARKET SYSTEM
  // ========================================
  enterDarkMarket() {
    document.getElementById('endScreen').classList.remove('show');
    const hack = document.getElementById('dmHack');
    hack.classList.add('show');
    setTimeout(() => {
      hack.classList.remove('show');
      this.renderDarkMarket();
      document.getElementById('darkMarket').classList.add('show');
    }, 1200);
  },

  renderDarkMarket() {
    const m = META.data;
    const isFirstRun = m.runCount === 1;
    const forceMode = isFirstRun && !META.has('loanshark');
    let html = `<div class="dm-inner">
      <div class="dm-title">
        <h2>暗网：下一世的物资清单</h2>
        <div class="dm-sub">${forceMode ? '初始化跨维度投送协议……' : '系统已被黑入 · 跨维度物资投送'}</div>
      </div>
      <div class="dm-points">当前可用爽度 <span class="pts-num">${m.points}</span></div>`;

    if (forceMode) {
      // === 强制破冰引导：只显示高利贷，其余全锁 ===
      const ls = this.META_ITEMS.find(x => x.id === 'loanshark');
      const canBuy = m.points >= ls.cost;
      html += `<div style="color:#888;font-size:11px;text-align:center;margin-bottom:12px;line-height:1.6">
        检测到您是第一次重生。<br>暗网为您准备了一份<span style="color:#ffd700;font-weight:900">新手见面礼</span>：
      </div>`;
      html += `<div class="dm-grid">
        <div class="dm-item ${canBuy ? 'force-highlight' : 'cant-afford'}" onclick="G.buyMetaItem('loanshark')" style="position:relative">
          ${canBuy ? '<div class="dm-finger">👆</div>' : ''}
          <div class="dm-icon">${ls.icon}</div>
          <div class="dm-name" style="font-size:16px">${ls.name}</div>
          <div class="dm-desc" style="font-size:12px;color:#ffd700">下一局开局直接多100万启动资金！</div>
          <div class="dm-cost">${canBuy ? ls.cost + ' 爽度 — 点击购买！' : '爽度不足（需'+ls.cost+'）'}</div>
        </div>`;
      // Show remaining items as locked teasers
      this.META_ITEMS.filter(x => x.id !== 'loanshark').slice(0, 3).forEach(item => {
        html += `<div class="dm-item force-locked">
          <div class="dm-icon">${item.icon}</div>
          <div class="dm-name">${item.name}</div>
          <div class="dm-desc">${item.desc}</div>
          <div class="dm-cost" style="color:#444">🔒 下次重生解锁更多</div>
        </div>`;
      });
      html += '</div>';
      if (canBuy) {
        html += `<div class="dm-guide-text">👆 买下它，下一局开局直接多100万！</div>`;
      } else {
        html += `<div style="text-align:center;color:#555;font-size:11px;margin:8px 0">爽度不足？没关系，空手重生也能变强！</div>`;
      }
    } else {
      // === 正常暗网商店 ===
      html += '<div class="dm-grid">';
      this.META_ITEMS.forEach(item => {
        const owned = META.has(item.id);
        const canAfford = m.points >= item.cost;
        let cls = owned ? 'owned' : !canAfford ? 'cant-afford' : '';
        html += `<div class="dm-item ${cls}" onclick="G.buyMetaItem('${item.id}')">
          <div class="dm-icon">${item.icon}</div>
          <div class="dm-name">${item.name}</div>
          <div class="dm-desc">${item.desc}</div>
          <div class="dm-cost">${owned ? '✓ 已解锁' : item.cost + ' 爽度'}</div>
        </div>`;
      });
      // Repeatable upgrades
      html += '</div><div style="color:#00ff88;font-size:10px;font-weight:700;margin:12px 0 6px;font-family:\'JetBrains Mono\',monospace;letter-spacing:2px;text-transform:uppercase">♾️ 可重复升级</div><div class="dm-grid">';
      this.META_REPEATS.forEach(item => {
        const lv = META.getRepeatLv(item.id);
        const cost = item.baseCost + lv * item.costScale;
        const canAfford = m.points >= cost;
        html += `<div class="dm-item ${!canAfford?'cant-afford':''}" onclick="G.buyRepeatItem('${item.id}')">
          <div class="dm-icon">${item.icon}</div>
          <div class="dm-name">${item.name} ${lv > 0 ? '<span style="color:#00ff88;font-size:10px">Lv'+lv+'</span>' : ''}</div>
          <div class="dm-desc">${item.desc} <span style="color:#00ff88">(${item.perLv})</span></div>
          <div class="dm-cost">${cost} 爽度</div>
        </div>`;
      });
      html += '</div>';
    }

    html += `<button class="dm-confirm" onclick="G.confirmDarkMarket()">${forceMode && m.points >= 200 ? '购买后继续 →' : '确认携带，开始倒计时'}</button>`;
    html += `<div class="dm-run-info">第 ${m.runCount} 次重生 · 历史最高 ${m.bestScore.toLocaleString()} 分</div>`;
    html += '</div>';

    document.getElementById('darkMarket').innerHTML = html;
  },

  buyMetaItem(id) {
    const item = this.META_ITEMS.find(x => x.id === id);
    if (!item || item.locked || META.has(id)) return;
    if (META.data.points < item.cost) { SFX.play('error'); this.notif('爽度不足！','danger'); return; }
    if (META.buy(id, item.cost)) {
      SFX.play('upgrade');
      this.notif(`✓ ${item.name} 已解锁！`,'success');
      this.renderDarkMarket();
    }
  },

  buyRepeatItem(id) {
    const item = this.META_REPEATS.find(x => x.id === id);
    if (!item) return;
    const lv = META.getRepeatLv(id);
    const cost = item.baseCost + lv * item.costScale;
    if (META.data.points < cost) { SFX.play('error'); this.notif('爽度不足！','danger'); return; }
    if (META.buyRepeat(id, cost)) {
      SFX.play('upgrade');
      this.notif(`✓ ${item.name} Lv${lv+1}！`,'success');
      this.renderDarkMarket();
    }
  },

  confirmDarkMarket() {
    const m = META.data;
    // First run: force buy loanshark if affordable
    if (m.runCount === 1 && !META.has('loanshark') && m.points >= 200) {
      SFX.play('error');
      this.notif('👆 先买【高利贷小广告】再出发！','danger');
      return;
    }
    document.getElementById('darkMarket').classList.remove('show');

    // Reset state and apply meta
    this.s = this.newState();
    this.applyMetaUnlocks();
    WH.clearAll();

    // Reset all overlays
    document.getElementById('exposureWrap').classList.remove('show');
    document.getElementById('crtOverlay').classList.remove('active');
    document.getElementById('phase2Transition').classList.remove('show');
    document.getElementById('raidOverlay').classList.remove('show');
    document.getElementById('endScreen').classList.remove('show');
    document.getElementById('appBar').classList.remove('four-col');
    document.getElementById('warehouseWrap').style.display = '';
    document.getElementById('p2StatusArea').classList.remove('show');
    document.getElementById('intro-overlay').style.display = 'none';
    const tt = document.querySelector('.topbar .title');
    if (tt) tt.textContent = 'DOOMSDAY';

    // Start game directly (skip intro on subsequent runs)
    document.getElementById('app').classList.add('show');
    document.getElementById('storyPane').innerHTML = '';
    WH.init();
    this.render();
    this.startClock();

    this.log(`🔴 第${m.runCount}次重生。系统激活。`);
    if (META.has('loanshark')) this.log('💸 高利贷到账：+¥100万启动资金！');
    if (META.has('blueprint')) this.log('📐 扩容图纸生效：Lv1人防工程(500m³)！');
    if (META.has('vipcard')) this.log('🏷️ VIP会员卡生效：商城8折！');
    if (META.has('darkloan')) this.log('🏴 黑市借贷APP已安装。');
    if (META.has('crypto')) this.log('₿ 加密货币终端已激活。');
    if (META.has('nuclear')) this.log('☢️ 核聚变电池已装载。');
    if (META.has('medreserve')) this.log('💉 应急医疗储备已就位。');
    // Log repeatable bonuses
    const rf = META.getRepeatLv('rep_food'), rw = META.getRepeatLv('rep_water'), rd = META.getRepeatLv('rep_def'), re = META.getRepeatLv('rep_euph');
    if (rf>0) this.log(`🍚 食物储备 Lv${rf}：末日+${rf*4}食物`);
    if (rw>0) this.log(`💧 净水储备 Lv${rw}：末日+${rw*3}水`);
    if (rd>0) this.log(`🛡️ 防御装甲 Lv${rd}：末日+${rd*12}防御`);
    if (re>0) this.log(`⚡ 爽度加速 Lv${re}：末日+${re*3}爽度/天`);
  },

  applyMetaUnlocks() {
    const s = this.s;
    if (META.has('loanshark')) { s.cash += 1000000; s.debt += 1000000; }
    if (META.has('blueprint')) { s.baseLv = 1; s.capacity = 500; }
    if (META.has('nuclear')) { s.flags.nuclearBattery = true; }
  },

  reset() {
    this.pauseGame();
    document.getElementById('modal').innerHTML = `
      <h2>重新开始</h2>
      <div class="modal-desc" style="border-left-color:#ff453a">
        <div style="color:#aaa;font-size:12px;line-height:1.6">选择重置方式：</div>
      </div>
      <div class="modal-options">
        <button class="option-btn" onclick="G.doReset('soft')" style="text-align:center">🔄 重开本局<br><span style="color:#666;font-size:11px">保留暗网解锁和历史分数</span></button>
        <button class="option-btn" onclick="G.doReset('hard')" style="text-align:center;color:#ff453a">💀 彻底重置<br><span style="color:#666;font-size:11px">清除全部数据，回到纯新手</span></button>
        <button class="option-btn" onclick="G.closeModal()" style="text-align:center;color:#555">取消</button>
      </div>`;
    document.getElementById('modalOverlay').classList.add('show');
  },

  doReset(type) {
    if (type === 'hard') {
      if (!confirm('确定清除全部数据？暗网解锁、历史分数将全部归零！')) return;
      try { localStorage.removeItem(META.KEY); } catch(e) {}
      META.data = META.fresh();
    }
    document.getElementById('modalOverlay').classList.remove('show');
    document.getElementById('endScreen').classList.remove('show');
    document.getElementById('darkMarket').classList.remove('show');
    clearInterval(this.tickTimer);
    this.clearSave();
    this.init();
  },

  // ========================================
  // SAVE / LOAD SYSTEM (localStorage)
  // ========================================
  SAVE_KEY: 'doomsday_save_v1',

  saveGame() {
    try {
      localStorage.setItem(this.SAVE_KEY, JSON.stringify({ state: this.s, ts: Date.now() }));
    } catch(e) {}
  },

  loadSave() {
    try {
      const raw = localStorage.getItem(this.SAVE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !data.state) return null;
      return data;
    } catch(e) { return null; }
  },

  hasSave() {
    return !!this.loadSave();
  },

  clearSave() {
    try { localStorage.removeItem(this.SAVE_KEY); } catch(e) {}
  },

  resumeFromSave() {
    const save = this.loadSave();
    if (!save) return;
    // Merge saved state onto fresh state to ensure new fields have defaults
    this.s = Object.assign(this.newState(), save.state);

    const o = document.getElementById('intro-overlay');
    o.classList.add('fade-out');
    setTimeout(() => {
      o.style.display = 'none';
      document.getElementById('app').classList.add('show');

      WH.clearAll();
      if (this.s.phase === 1) {
        WH.init();
        // Rebuild warehouse visuals from stock
        Object.entries(this.s.stock).forEach(([itemId, qty]) => {
          const itemDef = this.ITEMS.find(x => x.id === itemId);
          if (itemDef && qty > 0) WH.addItem(itemDef, qty);
        });
      } else {
        WH.stopLoop();
        document.getElementById('exposureWrap').classList.add('show');
        document.getElementById('crtOverlay').classList.add('active');
        document.getElementById('appBar').classList.add('four-col');
        document.getElementById('warehouseWrap').style.display = 'none';
        document.getElementById('p2StatusArea').classList.add('show');
        document.querySelector('.topbar .title').textContent = 'SURVIVAL';
        // Rebuild story log from saved logs
        const sp = document.getElementById('storyPane');
        sp.innerHTML = '';
        (this.s.logs || []).slice(-20).forEach(t => {
          const n = document.createElement('div'); n.className='story-node'; n.textContent=t;
          sp.appendChild(n);
        });
        sp.scrollTop = sp.scrollHeight;
      }

      this.render();
      this.startClock();
      this.notif('✅ 游戏已恢复', 'success');
    }, 300);
  }
});
