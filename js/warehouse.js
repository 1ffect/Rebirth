// ========================================
// PIXEL-ART WAREHOUSE RENDERER
// ========================================
const WH = {
  canvas: null, ctx: null, W: 0, H: 0,
  items: [],       // placed items [{type, x, y, age, item}]
  particles: [],   // [{x,y,vx,vy,life,maxLife,color,size}]
  phase: 'green',  // green | yellow | red
  animFrame: null,
  CELL: 44,        // grid cell size in px
  COLS: 0, ROWS: 0,
  grid: [],        // 2D occupancy grid
  dropQueue: [],   // items waiting to drop in

  init() {
    this.canvas = document.getElementById('whCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.startLoop();
  },

  resize() {
    const wrap = document.getElementById('warehouseWrap');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.W = wrap.offsetWidth;
    this.H = wrap.offsetHeight;
    this.canvas.width = this.W * dpr;
    this.canvas.height = this.H * dpr;
    this.canvas.style.width = this.W + 'px';
    this.canvas.style.height = this.H + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Recalc grid
    this.COLS = Math.floor((this.W - 20) / this.CELL);
    this.ROWS = Math.floor((this.H - 40) / this.CELL);
    this.rebuildGrid();
  },

  rebuildGrid() {
    this.grid = [];
    for (let r = 0; r < this.ROWS; r++) {
      this.grid[r] = [];
      for (let c = 0; c < this.COLS; c++) this.grid[r][c] = null;
    }
    // Re-place existing items
    this.items.forEach(it => {
      if (it.row < this.ROWS && it.col < this.COLS) this.grid[it.row][it.col] = it;
    });
  },

  // Find next empty cell from bottom-left
  findSlot() {
    for (let r = this.ROWS - 1; r >= 0; r--) {
      for (let c = 0; c < this.COLS; c++) {
        if (!this.grid[r][c]) return { row: r, col: c };
      }
    }
    return null;
  },

  // Add item blocks to warehouse
  addItem(itemDef, qty) {
    const blockCount = Math.max(1, Math.ceil(qty / 50));
    for (let i = 0; i < blockCount; i++) {
      const slot = this.findSlot();
      if (!slot) break;
      const ox = 10 + slot.col * this.CELL;
      const oy = 30 + slot.row * this.CELL;
      const it = {
        type: itemDef.drawType,
        item: itemDef,
        row: slot.row, col: slot.col,
        x: ox, y: oy,
        dropY: -50, // starts above screen
        age: 0,
        qty: i === 0 ? qty : 0,
        colors: itemDef.colors
      };
      this.grid[slot.row][slot.col] = it;
      this.items.push(it);
    }
  },

  clearAll() {
    this.items = [];
    this.particles = [];
    this.dropQueue = [];
    this.rebuildGrid();
  },

  // ===== DRAW: colored block + emoji (placeholder for MJ pixel art) =====
  drawItem(ctx, it, x, y, s, t) {
    const c0 = it.colors[0] || '#2a3040';

    // Outer block with subtle border
    ctx.fillStyle = c0;
    this.roundRect(ctx, x+2, y+2, s-4, s-4, 5); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    this.roundRect(ctx, x+2, y+2, s-4, s-4, 5); ctx.stroke();

    // Inner highlight (lighter shade at top)
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    this.roundRect(ctx, x+3, y+3, s-6, (s-4)/2, 4); ctx.fill();

    // Breathing glow at bottom edge (per-item color accent)
    const glow = 0.15 + 0.1 * Math.sin(t * 2 + it.col * 1.5 + it.row);
    const c1 = it.colors[1] || c0;
    ctx.fillStyle = c1.startsWith('#') ?
      `rgba(${parseInt(c1.slice(1,3),16)},${parseInt(c1.slice(3,5),16)},${parseInt(c1.slice(5,7),16)},${glow})` :
      c1;
    ctx.fillRect(x+4, y+s-7, s-8, 3);

    // Big centered emoji
    ctx.font = `${Math.round(s*0.52)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(it.item.icon, x+s/2, y+s/2+1);
    ctx.textAlign = 'start';
    ctx.textBaseline = 'alphabetic';
  },

  // ===== PARTICLES =====
  spawnParticles(x, y, color, count) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x, y, vx: (Math.random()-0.5)*3, vy: -Math.random()*2-1,
        life: 0, maxLife: 30+Math.random()*30,
        color, size: 2+Math.random()*3
      });
    }
  },

  updateParticles() {
    this.particles = this.particles.filter(p => {
      p.x += p.vx; p.y += p.vy;
      p.vy += 0.03;
      p.life++;
      return p.life < p.maxLife;
    });
  },

  drawParticles(ctx) {
    this.particles.forEach(p => {
      ctx.globalAlpha = 1 - p.life / p.maxLife;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (1 - p.life/p.maxLife), 0, Math.PI*2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  },

  // ===== MAIN RENDER LOOP =====
  startLoop() {
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    const loop = () => {
      this.draw();
      this.animFrame = requestAnimationFrame(loop);
    };
    loop();
  },

  stopLoop() {
    if (this.animFrame) { cancelAnimationFrame(this.animFrame); this.animFrame = null; }
  },

  draw() {
    const ctx = this.ctx;
    const t = performance.now() / 1000;

    // Background
    ctx.clearRect(0, 0, this.W, this.H);
    this.drawBunkerBg(ctx, t);

    // Items
    this.items.forEach(it => {
      // Drop animation
      if (it.dropY < it.y) {
        it.dropY += (it.y - it.dropY) * 0.15 + 1;
        if (it.dropY > it.y - 1) {
          it.dropY = it.y;
          // Landing particles
          this.spawnParticles(it.x + this.CELL/2, it.y + this.CELL, 'rgb(255,200,100)', 5);
        }
      }
      const drawY = Math.min(it.dropY, it.y);
      this.drawItem(ctx, it, it.x, drawY, this.CELL, t);

      // Qty badge
      if (it.qty > 0) {
        ctx.fillStyle = '#ff6b35';
        this.roundRect(ctx, it.x+this.CELL-16, drawY-2, 18, 12, 4); ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 8px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('×'+it.qty, it.x+this.CELL-7, drawY+8);
        ctx.textAlign = 'start';
      }
      it.age++;
    });

    // Particles
    this.updateParticles();
    this.drawParticles(ctx);

    // Ambient particles for red phase
    if (this.phase === 'red' && Math.random() < 0.15) {
      this.spawnParticles(
        10 + Math.random() * (this.W - 20),
        this.H - 10,
        'rgb(255,80,30)', 1
      );
    }
  },

  drawBunkerBg(ctx, t) {
    // Ceiling
    const ceilGrad = ctx.createLinearGradient(0, 0, 0, 10);
    ceilGrad.addColorStop(0, '#2a2a3a');
    ceilGrad.addColorStop(1, '#1a1a28');
    ctx.fillStyle = ceilGrad;
    ctx.fillRect(0, 0, this.W, 10);

    // Floor
    const floorGrad = ctx.createLinearGradient(0, this.H-14, 0, this.H);
    floorGrad.addColorStop(0, '#3a2a10');
    floorGrad.addColorStop(1, '#2a1a08');
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, this.H-14, this.W, 14);

    // Walls
    ctx.fillStyle = '#181828';
    ctx.fillRect(0, 10, 8, this.H-24);
    ctx.fillRect(this.W-8, 10, 8, this.H-24);

    // Grid lines (subtle)
    ctx.strokeStyle = this.phase === 'red' ? 'rgba(255,50,30,0.08)' :
                      this.phase === 'yellow' ? 'rgba(200,180,50,0.06)' : 'rgba(50,80,100,0.06)';
    ctx.lineWidth = 1;
    for (let x = 10; x < this.W-8; x += this.CELL) {
      ctx.beginPath(); ctx.moveTo(x, 10); ctx.lineTo(x, this.H-14); ctx.stroke();
    }
    for (let y = 30; y < this.H-14; y += this.CELL) {
      ctx.beginPath(); ctx.moveTo(8, y); ctx.lineTo(this.W-8, y); ctx.stroke();
    }
  },

  // Utility
  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
  }
};
