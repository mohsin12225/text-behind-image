// // import React, { useEffect, useMemo } from "react";

// // const FONTS = [
// //   "Inter",
// //   "Roboto",
// //   "Open Sans",
// //   "Montserrat",
// //   "Poppins",
// //   "Playfair Display",
// //   "Oswald",
// //   "Raleway",
// //   "Ubuntu",
// //   "Merriweather",
// //   "Lato",
// //   "Nunito",
// //   "Bebas Neue",
// //   "Anton",
// //   "Archivo Black",
// //   "Black Ops One",
// //   "Bungee",
// //   "Concert One",
// //   "Lobster",
// //   "Pacifico",
// //   "Permanent Marker",
// //   "Press Start 2P",
// //   "Righteous",
// //   "Russo One",
// //   "Satisfy",
// //   "Teko",
// // ];

// // function loadFont(f) {
// //   const id = `gf-${f.replace(/\s+/g, "-")}`;
// //   if (document.getElementById(id)) return;
// //   const link = document.createElement("link");
// //   link.id = id;
// //   link.rel = "stylesheet";
// //   link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
// //     f
// //   )}:wght@400;700;900&display=swap`;
// //   document.head.appendChild(link);
// // }

// // export default function TextControls({
// //   layers,
// //   activeId,
// //   onSelect,
// //   onAdd,
// //   onDelete,
// //   onDuplicate,
// //   onChange,
// //   onReorder,
// // }) {
// //   useEffect(() => {
// //     FONTS.forEach(loadFont);
// //   }, []);

// //   const active = useMemo(
// //     () => layers.find((l) => l.id === activeId),
// //     [layers, activeId]
// //   );

// //   useEffect(() => {
// //     if (active) loadFont(active.fontFamily);
// //   }, [active?.fontFamily]);

// //   const set = (k) => (e) => onChange(activeId, k, e.target.value);
// //   const setNum = (k) => (e) => onChange(activeId, k, Number(e.target.value));

// //   const moveUp = (idx) => {
// //     if (idx > 0) onReorder(idx, idx - 1);
// //   };
// //   const moveDown = (idx) => {
// //     if (idx < layers.length - 1) onReorder(idx, idx + 1);
// //   };

// //   return (
// //     <div className="controls glass-panel">
// //       {/* ── Add button ── */}
// //       <button className="btn btn--add glow-btn" onClick={onAdd}>
// //         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
// //           <line x1="12" y1="5" x2="12" y2="19" />
// //           <line x1="5" y1="12" x2="19" y2="12" />
// //         </svg>
// //         Add New Text Layer
// //       </button>

// //       {/* ── Layers list ── */}
// //       <div className="layers-section">
// //         <h3 className="section-label">Layers</h3>
// //         <div className="layers-list">
// //           {layers.map((layer, idx) => (
// //             <div
// //               key={layer.id}
// //               className={`layer-tile ${layer.id === activeId ? "layer-tile--active" : ""}`}
// //               onClick={() => onSelect(layer.id)}
// //             >
// //               <div className="layer-tile-info">
// //                 <span className="layer-tile-index">{idx + 1}</span>
// //                 <span className="layer-tile-text">
// //                   {layer.text.substring(0, 18) || "(empty)"}
// //                   {layer.text.length > 18 ? "..." : ""}
// //                 </span>
// //               </div>

// //               <div className="layer-tile-actions" onClick={(e) => e.stopPropagation()}>
// //                 {/* move up */}
// //                 <button
// //                   className="layer-icon-btn"
// //                   onClick={() => moveUp(idx)}
// //                   disabled={idx === 0}
// //                   title="Move up"
// //                 >
// //                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="18 15 12 9 6 15" /></svg>
// //                 </button>

// //                 {/* move down */}
// //                 <button
// //                   className="layer-icon-btn"
// //                   onClick={() => moveDown(idx)}
// //                   disabled={idx === layers.length - 1}
// //                   title="Move down"
// //                 >
// //                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
// //                 </button>

