import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import SchoolDashboard from "@/components/school/SchoolDashboard";
import VolunteerDashboard from "@/components/volunteer/VolunteerDashboard";
import CollegeDashboard from "@/components/college/CollegeDashboard";
import KnowledgeHub from "@/components/knowledge/KnowledgeHub";
import AdminPanel from "@/components/admin/AdminPanel";
import { useToast } from "./hooks/use-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

//  Import AnimatedRoute
import AnimatedRoute from "./components/AnimatedRoute";
//  Meeting Room (inside school dashboard scope)
import MeetingRoom from "./pages/MeetingRoom";

// Import socket instance
import { socket } from "@/lib/socket";

//  Import GlassCardList (topics UI)
import GlassCardList from "@/components/GlassCardList";

//  Import UpcomingSessions
import UpcomingSessions from "@/components/school/UpcomingSessions";

const queryClient = new QueryClient();

const App: React.FC = () => {
  // Ensure socket connection on app load
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to Socket.IO server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from Socket.IO server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  //  Handle feedback click
  const handleFeedback = (sessionId: string) => {
    console.log("Feedback button clicked for session:", sessionId);
    // later → open modal / redirect / API call
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<Login />} />

            {/* Register with video animation */}
            <Route
              path="/register"
              element={
                <AnimatedRoute videoSrc="/videos/register-intro.mp4">
                  <Register />
                </AnimatedRoute>
              }
            />

      
<Route
  path="/"
  element={
    <ProtectedRoute>
      <Index />
      <div className="mt-6 px-4">
        <GlassCardList />
      </div>
      {/* ❌ Removed UpcomingSessions from here */}
    </ProtectedRoute>
  }
/>


            {/* Protected Dashboards */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* ✅ School Dashboard + Meeting */}
            <Route
              path="/dashboard/school"
              element={
                <ProtectedRoute>
                  <SchoolDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/school/meeting"
              element={
                <ProtectedRoute>
                  <MeetingRoom />
                </ProtectedRoute>
              }
            />

            {/* Other Dashboards */}
            <Route
              path="/dashboard/volunteer"
              element={
                <ProtectedRoute>
                  <VolunteerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/college"
              element={
                <ProtectedRoute>
                  <CollegeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/knowledge"
              element={
                <ProtectedRoute>
                  <KnowledgeHub />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
