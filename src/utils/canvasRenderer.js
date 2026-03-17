/*  Canvas Rendering Pipeline — Multi-Layer
 *  ────────────────────────────────────────
 *  1. Draw original image         (background)
 *  2. Draw ALL text layers        (middle — in array order)
 *  3. Draw masked foreground      (top — covers text)
 *
 *  Result → every text layer appears BEHIND the subject.
 */

/* ---- foreground cache ---- */
let _fgCache = { src: null, mask: null, canvas: null };

function getCachedForeground(image, mask, w, h) {
  if (_fgCache.src === image.src && _fgCache.mask === mask && _fgCache.canvas) {
    return _fgCache.canvas;
  }
  const fg = buildForeground(image, mask, w, h);
  _fgCache = { src: image.src, mask, canvas: fg };
  return fg;
}

/* ---- main render (now accepts layers array) ---- */
export function renderCanvas(ctx, canvas, image, mask, layers, activeId) {
  const { width: w, height: h } = canvas;
  ctx.clearRect(0, 0, w, h);

  /* 1 — background image */
  ctx.drawImage(image, 0, 0, w, h);

  /* 2 — all text layers (in order: first in array = bottom) */
  layers.forEach((layer) => {
    drawText(ctx, w, h, layer);
  });

  /* 3 — foreground subject on top */
  if (mask) {
    const fg = getCachedForeground(image, mask, w, h);
    ctx.drawImage(fg, 0, 0);
  }

  /* 4 — active layer selection indicator (subtle dashed box) */
  if (activeId) {
    const active = layers.find((l) => l.id === activeId);
    if (active && active.text.trim()) {
      drawSelectionBox(ctx, w, h, active);
    }
  }
}

/* ---- text renderer (unchanged logic, now per-layer) ---- */
function drawText(ctx, cw, ch, cfg) {
  const {
    text,
    fontFamily,
    fontSize,
    fontWeight,
    color,
    opacity,
    x,
    y,
    rotation,
    letterSpacing,
    lineHeight,
  } = cfg;

  if (!text.trim()) return;

  const px = (x / 100) * cw;
  const py = (y / 100) * ch;

  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(px, py);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.font = `${fontWeight} ${fontSize}px "${fontFamily}", sans-serif`;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";

  const lines = text.split("\n");
  const gap = fontSize * lineHeight;
  const startY = -((lines.length - 1) * gap) / 2;

  lines.forEach((line, i) => {
    const ly = startY + i * gap;
    if (letterSpacing) {
      drawWithSpacing(ctx, line, 0, ly, letterSpacing);
    } else {
      ctx.textAlign = "center";
      ctx.fillText(line, 0, ly);
    }
  });

  ctx.restore();
}

function drawWithSpacing(ctx, text, cx, cy, spacing) {
  ctx.textAlign = "left";
  const chars = [...text];
  const widths = chars.map((c) => ctx.measureText(c).width);
  const total = widths.reduce((s, w) => s + w, 0) + spacing * (chars.length - 1);

  let x = cx - total / 2;
  chars.forEach((c, i) => {
    ctx.fillText(c, x, cy);
    x += widths[i] + spacing;
  });
}

/* ---- selection indicator ---- */
function drawSelectionBox(ctx, cw, ch, layer) {
  const px = (layer.x / 100) * cw;
  const py = (layer.y / 100) * ch;

  ctx.save();
  ctx.translate(px, py);
  ctx.rotate((layer.rotation * Math.PI) / 180);
  ctx.font = `${layer.fontWeight} ${layer.fontSize}px "${layer.fontFamily}", sans-serif`;

  const lines = layer.text.split("\n");
  let maxW = 0;
  lines.forEach((line) => {
    const m = ctx.measureText(line);
    if (m.width > maxW) maxW = m.width;
  });

  const totalH = lines.length * layer.fontSize * layer.lineHeight;
  const pad = 12;

  ctx.strokeStyle = "#00F0FF";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 6]);
  ctx.globalAlpha = 0.7;
  ctx.strokeRect(
    -maxW / 2 - pad,
    -totalH / 2 - pad,
    maxW + pad * 2,
    totalH + pad * 2
  );
  ctx.setLineDash([]);
  ctx.restore();
}

/* ---- build masked foreground canvas ---- */
function buildForeground(image, mask, w, h) {
  const maskCvs = document.createElement("canvas");
  maskCvs.width = w;
  maskCvs.height = h;
  const mCtx = maskCvs.getContext("2d", { willReadFrequently: true });

  const mImg = mCtx.createImageData(w, h);
  const mPx = mImg.data;
  const sx = mask.width / w;
  const sy = mask.height / h;

  for (let row = 0; row < h; row++) {
    for (let col = 0; col < w; col++) {
      const idx = (row * w + col) * 4;
      const mx = Math.floor(col * sx);
      const my = Math.floor(row * sy);
      const fg = mask.data[my * mask.width + mx] === 1;

      mPx[idx] = 255;
      mPx[idx + 1] = 255;
      mPx[idx + 2] = 255;
      mPx[idx + 3] = fg ? 255 : 0;
    }
  }
  mCtx.putImageData(mImg, 0, 0);

  const softCvs = document.createElement("canvas");
  softCvs.width = w;
  softCvs.height = h;
  const sCtx = softCvs.getContext("2d");
  sCtx.filter = "blur(4px)";
  sCtx.drawImage(maskCvs, 0, 0);
  sCtx.filter = "none";

  const fgCvs = document.createElement("canvas");
  fgCvs.width = w;
  fgCvs.height = h;
  const fgCtx = fgCvs.getContext("2d");
  fgCtx.drawImage(image, 0, 0, w, h);
  fgCtx.globalCompositeOperation = "destination-in";
  fgCtx.drawImage(softCvs, 0, 0);
  fgCtx.globalCompositeOperation = "source-over";

  return fgCvs;
}