import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Class 10 Student",
      school: "Delhi Public School, Mumbai",
      content:
        "The coding workshop opened my eyes to the world of programming. I never thought I could create my own website! The mentors explained everything so clearly.",
      rating: 5,
      avatar: "PS",
    },
    {
      name: "Rahul Kumar",
      role: "Computer Science Teacher",
      school: "Government High School, Bangalore",
      content:
        "VEDATECH volunteers brought fresh energy to our students. The hands-on approach and real-world projects made learning technology exciting for everyone.",
      rating: 5,
      avatar: "RK",
    },
    {
      name: "Ananya Patel",
      role: "Volunteer Mentor",
      school: "IIT Bombay",
      content:
        "Teaching through VEDATECH has been incredibly rewarding. Seeing students light up when they understand a concept makes all the effort worthwhile.",
      rating: 5,
      avatar: "AP",
    },
    {
      name: "Dr. Sunita Gupta",
      role: "Principal",
      school: "St. Mary's Convent School, Kolkata",
      content:
        "The impact on our students has been remarkable. VEDATECH has bridged the gap between theoretical knowledge and practical application beautifully.",
      rating: 5,
      avatar: "SG",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Video (STATIC) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 filter blur-sm"
      >
        <source src="/videos/img4.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay (STATIC) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

      {/* Content (ANIMATED) */}
      <motion.div
        key={Date.now()} // 👈 ensures animation restarts on page enter
        className="relative z-20 container mx-auto px-6"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            Success <span className="vedic-text-gradient">Stories</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-sm">
            Hear from students, teachers, and volunteers who have experienced
            the transformative power of VEDATECH
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <Card className="p-8 md:p-12 vedic-shadow-warm relative overflow-hidden bg-black/40 backdrop-blur-lg border border-white/10">
            <Quote className="absolute top-6 right-6 h-16 w-16 text-white/10" />
            <div className="text-center text-white">
              <div className="w-20 h-20 vedic-gradient rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-2xl drop-shadow-lg">
                {testimonials[currentIndex].avatar}
              </div>

              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              <blockquote className="text-lg md:text-xl italic leading-relaxed mb-8 drop-shadow-sm">
                "{testimonials[currentIndex].content}"
              </blockquote>

              <div>
                <div className="font-semibold text-lg drop-shadow-sm">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-primary font-medium drop-shadow-sm">
                  {testimonials[currentIndex].role}
                </div>
                <div className="text-white/80 drop-shadow-sm">
                  {testimonials[currentIndex].school}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Carousel Indicators */}
        <motion.div
          className="flex justify-center space-x-2 mb-16"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full vedic-transition ${
                index === currentIndex ? "vedic-gradient" : "bg-white/40"
              }`}
            />
          ))}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white drop-shadow-sm"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold vedic-text-gradient mb-2">
              98%
            </div>
            <div className="text-white/80">Student Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold vedic-text-gradient mb-2">
              95%
            </div>
            <div className="text-white/80">Teacher Approval</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold vedic-text-gradient mb-2">
              88%
            </div>
            <div className="text-white/80">Volunteer Retention</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold vedic-text-gradient mb-2">
              92%
            </div>
            <div className="text-white/80">Workshop Success Rate</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
