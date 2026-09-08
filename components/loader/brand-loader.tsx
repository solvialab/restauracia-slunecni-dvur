"use client";
import { useEffect } from "react";
export function BrandLoader() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      delete document.documentElement.dataset.intro;
      try {
        sessionStorage.setItem("slunecni-intro", "seen");
      } catch {}
    }, 3000);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <div className="brand-loader" aria-hidden="true">
      <div className="loader-art">
        <svg width="240" height="110" viewBox="0 0 240 110" fill="none">
          <g className="loader-sun">
            <circle cx="120" cy="56" r="14" fill="currentColor" />
            <path
              d="M120 29v-7m21 15 5-5m-47 5-5-5m56 26h7m-74 0h7"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </g>
          <path
            className="loader-courtyard"
            d="M10 90h22V66l30-24 30 24v24h16V78h33v12h17V55l20-14 24 20v29h28M32 66h60M158 61h44M51 90V70h22v20"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
        <div className="loader-wordmark">SLUNEČNÍ DVŮR</div>
        <div className="loader-line" />
      </div>
    </div>
  );
}
