import React, { useCallback, useRef, useState } from "react";

const ACCEPTED = ["image/png", "image/jpeg", "image/webp"];

export default function ImageUploader({ onUpload }) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);

  const handle = useCallback(
    (file) => {
      if (!file) return;
      if (!ACCEPTED.includes(file.type)) {
        alert("Please upload a PNG, JPG, or WebP image.");
        return;
      }
      onUpload(file);
    },
    [onUpload]
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDrag(false);
      handle(e.dataTransfer.files[0]);
    },
    [handle]
  );

  return (
    <div
      className={`uploader ${drag ? "uploader--active" : ""}`}
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
    >
      <div className="uploader-body">
        <svg
          className="uploader-icon"
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>

        <h2>Drop your image here</h2>
        <p>or click to browse</p>
        <span className="uploader-note">PNG · JPG · WebP</span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        onChange={(e) => handle(e.target.files?.[0])}
        hidden
      />
    </div>
  );
}