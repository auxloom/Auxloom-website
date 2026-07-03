import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useModals } from "../providers/ModalProvider";
import s1 from "@/assets/service 1.png";
import s2 from "@/assets/service 2.png";
import s3 from "@/assets/service 3.png";
import s4 from "@/assets/service 4.png";
import s5 from "@/assets/service 5.png";
import s6 from "@/assets/service 6.png";


interface Service {
  title: string;
  body: string;
  image: string;
}

const services: Service[] = [
  {
    title: "SEO & AI Screening",
    body: "SEO optimization and AI-driven screening tests for web applications and pages — fast audits, actionable fixes, measurable lift.",
    image: s1,
  },
  {
    title: "AI Assistants & MCP",
    body: "Customized AI assistants and MCP server development tailored to your product, data, and team workflows.",
    image: s2,
  },
  {
    title: "SaaS Modernization",
    body: "Modernize SaaS with automation features for low-cost, efficient workflows that compound over time.",
    image: s3,
  },
  {
    title: "Enterprise Knowledge Apps",
    body: "Company-wide internal web applications, enterprise knowledge bases and dynamic interfaces built for scale.",
    image: s4,
  },
  {
    title: "Multi-OS QA & Exploit Testing",
    body: "Multi-OS support with screen testing, exploit testing and slop breakdown — surface real issues before users do.",
    image: s5,
  },
  {
    title: "Software Modification & Internal OS",
    body: "Software modification adding MCP support, plus internal organisational operation systems custom to your ops.",
    image: s6,
  },
];

export default function Services() {
  const { openBooking } = useModals();
  // `open` is the index of the currently expanded service, or null if none.
  // The doodle box on the right mirrors whichever service the user has open.
  const [open, setOpen] = useState<number | null>(0);
  const activeIdx = open ?? 0;
  const activeImage = services[activeIdx].image;
  const activeTitle = services[activeIdx].title;

  return (
    <section id="services" className="bg-[#f5f3ee] px-6 pt-28 pb-28 text-[#0d0d0d]">
      <div className="mx-auto max-w-7xl">
        <div
          id="eyebrow-services"
          className="mb-2 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-neutral-500"
        >
          <span className="h-px w-10 bg-neutral-400" />
          Our Services
        </div>

        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="text-display text-6xl font-light leading-none md:text-8xl">
            our services
          </h2>
          <p className="max-w-md text-sm text-neutral-600 md:text-right">
            With expertise in shipping intelligent systems and effective AI workflows, we help teams
            find authentic leverage and lasting momentum.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_280px] md:items-start">
          <ul className="border-t border-neutral-300">
            {services.map((s, i) => {
              const isOpen = open === i;
              return (
                <li key={i} className="border-b border-neutral-300">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    data-cursor="view"
                    data-cursor-label={isOpen ? "Close" : "Open"}
                    className="group grid w-full grid-cols-[60px_1fr_auto] items-center gap-6 py-7 text-left transition-colors hover:bg-neutral-100"
                  >
                    <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                      S / 0{i + 1}
                    </span>
                    <span className="text-display text-3xl font-light md:text-4xl">{s.title}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-900">
                      {isOpen ? "Close" : "See More"}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 pb-8 pl-[84px] pr-6 md:grid-cols-[1fr_auto] md:items-end">
                          <p className="max-w-2xl text-sm text-neutral-600 md:text-base">
                            {s.body}
                          </p>
                          <motion.a
                            href="#contact"
                            onClick={(e) => {
                              e.preventDefault();
                              openBooking(s.title);
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 self-start rounded-full bg-neutral-900 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white md:self-end"
                          >
                            Book Now →
                          </motion.a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="sticky top-28 hidden md:block">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-neutral-300 bg-white">
              <AnimatePresence mode="wait">
                <motion.img
                  // Keyed on the active service index so React swaps the
                  // <img> element whenever the user expands a different row,
                  // which triggers the AnimatePresence crossfade below.
                  key={activeIdx}
                  src={activeImage}
                  alt={activeTitle}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full object-contain p-6"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
