import { motion, type Easing } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

type Snapshot = Record<string, string | number>;

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  stepDuration?: number;
  onAnimationComplete?: () => void;
}

const buildKeyframes = (from: Snapshot, steps: Snapshot[]) => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
  const out: Record<string, Array<string | number>> = {};
  keys.forEach((k) => {
    out[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return out;
};

export default function BlurText({
  text = "",
  delay = 120,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  stepDuration = 0.35,
  onAnimationComplete,
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const fromSnap: Snapshot = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -40 }
        : { filter: "blur(10px)", opacity: 0, y: 40 },
    [direction],
  );

  const toSnaps: Snapshot[] = useMemo(
    () => [
      { filter: "blur(4px)", opacity: 0.6, y: direction === "top" ? 4 : -4 },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction],
  );

  const stepCount = toSnaps.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1),
  );

  return (
    <p ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap" }}>
      {elements.map((segment, index) => {
        const keyframes = buildKeyframes(fromSnap, toSnaps);
        return (
          <motion.span
            key={index}
            initial={fromSnap}
            animate={inView ? keyframes : fromSnap}
            transition={{
              duration: totalDuration,
              times,
              delay: (index * delay) / 1000,
              ease: "easeOut" as Easing,
            }}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            style={{ display: "inline-block", willChange: "transform, filter, opacity" }}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </p>
  );
}
