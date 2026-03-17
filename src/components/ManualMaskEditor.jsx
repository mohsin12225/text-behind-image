import React, { useRef, useState, useEffect, useCallback } from "react";

/**
 * Full‑screen overlay that lets the user paint a foreground mask
 * with a brush / eraser.  The painted area becomes the "subject"
 * that text will appear behind.
 *
 * Props
 *   image        – HTMLImageElement (the uploaded photo)
 *   initialMask  – { data, width, height } | null
 *   onComplete   – (mask) => void
 *   onCancel     – () => void
 */
export default function ManualMaskEditor({
  image,
  initialMask,
  onComplete,
  onCancel,
}) {
  /* ---- refs ---- */
  const displayRef = useRef(null); // visible canvas
  const maskCvsRef = useRef(null); // hidden – stores mask data
  const tintCvsRef = useRef(null); // hidden – coloured overlay
  const cursorRef = useRef(null); // brush‑cursor div

  const isDrawingRef = useRef(false);
  const lastPosRef = useRef(null);
  const needsRenderRef = useRef(true);
  const rafRef = useRef(null);

  /* ---- state (drives UI) ---- */
  const [brushSize, setBrushSize] = useState(40);
  const [tool, setTool] = useState("brush"); // "brush" | "eraser"

  /* keep refs in sync so event callbacks never go stale */
  const brushRef = useRef(brushSize);
  const toolRef = useRef(tool);
  useEffect(() => {
    brushRef.current = brushSize;
  }, [brushSize]);
  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);

  const imgW = image.naturalWidth;
  const imgH = image.naturalHeight;

  /* ============================================================
     INIT – create hidden canvases, seed with existing mask
     ============================================================ */
  useEffect(() => {
    const maskCvs = document.createElement("canvas");
    maskCvs.width = imgW;
    maskCvs.height = imgH;
    maskCvsRef.current = maskCvs;

    const tintCvs = document.createElement("canvas");
    tintCvs.width = imgW;
    tintCvs.height = imgH;
    tintCvsRef.current = tintCvs;

    const display = displayRef.current;
    display.width = imgW;
    display.height = imgH;

    /* seed from auto‑detected mask (if any) */
    if (initialMask) {
      const mCtx = maskCvs.getContext("2d");
      const id = mCtx.createImageData(imgW, imgH);
      const sx = initialMask.width / imgW;
      const sy = initialMask.height / imgH;

      for (let row = 0; row < imgH; row++) {
        for (let col = 0; col < imgW; col++) {
          const mi =
            Math.floor(row * sy) * initialMask.width + Math.floor(col * sx);
          if (initialMask.data[mi] === 1) {
            const pi = (row * imgW + col) * 4;
            id.data[pi] = 255;
            id.data[pi + 1] = 255;
            id.data[pi + 2] = 255;
            id.data[pi + 3] = 255;
          }
        }
      }
      mCtx.putImageData(id, 0, 0);
    }

    needsRenderRef.current = true;

    /* render loop */
    const loop = () => {
      if (needsRenderRef.current) {
        renderDisplay();
        needsRenderRef.current = false;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ============================================================
     DISPLAY COMPOSITE  (image + coloured mask overlay)
     ============================================================ */
  const renderDisplay = useCallback(() => {
    const display = displayRef.current;
    const maskCvs = maskCvsRef.current;
    const tintCvs = tintCvsRef.current;
    if (!display || !maskCvs || !tintCvs) return;

    const dCtx = display.getContext("2d");
    const tCtx = tintCvs.getContext("2d");

    /* 1 — original image */
    dCtx.clearRect(0, 0, imgW, imgH);
    dCtx.drawImage(image, 0, 0);

    /* 2 — dim non‑selected area */
    dCtx.fillStyle = "rgba(0,0,0,0.45)";
    dCtx.fillRect(0, 0, imgW, imgH);

    /* 3 — punch bright image back in where mask exists */
    const bright = document.createElement("canvas");
    bright.width = imgW;
    bright.height = imgH;
    const bCtx = bright.getContext("2d");
    bCtx.drawImage(image, 0, 0);
    bCtx.globalCompositeOperation = "destination-in";
    bCtx.drawImage(maskCvs, 0, 0);
    dCtx.drawImage(bright, 0, 0);

    /* 4 — tinted highlight */
    tCtx.clearRect(0, 0, imgW, imgH);
    tCtx.fillStyle = "#6366f1";
    tCtx.fillRect(0, 0, imgW, imgH);
    tCtx.globalCompositeOperation = "destination-in";
    tCtx.drawImage(maskCvs, 0, 0);
    tCtx.globalCompositeOperation = "source-over";

    dCtx.save();
    dCtx.globalAlpha = 0.25;
    dCtx.drawImage(tintCvs, 0, 0);
    dCtx.restore();
  }, [image, imgW, imgH]);

  /* ============================================================
     COORDINATE MAPPING
     ============================================================ */
  const coords = useCallback(
    (e) => {
      const r = displayRef.current.getBoundingClientRect();
      const cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
      return {
        x: (cx / r.width) * imgW,
        y: (cy / r.height) * imgH,
      };
    },
    [imgW, imgH]
  );

  /* ============================================================
     PAINT / ERASE  on the hidden mask canvas
     ============================================================ */
  const paint = useCallback(
    (x0, y0, x1, y1) => {
      const ctx = maskCvsRef.current?.getContext("2d");
      if (!ctx) return;

      const rect = displayRef.current.getBoundingClientRect();
      const scale = imgW / rect.width;
      const radius = (brushRef.current * scale) / 2;

      ctx.globalCompositeOperation =
        toolRef.current === "eraser" ? "destination-out" : "source-over";
      ctx.fillStyle = "#ffffff";

      const dx = x1 - x0;
      const dy = y1 - y0;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.floor(dist / Math.max(1, radius * 0.3)));

      for (let i = 0; i <= steps; i++) {
        const t = steps === 0 ? 0 : i / steps;
        ctx.beginPath();
        ctx.arc(x0 + dx * t, y0 + dy * t, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      needsRenderRef.current = true;
    },
    [imgW]
  );

  /* ============================================================
     POINTER EVENTS
     ============================================================ */
  const onDown = useCallback(
    (e) => {
      e.preventDefault();
      isDrawingRef.current = true;
      const p = coords(e);
      lastPosRef.current = p;
      paint(p.x, p.y, p.x, p.y);
    },
    [coords, paint]
  );

  const onMove = useCallback(
    (e) => {
      /* move cursor div */
      if (cursorRef.current && !e.touches) {
        const bs = brushRef.current;
        cursorRef.current.style.left = `${e.clientX - bs / 2}px`;
        cursorRef.current.style.top = `${e.clientY - bs / 2}px`;
      }

      if (!isDrawingRef.current) return;
      e.preventDefault();

      const p = coords(e);
      const lp = lastPosRef.current || p;
      paint(lp.x, lp.y, p.x, p.y);
      lastPosRef.current = p;
    },
    [coords, paint]
  );

  const onUp = useCallback(() => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  }, []);

  /* ============================================================
     ACTIONS
     ============================================================ */
  const handleClear = () => {
    const ctx = maskCvsRef.current?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, imgW, imgH);
      needsRenderRef.current = true;
    }
  };

  const handleDone = () => {
    const ctx = maskCvsRef.current?.getContext("2d", {
      willReadFrequently: true,
    });
    if (!ctx) return;

    const id = ctx.getImageData(0, 0, imgW, imgH);
    const data = new Uint8Array(imgW * imgH);
    let fg = 0;

    for (let i = 0; i < data.length; i++) {
      data[i] = id.data[i * 4 + 3] > 128 ? 1 : 0;
      if (data[i]) fg++;
    }

    if (fg === 0) {
      alert("Paint over the object you want text to appear behind.");
      return;
    }

    onComplete({ data, width: imgW, height: imgH });
  };

  /* ============================================================
     JSX
     ============================================================ */
  return (
    <div className="mask-overlay">
      {/* custom brush cursor (mouse only) */}
      <div
        ref={cursorRef}
        className={`brush-cursor ${
          tool === "eraser" ? "brush-cursor--eraser" : ""
        }`}
        style={{
          width: brushSize,
          height: brushSize,
          display: "none",
        }}
      />

      <div className="mask-editor">
        {/* toolbar */}
        <div className="mask-toolbar">
          <div className="mask-tools">
            <button
              className={`btn btn--sm ${
                tool === "brush" ? "btn--primary" : "btn--outline"
              }`}
              onClick={() => setTool("brush")}
            >
              🖌️ Brush
            </button>
            <button
              className={`btn btn--sm ${
                tool === "eraser" ? "btn--primary" : "btn--outline"
              }`}
              onClick={() => setTool("eraser")}
            >
              🧹 Eraser
            </button>

            <label className="mask-slider">
              <span>Size {brushSize}</span>
              <input
                type="range"
                min={5}
                max={150}
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="mask-actions">
            <button
              className="btn btn--sm btn--outline"
              onClick={handleClear}
            >
              Clear
            </button>
            <button className="btn btn--sm btn--outline" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn--sm btn--primary" onClick={handleDone}>
              ✓ Apply Mask
            </button>
          </div>
        </div>

        {/* canvas */}
        <div className="mask-canvas-wrap">
          <canvas
            ref={displayRef}
            className="mask-canvas"
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={onUp}
            onMouseLeave={(e) => {
              onUp();
              if (cursorRef.current)
                cursorRef.current.style.display = "none";
            }}
            onMouseEnter={() => {
              if (cursorRef.current)
                cursorRef.current.style.display = "block";
            }}
            onTouchStart={onDown}
            onTouchMove={onMove}
            onTouchEnd={onUp}
          />
        </div>

        <p className="mask-hint">
          🎨 Paint over the object you want text to appear{" "}
          <strong>behind</strong>. Use the eraser to correct mistakes.
        </p>
      </div>
    </div>
  );
}