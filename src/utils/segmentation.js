/*  AI segmentation — @imgly/background-removal
 *  ─────────────────────────────────────────────
 *  Detects ANY salient object (people, animals, products, etc.)
 *
 *  Returns  { data: Uint8Array, width, height }  on success
 *           null                                  on failure
 *
 *    data[i] = 0 → background
 *    data[i] = 1 → foreground (detected object)
 */

export async function runSegmentation(imageElement, onStatus) {
  try {
    onStatus?.("Loading AI model…");

    /* dynamic import so the heavy library is only downloaded
       when the user actually uploads an image */
    const { removeBackground } = await import("@imgly/background-removal");

    /* ---- convert <img> → Blob ---- */
    const cvs = document.createElement("canvas");
    cvs.width = imageElement.naturalWidth;
    cvs.height = imageElement.naturalHeight;
    const ctx = cvs.getContext("2d");
    ctx.drawImage(imageElement, 0, 0);

    const srcBlob = await new Promise((r) => cvs.toBlob(r, "image/png"));

    onStatus?.("Analysing image (first run downloads ~30 MB model)…");

    /* ---- run background removal ---- */
    const resultBlob = await removeBackground(srcBlob, {
      progress: (key, current, total) => {
        try {
          if (typeof key === "string" && key.includes("fetch") && total > 0) {
            const pct = Math.round((current / total) * 100);
            onStatus?.(`Finding the main object… ${pct}%`);
          } else if (
            typeof key === "string" &&
            key.includes("compute")
          ) {
            onStatus?.("Segmenting object…");
          }
        } catch {
          /* swallow – progress is best‐effort */
        }
      },
    });

    /* ---- extract the alpha channel as a binary mask ---- */
    const resultImg = new Image();
    const url = URL.createObjectURL(resultBlob);
    resultImg.src = url;

    await new Promise((resolve, reject) => {
      resultImg.onload = resolve;
      resultImg.onerror = reject;
    });

    const w = imageElement.naturalWidth;
    const h = imageElement.naturalHeight;

    const c2 = document.createElement("canvas");
    c2.width = w;
    c2.height = h;
    const ctx2 = c2.getContext("2d", { willReadFrequently: true });
    ctx2.drawImage(resultImg, 0, 0, w, h);
    URL.revokeObjectURL(url);

    const imgData = ctx2.getImageData(0, 0, w, h);
    const mask = new Uint8Array(w * h);
    let fg = 0;

    for (let i = 0; i < mask.length; i++) {
      mask[i] = imgData.data[i * 4 + 3] > 128 ? 1 : 0;
      if (mask[i]) fg++;
    }

    /* if less than 0.5 % is foreground the detection probably failed */
    if (fg / mask.length < 0.005) return null;

    return { data: mask, width: w, height: h };
  } catch (err) {
    console.error("Auto‑segmentation error:", err);
    return null;
  }
}