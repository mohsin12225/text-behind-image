

import React, { useEffect, useCallback, useRef } from "react";
import { renderCanvas } from "../utils/canvasRenderer";

export default function CanvasEditor({
  canvasRef,
  image,
  mask,
  layers,
  activeId,
  busy,
  statusMsg,
  onPositionChange,
  onLayerSelect,
}) {
  const dragging = useRef(false);

  /* ── keep a live ref so the font-load listener always reads fresh data ── */
  const renderParamsRef = useRef({ image, mask, layers, activeId });
  useEffect(() => {
    renderParamsRef.current = { image, mask, layers, activeId };
  });

  /* ═══════════════════════════════════════
     FIX #3 — Synchronous canvas repaint
     whenever ANY dependency changes
     ═══════════════════════════════════════ */
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs || !image) return;

    const w = image.naturalWidth;
    const h = image.naturalHeight;

    /* only reset dimensions when they actually differ —
       assigning the same value still clears the canvas per spec */
    if (cvs.width !== w || cvs.height !== h) {
      cvs.width = w;
      cvs.height = h;
    }

    const ctx = cvs.getContext("2d");
    renderCanvas(ctx, cvs, image, mask, layers, activeId);
  }, [image, mask, layers, activeId, canvasRef]);

  /* ── repaint once more after any Google Font finishes loading ── */
  useEffect(() => {
    const repaint = () => {
      const cvs = canvasRef.current;
      const p = renderParamsRef.current;
      if (cvs && p.image) {
        const ctx = cvs.getContext("2d");
        renderCanvas(ctx, cvs, p.image, p.mask, p.layers, p.activeId);
      }
    };

    document.fonts.addEventListener("loadingdone", repaint);
    document.fonts.ready.then(repaint);

    return () => document.fonts.removeEventListener("loadingdone", repaint);
  }, [canvasRef]);

  /* ═══════════════════════════════════════
     Coordinate helper
     ═══════════════════════════════════════ */
  const posFromEvent = useCallback(
    (e) => {
      const cvs = canvasRef.current;
      if (!cvs) return null;
      const r = cvs.getBoundingClientRect();
      const cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
      return {
        x: Math.max(0, Math.min(100, (cx / r.width) * 100)),
        y: Math.max(0, Math.min(100, (cy / r.height) * 100)),
      };
    },
    [canvasRef]
  );

  /* ═══════════════════════════════════════
     Hit-test: find topmost text layer at (px%, py%)
     ═══════════════════════════════════════ */
  const hitTestLayer = useCallback(
    (px, py) => {
      const cvs = canvasRef.current;
      if (!cvs || !layers.length) return null;

      const w = cvs.width;
      const h = cvs.height;

      for (let i = layers.length - 1; i >= 0; i--) {
        const l = layers[i];
        if (!l.text.trim()) continue;

        const lx = (l.x / 100) * w;
        const ly = (l.y / 100) * h;

        const ctx = cvs.getContext("2d");
        ctx.save();
        ctx.font = `${l.fontWeight} ${l.fontSize}px "${l.fontFamily}", sans-serif`;
        const lines = l.text.split("\n");
        let maxW = 0;
        lines.forEach((line) => {
          const m = ctx.measureText(line);
          if (m.width > maxW) maxW = m.width;
        });
        ctx.restore();

        const totalH = lines.length * l.fontSize * l.lineHeight;
        const halfW = maxW / 2 + 20;
        const halfH = totalH / 2 + 20;

        const clickX = (px / 100) * w;
        const clickY = (py / 100) * h;
        const dx = clickX - lx;
        const dy = clickY - ly;

        const angle = (-l.rotation * Math.PI) / 180;
        const ldx = dx * Math.cos(angle) - dy * Math.sin(angle);
        const ldy = dx * Math.sin(angle) + dy * Math.cos(angle);

        if (Math.abs(ldx) < halfW && Math.abs(ldy) < halfH) {
          return l.id;
        }
      }
      return null;
    },
    [layers, canvasRef]
  );

  /* ═══════════════════════════════════════
     FIX #1 + #2  —  pointer event handlers
     ═══════════════════════════════════════
     
     Click different layer  → SELECT it (no move)
     Click active layer     → START DRAG (allow move)
     Click empty area       → DESELECT (activeId → null)
  */
  const down = useCallback(
    (e) => {
      e.preventDefault();
      const p = posFromEvent(e);
      if (!p) return;

      const hitId = hitTestLayer(p.x, p.y);

      /* ── empty area: deselect ── */
      if (!hitId) {
        onLayerSelect(null);
        dragging.current = false;
        return;
      }

      /* ── different layer: just select, NO move ── */
      if (hitId !== activeId) {
        onLayerSelect(hitId);
        dragging.current = false;
        return;
      }

      /* ── same (active) layer: start drag ── */
      dragging.current = true;
      onPositionChange(p.x, p.y);
    },
    [posFromEvent, hitTestLayer, activeId, onLayerSelect, onPositionChange]
  );

  const move = useCallback(
    (e) => {
      if (!dragging.current) return;
      const p = posFromEvent(e);
      if (p) onPositionChange(p.x, p.y);
    },
    [posFromEvent, onPositionChange]
  );

  const up = useCallback(() => {
    dragging.current = false;
  }, []);

  /* ═══════════════════════════════════════
     JSX
     ═══════════════════════════════════════ */
  return (
    <div className="canvas-wrap">
      {busy && (
        <div className="canvas-overlay">
          <div className="spinner" />
          <p>{statusMsg || "Processing..."}</p>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="canvas"
        onMouseDown={down}
        onMouseMove={move}
        onMouseUp={up}
        onMouseLeave={up}
        onTouchStart={down}
        onTouchMove={move}
        onTouchEnd={up}
      />
    </div>
  );
}

