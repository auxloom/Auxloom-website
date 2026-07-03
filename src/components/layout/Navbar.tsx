import { motion } from "motion/react";
import { useModals } from "../providers/ModalProvider";

const links = [
  // Hrefs point at the per-section eyebrow elements (not the section
  // itself) so the browser scrolls precisely to the eyebrow and the
  // section's own generous top padding doesn't push the headline out of
  // view. scroll-margin-top on `[id^="eyebrow-"]` in styles.css positions
  // the eyebrow ~16px below the fixed pill.
  { label: "Services", href: "#eyebrow-services" },
  { label: "Projects", href: "#eyebrow-projects" },
  { label: "About Us", href: "#eyebrow-about" },
  { label: "Blogs", href: "#eyebrow-blogs" },
];

export default function Navbar() {
  const { openBooking } = useModals();

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[min(1100px,calc(100vw-2rem))] -translate-x-1/2">
      <div className="glass-pill flex items-center justify-between gap-3 px-4 py-1.5 sm:px-6 shadow-[0_10px_40px_-20px_rgba(0,0,30,0.6)]">
        <a
          href="#top"
          aria-label="Auxloom — back to top"
          className="flex items-center text-foreground/90"
        >
          {/* The PNG has ~55% empty whitespace top/bottom. We render it at
              ~2× the container height inside a tightly-sized wrapper, and
              `overflow-hidden` + the centred translate crop to the central
              wordmark band. Width follows from the image aspect (1.645:1),
              so width ≈ 3.3× height — width is set slightly larger than that
              to give the cropped wordmark a comfortable horizontal fit. */}
          <div className="relative h-7 w-[100px] overflow-hidden sm:h-8 sm:w-[110px]">
            <img
              src="/logo-without-bg.png"
              alt="Auxloom"
              className="absolute left-1/2 top-1/2 h-[280%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2"
              width={2146}
              height={1304}
            />
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-[13px] text-foreground/80">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="relative transition-colors hover:text-foreground after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-foreground after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <motion.a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            openBooking();
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          data-cursor="view"
          data-cursor-label="Book"
          className="group glass-pill flex items-center gap-2 px-4 py-2 text-xs sm:text-sm text-foreground"
        >
          <span>Book a Meeting</span>
          <motion.span
            className="inline-block"
            initial={{ x: 0, y: 0 }}
            whileHover={{ x: 2, y: -2 }}
          >
            ↗
          </motion.span>
        </motion.a>
      </div>
    </header>
  );
}
