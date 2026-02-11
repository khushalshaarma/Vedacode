import React from 'react';
import { Calendar, Clock, Users, MapPin, Star, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

interface UpcomingSessionsProps {
  onFeedback: (sessionId: string) => void;
  darkMode?: boolean; // added prop for theme
}

const UpcomingSessions: React.FC<UpcomingSessionsProps> = ({ onFeedback, darkMode = true }) => {
  const upcomingSessions = [
    {
      id: '1',
      title: 'Introduction to Web Development',
      date: '2024-01-25',
      time: '10:00 AM',
      duration: '2 hours',
      students: 24,
      level: 'Beginner',
      status: 'confirmed',
      mentor: {
        name: 'Sarah Chen',
        avatar: '',
        college: 'MIT',
        rating: 4.9,
      },
      location: 'Computer Lab A',
      description: 'Learn the basics of HTML, CSS, and JavaScript through fun, interactive projects.',
    },
    {
      id: '2',
      title: 'Robotics Fundamentals',
      date: '2024-01-28',
      time: '2:00 PM',
      duration: '3 hours',
      students: 18,
      level: 'Intermediate',
      status: 'pending',
      mentor: {
        name: 'Alex Rodriguez',
        avatar: '',
        college: 'Stanford',
        rating: 4.8,
      },
      location: 'STEM Lab',
      description: 'Build and program simple robots using Arduino and basic sensors.',
    },
    {
      id: '3',
      title: 'Digital Art & Design',
      date: '2024-02-02',
      time: '1:00 PM',
      duration: '2 hours',
      students: 20,
      level: 'Beginner',
      status: 'confirmed',
      mentor: {
        name: 'Maya Patel',
        avatar: '',
        college: 'CalTech',
        rating: 4.7,
      },
      location: 'Art Room',
      description: 'Create digital artwork using modern design tools and learn basic graphic design principles.',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      confirmed: 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      Beginner: 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-200',
      Intermediate: 'bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-200',
      Advanced: 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200',
    };
    return colors[level] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  const buttonStyle = (variant: 'default' | 'outline') => {
    if (variant === 'default') {
      return darkMode
        ? 'bg-blue-600 hover:bg-blue-500 text-white dark:text-white rounded-xl transition-colors duration-300 shadow-md'
        : 'bg-blue-400 hover:bg-blue-300 text-gray-900 rounded-xl transition-colors duration-300 shadow-md';
    } else {
      return darkMode
        ? 'border border-gray-500 text-white hover:bg-gray-700 rounded-xl transition-colors duration-300'
        : 'border border-gray-300 text-gray-900 hover:bg-gray-100 rounded-xl transition-colors duration-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Upcoming Sessions</h2>
          <p className="text-muted-foreground">Your scheduled workshops and activities</p>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {upcomingSessions.length} Sessions
        </Badge>
      </div>

      {/* Session Cards */}
      <div className="grid gap-6">
        {upcomingSessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className={`shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{session.title}</CardTitle>
                    <CardDescription>{session.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
                    <Badge className={getLevelColor(session.level)}>{session.level}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Session Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium">{session.date}</span>
                      <Clock className="h-4 w-4 text-secondary ml-3" />
                      <span>{session.time} ({session.duration})</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-accent" />
                      <span>{session.location}</span>
                      <Users className="h-4 w-4 text-primary ml-3" />
                      <span>{session.students} students</span>
                    </div>
                  </div>

                  {/* Mentor Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={session.mentor.avatar} />
                        <AvatarFallback>
                          {session.mentor.name.split(' ').map((n) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{session.mentor.name}</p>
                        <p className="text-sm text-muted-foreground">{session.mentor.college}</p>
                      </div>
                      <div className="flex items-center gap-1 ml-auto">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{session.mentor.rating}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className={buttonStyle('outline')}>
                        <MessageSquare className="h-4 w-4" />
                        Contact Mentor
                      </Button>
                      {session.status === 'confirmed' && (
                        <Button className={buttonStyle('default')} onClick={() => onFeedback(session.id)}>
                          <Star className="h-4 w-4" />
                          Pre-Session Notes
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {upcomingSessions.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Card className={`text-center py-12 rounded-2xl shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <CardContent>
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Upcoming Sessions</h3>
              <p className="text-muted-foreground mb-4">You don't have any workshops scheduled yet.</p>
              <Button className={buttonStyle('default')}>Request Your First Workshop</Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default UpcomingSessions;