// //                 {/* duplicate */}
// //                 <button
// //                   className="layer-icon-btn"
// //                   onClick={() => onDuplicate(layer.id)}
// //                   title="Duplicate"
// //                 >
// //                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
// //                     <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
// //                   </svg>
// //                 </button>

// //                 {/* delete */}
// //                 <button
// //                   className="layer-icon-btn layer-icon-btn--danger"
// //                   onClick={() => onDelete(layer.id)}
// //                   disabled={layers.length <= 1}
// //                   title="Delete"
// //                 >
// //                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <polyline points="3 6 5 6 21 6" />
// //                     <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
// //                     <path d="M10 11v6" />
// //                     <path d="M14 11v6" />
// //                     <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
// //                   </svg>
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* ── Active layer settings ── */}
// //       {active && (
// //         <div className="layer-settings">
// //           <h3 className="section-label">
// //             Settings &mdash; Layer {layers.findIndex((l) => l.id === activeId) + 1}
// //           </h3>

// //           {/* text */}
// //           <label className="field">
// //             <span className="field-label">Text</span>
// //             <textarea rows={2} value={active.text} onChange={set("text")} />
// //           </label>

// //           {/* font */}
// //           <label className="field">
// //             <span className="field-label">Font</span>
// //             <select value={active.fontFamily} onChange={set("fontFamily")}>
// //               {FONTS.map((f) => (
// //                 <option key={f} value={f}>{f}</option>
// //               ))}
// //             </select>
// //           </label>

// //           {/* weight */}
// //           <label className="field">
// //             <span className="field-label">Weight</span>
// //             <select value={active.fontWeight} onChange={set("fontWeight")}>
// //               <option value="400">Regular</option>
// //               <option value="700">Bold</option>
// //               <option value="900">Black</option>
// //             </select>
// //           </label>

// //           {/* size */}
// //           <label className="field">
// //             <span className="field-label">Size&ensp;<b>{active.fontSize}px</b></span>
// //             <input type="range" min={12} max={600} value={active.fontSize} onChange={setNum("fontSize")} />
// //           </label>

// //           {/* color */}
// //           <label className="field">
// //             <span className="field-label">Color</span>
// //             <div className="color-row">
// //               <input type="color" value={active.color} onChange={set("color")} />
// //               <span className="color-hex">{active.color}</span>
// //             </div>
// //           </label>

// //           {/* opacity */}
// //           <label className="field">
// //             <span className="field-label">Opacity&ensp;<b>{Math.round(active.opacity * 100)}%</b></span>
// //             <input type="range" min={0} max={1} step={0.01} value={active.opacity} onChange={setNum("opacity")} />
// //           </label>

// //           {/* rotation */}
// //           <label className="field">
// //             <span className="field-label">Rotation&ensp;<b>{active.rotation}&deg;</b></span>
// //             <input type="range" min={-180} max={180} value={active.rotation} onChange={setNum("rotation")} />
// //           </label>

// //           {/* letter spacing */}
// //           <label className="field">
// //             <span className="field-label">Letter spacing&ensp;<b>{active.letterSpacing}px</b></span>
// //             <input type="range" min={-10} max={60} value={active.letterSpacing} onChange={setNum("letterSpacing")} />
// //           </label>

// //           {/* line height */}
// //           <label className="field">
// //             <span className="field-label">Line height&ensp;<b>{active.lineHeight.toFixed(1)}</b></span>
// //             <input type="range" min={0.5} max={3} step={0.05} value={active.lineHeight} onChange={setNum("lineHeight")} />
// //           </label>

