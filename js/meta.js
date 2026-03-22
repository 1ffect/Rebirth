// ========================================
// META PERSISTENCE (cross-run progression)
// ========================================
const META = {
  KEY: 'doomsday_meta_v1',
  data: null,
  load() {
    try { this.data = JSON.parse(localStorage.getItem(this.KEY)) || this.fresh(); }
    catch(e) { this.data = this.fresh(); }
  },
  save() {
    try { localStorage.setItem(this.KEY, JSON.stringify(this.data)); } catch(e) {}
  },
  fresh() { return { points:0, unlocked:[], runCount:0, bestScore:0, repeatLevels:{} }; },
  has(id) { return this.data && this.data.unlocked.includes(id); },
  buy(id, cost) {
    if (!this.data || this.data.points < cost || this.has(id)) return false;
    this.data.points -= cost;
    this.data.unlocked.push(id);
    this.save();
    return true;
  },
  getRepeatLv(id) { return (this.data && this.data.repeatLevels && this.data.repeatLevels[id]) || 0; },
  buyRepeat(id, cost) {
    if (!this.data) return false;
    if (!this.data.repeatLevels) this.data.repeatLevels = {};
    if (this.data.points < cost) return false;
    this.data.points -= cost;
    this.data.repeatLevels[id] = (this.data.repeatLevels[id] || 0) + 1;
    this.save();
    return true;
  },
  addPoints(pts) { this.data.points += pts; this.save(); },
};
