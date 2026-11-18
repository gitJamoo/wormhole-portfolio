import React from "react";

// Simple routing glyph (one input fanning out to several outputs).
const OpenRouterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M1.5 8h4c2 0 2.5-4.5 5-4.5h3.5M5.5 8c2 0 2.5 4.5 5 4.5h3.5M5.5 8H14" />
    <path d="M12.5 2l1.5 1.5-1.5 1.5M12.5 11l1.5 1.5-1.5 1.5M12.5 6.5L14 8l-1.5 1.5" />
  </svg>
);

export default OpenRouterIcon;