// //           {/* position */}
// //           <div className="field-row">
// //             <label className="field">
// //               <span className="field-label">X&ensp;{Math.round(active.x)}%</span>
// //               <input type="range" min={0} max={100} value={active.x} onChange={setNum("x")} />
// //             </label>
// //             <label className="field">
// //               <span className="field-label">Y&ensp;{Math.round(active.y)}%</span>
// //               <input type="range" min={0} max={100} value={active.y} onChange={setNum("y")} />
// //             </label>
// //           </div>

// //           <p className="hint">Drag on the canvas to reposition the active layer</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import React, { useEffect, useMemo } from "react";

// const FONTS = [
//   "Inter",
//   "Roboto",
//   "Open Sans",
//   "Montserrat",
//   "Poppins",
//   "Playfair Display",
//   "Oswald",
//   "Raleway",
//   "Ubuntu",
//   "Merriweather",
//   "Lato",
//   "Nunito",
//   "Bebas Neue",
//   "Anton",
//   "Archivo Black",
//   "Black Ops One",
//   "Bungee",
//   "Concert One",
//   "Lobster",
//   "Pacifico",
//   "Permanent Marker",
//   "Press Start 2P",
//   "Righteous",
//   "Russo One",
//   "Satisfy",
//   "Teko",
// ];

// function loadFont(f) {
//   const id = `gf-${f.replace(/\s+/g, "-")}`;
//   if (document.getElementById(id)) return;
//   const link = document.createElement("link");
//   link.id = id;
//   link.rel = "stylesheet";
//   link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
//     f
//   )}:wght@400;700;900&display=swap`;
//   document.head.appendChild(link);
// }

// export default function TextControls({
//   layers,
//   activeId,
//   onSelect,
//   onAdd,
//   onDelete,
//   onDuplicate,
//   onChange,
//   onReorder,
// }) {
//   useEffect(() => {
//     FONTS.forEach(loadFont);
//   }, []);

//   const active = useMemo(
//     () => (activeId ? layers.find((l) => l.id === activeId) : null),
//     [layers, activeId]
//   );

//   useEffect(() => {
//     if (active) loadFont(active.fontFamily);
//   }, [active?.fontFamily]);

//   const set = (k) => (e) => {
//     if (!activeId) return;
//     onChange(activeId, k, e.target.value);
//   };
//   const setNum = (k) => (e) => {
//     if (!activeId) return;
//     onChange(activeId, k, Number(e.target.value));
//   };

//   const moveUp = (idx) => {
//     if (idx > 0) onReorder(idx, idx - 1);
//   };
//   const moveDown = (idx) => {
//     if (idx < layers.length - 1) onReorder(idx, idx + 1);
//   };

//   return (
//     <div className="controls glass-panel">
//       {/* ── Add button ── */}
//       <button className="btn btn--add glow-btn" onClick={onAdd}>
//         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//           <line x1="12" y1="5" x2="12" y2="19" />
//           <line x1="5" y1="12" x2="19" y2="12" />
//         </svg>
//         Add New Text Layer
//       </button>

//       {/* ── Layers list ── */}
//       <div className="layers-section">
//         <h3 className="section-label">Layers</h3>
//         <div className="layers-list">
//           {layers.map((layer, idx) => (
//             <div
//               key={layer.id}
//               className={`layer-tile ${
//                 layer.id === activeId ? "layer-tile--active" : ""
//               }`}
//               onClick={() => onSelect(layer.id)}
//             >
//               <div className="layer-tile-info">
//                 <span className="layer-tile-index">{idx + 1}</span>
//                 <span className="layer-tile-text">
//                   {layer.text.substring(0, 18) || "(empty)"}
//                   {layer.text.length > 18 ? "..." : ""}
//                 </span>
//               </div>

//               <div
//                 className="layer-tile-actions"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <button
//                   className="layer-icon-btn"
//                   onClick={() => moveUp(idx)}
//                   disabled={idx === 0}
//                   title="Move up"
//                 >
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="18 15 12 9 6 15" /></svg>
//                 </button>

