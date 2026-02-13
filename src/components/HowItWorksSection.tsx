import React, { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, School, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorksSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const steps = [
    {
      icon: School,
      title: "Schools Request",
      description:
        "Schools identify their technology education needs and submit workshop requests through our platform",
    },
    {
      icon: Users,
      title: "Volunteers Match",
      description:
        "Our intelligent matching system connects qualified college volunteers with school requests based on expertise and location",
    },
    {
      icon: GraduationCap,
      title: "Knowledge Transfer",
      description:
        "Volunteers conduct engaging workshops, sharing practical tech skills while gaining valuable teaching experience",
    },
  ];

  const benefits = [
    "Interactive coding workshops",
    "Robotics and AI fundamentals",
    "Digital literacy programs",
    "Cybersecurity awareness",
    "Career guidance sessions",
    "Project-based learning",
  ];

  return (
    <section id="how-it-works" className="relative py-20 overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-40"
      >
        <source src="/videos/work.mp4" type="video/mp4" />
      </video>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How <span className="vedic-text-gradient">It Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple yet powerful process that connects knowledge seekers with
            knowledge sharers
          </p>
        </div>

        {/* Process Flow (3 cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                type: "spring",
                stiffness: 90,
              }}
            >
           <Card
  className="p-6 text-center 
  bg-white/60 backdrop-blur-md 
  rounded-xl border border-vedic/30 
  shadow-lg hover:shadow-vedic/40 
  transition-all duration-500"
>
  {/* Step Number */}
  <div
    className="vedic-gradient rounded-full w-10 h-10 
    flex items-center justify-center mx-auto mb-4 
    text-white font-bold text-sm shadow-md"
  >
    {index + 1}
  </div>

  {/* Icon */}
  <div className="mb-4">
    <step.icon className="h-10 w-10 mx-auto text-vedic-gradient" />
  </div>

  {/* Content */}
  <h3 className="text-lg font-semibold mb-2 text-vedic-gradient">
    {step.title}
  </h3>
  <p className="text-sm text-vedic-gradient/80 leading-relaxed">
    {step.description}
  </p>
</Card>




            </motion.div>
          ))}
        </div>

        {/* What We Offer Section (smaller) */}
       {/* What We Offer Section (Bottom, Black Blur) */}
<motion.div
  initial={{ opacity: 0, y: 40, scale: 0.95 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
  className="bg-black/60 backdrop-blur-md rounded-xl p-6 text-white shadow-md max-w-5xl mx-auto mt-40"
>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
    <div>
      <h3 className="text-xl font-bold mb-3">What We Offer</h3>
      <p className="text-sm opacity-90 mb-5 leading-relaxed">
        Our program covers essential technology skills through hands-on
        workshops designed to inspire and educate the next generation of
        innovators.
      </p>
      <Button
        variant="outline"
        size="sm"
        className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary"
      >
        Learn More
      </Button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {benefits.map((benefit, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.15,
            type: "spring",
          }}
          className="flex items-center space-x-2"
        >
          <CheckCircle className="h-4 w-4 text-white flex-shrink-0" />
          <span className="text-xs text-white/90">{benefit}</span>
        </motion.div>
      ))}
    </div>
  </div>
</motion.div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
