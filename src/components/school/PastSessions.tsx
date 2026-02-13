import React from 'react';
import { Calendar, Clock, Users, Star, Download, MessageSquare, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PastSessionsProps {
  onFeedback: (sessionId: string) => void;
  darkMode?: boolean; // added darkMode prop
}

const PastSessions: React.FC<PastSessionsProps> = ({ onFeedback, darkMode = true }) => {
  const pastSessions = [
    {
      id: 'past-1',
      title: 'Basic Programming with Scratch',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: '2 hours',
      students: 22,
      level: 'Beginner',
      rating: 4.8,
      feedback: 'Students were highly engaged and created amazing projects!',
      mentor: {
        name: 'John Smith',
        avatar: '',
        college: 'UC Berkeley',
        rating: 4.9,
      },
      location: 'Computer Lab B',
      certificate: true,
      hasReport: true,
      studentFeedback: true,
    },
    {
      id: 'past-2',
      title: 'Introduction to 3D Printing',
      date: '2024-01-10',
      time: '2:00 PM',
      duration: '3 hours',
      students: 16,
      level: 'Intermediate',
      rating: 4.9,
      feedback: 'Excellent hands-on learning experience!',
      mentor: {
        name: 'Emma Wilson',
        avatar: '',
        college: 'Georgia Tech',
        rating: 4.8,
      },
      location: 'Maker Space',
      certificate: true,
      hasReport: true,
      studentFeedback: true,
    },
    {
      id: 'past-3',
      title: 'Cybersecurity Basics',
      date: '2024-01-05',
      time: '1:00 PM',
      duration: '2 hours',
      students: 28,
      level: 'Advanced',
      rating: 4.7,
      feedback: 'Great introduction to online safety and security principles.',
      mentor: {
        name: 'David Kim',
        avatar: '',
        college: 'Carnegie Mellon',
        rating: 4.9,
      },
      location: 'Computer Lab A',
      certificate: true,
      hasReport: false,
      studentFeedback: false,
    },
  ];

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      Beginner: 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-200',
      Intermediate: 'bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-200',
      Advanced: 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200',
    };
    return colors[level] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400 dark:text-gray-500'
        }`}
      />
    ));
  };

  const buttonStyle = (variant: 'default' | 'outline') => {
    if (variant === 'default') {
      return darkMode
        ? 'bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors duration-300 shadow-md'
        : 'bg-blue-400 hover:bg-blue-300 text-gray-900 rounded-xl transition-colors duration-300 shadow-md';
    } else {
      return darkMode
        ? 'border border-gray-500 text-white hover:bg-gray-700 rounded-xl transition-colors duration-300'
        : 'border border-gray-300 text-gray-900 hover:bg-gray-100 rounded-xl transition-colors duration-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Past Sessions</h2>
          <p className="text-muted-foreground">Completed workshops with feedback and certificates</p>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {pastSessions.length} Completed
        </Badge>
      </div>

      <div className="grid gap-6">
        {pastSessions.map((session) => (
          <Card
            key={session.id}
            className={`shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl">{session.title}</CardTitle>
                    {session.certificate && <Award className="h-5 w-5 text-yellow-400" />}
                  </div>
                  <CardDescription>{session.feedback}</CardDescription>
                </div>
                <Badge className={getLevelColor(session.level)}>{session.level}</Badge>
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
                    <Users className="h-4 w-4 text-primary" />
                    <span>{session.students} students participated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Rating:</span>
                    <div className="flex items-center gap-1">{renderStars(session.rating)}</div>
                  </div>
                </div>

                {/* Mentor Info & Actions */}
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
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{session.mentor.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {session.certificate && (
                      <Button className={buttonStyle('outline')}>
                        <Download className="h-4 w-4" />
                        Certificate
                      </Button>
                    )}
                    {session.hasReport && (
                      <Button className={buttonStyle('outline')}>
                        <Download className="h-4 w-4" />
                        Session Report
                      </Button>
                    )}
                    {!session.studentFeedback && (
                      <Button className={buttonStyle('default')} onClick={() => onFeedback(session.id)}>
                        <MessageSquare className="h-4 w-4" />
                        Give Feedback
                      </Button>
                    )}
                    {session.studentFeedback && (
                      <Button className={buttonStyle('outline')} disabled>
                        <MessageSquare className="h-4 w-4" />
                        Feedback Sent
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {pastSessions.length === 0 && (
        <Card
          className={`text-center py-12 ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}
        >
          <CardContent>
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Past Sessions</h3>
            <p className="text-muted-foreground">
              Your completed workshops will appear here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PastSessions;
