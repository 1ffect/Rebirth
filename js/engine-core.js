// ========================================
// GAME ENGINE — CORE (Phase 1)
// ========================================
const G = {
  // 3 seconds per game-day (each tick = 4 hours, 6 ticks/day, 500ms/tick)
  // Phase 2 = 60 days = ~3 minutes real-time
  // 60-second Phase 1 sprint: 30 days × 6 ticks × 330ms = 59.4s
  TICK_MS: 330,
  HOURS_PER_TICK: 4,
  tickTimer: null,

  // ===== STATE =====
  newState() {
    return {
      day:-30, hour:8, panic:5, phase:1,
      cash:0, debt:0,
      capacity:100, used:0,
      baseLv:0,
      euphoria:0,
      stock:{}, app:'finance',
      teammates:[], logs:[], flags:{}, done:false,
      intelSeen:[], tutorialStep:0,
      finCount: { credit:0, loan:0, mortgage:0, darkloan:0, crypto:0 },
      // Phase 2
      p2day:0, exposure:0, hp:100,
      companions:[], companionBond:{}, chatLog:[],
      foodPool:0, waterPool:0, medPool:0,
      hasPower:false, hasGreenhouse:false,
      defense:0, euphProd:0, euphCurrency:0,
      pendingEvent:null, usedEvents:[], eventCooldowns:{},
      bonusEuphPerDay:0, p2app:'swipe', starveDays:0,
      tacticalWarning:false, defDebuffDays:0, companionDebuffs:{}, p2Flags:[],
      noEventDays:0, p2TutStep:0
    };
  },

  // ===== INIT & INTRO =====
  init() {
    META.load();
    this.s = this.newState();
    WH.clearAll();
    document.getElementById('exposureWrap').classList.remove('show');
    document.getElementById('crtOverlay').classList.remove('active');
    document.getElementById('phase2Transition').classList.remove('show');
    document.getElementById('raidOverlay').classList.remove('show');
    document.getElementById('endScreen').classList.remove('show');
    document.getElementById('appBar').classList.remove('four-col');
    document.getElementById('warehouseWrap').style.display = '';
    document.getElementById('p2StatusArea').classList.remove('show');
    const tt = document.querySelector('.topbar .title');
    if (tt) tt.textContent = 'DOOMSDAY';
    this.showIntro();
  },

  showIntro() {
    const o = document.getElementById('intro-overlay');
    o.style.display = 'flex'; o.classList.remove('fade-out');
    document.getElementById('app').classList.remove('show');
    document.getElementById('newsCard').classList.remove('show');
    document.getElementById('newsCard').style.display = '';
    document.getElementById('systemCard').classList.remove('show');
    document.getElementById('intro-start-btn').classList.remove('show');
    document.getElementById('intro-resume-btn').style.display = 'none';
    // Show resume button if save exists
    if (this.hasSave()) {
      document.getElementById('intro-resume-btn').style.display = 'block';
    }
    setTimeout(() => { document.getElementById('newsCard').classList.add('show'); this.typeNews(); }, 600);
  },

  typeNews() {
    const el = document.getElementById('newsText');
    const text = '据本台首席气候专家王博表示，近期网络流传的"全球极寒汇聚将于30天后导致地表冰封"的传言，完全缺乏科学依据。请广大市民保持冷静，切勿盲目抢购食材及建设私人避难所。社会秩序极其稳——';
    el.innerHTML = '';
    let i = 0;
    const ti = setInterval(() => {
      if (i < text.length) { el.innerHTML += text[i]; i++; }
      else { clearInterval(ti); setTimeout(() => this.glitch(), 800); }
    }, 35);
  },

  glitch() {
    const g = document.getElementById('glitchOverlay');
    g.classList.add('active');
    setTimeout(() => {
      document.getElementById('newsCard').style.display = 'none';
      g.classList.remove('active');
      setTimeout(() => {
        document.getElementById('systemCard').classList.add('show');
        setTimeout(() => document.getElementById('intro-start-btn').classList.add('show'), 1200);
      }, 200);
    }, 1200);
  },

  startGame() {
    const o = document.getElementById('intro-overlay');
    o.classList.add('fade-out');
    setTimeout(() => {
      o.style.display = 'none';
      document.getElementById('app').classList.add('show');
      WH.init();
      this.render();
      this.startClock();
      this.log('🔴 系统激活。身无分文，100m³地下室。');
      this.log('💳 狂点【主权信用卡】！每次+3万，攒够20万升级空间！');
      setTimeout(() => this.tutorialStep1(), 500);
    }, 800);
  },

  // ===== TUTORIAL =====
  tutorialStep1() {
    if (this.s.tutorialStep > 0) return;
    this.s.tutorialStep = 1;
    const btn = document.querySelector('.app-btn[data-app="finance"]');
    if (btn) btn.classList.add('tutorial-highlight');
    this.showTip('狂点【主权信用卡】！每次+3万 👆');
  },
  tutorialStep2() {
    if (this.s.tutorialStep !== 1) return;
    this.s.tutorialStep = 2;
    document.querySelectorAll('.tutorial-highlight').forEach(e => e.classList.remove('tutorial-highlight'));
    this.removeTip();
    setTimeout(() => {
      const btn = document.querySelector('.app-btn[data-app="shop"]');
      if (btn) btn.classList.add('tutorial-highlight');
      this.showTip('去商城扫货！注意空间限制 🛒');
    }, 400);
  },
  tutorialStep3() {
    if (this.s.tutorialStep !== 2) return;
    this.s.tutorialStep = 3;
    document.querySelectorAll('.tutorial-highlight').forEach(e => e.classList.remove('tutorial-highlight'));
    this.removeTip();
    setTimeout(() => {
      const btn = document.querySelector('.app-btn[data-app="base"]');
      if (btn) btn.classList.add('tutorial-highlight');
      this.showTip('空间满了！去基建App升级避难所 🏗️');
    }, 400);
  },
  tutorialStep4() {
    if (this.s.tutorialStep !== 3) return;
    this.s.tutorialStep = 4;
    document.querySelectorAll('.tutorial-highlight').forEach(e => e.classList.remove('tutorial-highlight'));
    this.removeTip();
    setTimeout(() => this.notif('💡 循环：搞钱→升级→扫货→再搞钱！', 'money'), 300);
  },
  showTip(t) { this.removeTip(); const e=document.createElement('div'); e.className='tutorial-tip'; e.id='tutTip'; e.textContent=t; document.body.appendChild(e); },
  removeTip() { const e=document.getElementById('tutTip'); if(e)e.remove(); },

  // ===== CLOCK (60-second sprint) =====
  startClock() {
    if (this.tickTimer) clearInterval(this.tickTimer);
    this.tickTimer = setInterval(() => {
      if (this.s.done) { clearInterval(this.tickTimer); return; }
      this.s.hour += this.HOURS_PER_TICK;
      if (this.s.hour >= 24) { this.s.hour = 0; this.advanceDay(); }
      this.updateCountdown();
    }, this.TICK_MS);
  },

  updateCountdown() {
    const el = document.getElementById('countdownDigits');
    if (this.s.phase === 2) {
      el.textContent = `第${this.s.p2day}天 / 60天`;
      el.classList.toggle('urgent', this.s.hp <= 30 || this.s.exposure >= 60);
      return;
    }
    const d = Math.max(0, Math.abs(this.s.day));
    const hrsLeft = Math.max(0, 24 - this.s.hour);
    const h = String(hrsLeft).padStart(2, '0');
    el.textContent = `${d}天 ${h}:00:00`;
    el.classList.toggle('urgent', d <= 5);
  },

  advanceDay() {
    if (this.s.phase === 1) {
      this.s.day++;
      this.s.panic = Math.min(100, this.s.panic + 3 + Math.floor(Math.random() * 5));
      this.checkMortgageUnlock();
      if (this.s.day >= 0) { this.pauseGame(); this.showPhase2Transition(); return; }
      // Phase 1: timer never pauses for popups — skip if modal already open
      const modalOpen = document.getElementById('modalOverlay').classList.contains('show');
      if (!modalOpen) {
        this.checkIntel();
        this.triggerRandomEvent();
      }
      this.render();
      this.saveGame();
    } else {
      this.s.p2day++;
      this.p2ProcessDay();
      if (!this.s.done) this.saveGame();
    }
  },

  checkMortgageUnlock() {
    const s = this.s;
    if (s.day >= -15 && !s.flags.mortgageUnlock && s.finCount.loan >= 2) {
      s.flags.mortgageUnlock = true;
      this.log('🔓 抵押通道已打开！');
      // 先渲染让按钮亮起来，再弹窗（Phase 1不暂停倒计时）
      this.render();
      SFX.play('alert');
      document.getElementById('modal').innerHTML = `
        <h2>🔓 新通道解锁</h2>
        <div class="modal-desc">
          <div style="color:#CCFF00;font-weight:700;font-size:15px;margin-bottom:8px">【一键抵押全部家当】已解锁！</div>
          <div style="color:#aaa;font-size:13px;line-height:1.6">房产、车子、期权——一键变现 5000万~1.5亿。<br>末日后钱就是废纸，全梭哈！</div>
        </div>
        <div class="modal-options">
          <button class="option-btn" onclick="G.closeModal();G.switchApp('finance')" style="text-align:center;font-weight:700;color:#CCFF00">去搞钱页面查看 → <span id="unlockCountdown" style="color:#555">(4s)</span></button>
        </div>`;
      document.getElementById('modalOverlay').classList.add('show');
      // Auto-close countdown
      let sec = 4;
      if (this._unlockTimer) clearInterval(this._unlockTimer);
      this._unlockTimer = setInterval(() => {
        sec--;
        const cd = document.getElementById('unlockCountdown');
        if (cd) cd.textContent = `(${sec}s)`;
        if (sec <= 0) {
          clearInterval(this._unlockTimer); this._unlockTimer = null;
          if (document.getElementById('modalOverlay').classList.contains('show')) { this.closeModal(); this.switchApp('finance'); }
        }
      }, 1000);
    }
  },

  // ===== INTEL =====
  checkIntel() {
    this.INTEL.forEach(item => {
      if (this.s.day >= item.day && !this.s.intelSeen.includes(item.day)) {
        this.s.intelSeen.push(item.day);
        // Pop up as modal notification
        this.showIntelPopup(item);
      }
    });
  },
  getVisibleIntel() { return this.INTEL.filter(i => this.s.intelSeen.includes(i.day)).reverse(); },

  pauseGame() {
    if (this.tickTimer) { clearInterval(this.tickTimer); this.tickTimer = null; }
  },
  resumeGame() {
    if (!this.tickTimer && !this.s.done) this.startClock();
  },

  showIntelPopup(item) {
    // Phase 1: info-only popups don't pause timer, auto-close after 3s
    SFX.play('alert');
    const typeLabel = {breaking:'🔴 突发',tip:'🟢 情报',default:'🔵 消息'}[item.type] || '📡 情报';
    document.getElementById('modal').innerHTML = `
      <h2>${typeLabel}</h2>
      <div class="modal-desc" style="border-left-color:${item.type==='breaking'?'#ff453a':item.type==='tip'?'#32d74b':'#0a84ff'}">
        <div style="font-size:9px;font-weight:900;color:${item.type==='breaking'?'#ff453a':item.type==='tip'?'#32d74b':'#0a84ff'};margin-bottom:4px">${item.tag}</div>
        <div style="color:#fff;font-weight:700;font-size:14px;margin-bottom:6px">${item.head}</div>
        <div style="color:#aaa;font-size:12px">${item.detail}</div>
      </div>
      <div class="modal-options">
        <button class="option-btn" onclick="G.closeModal()" style="text-align:center;font-weight:700">收到 <span id="intelCountdown" style="color:#555">(3s)</span></button>
      </div>`;
    document.getElementById('modalOverlay').classList.add('show');
    // Auto-close countdown
    let sec = 3;
    if (this._intelTimer) clearInterval(this._intelTimer);
    this._intelTimer = setInterval(() => {
      sec--;
      const cd = document.getElementById('intelCountdown');
      if (cd) cd.textContent = `(${sec}s)`;
      if (sec <= 0) {
        clearInterval(this._intelTimer); this._intelTimer = null;
        if (document.getElementById('modalOverlay').classList.contains('show')) this.closeModal();
      }
    }, 1000);
  },

  // ===== RENDER =====
  render() {
    if (this.s.phase === 2) { this.p2Render(); return; }
    this.updateStatusBar();
    this.updateAppBar();
    this.updateModulePanel();
    this.updateWarehouseUI();
    this.updateCountdown();
  },

  updateStatusBar() {
    const s = this.s;
    const baseName = this.BASE_TIERS[s.baseLv].name;
    document.getElementById('statusBar').innerHTML = `
      <div class="status-item"><div class="label">CASH</div><div class="value cash" id="vCash">${this.fmtMoney(s.cash)}</div></div>
      <div class="status-item"><div class="label">DEBT</div><div class="value debt">${this.fmtMoney(s.debt)}</div></div>
      <div class="status-item"><div class="label">CHILL</div><div class="value chill">Lv${Math.floor(s.euphoria/20)}</div></div>
      <div class="status-item"><div class="label">SPACE</div><div class="value" style="color:${s.used/s.capacity>0.8?'#FF3B30':'#556'}">${s.used}/${s.capacity}</div></div>`;
  },

  fmtMoney(v) {
    if (v >= 10000000) return `¥${(v/10000000).toFixed(1)}kw`;
    if (v >= 10000) return `¥${(v/10000).toFixed(1)}万`;
    return `¥${v.toLocaleString()}`;
  },

  updateAppBar() {
    const bar = document.getElementById('appBar');
    bar.innerHTML = this.APPS.map(a => {
      return `<button class="app-btn ${this.s.app===a.id?'active':''}" data-app="${a.id}" onclick="G.switchApp('${a.id}')">
        <div class="icon">${a.icon}</div><div class="name">${a.name}</div></button>`;
    }).join('');
  },

  updateModulePanel() {
    const panel = document.getElementById('modulePanel'), s = this.s;

    if (s.app === 'finance') {
      // 极简3按钮搞钱
      let html = `<div class="m-header"><span>💰 搞钱</span><span style="color:#888;font-size:10px">没钱了？点亮着的按钮</span></div><div class="fin-btns">`;
      this.FINANCE_BTNS.forEach(btn => {
        const count = s.finCount[btn.id] || 0;
        const maxed = count >= btn.maxUses;
        const unlocked = btn.unlockCheck(s);
        const cls = maxed ? 'maxed' : unlocked ? 'lit' : 'locked';
        const remain = btn.maxUses - count;
        html += `<div class="fin-btn ${cls}" onclick="G.doFinance('${btn.id}')">
          <div class="fin-icon">${btn.icon}</div>
          <div class="fin-body">
            <div class="fin-name">${btn.name}</div>
            <div class="fin-desc">${btn.desc}</div>
            <div class="fin-amount">${maxed ? '' : (btn.amountLabel || '每次 '+this.fmtMoney(btn.amount)) + (btn.maxUses > 1 && remain < btn.maxUses ? ' · 剩'+remain+'次' : '')}</div>
          </div>
          <span class="fin-btn-tag">${maxed ? '已刷爆' : '🔒'}</span>
        </div>`;
      });
      html += '</div>';
      panel.innerHTML = html;

    } else if (s.app === 'shop') {
      // Shop: buy 1 unit at listed price (not x100)
      const grouped = {};
      this.ITEMS.forEach(it => { if (!grouped[it.cat]) grouped[it.cat]=[]; grouped[it.cat].push(it); });
      let html = `<div class="m-header"><span>🛒 末日掏宝 (物价x${this.priceMul(0).toFixed(1)})</span></div>`;
      Object.entries(grouped).forEach(([cat, items]) => {
        html += `<div style="color:#556;font-size:10px;font-weight:700;font-family:'JetBrains Mono',monospace;letter-spacing:1px;margin:6px 0 3px">${cat}</div><div class="m-grid">`;
        items.forEach(it => {
          const p = Math.floor(it.price * this.priceMul(it.price));
          const owned = s.stock[it.id] || 0;
          html += `<button class="m-item" onclick="G.buy('${it.id}')">
            <div class="title">${it.icon} ${it.name}</div>
            <div class="desc">${this.fmtMoney(p)} | ${it.vol}m³ | +${it.chill}松弛</div>
            ${owned > 0 ? `<div class="owned">×${owned}</div>` : ''}</button>`;
        });
        html += '</div>';
      });
      panel.innerHTML = html;

    } else if (s.app === 'base') {
      // Base upgrades
      let html = `<div class="m-header"><span>🏗️ 避难所升级 (当前容量: ${s.capacity}m³)</span></div>`;
      this.BASE_TIERS.forEach((tier, i) => {
        const isCurrent = s.baseLv === i;
        const isDone = s.baseLv > i;
        const isNext = s.baseLv === i - 1 || (i === 0 && s.baseLv === 0);
        const canAfford = s.cash >= tier.cost;
        if (i === 0) {
          html += `<div class="base-card ${isCurrent?'current':'done'}">
            <div class="base-name">${isCurrent?'📍 当前：':'✓ '}${tier.name}</div>
            <div class="base-desc">容量 ${tier.cap}m³ · ${tier.desc}</div></div>`;
        } else {
          html += `<div class="base-card ${isDone?'done':''} ${isCurrent?'current':''}">
            <div class="base-name">${isDone?'✓ ':isCurrent?'📍 当前：':'🔒 '}Lv${i} ${tier.name}</div>
            <div class="base-desc">${tier.cap.toLocaleString()}m³ · ${this.fmtMoney(tier.cost)} · ${tier.desc}</div>
            ${!isDone && !isCurrent && s.baseLv === i-1 ?
              `<button class="base-btn" ${canAfford?`onclick="G.upgradeBase(${i})"`:'disabled'}>
                ${canAfford?`升级 (${this.fmtMoney(tier.cost)})`:`余额不足 (需${this.fmtMoney(tier.cost)})`}
              </button>`:''}</div>`;
        }
      });
      panel.innerHTML = html;

    }
  },

  updateWarehouseUI() {
    const s = this.s;
    const pct = s.capacity > 0 ? Math.min(100, (s.used / s.capacity) * 100) : 0;
    const fill = document.getElementById('capFill');
    fill.style.width = pct + '%';
    fill.className = 'cap-fill ' + (pct > 80 ? 'red' : pct > 50 ? 'yellow' : 'green');
    const ct = document.getElementById('capText');
    if (pct > 80) ct.textContent = `⚠ 告急 ${pct.toFixed(0)}% (${s.used}/${s.capacity}m³)`;
    else if (pct > 50) ct.textContent = `紧张 ${pct.toFixed(0)}% (${s.used}/${s.capacity}m³)`;
    else ct.textContent = `充裕 ${pct.toFixed(0)}% (${s.used}/${s.capacity}m³)`;
    WH.phase = pct > 80 ? 'red' : pct > 50 ? 'yellow' : 'green';
    document.getElementById('spaceWarn').style.display = pct > 80 ? 'block' : 'none';
    if (pct > 80) {
      const w = document.getElementById('warehouseWrap');
      w.classList.add('shake');
      setTimeout(() => w.classList.remove('shake'), 400);
    }
  },

  // ===== FINANCE ACTIONS (极简3按钮) =====
  doFinance(btnId) {
    const s = this.s;
    if (s.done) return;
    const btn = this.FINANCE_BTNS.find(b => b.id === btnId);
    if (!btn || !btn.unlockCheck(s)) return;
    const count = s.finCount[btnId] || 0;
    if (count >= btn.maxUses) return; // maxed out

    // Special: crypto gamble (all-in)
    if (btnId === 'crypto') {
      if (s.cash <= 0) { SFX.play('error'); this.notif('₿ 没钱梭什么？','danger'); return; }
      s.finCount.crypto = 1;
      const bet = s.cash;
      const flash = document.createElement('div'); flash.className='fin-flash'; document.body.appendChild(flash); setTimeout(()=>flash.remove(),500);
      if (Math.random() < 0.5) {
        s.cash *= 2; s.debt += bet;
        SFX.play('cash');
        this.notif(`₿ 暴涨翻倍！${this.fmtMoney(s.cash)}！`,'money');
        this.log(`₿ 加密货币翻倍！资产暴涨至 ${this.fmtMoney(s.cash)}`);
      } else {
        s.cash = 0;
        SFX.play('error');
        this.notif('₿ 崩盘清零！血本无归！','danger');
        this.log('₿ 加密货币崩盘！全部现金蒸发！');
      }
      this.animateCash(); this.render(); return;
    }

    // Increment use count
    s.finCount[btnId] = count + 1;
    // Roll random amount for blind-box tiers, or use fixed amount
    const actualAmount = btn.rollAmount ? btn.rollAmount() : btn.amount;
    s.cash += actualAmount;
    s.debt += actualAmount;
    const remaining = btn.maxUses - s.finCount[btnId];

    SFX.play('cash');
    // Tag debt flags for Phase 2 consequences
    if (btnId === 'loan') s.flags.heavy_debt = true;
    if (btnId === 'mortgage') s.flags.extreme_debt = true;
    // Feedback per type
    if (btnId === 'mortgage') {
      const flash = document.createElement('div');
      flash.className = 'fin-flash';
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 500);
      this.notif(`🏠🚗📈 全部家当变现！+${this.fmtMoney(actualAmount)}！`, 'danger');
      this.log(`🔥 一键抵押！评估结果：账户瞬间 +${this.fmtMoney(actualAmount)}`);
    } else if (btnId === 'loan') {
      this.notif(`📱 系统审批中… 批了 ${this.fmtMoney(actualAmount)}！${remaining > 0 ? ' (还剩'+remaining+'次)' : ''}`, 'money');
      this.log(`📱 网贷盲批到账 +${this.fmtMoney(actualAmount)}（运气${actualAmount >= 3000000?'爆棚':'一般'}）`);
    } else if (btnId === 'darkloan') {
      s.flags.usedDarkLoan = true;
      this.notif(`🏴 黑市到账 +${this.fmtMoney(actualAmount)}！来世再还`, 'money');
      this.log(`🏴 黑市高利贷到账 +${this.fmtMoney(actualAmount)}`);
    } else {
      this.notif(`💳 刷卡 +${this.fmtMoney(actualAmount)}${remaining > 0 ? ' (还剩'+remaining+'次)' : ' 额度刷爆！'}`, 'money');
      this.log(`💳 信用卡套现 +${this.fmtMoney(actualAmount)}`);
    }

    this.animateCash();
    this.checkMortgageUnlock();
    if (this.s.tutorialStep === 1) this.tutorialStep2();
    this.render();
  },

  // ===== BASE UPGRADE =====
  upgradeBase(lv) {
    const tier = this.BASE_TIERS[lv];
    if (!tier || this.s.cash < tier.cost) { SFX.play('error'); this.notif('❌ 余额不足','danger'); return; }
    this.s.cash -= tier.cost;
    this.s.baseLv = lv;
    // capacity is the tier's total, not additive
    this.s.capacity = tier.cap;
    SFX.play('upgrade');
    this.log(`🏗️ 升级至【${tier.name}】总容量${tier.cap.toLocaleString()}m³！`);
    this.notif(`🏗️ ${tier.name} 解锁！容量${this.s.capacity}m³`, 'success');
    if (this.s.tutorialStep === 3) this.tutorialStep4();
    this.render();
  },

  // ===== SHOP =====
  switchApp(id) {
    this.s.app = id;
    if (id === 'shop' && this.s.tutorialStep === 1 && this.s.cash > 0) this.tutorialStep2();
    if (id === 'base' && this.s.tutorialStep === 3) { document.querySelectorAll('.tutorial-highlight').forEach(e => e.classList.remove('tutorial-highlight')); this.removeTip(); }
    this.updateAppBar();
    this.updateModulePanel();
  },

  buy(itemId) {
    const s = this.s;
    if (s.done) return;
    const item = this.ITEMS.find(x => x.id === itemId);
    if (!item) return;
    const cost = Math.floor(item.price * this.priceMul(item.price));
    if (s.cash < cost) { SFX.play('error'); this.notif('❌ 现金不足！去搞钱','danger'); return; }
    if (s.used + item.vol > s.capacity) {
      SFX.play('error'); this.notif('❌ 空间满了！去基建App升级','danger');
      if (this.s.tutorialStep <= 3) this.tutorialStep3();
      return;
    }
    s.cash -= cost;
    s.used += item.vol;
    s.stock[itemId] = (s.stock[itemId] || 0) + 1;
    s.euphoria += item.chill;

    WH.addItem(item, 1);
    SFX.play('buy');
    this.log(`${item.icon} ${item.name} -${this.fmtMoney(cost)} +${item.chill}松弛`);
    this.notif(`${item.icon} ${item.name}入库！`, 'success');
    if (this.s.tutorialStep === 2 && s.used >= s.capacity * 0.8) this.tutorialStep3();
    this.render();
  },

  animateCash() {
    const el = document.getElementById('vCash');
    if (el) { el.classList.add('slot-num','rolling'); setTimeout(()=>el.classList.remove('rolling'),300); }
    this.notif(`💰 余额 ${this.fmtMoney(this.s.cash)}`, 'money');
  },

  // ===== EVENTS =====
  triggerRandomEvent() {
    const avail = this.EVENTS.filter(e => e.trigger());
    if (avail.length > 0) {
      const ev = avail[Math.floor(Math.random()*avail.length)];
      this.s.flags[ev.id] = true;
      this.showEventModal(ev);
    }
  },
  closeModal() {
    document.getElementById('modalOverlay').classList.remove('show');
    // Clear any auto-close timers
    if (this._intelTimer) { clearInterval(this._intelTimer); this._intelTimer = null; }
    if (this._unlockTimer) { clearInterval(this._unlockTimer); this._unlockTimer = null; }
    if (this._p2TutTimer) { clearInterval(this._p2TutTimer); this._p2TutTimer = null; }
    this.resumeGame();
  },

  showEventModal(ev) {
    // Phase 1 events with choices: pause so player can decide
    this.pauseGame();
    SFX.play('alert');
    document.getElementById('modal').innerHTML = `<h2>${ev.name}</h2>
      <div class="modal-desc">${ev.desc}</div>
      <div class="modal-options">${ev.choices.map((c,i)=>`<button class="option-btn" onclick="G.resolveEvent(${this.EVENTS.indexOf(ev)},${i})">${c.txt}</button>`).join('')}</div>`;
    document.getElementById('modalOverlay').classList.add('show');
  },
  resolveEvent(ei, ci) {
    this.EVENTS[ei].choices[ci].reward?.();
    this.closeModal();
    this.log(`✓ 【${this.EVENTS[ei].name}】${this.EVENTS[ei].choices[ci].txt}`);
    this.render();
  },

  // Exponential inflation: starts at x1, hits ~x4 by day -5
  priceMul(itemPrice) {
    const elapsed = 30 - Math.abs(this.s.day);
    let base = Math.min(3.5, 1 + 0.04 * elapsed + 0.02 * this.s.panic);
    if (META.has('vipcard')) base *= 0.8;
    if (this.s.flags.blackMarketDiscount) base *= 0.7;
    // Luxury items (>=500k base) get a discount to stay reachable
    if (itemPrice && itemPrice >= 500000) base *= 0.75;
    return base;
  },

  log(t) {
    this.s.logs.push(t);
    // Keep logs array bounded to prevent save bloat
    if (this.s.logs.length > 100) this.s.logs = this.s.logs.slice(-80);
    const p = document.getElementById('storyPane');
    const n = document.createElement('div'); n.className='story-node'; n.textContent=t;
    p.appendChild(n);
    // Keep only the last 20 log entries in DOM
    while (p.children.length > 20) p.removeChild(p.firstChild);
    p.scrollTop = p.scrollHeight;
  },
  notif(t, type='') {
    const el = document.getElementById('notif');
    el.textContent = t; el.className = `notif show ${type}`;
    setTimeout(() => el.classList.remove('show'), 1500);
  },
};

// Attach data arrays to G so this.APPS etc. still works
G.APPS = APPS;
G.FINANCE_BTNS = FINANCE_BTNS;
G.BASE_TIERS = BASE_TIERS;
G.ITEMS = ITEMS;
G.INTEL = INTEL;
G.EVENTS = EVENTS;
G.META_ITEMS = META_ITEMS;
G.META_REPEATS = META_REPEATS;
G.COMPANIONS = COMPANIONS;
