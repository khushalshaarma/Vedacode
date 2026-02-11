import { Button } from "../components/ui/button";
import { ArrowRight, Users, BookOpen, Code2, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/src/assets/1755726715909video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            From <span className="vedic-text-gradient">Vedas</span> to{" "}
            <span className="vedic-text-gradient">Code</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            A Journey of Knowledge
          </p>

          <p className="text-lg md:text-xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Bridging ancient wisdom with modern technology, VEDATECH connects
            passionate volunteers from colleges with schools to deliver
            transformative tech education workshops across India.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 flex-wrap">
            <Button variant="hero" size="lg" onClick={() => navigate("/dashboard")}>
              <LayoutDashboard className="mr-2" />
              Go to Dashboard
              <ArrowRight className="ml-2" />
            </Button>

           
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto animate-slide-up">
            <div className="text-center">
              <div className="text-3xl font-bold vedic-text-gradient mb-2">500+</div>
              <div className="text-muted-foreground">Students Reached</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold vedic-text-gradient mb-2">50+</div>
              <div className="text-muted-foreground">Workshops Conducted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold vedic-text-gradient mb-2">25+</div>
              <div className="text-muted-foreground">Partner Schools</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 vedic-gradient rounded-full opacity-20 animate-glow-pulse"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 vedic-gradient rounded-full opacity-20 animate-glow-pulse animation-delay-1s"></div>
      <div className="absolute top-1/2 right-20 w-12 h-12 vedic-gradient rounded-full opacity-20 animate-glow-pulse animation-delay-2s"></div>
    </section>
  );
};

export default HeroSection;
