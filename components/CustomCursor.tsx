"use client";

import React, { useEffect, useState, useRef } from "react";

type CursorMode = "default" | "project" | "cta" | "hidden";

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      const { clientX, clientY } = e;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      if (ringRef.current) {
        // Reduced transition time for more responsive feel while maintaining smoothness
        ringRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => {
      setIsVisible(false);
      setMode("hidden");
    };
    const onMouseEnter = () => setIsVisible(true);

    const attachHoverListeners = () => {
      const targets = document.querySelectorAll(
        "a, button, .group, input, textarea, [data-cursor]"
      );

      targets.forEach((target) => {
        const handleEnter = () => {
          const customMode = (target as HTMLElement).getAttribute(
            "data-cursor"
          ) as CursorMode;
          if (customMode) {
            setMode(customMode);
          } else if (
            target.tagName === "A" ||
            target.tagName === "BUTTON" ||
            target.classList.contains("group")
          ) {
            setMode("cta");
          } else {
            setMode("default");
          }
        };

        const handleLeave = () => setMode("default");

        target.addEventListener("mouseenter", handleEnter);
        target.addEventListener("mouseleave", handleLeave);
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseleave", onMouseLeave);

    attachHoverListeners();

    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
    };
  }, [isVisible]);

  const getRingStyles = () => {
    switch (mode) {
      case "project":
        return "scale-[2.8] bg-white border-none";
      case "cta":
        return "scale-[1.8] bg-white border-none";
      default:
        return "scale-100 border-white/40";
    }
  };

  return (
    <>
      {/* Precision Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] transition-opacity duration-300 mix-blend-difference ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${mode !== "default" ? "scale-0" : "scale-100"}`}
        style={{ marginTop: "-0.09375rem", marginLeft: "-0.09375rem" }}
      />

      {/* Interactive Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-10 h-10 border rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out mix-blend-difference flex items-center justify-center ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${getRingStyles()} ${isClicking ? "scale-[0.8]" : ""}`}
        style={{ marginTop: "-1.25rem", marginLeft: "-1.25rem" }}
      >
        {/* Label for Project Hover */}
        <span
          className={`text-[4px] font-black tracking-[0.2em] text-black uppercase transition-opacity duration-300 ${
            mode === "project" ? "opacity-100" : "opacity-0"
          }`}
        >
          VIEW
        </span>
      </div>

      <style>{`
        @media (pointer: fine) {
          body, a, button, [role="button"], .group {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
