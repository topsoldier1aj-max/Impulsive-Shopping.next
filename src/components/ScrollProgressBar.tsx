"use client";

import { useEffect, useState } from "react";

// Ported from CustomerLayout.vue's `.scroll-bar`/`.scroll-progress` — a thin
// fixed bar across the top that fills black as you scroll down the page.
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    update();
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[60] h-1 w-full">
      <div
        className="h-full bg-[#040404] transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
