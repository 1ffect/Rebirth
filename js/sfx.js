// ========================================
// SOUND EFFECTS (Web Audio API)
// ========================================
const SFX = {
  ctx: null,
  init() { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); },
  ensure() { if (!this.ctx) this.init(); if (this.ctx.state === 'suspended') this.ctx.resume(); },
  play(type) {
    this.ensure();
    const c = this.ctx, now = c.currentTime;
    const o = c.createOscillator(), g = c.createGain();
    o.connect(g); g.connect(c.destination);
    switch(type) {
      case 'cash':    o.type='square';  o.frequency.setValueAtTime(520,now); o.frequency.exponentialRampToValueAtTime(1200,now+0.08); g.gain.setValueAtTime(0.12,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.15); o.start(now); o.stop(now+0.15); break;
      case 'buy':     o.type='sine';    o.frequency.setValueAtTime(880,now); o.frequency.exponentialRampToValueAtTime(1320,now+0.06); g.gain.setValueAtTime(0.10,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.12); o.start(now); o.stop(now+0.12); break;
      case 'upgrade': o.type='triangle';o.frequency.setValueAtTime(440,now); o.frequency.exponentialRampToValueAtTime(880,now+0.1); o.frequency.exponentialRampToValueAtTime(1320,now+0.2); g.gain.setValueAtTime(0.12,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.3); o.start(now); o.stop(now+0.3); break;
      case 'error':   o.type='sawtooth';o.frequency.setValueAtTime(200,now); o.frequency.exponentialRampToValueAtTime(100,now+0.15); g.gain.setValueAtTime(0.08,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.2); o.start(now); o.stop(now+0.2); break;
      case 'alert':   o.type='square';  o.frequency.setValueAtTime(660,now); o.frequency.setValueAtTime(440,now+0.1); g.gain.setValueAtTime(0.08,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.25); o.start(now); o.stop(now+0.25); break;
    }
  }
};
