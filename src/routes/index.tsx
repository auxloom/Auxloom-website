import { createFileRoute } from "@tanstack/react-router";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Blogs from "@/components/Blogs";
import Footer from "@/components/Footer";

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
