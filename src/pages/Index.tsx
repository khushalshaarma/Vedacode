import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import HowItWorksSection from "../components/HowItWorksSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";
import Profile from "../components/Profile"; // <-- import Profile
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const sections = [
  { id: "hero", component: <HeroSection /> },
  { id: "about", component: <AboutSection /> },
  { id: "how", component: <HowItWorksSection /> },
  { id: "testimonials", component: <TestimonialsSection /> },
  { id: "footer", component: <Footer /> },
];

const Index = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="h-screen w-full overflow-y-scroll relative">
      {/* Profile Section */}
      <Profile />

      {sections.map((section, i) => {
        const start = i / sections.length;
        const end = (i + 1) / sections.length;

        const y = useTransform(scrollYProgress, [start, end], ["100%", "0%"]);

        return (
          <motion.section
            key={section.id}
            style={{ y, opacity: 1 }}
            className="h-screen w-full sticky top-0 flex-shrink-0 bg-white"
          >
            {section.component}
          </motion.section>
        );
      })}
    </div>
  );
};

export default Index;
