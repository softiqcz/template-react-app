"use client";

import { useAppContext } from "@/context/AppContext";

export function Footer() {
  const { feVersion } = useAppContext();

  return (
    <footer className="site-footer">
      <div className="site-container site-footer-inner">
        <p className="site-footer-version">FE {feVersion}</p>
        <a
          className="site-footer-link"
          href="https://softiq.cz"
          rel="noreferrer"
          target="_blank"
        >
          softIQ
        </a>
      </div>
    </footer>
  );
}
