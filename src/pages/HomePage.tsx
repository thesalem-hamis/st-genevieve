import About from "@/components/home/About";
import BlogSection from "@/components/home/BlogSection";
import GetInvolved  from "@/components/home/GetInvolved";
import Hero from "@/components/home/Hero";
import HowWeSupport from "@/components/home/HowWeSupport";
import ImpactPictures from "@/components/home/ImpactPictures";
import LiveDonations from "@/components/home/LiveDonations";
import RecentProject from "@/components/home/RecentProjects";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />
      <HowWeSupport />
      <ImpactPictures />
      <RecentProject />
      <GetInvolved />
      <LiveDonations />
      <BlogSection />
    </div>
  );
}