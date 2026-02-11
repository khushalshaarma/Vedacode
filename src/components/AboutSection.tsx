"use client";

import { Card } from "../components/ui/card";
import { Heart, Target, Lightbulb, Globe } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const visionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const values = [
    {
      icon: Heart,
      title: "Vedic Inspiration",
      description:
        "Drawing wisdom from ancient texts to inspire modern learning approaches.",
    },
    {
      icon: Target,
      title: "Social Impact",
      description:
        "Bridging the digital divide by bringing quality tech education to every corner of India.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Combining traditional teaching methods with cutting-edge technology.",
    },
    {
      icon: Globe,
      title: "Community",
      description:
        "Building a network of passionate educators and eager learners.",
    },
  ];

  useEffect(() => {
    // Heading animation
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    }

    // Cards animation
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          delay: 0.3,
        }
      );
    }

    // Vision card animation
    if (visionRef.current) {
      gsap.to(visionRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: visionRef.current,
          start: "top 90%",
          toggleActions: "play none none none", // animate once
        },
      });
    }
  }, []);

  return (
    <section className="relative w-full py-20">
      {/* 🎥 Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/book.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              VEDATECH
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            At <span className="font-semibold text-white">VEDATECH</span>, we
            believe the timeless wisdom of the Vedas can illuminate the path to
            modern technological mastery. Our mission is to democratize tech
            education by connecting passionate college volunteers with schools
            that need guidance in the digital age.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 w-full">
          {values.map((value, index) => (
            <Card
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="p-8 text-center bg-white/15 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl"
            >
              <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-5 shadow-md">
                <value.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{value.title}</h3>
              <p className="text-sm text-gray-200 leading-relaxed">{value.description}</p>
            </Card>
          ))}
        </div>

        {/* Vision Card below values */}
        <div
          ref={visionRef}
          className="w-full max-w-4xl mx-auto mt-10 opacity-0 translate-y-10"
        >
          <Card className="p-8 text-center bg-white/15 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
              Our Vision
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              We envision a future where every student in India has access to
              quality technology education, where ancient wisdom guides modern
              innovation, and where the spirit of knowledge sharing creates a
              ripple effect of positive change across communities.
            </p>
            <blockquote className="text-xl md:text-2xl font-medium italic text-gray-100">
              “Knowledge is the only treasure that increases when shared” <br />
              <span className="text-cyan-300 not-italic">
                — Ancient Vedic Wisdom
              </span>
            </blockquote>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
