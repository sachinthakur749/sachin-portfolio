"use client";

import React, { useEffect, useState, useRef } from "react";

type CursorMode = "default" | "project" | "cta" | "hidden";

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Store mouse position for smooth animation
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    let eventListeners: Array<{ element: Element; event: string; handler: EventListener }> = [];

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Instant dot movement
      if (dotRef.current) {
        dotRef.current.style.left = `${mousePos.current.x}px`;
        dotRef.current.style.top = `${mousePos.current.y}px`;
      }

      // Smooth ring movement with lerp (linear interpolation)
      if (ringRef.current) {
        const lerp = 0.15; // Adjust for smoothness (0.1 = smoother, 0.3 = faster)
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => {
      setIsVisible(false);
      setMode("hidden");
    };
    const onMouseEnter = () => setIsVisible(true);

    const attachHoverListeners = () => {
      // Clean up old listeners
      eventListeners.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler);
      });
      eventListeners = [];

      const targets = document.querySelectorAll(
        "a, button, .group, input, textarea, [data-cursor], img"
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

        // Store listeners for cleanup
        eventListeners.push(
          { element: target, event: "mouseenter", handler: handleEnter },
          { element: target, event: "mouseleave", handler: handleLeave }
        );
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseleave", onMouseLeave);

    attachHoverListeners();
    rafId.current = requestAnimationFrame(animate);

    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseleave", onMouseLeave);

      // Clean up event listeners
      eventListeners.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler);
      });

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

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
        className={`fixed w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] transition-opacity duration-300 mix-blend-difference ${isVisible ? "opacity-100" : "opacity-0"
          } ${mode !== "default" ? "scale-0" : "scale-100"}`}
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "left, top"
        }}
      />

      {/* Interactive Ring */}
      <div
        ref={ringRef}
        className={`fixed w-10 h-10 border rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out mix-blend-difference flex items-center justify-center ${isVisible ? "opacity-100" : "opacity-0"
          } ${getRingStyles()} ${isClicking ? "scale-[0.8]" : ""}`}
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "left, top"
        }}
      >
        {/* Label for Project Hover */}
        <span
          className={`text-[4px] font-black tracking-[0.2em] text-black uppercase transition-opacity duration-300 ${mode === "project" ? "opacity-100" : "opacity-0"
            }`}
        >
          VIEW
        </span>
      </div>

      <style>{`
        @media (pointer: fine) {
          body, a, button, [role="button"], .group, img {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
