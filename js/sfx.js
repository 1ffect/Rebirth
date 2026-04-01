// ========================================
// SOUND EFFECTS (Web Audio API)
// ========================================
const SFX = {
  ctx: null,
  _ambience: null,
  _bgm: null,
  sfxMul: 0.45,
  bgmVol: 0.35,
  _bgmWantPlay: false,
  _bgmRetryBound: false,
  init() { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); },
  ensure() { if (!this.ctx) this.init(); if (this.ctx.state === 'suspended') this.ctx.resume(); },
  _bindBgmRetry() {
    if (this._bgmRetryBound) return;
    this._bgmRetryBound = true;
    const go = () => {
      document.removeEventListener('pointerdown', go, true);
      document.removeEventListener('keydown', go, true);
      this._bgmRetryBound = false;
      this._playBgmOnce();
    };
    document.addEventListener('pointerdown', go, true);
    document.addEventListener('keydown', go, true);
  },
  _playBgmOnce() {
    if (!this._bgm || !this._bgmWantPlay) return;
    this._bgm.volume = this.bgmVol;
    const p = this._bgm.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => this._bindBgmRetry());
    }
  },
  startBgm() {
    this._bgmWantPlay = true;
    if (!this._bgm) {
      const bgmSrc = (typeof window.__GAME_BASE__ === 'string' && window.__GAME_BASE__)
        ? new URL('assets/bgm-main.mp3', window.__GAME_BASE__).href
        : 'assets/bgm-main.mp3';
      const a = new Audio(bgmSrc);
      a.loop = true;
      a.preload = 'auto';
      this._bgm = a;
      a.addEventListener('canplay', () => this._playBgmOnce(), { once: true });
      a.load();
    }
    this._playBgmOnce();
  },
  stopBgm() {
    this._bgmWantPlay = false;
    if (!this._bgm) return;
    this._bgm.pause();
    this._bgm.currentTime = 0;
  },
  setCapacityAmbience(state) {
    this.ensure();
    if (this._ambience?.state === state) return;
    this.stopCapacityAmbience();
    const c = this.ctx;
    const now = c.currentTime;
    if (state === 'pressurized') {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = 'square';
      o.frequency.setValueAtTime(5, now);
      g.gain.setValueAtTime(0.012 * this.sfxMul, now);
      o.connect(g);
      g.connect(c.destination);
      o.start(now);
      this._ambience = { state, nodes:[o, g] };
      return;
    }
    if (state === 'critical') {
      const o = c.createOscillator();
      const lfo = c.createOscillator();
      const lfoGain = c.createGain();
      const g = c.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(1200, now);
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(8, now);
      lfoGain.gain.setValueAtTime(180, now);
      g.gain.setValueAtTime(0.03 * this.sfxMul, now);
      lfo.connect(lfoGain);
      lfoGain.connect(o.frequency);
      o.connect(g);
      g.connect(c.destination);
      o.start(now);
      lfo.start(now);
      this._ambience = { state, nodes:[o, lfo, lfoGain, g] };
    }
  },
  stopCapacityAmbience() {
    if (!this._ambience) return;
    const c = this.ctx;
    const now = c.currentTime;
    const g = this._ambience.nodes.find(n => n?.gain);
    if (g?.gain) g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    this._ambience.nodes.forEach(n => {
      if (typeof n.stop === 'function') {
        try { n.stop(now + 0.14); } catch (e) {}
      }
      if (typeof n.disconnect === 'function') n.disconnect();
    });
    this._ambience = null;
  },
  play(type) {
    this.ensure();
    const c = this.ctx, now = c.currentTime;
    const o = c.createOscillator(), g = c.createGain();
    o.connect(g); g.connect(c.destination);
    switch(type) {
      case 'cash':    o.type='square';  o.frequency.setValueAtTime(520,now); o.frequency.exponentialRampToValueAtTime(1200,now+0.08); g.gain.setValueAtTime(0.12*this.sfxMul,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.15); o.start(now); o.stop(now+0.15); break;
      case 'buy':     o.type='sine';    o.frequency.setValueAtTime(880,now); o.frequency.exponentialRampToValueAtTime(1320,now+0.06); g.gain.setValueAtTime(0.10*this.sfxMul,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.12); o.start(now); o.stop(now+0.12); break;
      case 'upgrade': o.type='triangle';o.frequency.setValueAtTime(440,now); o.frequency.exponentialRampToValueAtTime(880,now+0.1); o.frequency.exponentialRampToValueAtTime(1320,now+0.2); g.gain.setValueAtTime(0.12*this.sfxMul,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.3); o.start(now); o.stop(now+0.3); break;
      case 'error':   o.type='sawtooth';o.frequency.setValueAtTime(200,now); o.frequency.exponentialRampToValueAtTime(100,now+0.15); g.gain.setValueAtTime(0.08*this.sfxMul,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.2); o.start(now); o.stop(now+0.2); break;
      case 'alert':   o.type='square';  o.frequency.setValueAtTime(660,now); o.frequency.setValueAtTime(440,now+0.1); g.gain.setValueAtTime(0.08*this.sfxMul,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.25); o.start(now); o.stop(now+0.25); break;
      case 'buyHeavy':o.type='triangle';o.frequency.setValueAtTime(180,now); o.frequency.exponentialRampToValueAtTime(120,now+0.12); g.gain.setValueAtTime(0.13*this.sfxMul,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.22); o.start(now); o.stop(now+0.22); break;
      case 'buyLock': o.type='square';  o.frequency.setValueAtTime(110,now); o.frequency.exponentialRampToValueAtTime(80,now+0.06); g.gain.setValueAtTime(0.18*this.sfxMul,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.12); o.start(now); o.stop(now+0.12); break;
      case 'burst':   o.type='sawtooth';o.frequency.setValueAtTime(220,now); o.frequency.exponentialRampToValueAtTime(50,now+0.2); g.gain.setValueAtTime(0.14*this.sfxMul,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.28); o.start(now); o.stop(now+0.28); break;
    }
  }
};
