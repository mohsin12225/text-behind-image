
// import React, { useState, useCallback, useRef, useEffect } from "react";
// import { Routes, Route, Link, useLocation } from "react-router-dom";
// import ImageUploader from "./components/ImageUploader";
// import CanvasEditor from "./components/CanvasEditor";
// import TextControls from "./components/TextControls";
// import DownloadButton from "./components/DownloadButton";
// import ManualMaskEditor from "./components/ManualMaskEditor";
// import AdBanner from "./components/AdBanner";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import AboutUs from "./pages/AboutUs";
// import { runSegmentation } from "./utils/segmentation";
// import { renderCanvas } from "./utils/canvasRenderer";

// let _nextId = 1;

// function createLayer(overrides = {}) {
//   return {
//     id: `layer-${_nextId++}`,
//     text: "HELLO",
//     fontFamily: "Inter",
//     fontSize: 150,
//     fontWeight: "900",
//     color: "#ffffff",
//     opacity: 1,
//     x: 50,
//     y: 50,
//     rotation: 0,
//     letterSpacing: 0,
//     lineHeight: 1.15,
//     ...overrides,
//   };
// }

// /* ══════════════════════════════════
//    EDITOR PAGE
//    ══════════════════════════════════ */
// function EditorPage() {
//   const [image, setImage] = useState(null);
//   const [mask, setMask] = useState(null);
//   const [layers, setLayers] = useState(() => {
//     const init = createLayer();
//     return [init];
//   });
//   const [activeId, setActiveId] = useState(layers[0].id);
//   const [busy, setBusy] = useState(false);
//   const [status, setStatus] = useState("");
//   const [error, setError] = useState(null);
//   const [showManual, setShowManual] = useState(false);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") setActiveId(null);
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   const handleUpload = useCallback(async (file) => {
//     setError(null);
//     setMask(null);
//     setBusy(true);
//     setStatus("Loading image...");

//     const img = new Image();
//     img.crossOrigin = "anonymous";

//     img.onload = async () => {
//       setImage(img);
//       try {
//         const m = await runSegmentation(img, setStatus);
//         if (m) {
//           setMask(m);
//         } else {
//           setError(
//             "Auto-detection couldn't find a subject. Use the \"Draw Mask\" button to select the object manually."
//           );
//         }
//       } catch (err) {
//         console.error(err);
//         setError(
//           "Auto-detection failed. Use the \"Draw Mask\" button to select the object manually."
//         );
//       } finally {
//         setBusy(false);
//         setStatus("");
//       }
//     };

//     img.onerror = () => {
//       setError("Could not load this image file.");
//       setBusy(false);
//       setStatus("");
//     };

//     img.src = URL.createObjectURL(file);
//   }, []);

//   const addLayer = useCallback(() => {
//     const newL = createLayer({
//       text: "TEXT",
//       x: 30 + Math.random() * 40,
//       y: 30 + Math.random() * 40,
//     });
//     setLayers((p) => [...p, newL]);
//     setActiveId(newL.id);
//   }, []);

//   const deleteLayer = useCallback(
//     (id) => {
//       setLayers((prev) => {
//         if (prev.length <= 1) return prev;
//         const next = prev.filter((l) => l.id !== id);
//         if (activeId === id) {
//           setActiveId(next.length > 0 ? next[0].id : null);
//         }
//         return next;
//       });
//     },
//     [activeId]
//   );

//   const duplicateLayer = useCallback((id) => {
//     setLayers((prev) => {
//       const src = prev.find((l) => l.id === id);
//       if (!src) return prev;
//       const dup = createLayer({
//         ...src,
//         x: Math.min(src.x + 5, 95),
//         y: Math.min(src.y + 5, 95),
//       });
//       const idx = prev.findIndex((l) => l.id === id);
//       const next = [...prev];
//       next.splice(idx + 1, 0, dup);
//       setActiveId(dup.id);
//       return next;
//     });
//   }, []);

//   const updateLayer = useCallback((id, key, val) => {
//     setLayers((prev) =>
//       prev.map((l) => (l.id === id ? { ...l, [key]: val } : l))
//     );
//   }, []);

//   const reorderLayers = useCallback((fromIdx, toIdx) => {
//     setLayers((prev) => {
//       const next = [...prev];
//       const [item] = next.splice(fromIdx, 1);
//       next.splice(toIdx, 0, item);
//       return next;
//     });
//   }, []);

//   const handlePositionChange = useCallback(
//     (x, y) => {
//       if (!activeId) return;
//       setLayers((prev) =>
//         prev.map((l) => (l.id === activeId ? { ...l, x, y } : l))
//       );
//     },
//     [activeId]
//   );

//   const handleLayerSelect = useCallback((id) => {
//     setActiveId(id);
//   }, []);

//   const handleDownload = useCallback(() => {
//     const cvs = canvasRef.current;
//     if (!cvs || !image) return;
//     const ctx = cvs.getContext("2d");
//     renderCanvas(ctx, cvs, image, mask, layers, null);
//     const a = document.createElement("a");
//     a.download = "text-behind-image.png";
//     a.href = cvs.toDataURL("image/png");
//     a.click();
//     if (activeId) {
//       renderCanvas(ctx, cvs, image, mask, layers, activeId);
//     }
//   }, [image, mask, layers, activeId]);

//   const reset = useCallback(() => {
//     setImage(null);
//     setMask(null);
//     const fresh = createLayer();
//     setLayers([fresh]);
//     setActiveId(fresh.id);
//     setError(null);
//     setShowManual(false);
//   }, []);

//   const handleManualDone = useCallback((newMask) => {
//     setMask(newMask);
//     setShowManual(false);
//     setError(null);
//   }, []);

//   return (
//     <>
//       <main className="main">
//         {!image ? (
//           <ImageUploader onUpload={handleUpload} />
//         ) : (
//           <div className="editor">
//             <div className="editor-canvas-col">
//               <CanvasEditor
//                 canvasRef={canvasRef}
//                 image={image}
//                 mask={mask}
//                 layers={layers}
//                 activeId={activeId}
//                 busy={busy}
//                 statusMsg={status}
//                 onPositionChange={handlePositionChange}
//                 onLayerSelect={handleLayerSelect}
//               />

//               <div className="mask-bar">
//                 {mask && !busy && (
//                   <span className="mask-badge mask-badge--ok">
//                     &#10003; Object detected
//                   </span>
//                 )}
//                 {!mask && !busy && (
//                   <span className="mask-badge mask-badge--warn">
//                     &#9888; No mask applied
//                   </span>
//                 )}
//                 {!busy && (
//                   <button
//                     className="btn btn--sm btn--outline"
//                     onClick={() => setShowManual(true)}
//                   >
//                     &#9998;&ensp;{mask ? "Edit Mask" : "Draw Mask"}
//                   </button>
//                 )}
//               </div>

//               {error && <p className="banner banner--warn">{error}</p>}
//             </div>

//             <aside className="editor-controls-col">
//               <TextControls
//                 layers={layers}
//                 activeId={activeId}
//                 onSelect={setActiveId}
//                 onAdd={addLayer}
//                 onDelete={deleteLayer}
//                 onDuplicate={duplicateLayer}
//                 onChange={updateLayer}
//                 onReorder={reorderLayers}
//               />

//               <div className="action-bar">
//                 <DownloadButton onDownload={handleDownload} />
//                 <button className="btn btn--outline" onClick={reset}>
//                   &#10005;&ensp;New Image
//                 </button>
//               </div>

//               <AdBanner
//                 adSlot="8902174170"
//                 adFormat="auto"
//                 className="ad-sidebar"
//               />
//             </aside>
//           </div>
//         )}
//       </main>

//       {showManual && image && (
//         <ManualMaskEditor
//           image={image}
//           initialMask={mask}
//           onComplete={handleManualDone}
//           onCancel={() => setShowManual(false)}
//         />
//       )}
//     </>
//   );
// }

// /* ══════════════════════════════════
//    APP SHELL
//    ══════════════════════════════════ */
// export default function App() {
//   const location = useLocation();
//   const isEditor = location.pathname === "/";

//   return (
//     <div className="app">
//       {/* header */}
//       <header className="header">
//         <div className="header-inner">
//           <div className="header-row">
//             <Link to="/" className="logo">
//               <span className="logo-icon">T</span> Text Behind Image
//             </Link>
//             <nav className="header-nav">
//               <Link to="/about" className="nav-link">
//                 About Us
//               </Link>
//               <Link to="/privacy" className="nav-link">
//                 Privacy Policy
//               </Link>
//             </nav>
//           </div>
//           {isEditor && (
//             <p className="tagline">
//               AI-powered &mdash; place text behind any object in your photo
//             </p>
//           )}
//         </div>
//       </header>

//       {/* routes */}
//       <Routes>
//         <Route path="/" element={<EditorPage />} />
//         <Route path="/about" element={<AboutUs />} />
//         <Route path="/privacy" element={<PrivacyPolicy />} />
//       </Routes>

//       {/* footer */}
//       <footer className="footer">
//         <AdBanner
//           adSlot="8902174170"
//           adFormat="horizontal"
//           className="ad-footer"
//           style={{ marginBottom: "1rem" }}
//         />

//         <div className="footer-links">
//           <p>
//             100% client-side &bull; no data leaves your browser &bull; powered
//             by AI background removal
//           </p>
//           <div className="footer-nav">
//             <Link to="/about" className="footer-nav-link">
//               About Us
//             </Link>
//             <span className="footer-nav-sep">&bull;</span>
//             <Link to="/privacy" className="footer-nav-link">
//               Privacy Policy
//             </Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import ImageUploader from "./components/ImageUploader";
import CanvasEditor from "./components/CanvasEditor";
import TextControls from "./components/TextControls";
import DownloadButton from "./components/DownloadButton";
import ManualMaskEditor from "./components/ManualMaskEditor";
import AdBanner from "./components/AdBanner";
import ExamplesSection from "./components/ExamplesSection";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import { runSegmentation } from "./utils/segmentation";
import { renderCanvas } from "./utils/canvasRenderer";

let _nextId = 1;

function createLayer(overrides = {}) {
  return {
    id: `layer-${_nextId++}`,
    text: "HELLO",
    fontFamily: "Inter",
    fontSize: 150,
    fontWeight: "900",
    color: "#ffffff",
    opacity: 1,
    x: 50,
    y: 50,
    rotation: 0,
    letterSpacing: 0,
    lineHeight: 1.15,
    ...overrides,
  };
}

/* ══════════════════════════════════
   EDITOR PAGE
   ══════════════════════════════════ */
function EditorPage() {
  const [image, setImage] = useState(null);
  const [mask, setMask] = useState(null);
  const [layers, setLayers] = useState(() => {
    const init = createLayer();
    return [init];
  });
  const [activeId, setActiveId] = useState(layers[0].id);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [showManual, setShowManual] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleUpload = useCallback(async (file) => {
    setError(null);
    setMask(null);
    setBusy(true);
    setStatus("Loading image...");

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = async () => {
      setImage(img);
      try {
        const m = await runSegmentation(img, setStatus);
        if (m) {
          setMask(m);
        } else {
          setError(
            "Auto-detection couldn't find a subject. Use the \"Draw Mask\" button to select the object manually."
          );
        }
      } catch (err) {
        console.error(err);
        setError(
          "Auto-detection failed. Use the \"Draw Mask\" button to select the object manually."
        );
      } finally {
        setBusy(false);
        setStatus("");
      }
    };

    img.onerror = () => {
      setError("Could not load this image file.");
      setBusy(false);
      setStatus("");
    };

    img.src = URL.createObjectURL(file);
  }, []);

  const addLayer = useCallback(() => {
    const newL = createLayer({
      text: "TEXT",
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40,
    });
    setLayers((p) => [...p, newL]);
    setActiveId(newL.id);
  }, []);

  const deleteLayer = useCallback(
    (id) => {
      setLayers((prev) => {
        if (prev.length <= 1) return prev;
        const next = prev.filter((l) => l.id !== id);
        if (activeId === id) {
          setActiveId(next.length > 0 ? next[0].id : null);
        }
        return next;
      });
    },
    [activeId]
  );

  const duplicateLayer = useCallback((id) => {
    setLayers((prev) => {
      const src = prev.find((l) => l.id === id);
      if (!src) return prev;
      const dup = createLayer({
        ...src,
        x: Math.min(src.x + 5, 95),
        y: Math.min(src.y + 5, 95),
      });
      const idx = prev.findIndex((l) => l.id === id);
      const next = [...prev];
      next.splice(idx + 1, 0, dup);
      setActiveId(dup.id);
      return next;
    });
  }, []);

  const updateLayer = useCallback((id, key, val) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [key]: val } : l))
    );
  }, []);

  const reorderLayers = useCallback((fromIdx, toIdx) => {
    setLayers((prev) => {
      const next = [...prev];
      const [item] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, item);
      return next;
    });
  }, []);

  const handlePositionChange = useCallback(
    (x, y) => {
      if (!activeId) return;
      setLayers((prev) =>
        prev.map((l) => (l.id === activeId ? { ...l, x, y } : l))
      );
    },
    [activeId]
  );

  const handleLayerSelect = useCallback((id) => {
    setActiveId(id);
  }, []);

  const handleDownload = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs || !image) return;
    const ctx = cvs.getContext("2d");
    renderCanvas(ctx, cvs, image, mask, layers, null);
    const a = document.createElement("a");
    a.download = "text-behind-image.png";
    a.href = cvs.toDataURL("image/png");
    a.click();
    if (activeId) {
      renderCanvas(ctx, cvs, image, mask, layers, activeId);
    }
  }, [image, mask, layers, activeId]);

  const reset = useCallback(() => {
    setImage(null);
    setMask(null);
    const fresh = createLayer();
    setLayers([fresh]);
    setActiveId(fresh.id);
    setError(null);
    setShowManual(false);
  }, []);

  const handleManualDone = useCallback((newMask) => {
    setMask(newMask);
    setShowManual(false);
    setError(null);
  }, []);

  return (
    <>
      <main className="main">
        {!image ? (
          <>
            {/* ── Upload section ── */}
            <div className="home-hero">
              <h2 className="home-title">
                Place Text <span className="home-title-accent">Behind</span> Any Object
              </h2>
              <p className="home-desc">
                Upload a photo and our AI will detect the subject automatically.
                Add custom text that appears behind the object for a stunning 3D effect.
              </p>
            </div>

            <ImageUploader onUpload={handleUpload} />

            {/* ── Examples section ── */}
            <ExamplesSection />
          </>
        ) : (
          <div className="editor">
            <div className="editor-canvas-col">
              <CanvasEditor
                canvasRef={canvasRef}
                image={image}
                mask={mask}
                layers={layers}
                activeId={activeId}
                busy={busy}
                statusMsg={status}
                onPositionChange={handlePositionChange}
                onLayerSelect={handleLayerSelect}
              />

              <div className="mask-bar">
                {mask && !busy && (
                  <span className="mask-badge mask-badge--ok">
                    &#10003; Object detected
                  </span>
                )}
                {!mask && !busy && (
                  <span className="mask-badge mask-badge--warn">
                    &#9888; No mask applied
                  </span>
                )}
                {!busy && (
                  <button
                    className="btn btn--sm btn--outline"
                    onClick={() => setShowManual(true)}
                  >
                    &#9998;&ensp;{mask ? "Edit Mask" : "Draw Mask"}
                  </button>
                )}
              </div>

              {error && <p className="banner banner--warn">{error}</p>}
            </div>

            <aside className="editor-controls-col">
              <TextControls
                layers={layers}
                activeId={activeId}
                onSelect={setActiveId}
                onAdd={addLayer}
                onDelete={deleteLayer}
                onDuplicate={duplicateLayer}
                onChange={updateLayer}
                onReorder={reorderLayers}
              />

              <div className="action-bar">
                <DownloadButton onDownload={handleDownload} />
                <button className="btn btn--outline" onClick={reset}>
                  &#10005;&ensp;New Image
                </button>
              </div>

              <AdBanner
                adSlot="1234567890"
                adFormat="auto"
                className="ad-sidebar"
              />
            </aside>
          </div>
        )}
      </main>

      {showManual && image && (
        <ManualMaskEditor
          image={image}
          initialMask={mask}
          onComplete={handleManualDone}
          onCancel={() => setShowManual(false)}
        />
      )}
    </>
  );
}

/* ══════════════════════════════════
   APP SHELL
   ══════════════════════════════════ */
export default function App() {
  const location = useLocation();
  const isEditor = location.pathname === "/";

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="header-row">
            <Link to="/" className="logo">
              <span className="logo-icon">T</span> Text Behind Image
            </Link>
            <nav className="header-nav">
              <Link to="/about" className="nav-link">
                About Us
              </Link>
              <Link to="/privacy" className="nav-link">
                Privacy Policy
              </Link>
            </nav>
          </div>
          {isEditor && (
            <p className="tagline">
              AI-powered &mdash; place text behind any object in your photo
            </p>
          )}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>

      <footer className="footer">
        <AdBanner
          adSlot="0987654321"
          adFormat="horizontal"
          className="ad-footer"
          style={{ marginBottom: "1rem" }}
        />

        <div className="footer-links">
          <p>
            100% client-side &bull; no data leaves your browser &bull; powered
            by AI background removal
          </p>
          <div className="footer-nav">
            <Link to="/about" className="footer-nav-link">
              About Us
            </Link>
            <span className="footer-nav-sep">&bull;</span>
            <Link to="/privacy" className="footer-nav-link">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}