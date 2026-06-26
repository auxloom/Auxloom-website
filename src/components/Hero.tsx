import { motion } from "motion/react";
import BlurText from "./BlurText";
import LineWaves from "./LineWaves";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Animated line-waves background — navy-blue lines on the dark navy base */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <LineWaves
          speed={0.25}
          innerLineCount={26}
          outerLineCount={32}
          warpIntensity={0.7}
          rotation={-45}
          edgeFadeWidth={0.0}
          colorCycleSpeed={0.25}
          brightness={0.28}
          color1="#3b6fff"
          color2="#1d3bff"
          color3="#7aa2ff"
          enableMouseInteraction={true}
          mouseInfluence={1.2}
        />
        {/* Stronger vignette so the centre plate (headline + CTA) darkens out
            and the line pattern becomes a perimeter texture instead of a
            competing backdrop behind the text. */}
        <div className="hero-vignette absolute inset-0" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-foreground/80 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for new projects
        </motion.span>

        <BlurText
          text="Discover Innovation"
          animateBy="letters"
          delay={50}
          stepDuration={0.4}
          className="text-display justify-center text-center text-6xl font-light leading-[0.95] text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-8 max-w-xl text-sm sm:text-base text-foreground/70"
        >
          Auxloom delivers intelligent AI solutions — engineered, automated, and built to scale with
          your business.
        </motion.p>

        <motion.a
          href="#contact"
          data-cursor="view"
          data-cursor-label="Talk"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: "var(--shadow-glow)" }}
          whileTap={{ scale: 0.97 }}
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-shadow"
        >
          Let's Talk
          <motion.span
            className="inline-block"
            initial={{ x: 0 }}
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.a>
      </div>

      {/* Bottom fade was removed — Hero now hands off directly to the
          light-coloured Intro section, so a gradient into `bg-background`
          (dark navy) was the wrong direction and showed up as a visible
          strip after anchor-scrolling. */}
    </section>
  );
}
