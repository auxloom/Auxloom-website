import { motion } from "motion/react";

export default function Projects() {
  return (
    <section id="projects" className="bg-background px-6 pt-28 pb-32">
      <div className="mx-auto max-w-6xl text-center">
        <div
          id="eyebrow-projects"
          className="mb-6 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.3em] text-foreground/50"
        >
          <span className="h-px w-10 bg-foreground/30" />
          Projects
          <span className="h-px w-10 bg-foreground/30" />
        </div>
        <motion.h2
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-display text-6xl font-light leading-none sm:text-7xl md:text-8xl bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent"
        >
          Coming Soon
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mx-auto mt-8 max-w-md text-sm text-foreground/60"
        >
          A curated showcase of intelligent systems we've shipped is on the way.
        </motion.p>
      </div>
    </section>
  );
}