//                 <button
//                   className="layer-icon-btn"
//                   onClick={() => moveDown(idx)}
//                   disabled={idx === layers.length - 1}
//                   title="Move down"
//                 >
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
//                 </button>

//                 <button
//                   className="layer-icon-btn"
//                   onClick={() => onDuplicate(layer.id)}
//                   title="Duplicate"
//                 >
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
//                     <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
//                   </svg>
//                 </button>

//                 <button
//                   className="layer-icon-btn layer-icon-btn--danger"
//                   onClick={() => onDelete(layer.id)}
//                   disabled={layers.length <= 1}
//                   title="Delete"
//                 >
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <polyline points="3 6 5 6 21 6" />
//                     <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//                     <path d="M10 11v6" />
//                     <path d="M14 11v6" />
//                     <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ── Active layer settings OR empty-state hint ── */}
//       {active ? (
//         <div className="layer-settings">
//           <h3 className="section-label">
//             Settings &mdash; Layer{" "}
//             {layers.findIndex((l) => l.id === activeId) + 1}
//           </h3>

//           <label className="field">
//             <span className="field-label">Text</span>
//             <textarea rows={2} value={active.text} onChange={set("text")} />
//           </label>

//           <label className="field">
//             <span className="field-label">Font</span>
//             <select value={active.fontFamily} onChange={set("fontFamily")}>
//               {FONTS.map((f) => (
//                 <option key={f} value={f}>{f}</option>
//               ))}
//             </select>
//           </label>

//           <label className="field">
//             <span className="field-label">Weight</span>
//             <select value={active.fontWeight} onChange={set("fontWeight")}>
//               <option value="400">Regular</option>
//               <option value="700">Bold</option>
//               <option value="900">Black</option>
//             </select>
//           </label>

//           <label className="field">
//             <span className="field-label">
//               Size&ensp;<b>{active.fontSize}px</b>
//             </span>
//             <input type="range" min={12} max={600} value={active.fontSize} onChange={setNum("fontSize")} />
//           </label>

//           <label className="field">
//             <span className="field-label">Color</span>
//             <div className="color-row">
//               <input type="color" value={active.color} onChange={set("color")} />
//               <span className="color-hex">{active.color}</span>
//             </div>
//           </label>

//           <label className="field">
//             <span className="field-label">
//               Opacity&ensp;<b>{Math.round(active.opacity * 100)}%</b>
//             </span>
//             <input type="range" min={0} max={1} step={0.01} value={active.opacity} onChange={setNum("opacity")} />
//           </label>

//           <label className="field">
//             <span className="field-label">
//               Rotation&ensp;<b>{active.rotation}&deg;</b>
//             </span>
//             <input type="range" min={-180} max={180} value={active.rotation} onChange={setNum("rotation")} />
//           </label>

//           <label className="field">
//             <span className="field-label">
//               Letter spacing&ensp;<b>{active.letterSpacing}px</b>
//             </span>
//             <input type="range" min={-10} max={60} value={active.letterSpacing} onChange={setNum("letterSpacing")} />
//           </label>

//           <label className="field">
//             <span className="field-label">
//               Line height&ensp;<b>{active.lineHeight.toFixed(1)}</b>
//             </span>
//             <input type="range" min={0.5} max={3} step={0.05} value={active.lineHeight} onChange={setNum("lineHeight")} />
//           </label>

//           <div className="field-row">
//             <label className="field">
//               <span className="field-label">X&ensp;{Math.round(active.x)}%</span>
//               <input type="range" min={0} max={100} value={active.x} onChange={setNum("x")} />
//             </label>
//             <label className="field">
//               <span className="field-label">Y&ensp;{Math.round(active.y)}%</span>
//               <input type="range" min={0} max={100} value={active.y} onChange={setNum("y")} />
//             </label>
//           </div>

