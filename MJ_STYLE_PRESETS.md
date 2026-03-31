# 《末日重生模拟器》MJ 统一审美预设

用于统一所有素材的光影、色彩深度、结构密度。默认基于当前母版图风格（深色工业壳体 + 青蓝霓虹电路）。

## 1) 全局固定参数（整项目不改）

- `--v 6`
- `--style raw`
- `--ar 16:9`
- `--s 120`
- `--chaos 5`
- `--seed 24680`

建议：整批图保持同一组参数和 seed，稳定性最高。

## 2) 固定负面约束（每条 prompt 都加）

`no orange lighting, no purple-magenta dominant glow, no fantasy ornaments, no organic textures, no random logos, no asymmetrical chaos, no overexposure, no grunge dirt overload, no handwritten text`

## 3) 色彩和光影硬标准

- 主色：`#0A1118` / `#1A2430` / `#273341`
- 发光：`#00B7FF` / `#5DD7FF`
- 警报仅点缀：`#FF3B30`（占比 < 5%）
- 低键照明：整体暗，局部线条发光，中心留黑区可叠 UI

## 4) 母版基础 Prompt（通用）

```text
dark sci-fi tactical control panel HUD frame, industrial hard-surface shell, symmetric composition, deep matte gunmetal body, neon cyan circuit traces, subtle bloom glow, center display area kept clean and dark, crisp vector-like panel lines, high contrast low-key lighting, cinematic ambient occlusion, precise edge highlights, minimal color palette (black/blue/cyan), no warm tones, no clutter, no characters, no photoreal scene background --style raw --ar 16:9 --v 6 --s 120 --chaos 5 --seed 24680 --no orange lighting, purple-magenta dominant glow, fantasy ornaments, organic textures, random logos, asymmetrical chaos, overexposure, grunge dirt overload, handwritten text
```

## 5) 5个可直接套用场景（已填好，可直接跑）

### A. 主界面底板（Home HUD）

```text
dark sci-fi HUD main frame for doomsday stockpile simulator home screen, industrial shell border, balanced left-right control columns, large central empty screen area, cyan neon circuitry, minimal labels, crisp panel geometry, low-key cinematic lighting, deep blacks, subtle bloom, high readability --style raw --ar 16:9 --v 6 --s 120 --chaos 5 --seed 24680 --no orange lighting, purple-magenta dominant glow, fantasy ornaments, organic textures, random logos, asymmetrical chaos, overexposure, grunge dirt overload, handwritten text
```

### B. 告警弹窗底板（Warning Panel）

```text
dark sci-fi warning popup panel for WARNING: CRITICAL STORAGE OVERLOAD, compact metallic frame, cyan main lines with tiny red alert accents, clean segmented layout, strong edge highlights, low-key lighting, high contrast, readable center area for text overlay --style raw --ar 16:9 --v 6 --s 120 --chaos 5 --seed 24680 --no orange lighting, purple-magenta dominant glow, fantasy ornaments, organic textures, random logos, asymmetrical chaos, overexposure, grunge dirt overload, handwritten text
```

### C. 竖向进度容器（Capacity Module）

```text
vertical industrial capacity module UI, dark gunmetal housing, cyan circuit engravings, glowing segmented meter channel, pressure-ready structure, minimal brutal sci-fi style, clean silhouette, high contrast low-key render --style raw --ar 16:9 --v 6 --s 120 --chaos 5 --seed 24680 --no orange lighting, purple-magenta dominant glow, fantasy ornaments, organic textures, random logos, asymmetrical chaos, overexposure, grunge dirt overload, handwritten text
```

### D. 按钮组图块（Command Buttons）

```text
set of tactical command buttons for BUY MAX, ENTER, ALERT, MENU, NAV-, NAV+, industrial square buttons, cyan edge glow, matte metal body, subtle depth and shadow, aligned grid composition, clean icon slots, dark sci-fi control deck style --style raw --ar 16:9 --v 6 --s 120 --chaos 5 --seed 24680 --no orange lighting, purple-magenta dominant glow, fantasy ornaments, organic textures, random logos, asymmetrical chaos, overexposure, grunge dirt overload, handwritten text
```

### E. 空屏背景（Content Backplate）

```text
dark sci-fi content backplate, center display window with minimal border glow, surrounding industrial frame details, cyan circuit lines around edges only, center area intentionally clean for UI content compositing, low-key cinematic shading --style raw --ar 16:9 --v 6 --s 120 --chaos 5 --seed 24680 --no orange lighting, purple-magenta dominant glow, fantasy ornaments, organic textures, random logos, asymmetrical chaos, overexposure, grunge dirt overload, handwritten text
```

## 6) 快速调整规则（只动三项）

- 想更“硬核冷峻”：`--s 100`，并加 `reduced bloom, sharper edges`
- 想更“霓虹科技”：`--s 150`，并加 `slightly stronger cyan glow, still low-key`
- 变体太跳：`--chaos 2`（收敛风格）

## 7) 批量生成建议

1. 第一张先用母版图做参考并固定 seed。  
2. 同一批次只改主题词，不改参数。  
3. 每 8-12 张抽检一次：黑位是否稳定、青蓝是否偏色、发光面积是否过量。  
4. 一旦出现暖色污染，立即回退到 `--s 100` 并强化 `no warm tones`。  

## 8) 你项目专用现成指令（复制即跑）

### 01. 爆仓主界面（容量条+告警位）

```text
dark sci-fi HUD main frame for doomsday stockpile simulator with vertical capacity bar area on right side, central content window clean and dark, industrial hard-surface shell, cyan neon circuitry, subtle red micro-alert accents, low-key cinematic lighting, deep blacks, crisp panel lines, high readability for mobile game UI --style raw --ar 16:9 --v 6 --s 120 --chaos 5 --seed 24680 --no orange lighting, purple-magenta dominant glow, fantasy ornaments, organic textures, random logos, asymmetrical chaos, overexposure, grunge dirt overload, handwritten text
```

### 02. WARNING 弹窗底图（像素故障风）

```text
dark sci-fi warning popup panel, text area for WARNING: CRITICAL, glitch-ready frame with cyan circuitry and tiny red accent lines, compact brutal industrial border, clean center zone for overlay text, high contrast low-key lighting, minimal palette black blue cyan --style raw --ar 16:9 --v 6 --s 120 --chaos 5 --seed 24680 --no orange lighting, purple-magenta dominant glow, fantasy ornaments, organic textures, random logos, asymmetrical chaos, overexposure, grunge dirt overload, handwritten text
```

### 03. 暴力容量容器（单体资产）

```text
single vertical industrial capacity container module, pressure chamber style, segmented meter channel, crack-ready outer frame, cyan edge glow with subtle emergency red pin accents, dark matte metal texture, clean silhouette, low-key lighting --style raw --ar 9:16 --v 6 --s 120 --chaos 5 --seed 24680 --no orange lighting, purple-magenta dominant glow, fantasy ornaments, organic textures, random logos, asymmetrical chaos, overexposure, grunge dirt overload, handwritten text
```

### 04. 功能按钮整套（控制台）

```text
tactical command button set for BUY MAX, STORE, UPGRADE, ALERT, MENU, NAV, industrial square button kit, cyan neon borders, matte gunmetal body, high contrast low-key render, clean consistent spacing, game UI atlas style --style raw --ar 16:9 --v 6 --s 120 --chaos 5 --seed 24680 --no orange lighting, purple-magenta dominant glow, fantasy ornaments, organic textures, random logos, asymmetrical chaos, overexposure, grunge dirt overload, handwritten text
```

