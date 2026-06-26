import { useCallback, useEffect, useRef, useState } from "react";

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance: number, maxDist: number, minVal: number, maxVal: number) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const debounce = <T extends (...args: never[]) => void>(func: T, delay: number) => {
  let t: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => func(...args), delay);
  };
};

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  stroke?: boolean;
  className?: string;
  minFontSize?: number;
}

export default function TextPressure({
  text = "AUXLOOM",
  fontFamily = "Roboto Flex",
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = "#ffffff",
  strokeColor = "#3b6fff",
  className = "",
  minFontSize = 48,
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const spansRef = useRef<Array<HTMLSpanElement | null>>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    if (containerRef.current) {
      const { left, top, width: w, height: h } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + w / 2;
      mouseRef.current.y = top + h / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;
    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();
    let newFontSize = containerW / (chars.length / 1.5);
    newFontSize = Math.max(newFontSize, minFontSize);
    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);
    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const r = titleRef.current.getBoundingClientRect();
      if (scale && r.height > 0) {
        const yRatio = containerH / r.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    const d = debounce(setSize, 100);
    d();
    window.addEventListener("resize", d);
    return () => window.removeEventListener("resize", d);
  }, [setSize]);

  useEffect(() => {
    const title = titleRef.current;
    const container = containerRef.current;
    if (!title || !container) return;

    // IntersectionObserver drives the rAF loop. When AUXLOOM is off-screen
    // (footer band is below the fold for most of the page lifetime), we
    // stop the per-frame layout reads and style writes — that's the
    // dominant steady-state CPU cost.
    let raf = 0;
    let visible = true;

    const io = new IntersectionObserver(
      (entries) => {
        const next = entries[0]?.isIntersecting ?? true;
        if (next === visible) return;
        visible = next;
        if (next) raf = requestAnimationFrame(animate);
      },
      { threshold: 0 },
    );
    io.observe(container);

    const animate = () => {
      if (visible) raf = requestAnimationFrame(animate);
      if (!visible) return;
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;
      const r = title.getBoundingClientRect();
      const maxDist = r.width / 2;
      const spans = spansRef.current;
      for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        if (!span) continue;
        const sr = span.getBoundingClientRect();
        const center = { x: sr.x + sr.width / 2, y: sr.y + sr.height / 2 };
        const d = dist(mouseRef.current, center);
        const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
        const wght = weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400;
        const italVal = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : "0";
        const alphaVal = alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : "1";
        const fvs = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
        if (span.style.fontVariationSettings !== fvs) span.style.fontVariationSettings = fvs;
        if (alpha && span.style.opacity !== alphaVal) span.style.opacity = alphaVal;
      }
    };
    raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [width, weight, italic, alpha]);

  const dynamicClassName = [className, flex ? "flex" : "", stroke ? "stroke" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }}>
      <style>{`
        .tp-flex { display: flex; justify-content: space-between; align-items: center; }
        .tp-stroke span { position: relative; color: ${textColor}; }
        .tp-stroke span::after {
          content: attr(data-char);
          position: absolute; left: 0; top: 0;
          color: transparent; z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${strokeColor};
        }
      `}</style>
      <h1
        ref={titleRef}
        className={`${dynamicClassName} ${flex ? "tp-flex" : ""} ${stroke ? "tp-stroke" : ""}`}
        style={{
          fontFamily,
          fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: "center top",
          margin: 0,
          fontWeight: 100,
          color: stroke ? undefined : textColor,
          width: "100%",
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            style={{ display: "inline-block", color: stroke ? undefined : textColor }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
