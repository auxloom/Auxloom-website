import { motion } from "motion/react";
import BlurText from "../ui/BlurText";

export default function Intro() {
  return (
    <section id="about" className="bg-[#f5f3ee] px-6 pt-28 pb-28 text-[#0d0d0d]">
      <div className="mx-auto max-w-6xl">
        <div
          id="eyebrow-about"
          className="mb-10 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.3em] text-neutral-500"
        >
          <span className="h-px w-8 bg-neutral-400" />
          About Us
          <span className="h-px w-8 bg-neutral-400" />
        </div>

        <BlurText
          text="We are Auxloom an AI studio building intelligent systems, and our mission is to turn ambitious ideas into shipped, scalable AI products."
          animateBy="words"
          delay={60}
          className="text-display justify-center text-center text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mt-16 flex justify-center"
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d="M32 0 L36 28 L64 32 L36 36 L32 64 L28 36 L0 32 L28 28 Z" fill="#0d0d0d" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 flex flex-col items-center gap-6"
        >
          <p className="max-w-md text-center text-sm text-neutral-600">
            At Auxloom, we combine engineering and applied AI to build relevant, functional systems
            that ship.
          </p>
          <a
            href="#services"
            className="rounded-full border border-neutral-900 px-6 py-2.5 text-[11px] uppercase tracking-[0.25em] transition-colors hover:bg-neutral-900 hover:text-white"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
}
