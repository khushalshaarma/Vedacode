import React, { useState, useEffect, useRef } from 'react';
import { Calendar, BookOpen, Users, TrendingUp, Plus, Star, Clock, CheckCircle, Video } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

import WorkshopRequestForm from '../components/school/WorkshopRequestForm';
import UpcomingSessions from '../components/school/UpcomingSessions';
import PastSessions from '../components/school/PastSessions';
import StudentProgress from '../components/school/StudentProgress';

import FeedbackModal from '../components/school/FeedbackModal';

const SchoolDashboard = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabsContentRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const stats = {
    totalStudents: 245,
    activeWorkshops: 8,
    completedSessions: 24,
    avgRating: 4.8,
  };

  const handleFeedback = (sessionId: string) => {
    setSelectedSession(sessionId);
    setShowFeedbackModal(true);
  };

  useEffect(() => {
    // Header slide & glow
    if (headerRef.current) {
      gsap.from(headerRef.current, { opacity: 0, y: -40, duration: 1.2, ease: 'power3.out' });
      gsap.to(headerRef.current.querySelectorAll('h1'), { textShadow: '0 0 20px #fffc', repeat: -1, yoyo: true, duration: 2 });
    }

    // Stats cards fly-in + 3D float
    statsRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card, { opacity: 0, y: 60, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: i * 0.15, ease: 'back.out(1.7)' });
      gsap.to(card, { y: '+=8', yoyo: true, repeat: -1, duration: 2 + i * 0.1, ease: 'sine.inOut' });
      gsap.to(card, { rotateY: '+=2', rotateX: '+=2', yoyo: true, repeat: -1, duration: 3 + i * 0.1, ease: 'sine.inOut' });
    });

    // Tabs content animation
    if (tabsContentRef.current) {
      gsap.from(tabsContentRef.current.children, { opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'power2.out' });
    }

    // Background subtle parallax
    const handleMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX / innerWidth) - 0.5) * 20;
      const y = ((e.clientY / innerHeight) - 0.5) * 20;
      gsap.to(bgRef.current, { x, y, duration: 0.8, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', handleMove);

    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 bg-[url('/videos/img13.jpeg')] bg-cover bg-center filter blur-sm opacity-30 z-0" />

      {/* Header */}
      <header ref={headerRef} className="border-b bg-card relative z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold vedic-text-gradient">School Dashboard</h1>
              <p className="text-muted-foreground mt-1">Greenfield Elementary School</p>
            </div>
            <Button onClick={() => setShowRequestForm(true)} variant="hero" className="gap-2 animate-bounce">
              <Plus className="h-4 w-4" /> Request Workshop
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Students', value: stats.totalStudents, icon: Users, extra: '+12 from last month', style: 'vedic-shadow-warm' },
            { title: 'Active Workshops', value: stats.activeWorkshops, icon: BookOpen, extra: '3 starting this week', style: 'vedic-shadow-warm' },
            { title: 'Completed Sessions', value: stats.completedSessions, icon: CheckCircle, extra: '+6 this month', style: 'vedic-shadow-cool' },
            { title: 'Average Rating', value: stats.avgRating, icon: Star, extra: 'From 24 reviews', style: 'vedic-shadow-cool', isRating: true }
          ].map((stat, i) => (
            <Card key={i} ref={el => statsRefs.current[i] = el} className={`${stat.style} hover:scale-105 hover:shadow-2xl transition-transform duration-300`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center gap-1">
                  {stat.value}
                  {stat.isRating && <Star className="h-5 w-5 fill-primary-glow text-primary-glow" />}
                </div>
                <p className="text-xs text-muted-foreground">{stat.extra}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 z-10 relative">
            <TabsTrigger value="upcoming" className="gap-2"> <Clock className="h-4 w-4" /> Upcoming </TabsTrigger>
            <TabsTrigger value="past" className="gap-2"> <CheckCircle className="h-4 w-4" /> Past Sessions </TabsTrigger>
            <TabsTrigger value="progress" className="gap-2"> <TrendingUp className="h-4 w-4" /> Student Progress </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2"> <Calendar className="h-4 w-4" /> Calendar View </TabsTrigger>
            <TabsTrigger value="meetings" className="gap-2"> <Video className="h-4 w-4" /> Meetings </TabsTrigger>
          </TabsList>

          <div ref={tabsContentRef} className="relative z-10">
            <TabsContent value="upcoming" className="space-y-6">
              <UpcomingSessions onFeedback={handleFeedback} />
            </TabsContent>
            <TabsContent value="past" className="space-y-6">
              <PastSessions onFeedback={handleFeedback} />
            </TabsContent>
            <TabsContent value="progress" className="space-y-6">
              <StudentProgress />
            </TabsContent>
            <TabsContent value="calendar" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Session Calendar</CardTitle>
                  <CardDescription>View all your workshops and sessions in calendar format</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                    <div className="text-center">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Calendar view coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="meetings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Meeting Room</CardTitle>
                  <CardDescription>Join or host live meetings.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate("/dashboard/school/meeting")}>
                    Go to Meeting Room
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* Modals */}
      {showRequestForm && <WorkshopRequestForm open={showRequestForm} onClose={() => setShowRequestForm(false)} />}
      {showFeedbackModal && selectedSession && <FeedbackModal open={showFeedbackModal} sessionId={selectedSession} onClose={() => { setShowFeedbackModal(false); setSelectedSession(null); }} />}
    </div>
  );
};

export default SchoolDashboard;
