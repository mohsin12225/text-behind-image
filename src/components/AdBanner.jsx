import React, { useEffect, useRef } from "react";

const AD_CLIENT = "ca-pub-3927069064153661"; 

export default function AdBanner({
  adSlot,
  adFormat = "auto",
  adLayout,
  fullWidth = true,
  style = {},
  className = "",
}) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      }
    } catch (err) {
      console.error("AdSense push error:", err);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`} aria-label="Advertisement">
      <span className="ad-label">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        {...(adLayout ? { "data-ad-layout": adLayout } : {})}
        {...(fullWidth ? { "data-full-width-responsive": "true" } : {})}
      />
    </div>
  );
}