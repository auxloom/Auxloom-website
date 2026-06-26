import { motion, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import posts from "../data/blogs_data.json";

interface BlogPost {
  eyebrow: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  content?: string[];
}

export default function Blogs() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    // Scroll by the width of one blog item (including the 24px gap)
    const firstCard = container.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 392;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section id="blogs" className="bg-background pt-28 pb-28 overflow-hidden">
      {/* Centered header content aligned with the site's grid */}
      <div className="mx-auto max-w-6xl px-6">
        <div
          id="eyebrow-blogs"
          className="mb-6 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.3em] text-foreground/50"
        >
          <span className="h-px w-10 bg-foreground/30" />
          Blogs
          <span className="h-px w-10 bg-foreground/30" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-display text-center text-5xl font-light leading-none sm:text-6xl md:text-7xl"
        >
          Field notes from the studio
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mt-5 max-w-xl text-center text-sm text-foreground/60"
        >
          Writing on the systems we ship, the mistakes we make, and where applied AI actually moves
          the needle.
        </motion.p>
      </div>

      {/* Full-width scroll wrapper to allow edge-to-edge horizontal scrolling */}
      <div className="relative mt-16 w-full">
        <div
          ref={scrollRef}
          className="flex w-full overflow-x-auto gap-6 pb-6 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-[max(1.5rem,calc((100vw-1152px)/2))]"
        >
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              data-cursor="hover"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-card/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[var(--shadow-glow)] w-[calc(100vw-3rem)] sm:w-[340px] md:w-[368px] shrink-0 snap-start"
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                <span>{p.eyebrow}</span>
                <span>{p.date}</span>
              </div>

              <h3 className="text-display mt-6 text-2xl font-light leading-snug">{p.title}</h3>

              <p className="mt-4 grow text-sm leading-relaxed text-foreground/65">{p.excerpt}</p>

              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-5">
                <span className="text-[11px] uppercase tracking-[0.2em] text-foreground/45">
                  {p.readTime}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedBlog(p);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-foreground/80 transition-colors group-hover:text-foreground cursor-pointer"
                >
                  Read More
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Navigation Controls aligned back to the centered grid */}
        <div className="mx-auto max-w-6xl px-6 mt-8 flex justify-center gap-3">
          <button
            onClick={() => handleScroll("left")}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-all hover:border-white/30 hover:bg-white/10"
            aria-label="Scroll left"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-all hover:border-white/30 hover:bg-white/10"
            aria-label="Scroll right"
          >
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </div>

      {/* Expanding Sleek Reader Modal - Covers Page Partially */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with elegant blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlog(null)}
              className="absolute inset-0 bg-background/85 backdrop-blur-md"
            />

            {/* Reader Card Modal - covers page partially */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-card p-6 shadow-2xl sm:p-10 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* Header metadata */}
              <div className="flex items-start justify-between border-b border-white/5 pb-5">
                <div>
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                    <span>{selectedBlog.eyebrow}</span>
                    <span>•</span>
                    <span>{selectedBlog.date}</span>
                  </div>
                  <h3 className="text-display mt-3 text-3xl font-light leading-tight text-foreground md:text-4xl">
                    {selectedBlog.title}
                  </h3>
                  <p className="mt-2 text-xs text-foreground/45 uppercase tracking-wider">
                    {selectedBlog.readTime}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="rounded-full bg-white/5 p-2.5 text-foreground/60 transition-all hover:bg-white/10 hover:text-foreground hover:rotate-90"
                  aria-label="Close reader"
                >
                  ✕
                </button>
              </div>

              {/* Rich Body Content */}
              <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/80 font-light">
                {selectedBlog.content ? (
                  selectedBlog.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>{selectedBlog.excerpt}</p>
                )}
              </div>

              {/* Bottom footer button */}
              <div className="mt-10 border-t border-white/5 pt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedBlog(null)}
                  className="rounded-xl border border-white/15 bg-white/5 px-6 py-2.5 text-xs uppercase tracking-wider text-foreground hover:bg-white/10 transition-colors"
                >
                  Close Reader
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
