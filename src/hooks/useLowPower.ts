import { useEffect, useState } from "react";

/**
 * Returns true when the current device looks low-power and we should
 * dial back expensive decorative effects (LineWaves line counts, Cursor
 * trails, TextPressure font-variation updates, etc.).
 *
 * Signals we listen for:
 *   • `navigator.connection.saveData === true` (user opted into lite mode)
 *   • `navigator.deviceMemory < 4` (browser reports < 4 GB RAM)
 *   • `navigator.hardwareConcurrency < 4` (browser reports < 4 CPU cores)
 *   • `prefers-reduced-data: reduce` (when supported)
 *
 * Defaults to `false` (full-fat) so SSR + high-end desktop get the full
 * experience. Low-end phones and Save-Data users get the cheap version.
 */
export function useLowPower(): boolean {
  const [low, setLow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };

    const saveData = nav.connection?.saveData === true;
    const lowMemory = (nav.deviceMemory ?? Infinity) < 4;
    const lowCores = (nav.hardwareConcurrency ?? Infinity) < 4;
    const reducedData =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-data: reduce)").matches;

    setLow(saveData || lowMemory || lowCores || reducedData);
  }, []);

  return low;
}
