import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WhoSection from "@/components/sections/WhoSection";
import MasterSection from "@/components/sections/MasterSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import CurriculumSection from "@/components/sections/CurriculumSection";
import ToolStackSection from "@/components/sections/ToolStackSection";
import B2BSection from "@/components/sections/B2BSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/Footer";
import SectionScrollNav from "@/components/SectionScrollNav";

export default function Home() {
  return (
    // Outer shell: very dark navy gutter fills the viewport
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.045 0.015 240)" }}
    >
      {/* Boxed inner frame: centered, max-width, with subtle border */}
      <div
        className="mx-auto w-full relative"
        style={{
          maxWidth: "1100px",
          background: "oklch(0.08 0.02 240)",
          boxShadow: "0 0 0 1px oklch(0.78 0.15 175 / 0.08), 0 0 80px oklch(0.07 0.02 240 / 0.8)",
          minHeight: "100vh",
        }}
      >
        <div
          className="blueprint-grid"
          style={{
            backgroundAttachment: "local",
            minHeight: "100vh",
          }}
        >
          <Navbar />
          <div id="hero"><HeroSection /></div>
          <AboutSection />
          <WhoSection />
          <MasterSection />
          <HowItWorksSection />
          <CurriculumSection />
          <ToolStackSection />
          <B2BSection />
          <CTASection />
          <Footer />
        </div>
      </div>
      {/* Scroll navigator — fixed position, outside the box */}
      <SectionScrollNav />
    </div>
  );
}
