import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import HowWeSupport from "@/components/home/HowWeSupport";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />
      <HowWeSupport />
    </div>
  );
}