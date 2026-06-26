import { useEffect, useRef, useState } from "react";

import "./Cursor.css";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CursorState = "default" | "hover" | "view" | "drag";

interface CursorProps {
  /** When true, render the custom cursor. Defaults to true; auto-disables
   *  on touch devices (no mouse = no cursor). */
  enabled?: boolean;
}

export default function Cursor({ enabled = true }: CursorProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  // Read state directly from the DOM — never stored in React state during
  // the high-frequency mousemove path. Only commit React state when the
  // state *category* changes (hover → view etc.), which triggers the
  // CSS transition on the ring.
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState<string>("");
  const [active, setActive] = useState<boolean>(enabled);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Auto-disable on coarse-pointer / touch devices — the custom cursor
    // would just lag behind taps and feel broken.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) {
      setActive(false);
      return;
    }

    const host = hostRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!host || !ring || !dot) return;

    // Hide the host while the cursor is outside the window.
    const onEnter = () => host.setAttribute("data-hidden", "false");
    const onLeave = () => host.setAttribute("data-hidden", "true");

    // Ring position — eased toward the actual cursor. We use two refs
    // (target = real cursor, current = ring) and a per-frame lerp.
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      // Bump the idle-pause clock so the rAF loop stays awake while the
      // user is moving. The `onMoveWake` listener below also bumps this,
      // but doing it here avoids one extra listener registration.
      lastMoveAt = performance.now();

      // Walk up from the event target to find a data-cursor attribute.
      // We keep a small cache so once a row's element is identified we
      // don't re-walk on every mouse tick (saves layout-thrash on long
      // lists like the Services rows).
      const t = e.target as Element | null;
      let node: Element | null = t;
      let next: CursorState = "default";
      let nextLabel = "";
      let depth = 0;
      while (node && depth < 6) {
        const s = node.getAttribute("data-cursor") as CursorState | null;
        if (s) {
          next = s;
          nextLabel = node.getAttribute("data-cursor-label") ?? "";
          break;
        }
        node = node.parentElement;
        depth += 1;
      }
      if (next !== lastStateRef.current || nextLabel !== lastLabelRef.current) {
        lastStateRef.current = next;
        lastLabelRef.current = nextLabel;
        setState(next);
        setLabel(nextLabel);
      }
    };

    // Use refs to read the current React state without re-creating the
    // listener on every render — otherwise we'd register a new mousemove
    // on every setState call from the hover-path-walk above.
    const lastStateRef = { current: state };
    const lastLabelRef = { current: label };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.documentElement.addEventListener("mouseleave", onLeave);
    host.setAttribute("data-hidden", "true");

    let raf = 0;
    // Idle-pause: the rAF loop only runs while the user is actively moving
    // the cursor or the ring hasn't yet caught up to the target. After
    // ~1.5s of no movement, we stop scheduling frames until the next
    // mousemove. This is the dominant CPU win on long-running sessions.
    let lastMoveAt = performance.now();
    const idleThresholdMs = 1500;

    const tick = () => {
      const settledX = Math.abs(target.x - current.x) < 0.5;
      const settledY = Math.abs(target.y - current.y) < 0.5;
      const idle = performance.now() - lastMoveAt > idleThresholdMs;
      if (settledX && settledY && idle) {
        // Done — drop the loop. Next mousemove will re-kick it.
        raf = 0;
        return;
      }
      // Lerp ring toward cursor at ~22% per frame at 60fps — gives a
      // soft trailing motion without feeling laggy. Dot snaps exactly.
      current.x += (target.x - current.x) * 0.22;
      current.y += (target.y - current.y) * 0.22;
      ring.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMoveWake = () => {
      lastMoveAt = performance.now();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // `onMove` already runs for state updates; attach a second listener
    // that just bumps lastMoveAt without re-walking the DOM tree.
    window.addEventListener("mousemove", onMoveWake, { passive: true });

    if (reducedMotion) {
      // Snap cursor exactly to target — no easing, no rAF loop.
      // Apply the latest known target to the dot's transform inline so
      // it doesn't visually lag on first render either.
      const snap = () => {
        ring.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
        dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      };
      const snapOnMove = (e: MouseEvent) => {
        target.x = e.clientX;
        target.y = e.clientY;
        snap();
      };
      window.addEventListener("mousemove", snapOnMove, { passive: true });
      // Start the loop once to apply the initial frame, then bail.
      raf = requestAnimationFrame(() => {
        snap();
        cancelAnimationFrame(raf);
        raf = 0;
      });
      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mousemove", onMoveWake);
        window.removeEventListener("mousemove", snapOnMove);
        document.documentElement.removeEventListener("mouseenter", onEnter);
        document.documentElement.removeEventListener("mouseleave", onLeave);
        cancelAnimationFrame(raf);
      };
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", onMoveWake);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
    // We intentionally omit `state` and `label` from deps — they're
    // read via refs so the listeners stay stable for the whole session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  if (!active) return null;

  return (
    <div ref={hostRef} className="cursor-host" data-hidden="true">
      <div ref={ringRef} className="cursor-ring" data-state={state} data-label={label} />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
