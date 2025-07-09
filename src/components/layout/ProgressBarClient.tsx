"use client";
import { useEffect, useRef } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { usePathname, useSearchParams } from "next/navigation";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

export default function ProgressBarClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Start NProgress on link click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Only left click, no modifier keys
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      let target = e.target as HTMLElement | null;
      while (target && target !== document.body) {
        if (
          (target.tagName === "A" && target.getAttribute("href") && !target.getAttribute("target")) ||
          (target.tagName === "BUTTON" && target.getAttribute("data-nprogress"))
        ) {
          NProgress.start();
          // Fallback: always stop after 1s
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            NProgress.done();
          }, 1000);
          break;
        }
        target = target.parentElement;
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      NProgress.done(); // Ensure bar is removed on unmount
    };
  }, []);

  // Complete NProgress when route changes
  useEffect(() => {
    NProgress.done();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [pathname, searchParams]);

  // Ensure nprogress bar is always on top
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      #nprogress { pointer-events: none; }
      #nprogress .bar {
        background: #E50000 !important;
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
      }
      #nprogress .peg {
        box-shadow: 0 0 10px #E50000, 0 0 5px #E50000;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
} 
