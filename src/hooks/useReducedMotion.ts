import { useEffect, useState } from "react";

/**
 * Returns true when the user has expressed a preference for reduced motion
 * (either via `prefers-reduced-motion: reduce` or a Save-Data header). Use
 * to skip decorative animations, spring physics, and per-frame rAF loops.
 *
 * Defaults to `false` during SSR — the media query isn't available, and
 * we don't want to suppress motion on the server pass.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
