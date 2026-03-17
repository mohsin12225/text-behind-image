import React, { useState, useRef, useEffect, useCallback } from "react";

/**
 * Custom dropdown that renders each font name in its own typeface.
 *
 * Props
 *   fonts    – string[]  (font family names)
 *   value    – string    (currently selected font)
 *   onChange – (font: string) => void
 */
export default function FontPicker({ fonts, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [focusIdx, setFocusIdx] = useState(-1);

  const wrapRef = useRef(null);
  const listRef = useRef(null);
  const searchRef = useRef(null);

  /* ── filtered list ── */
  const filtered = search
    ? fonts.filter((f) => f.toLowerCase().includes(search.toLowerCase()))
    : fonts;

  /* ── close on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── focus search when opening ── */
  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
      setFocusIdx(-1);
    }
  }, [open]);

  /* ── scroll focused item into view ── */
  useEffect(() => {
    if (focusIdx < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll(".fp-item");
    if (items[focusIdx]) {
      items[focusIdx].scrollIntoView({ block: "nearest" });
    }
  }, [focusIdx]);

  /* ── keyboard navigation ── */
  const onKeyDown = useCallback(
    (e) => {
      if (!open) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusIdx((p) => Math.min(p + 1, filtered.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusIdx((p) => Math.max(p - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (focusIdx >= 0 && filtered[focusIdx]) {
            onChange(filtered[focusIdx]);
            setOpen(false);
            setSearch("");
          }
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          setSearch("");
          break;
        default:
          break;
      }
    },
    [open, focusIdx, filtered, onChange]
  );

  /* ── select a font ── */
  const pick = (font) => {
    onChange(font);
    setOpen(false);
    setSearch("");
  };

  return (
    <div
      className={`fp-wrap ${open ? "fp-wrap--open" : ""}`}
      ref={wrapRef}
      onKeyDown={onKeyDown}
    >
      {/* ── trigger button ── */}
      <button
        type="button"
        className="fp-trigger"
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className="fp-trigger-label"
          style={{ fontFamily: `"${value}", sans-serif` }}
        >
          {value}
        </span>
        <svg
          className={`fp-chevron ${open ? "fp-chevron--up" : ""}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* ── dropdown panel ── */}
      {open && (
        <div className="fp-dropdown">
          {/* search */}
          <div className="fp-search-wrap">
            <svg
              className="fp-search-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              className="fp-search"
              placeholder="Search fonts..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setFocusIdx(-1);
              }}
            />
          </div>

          {/* list */}
          <ul className="fp-list" ref={listRef} role="listbox">
            {filtered.length === 0 && (
              <li className="fp-empty">No matching fonts</li>
            )}
            {filtered.map((font, idx) => {
              const isActive = font === value;
              const isFocused = idx === focusIdx;
              return (
                <li
                  key={font}
                  role="option"
                  aria-selected={isActive}
                  className={`fp-item ${isActive ? "fp-item--active" : ""} ${
                    isFocused ? "fp-item--focused" : ""
                  }`}
                  style={{ fontFamily: `"${font}", sans-serif` }}
                  onClick={() => pick(font)}
                  onMouseEnter={() => setFocusIdx(idx)}
                >
                  <span className="fp-item-name">{font}</span>
                  {isActive && (
                    <svg
                      className="fp-check"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}