import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  Send,
  Heart
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6">
        {/* Newsletter Section */}
        <div className="py-16 text-center border-b border-background/20">
          <h3 className="text-3xl font-bold mb-4">Stay Connected with VEDATECH</h3>
          <p className="text-background/80 mb-8 max-w-2xl mx-auto">
            Get updates on new workshops, success stories, and opportunities to make a difference in tech education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="bg-background/10 border-background/30 text-background placeholder:text-background/60"
              aria-label="Email Address"
            />
            <Button variant="hero" className="shrink-0" aria-label="Subscribe to Newsletter">
              <Send className="mr-2 h-4 w-4" />
              Subscribe
            </Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">
                VEDA<span className="text-primary">TECH</span>
              </h2>
              <p className="text-background/80 leading-relaxed">
                Bridging ancient wisdom with modern technology to create transformative educational experiences. 
                From Vedas to Code - A Journey of Knowledge that empowers students and communities across India.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-background/80">hello@vedatech.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-background/80">+91-9876543210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-background/80">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["About Us", "How It Works", "Become a Volunteer", "For Schools", "For Colleges", "Resources"].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`} 
                    className="text-background/80 hover:text-primary vedic-transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Programs</h4>
            <ul className="space-y-3">
              {["Coding Workshops", "Robotics & AI", "Digital Literacy", "Cybersecurity", "Career Guidance", "Teacher Training"].map((program) => (
                <li key={program}>
                  <a 
                    href={`/programs/${program.toLowerCase().replace(/\s+/g, "-")}`} 
                    className="text-background/80 hover:text-primary vedic-transition"
                  >
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-background/20" />

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-background/60 mb-4 md:mb-0">
            <p className="flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by VEDATECH Team • © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" title="Facebook" className="text-background/60 hover:text-primary vedic-transition">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter" title="Twitter" className="text-background/60 hover:text-primary vedic-transition">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Instagram" title="Instagram" className="text-background/60 hover:text-primary vedic-transition">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="LinkedIn" title="LinkedIn" className="text-background/60 hover:text-primary vedic-transition">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" aria-label="YouTube" title="YouTube" className="text-background/60 hover:text-primary vedic-transition">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
