import { motion } from "motion/react";

interface BlogPost {
  eyebrow: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
}

const posts: BlogPost[] = [
  {
    eyebrow: "Engineering",
    title: "Designing MCP Servers for Production AI Workflows",
    excerpt:
      "A practical look at building Model Context Protocol servers that hold up under real load — schema versioning, tool-call retries, and graceful fallbacks when an upstream LLM misbehaves.",
    readTime: "7 min read",
    date: "May 2026",
  },
  {
    eyebrow: "AI",
    title: "When to Reach for an Agent — and When Not To",
    excerpt:
      "Agentic loops are tempting, but most production AI problems collapse into a well-scoped retrieval + structured-output pipeline. Here's the decision rubric we use at Auxloom before we commit.",
    readTime: "5 min read",
    date: "April 2026",
  },
  {
    eyebrow: "Automation",
    title: "SaaS Modernisation Without the Rewrite",
    excerpt:
      "You don't need to throw the legacy stack away to ship AI features. We walk through the strangler-fig pattern we used to layer an intelligent automation layer on top of a 9-year-old SaaS product.",
    readTime: "9 min read",
    date: "March 2026",
  },
];

export default function Blogs() {
  return (
    <section id="blogs" className="bg-background px-6 pt-28 pb-28">
      <div className="mx-auto max-w-6xl">
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

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              data-cursor="hover"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-card/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[var(--shadow-glow)]"
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
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-foreground/80 transition-colors group-hover:text-foreground"
                >
                  Read More
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
