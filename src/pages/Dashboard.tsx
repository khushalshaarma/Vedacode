import { useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  GraduationCap,
  Users,
  University,
  BookOpen,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

// CSS keyframes for glow animation (add this in your global CSS or Tailwind @layer)
const glowStyle = `
@keyframes neonGlow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(0,255,255,0.6), 0 0 20px rgba(0,255,255,0.4), 0 0 30px rgba(0,255,255,0.2);
  }
  50% {
    box-shadow: 0 0 20px rgba(0,255,255,0.8), 0 0 40px rgba(0,255,255,0.6), 0 0 60px rgba(0,255,255,0.3);
  }
}
.animate-glow {
  animation: neonGlow 2s infinite alternate;
}
`;
const style = document.createElement("style");
style.innerHTML = glowStyle;
document.head.appendChild(style);

interface DashboardItem {
  title: string;
  desc: string;
  icon: JSX.Element;
  route: string;
  color: string; // Tailwind gradient classes
}

const Dashboard = () => {
  const navigate = useNavigate();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const dashboards: DashboardItem[] = [
    {
      title: "School Dashboard",
      desc: "Request workshops, track student progress, give feedback, and join meetings.",
      icon: <GraduationCap className="h-12 w-12 text-blue-400 mb-4" />,
      route: "/dashboard/school",
      color: "from-blue-600 to-indigo-700",
    },
    {
      title: "Volunteer Dashboard",
      desc: "Manage sessions, upload reports, and track your impact.",
      icon: <Users className="h-12 w-12 text-green-400 mb-4" />,
      route: "/dashboard/volunteer",
      color: "from-green-600 to-emerald-700",
    },
    {
      title: "College Dashboard",
      desc: "Coordinate student mentors and monitor outreach.",
      icon: <University className="h-12 w-12 text-purple-400 mb-4" />,
      route: "/dashboard/college",
      color: "from-purple-600 to-pink-700",
    },
    {
      title: "Knowledge Hub",
      desc: "Browse curated content, quizzes, and resources.",
      icon: <BookOpen className="h-12 w-12 text-pink-400 mb-4" />,
      route: "/dashboard/knowledge",
      color: "from-pink-600 to-rose-700",
    },
    {
      title: "Admin Panel",
      desc: "Manage users, match requests, and view analytics.",
      icon: <Settings className="h-12 w-12 text-orange-400 mb-4" />,
      route: "/dashboard/admin",
      color: "from-orange-600 to-red-700",
    },
  ];

  useEffect(() => {
    const midIndex = (cardsRef.current.length - 1) / 2;

    cardsRef.current.forEach((el, i) => {
      if (!el) return;

      const xOffset = (i - midIndex) * 320;
      const yOffset = Math.abs(i - midIndex) * -20;
      const rotateY = (i - midIndex) * 12;
      const scale = 0.85 - Math.abs(i - midIndex) * 0.05;

      // Initial state
      gsap.set(el, {
        x: 0,
        y: 50,
        z: -400,
        scale: 0.4,
        opacity: 0,
        rotateY: 0,
        zIndex: 100 - Math.abs(i - midIndex),
      });

      // Entrance animation
      gsap.to(el, {
        x: xOffset,
        y: yOffset,
        z: 0,
        rotateY,
        scale,
        opacity: 1,
        delay: i * 0.15,
        duration: 1.2,
        ease: "power3.out",
      });

      // Floating breathing animation
      gsap.to(el, {
        y: yOffset + 15,
        rotateY: `+=4`,
        rotateX: `+=2`,
        repeat: -1,
        yoyo: true,
        duration: 3 + Math.random() * 1.5,
        ease: "sine.inOut",
      });

      // Hover zoom & glow (optional, glow still exists without hover)
      el.addEventListener("pointerenter", () => {
        gsap.to(el, {
          scale: scale + 0.15,
          rotateY: 0,
          rotateX: 0,
          duration: 0.4,
          ease: "power2.out",
          boxShadow:
            "0 40px 80px rgba(0,255,255,0.8), 0 20px 40px rgba(0,255,255,0.5)",
        });
        el.style.zIndex = "9999";
      });
      el.addEventListener("pointerleave", () => {
        gsap.to(el, {
          scale,
          rotateY,
          rotateX: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        el.style.zIndex = `${100 - Math.abs(i - midIndex)}`;
      });

      // 3D parallax on mouse move
      el.addEventListener("mousemove", (e) => {
        const bounds = el.getBoundingClientRect();
        const relX = e.clientX - bounds.left;
        const relY = e.clientY - bounds.top;
        const rotateX = ((relY / bounds.height - 0.5) * 25) * -1;
        const rotateY = (relX / bounds.width - 0.5) * 25;

        gsap.to(el, {
          rotateX,
          rotateY,
          duration: 0.2,
          ease: "power1.out",
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.4, ease: "power2.out" });
      });

      // Clickable
      el.style.cursor = "pointer";
      el.addEventListener("click", () => navigate(dashboards[i].route));
    });
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/videos/img13.jpeg"
          alt="Dashboard Background"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
      </div>

      {/* Cards Stack */}
      <div
        className="relative w-[1600px] max-w-[95vw] h-[70vh] z-10"
        style={{ perspective: "1800px", transformStyle: "preserve-3d" }}
      >
        {dashboards.map((item, index) => (
          <div
            key={item.title}
            ref={(el) => (cardsRef.current[index] = el)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Card
              className={`w-[280px] h-[380px] rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/15 backdrop-blur-xl border border-white/20 relative overflow-hidden animate-glow transition-all duration-300`}
            >
              <CardHeader className="text-center pt-6 relative z-10">
                {item.icon}
                <CardTitle className="text-lg font-bold mb-2 text-white drop-shadow-[0_0_12px_cyan]">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-white text-sm leading-5 px-2 drop-shadow-[0_0_6px_cyan]">
                  {item.desc}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-6 flex relative z-10">
                <Button
                  variant="ghost"
                  className={`mx-auto w-[80%] py-2.5 rounded-2xl font-semibold shadow-md bg-gradient-to-r ${item.color} text-white hover:brightness-110 hover:scale-105 transition-transform`}
                >
                  Open {item.title}
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