//           <p className="hint">
//             Drag on the canvas to reposition &bull; Press Escape to deselect
//           </p>
//         </div>
//       ) : (
//         <div className="layer-settings-empty">
//           <div className="empty-icon">
//             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M12 20h9" />
//               <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
//             </svg>
//           </div>
//           <p>Click a layer above &mdash; or click text on the canvas &mdash; to edit its properties</p>
//           <p className="hint">Press Escape to deselect</p>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useMemo } from "react";
import FontPicker from "./FontPicker";

const FONTS = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Montserrat",
  "Poppins",
  "Playfair Display",
  "Oswald",
  "Raleway",
  "Ubuntu",
  "Merriweather",
  "Lato",
  "Nunito",
  "Bebas Neue",
  "Anton",
  "Archivo Black",
  "Black Ops One",
  "Bungee",
  "Concert One",
  "Lobster",
  "Pacifico",
  "Permanent Marker",
  "Press Start 2P",
  "Righteous",
  "Russo One",
  "Satisfy",
  "Teko",
];

/**
 * Build a single Google Fonts URL that loads every font in one request.
 * Loads weights 400, 700, 900 for each.
 */
function buildBatchFontUrl(fonts) {
  const families = fonts
    .map((f) => `family=${encodeURIComponent(f)}:wght@400;700;900`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

/** Inject the batch <link> once */
function loadAllFonts(fonts) {
  const id = "gf-batch";
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = buildBatchFontUrl(fonts);
  document.head.appendChild(link);
}

/** Load a single extra font (in case user typed a custom one) */
function loadFont(f) {
  const id = `gf-${f.replace(/\s+/g, "-")}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    f
  )}:wght@400;700;900&display=swap`;
  document.head.appendChild(link);
}

export default function TextControls({
  layers,
  activeId,
  onSelect,
  onAdd,
  onDelete,
  onDuplicate,
  onChange,
  onReorder,
}) {
  /* ── load ALL fonts in one batch request on mount ── */
  useEffect(() => {
    loadAllFonts(FONTS);
  }, []);

  const active = useMemo(
    () => (activeId ? layers.find((l) => l.id === activeId) : null),
    [layers, activeId]
  );

  /* ensure the active layer's font is loaded (safety net) */
  useEffect(() => {
    if (active) loadFont(active.fontFamily);
  }, [active?.fontFamily]);

  const set = (k) => (e) => {
    if (!activeId) return;
    onChange(activeId, k, e.target.value);
  };
  const setNum = (k) => (e) => {
    if (!activeId) return;
    onChange(activeId, k, Number(e.target.value));
  };
  const setDirect = (k) => (val) => {
    if (!activeId) return;
    onChange(activeId, k, val);
  };

  const moveUp = (idx) => {
    if (idx > 0) onReorder(idx, idx - 1);
  };
  const moveDown = (idx) => {
    if (idx < layers.length - 1) onReorder(idx, idx + 1);
  };

  return (
    <div className="controls glass-panel">
      {/* ── Add button ── */}
      <button className="btn btn--add glow-btn" onClick={onAdd}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add New Text Layer
      </button>

      {/* ── Layers list ── */}
      <div className="layers-section">
        <h3 className="section-label">Layers</h3>
        <div className="layers-list">
          {layers.map((layer, idx) => (
            <div
              key={layer.id}
              className={`layer-tile ${
                layer.id === activeId ? "layer-tile--active" : ""
              }`}
              onClick={() => onSelect(layer.id)}
            >
              <div className="layer-tile-info">
                <span className="layer-tile-index">{idx + 1}</span>
                <span
                  className="layer-tile-text"
                  style={{ fontFamily: `"${layer.fontFamily}", sans-serif` }}
                >
                  {layer.text.substring(0, 18) || "(empty)"}
                  {layer.text.length > 18 ? "..." : ""}
                </span>
              </div>

              <div
                className="layer-tile-actions"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="layer-icon-btn"
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  title="Move up"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="18 15 12 9 6 15" /></svg>
                </button>

                <button
                  className="layer-icon-btn"
                  onClick={() => moveDown(idx)}
                  disabled={idx === layers.length - 1}
                  title="Move down"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
                </button>

                <button
                  className="layer-icon-btn"
                  onClick={() => onDuplicate(layer.id)}
                  title="Duplicate"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>

                <button
                  className="layer-icon-btn layer-icon-btn--danger"
                  onClick={() => onDelete(layer.id)}
                  disabled={layers.length <= 1}
                  title="Delete"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Active layer settings ── */}
      {active ? (
        <div className="layer-settings">
          <h3 className="section-label">
            Settings &mdash; Layer{" "}
            {layers.findIndex((l) => l.id === activeId) + 1}
          </h3>

          {/* text */}
          <label className="field">
            <span className="field-label">Text</span>
            <textarea rows={2} value={active.text} onChange={set("text")} />
          </label>

          {/* font — custom picker */}
          <div className="field">
            <span className="field-label">Font</span>
            <FontPicker
              fonts={FONTS}
              value={active.fontFamily}
              onChange={setDirect("fontFamily")}
            />
          </div>

          {/* weight */}
          <label className="field">
            <span className="field-label">Weight</span>
            <select value={active.fontWeight} onChange={set("fontWeight")}>
              <option value="400">Regular</option>
              <option value="700">Bold</option>
              <option value="900">Black</option>
            </select>
          </label>

          {/* size */}
          <label className="field">
            <span className="field-label">
              Size&ensp;<b>{active.fontSize}px</b>
            </span>
            <input type="range" min={12} max={600} value={active.fontSize} onChange={setNum("fontSize")} />
          </label>

          {/* color */}
          <label className="field">
            <span className="field-label">Color</span>
            <div className="color-row">
              <input type="color" value={active.color} onChange={set("color")} />
              <span className="color-hex">{active.color}</span>
            </div>
          </label>

          {/* opacity */}
          <label className="field">
            <span className="field-label">
              Opacity&ensp;<b>{Math.round(active.opacity * 100)}%</b>
            </span>
            <input type="range" min={0} max={1} step={0.01} value={active.opacity} onChange={setNum("opacity")} />
          </label>

          {/* rotation */}
          <label className="field">
            <span className="field-label">
              Rotation&ensp;<b>{active.rotation}&deg;</b>
            </span>
            <input type="range" min={-180} max={180} value={active.rotation} onChange={setNum("rotation")} />
          </label>

          {/* letter spacing */}
          <label className="field">
            <span className="field-label">
              Letter spacing&ensp;<b>{active.letterSpacing}px</b>
            </span>
            <input type="range" min={-10} max={60} value={active.letterSpacing} onChange={setNum("letterSpacing")} />
          </label>

          {/* line height */}
          <label className="field">
            <span className="field-label">
              Line height&ensp;<b>{active.lineHeight.toFixed(1)}</b>
            </span>
            <input type="range" min={0.5} max={3} step={0.05} value={active.lineHeight} onChange={setNum("lineHeight")} />
          </label>

          {/* position */}
          <div className="field-row">
            <label className="field">
              <span className="field-label">X&ensp;{Math.round(active.x)}%</span>
              <input type="range" min={0} max={100} value={active.x} onChange={setNum("x")} />
            </label>
            <label className="field">
              <span className="field-label">Y&ensp;{Math.round(active.y)}%</span>
              <input type="range" min={0} max={100} value={active.y} onChange={setNum("y")} />
            </label>
          </div>

          <p className="hint">
            Drag on the canvas to reposition &bull; Press Escape to deselect
          </p>
        </div>
      ) : (
        <div className="layer-settings-empty">
          <div className="empty-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <p>Click a layer above &mdash; or click text on the canvas &mdash; to edit its properties</p>
          <p className="hint">Press Escape to deselect</p>
        </div>
      )}
    </div>
  );
}