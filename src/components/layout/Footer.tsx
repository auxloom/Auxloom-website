import { motion } from "motion/react";
import PressureBand from "./PressureBand";
import { useModals } from "../providers/ModalProvider";

const cols = [
  {
    title: "Menu",
    items: ["Home", "Services", "Projects", "About Us", "Blogs"],
  },
  {
    title: "Services",
    items: ["AI Assistants", "MCP Servers", "SaaS Automation", "SEO & Screening", "Internal OS"],
  },
  {
    title: "Social Media",
    items: ["Instagram", "Twitter", "LinkedIn", "GitHub"],
  },
];

export default function Footer() {
  const { openContact } = useModals();

  return (
    <footer id="contact" className="bg-background px-6 pb-10 pt-6">
      <div className="mx-auto max-w-7xl">
        {/* CTA card — flat outlined panel that gains a navy-blue border glow
            on hover. Resting border stays subtle so the card reads as part
            of the surface until the user interacts with it. */}
        <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-background px-6 py-20 text-center transition-all duration-300 hover:border-white/30 hover:shadow-[var(--shadow-glow)] sm:py-28">
          <h3 className="text-display mx-auto max-w-3xl text-4xl font-light leading-tight text-foreground sm:text-5xl md:text-6xl">
            Let's Collaborate And Create <br className="hidden sm:block" /> Something Amazing!
          </h3>
          <p className="mx-auto mt-6 max-w-md text-sm text-foreground/70">
            Join us in transforming your project from concept to completion.
          </p>
          <motion.a
            href="mailto:hello@auxloom.ai"
            onClick={(e) => {
              e.preventDefault();
              openContact();
            }}
            data-cursor="view"
            data-cursor-label="Talk"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs uppercase tracking-[0.25em] text-background"
          >
            ✉ Let's Talk
          </motion.a>
        </div>

        {/* AUXLOOM pressure band — sits below the CTA card as a typographic
            punctuation mark before the page-wide footer grid. */}
        <div className="mt-12">
          <PressureBand />
        </div>

        {/* footer grid */}
        <div className="mt-12 grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            {/* Same crop technique as the navbar — render the image at ~2×
                container height inside a tight wrapper; `overflow-hidden` +
                the centred translate crop to just the wordmark band. */}
            <div className="relative h-9 w-[130px] overflow-hidden sm:h-10 sm:w-[145px]">
              <img
                src="/logo-without-bg.png"
                alt="Auxloom"
                className="absolute left-1/2 top-1/2 h-[280%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-90"
                width={2146}
                height={1304}
              />
            </div>
            <p className="mt-5 max-w-sm text-sm text-foreground/60">
              We are an AI studio building intelligent systems — our job is to ship the ambitious
              ideas other teams only talk about.
            </p>
          </div>
          {cols.map((c) => {
            const getHref = (colTitle: string, item: string) => {
              if (colTitle === "Menu") {
                switch (item) {
                  case "Home": return "#top";
                  case "Services": return "#eyebrow-services";
                  case "Projects": return "#eyebrow-projects";
                  case "About Us": return "#eyebrow-about";
                  case "Blogs": return "#eyebrow-blogs";
                }
              }
              if (colTitle === "Services") {
                return "#eyebrow-services";
              }
              if (colTitle === "Social Media") {
                return "#top";
              }
              return "#";
            };

            return (
              <div key={c.title}>
                <h4 className="text-[11px] uppercase tracking-[0.25em] text-foreground/80">
                  {c.title}
                </h4>
                <ul className="mt-5 space-y-3 text-sm text-foreground/60">
                  {c.items.map((i) => (
                    <li key={i}>
                      <a
                        href={getHref(c.title, i)}
                        className="transition-colors hover:text-foreground"
                      >
                        {i}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-foreground/50 sm:flex-row">
          <p>© 2026 Auxloom. All Rights Reserved.</p>
          <p className="flex gap-6">
            <a href="#" className="hover:text-foreground">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-foreground">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
