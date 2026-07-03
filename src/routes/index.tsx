import { createFileRoute } from "@tanstack/react-router";
import Cursor from "@/components/ui/Cursor";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import Intro from "@/components/layout/Intro";
import Services from "@/components/layout/Services";
import Projects from "@/components/layout/Projects";
import Blogs from "@/components/layout/Blogs";
import Footer from "@/components/layout/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Auxloom — AI Agency building intelligent systems" },
      {
        name: "description",
        content:
          "Auxloom is an AI agency designing and shipping intelligent assistants, MCP servers, SaaS automation and enterprise AI systems.",
      },
      { property: "og:title", content: "Auxloom — AI Agency" },
      {
        property: "og:description",
        content:
          "Intelligent AI solutions, MCP servers, SaaS automation and enterprise knowledge apps — engineered to ship.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Cursor />
      <Navbar />
      <Hero />
      <Intro />
      <Services />
      <Projects />
      <Blogs />
      <Footer />
    </main>
  );
}
