import React, { useState } from 'react';
import { TrendingUp, Users, Award, BookOpen, Star, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const StudentProgress: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');

  // Mock data - in real app, this would come from Supabase
  const students = [
    {
      id: '1',
      name: 'Alex Johnson',
      avatar: '',
      grade: '6th Grade',
      level: 'Beginner',
      sessionsAttended: 8,
      totalSessions: 10,
      certificates: 3,
      skills: ['HTML/CSS', 'Scratch', 'Basic Robotics'],
      averageRating: 4.5,
      recentActivity: 'Completed Web Development Workshop',
      progress: 80,
    },
    {
      id: '2',
      name: 'Maya Patel',
      avatar: '',
      grade: '7th Grade',
      level: 'Intermediate',
      sessionsAttended: 12,
      totalSessions: 12,
      certificates: 5,
      skills: ['JavaScript', 'Python', '3D Printing', 'Game Development'],
      averageRating: 4.8,
      recentActivity: 'Started AI Fundamentals Course',
      progress: 100,
    },
    {
      id: '3',
      name: 'Sam Chen',
      avatar: '',
      grade: '8th Grade',
      level: 'Advanced',
      sessionsAttended: 15,
      totalSessions: 16,
      certificates: 7,
      skills: ['React', 'Machine Learning', 'Cybersecurity', 'Mobile Apps'],
      averageRating: 4.9,
      recentActivity: 'Completed Advanced Programming Project',
      progress: 94,
    },
    {
      id: '4',
      name: 'Emma Rodriguez',
      avatar: '',
      grade: '6th Grade',
      level: 'Beginner',
      sessionsAttended: 6,
      totalSessions: 8,
      certificates: 2,
      skills: ['Scratch', 'Digital Art'],
      averageRating: 4.3,
      recentActivity: 'Working on Creative Coding Project',
      progress: 75,
    },
    {
      id: '5',
      name: 'Liam Smith',
      avatar: '',
      grade: '7th Grade',
      level: 'Intermediate',
      sessionsAttended: 10,
      totalSessions: 11,
      certificates: 4,
      skills: ['Python', 'Data Science', 'Robotics'],
      averageRating: 4.6,
      recentActivity: 'Participated in Coding Competition',
      progress: 91,
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-blue-100 text-blue-800';
      case 'Intermediate':
        return 'bg-purple-100 text-purple-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.grade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || student.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const overallStats = {
    totalStudents: students.length,
    averageAttendance: Math.round(students.reduce((acc, s) => acc + (s.sessionsAttended / s.totalSessions * 100), 0) / students.length),
    totalCertificates: students.reduce((acc, s) => acc + s.certificates, 0),
    averageRating: (students.reduce((acc, s) => acc + s.averageRating, 0) / students.length).toFixed(1),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Student Progress Tracker</h2>
          <p className="text-muted-foreground">Monitor individual student development and achievements</p>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="vedic-shadow-warm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalStudents}</div>
          </CardContent>
        </Card>

        <Card className="vedic-shadow-warm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.averageAttendance}%</div>
          </CardContent>
        </Card>

        <Card className="vedic-shadow-cool">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
            <Award className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalCertificates}</div>
          </CardContent>
        </Card>

        <Card className="vedic-shadow-cool">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-primary-glow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-1">
              {overallStats.averageRating}
              <Star className="h-4 w-4 fill-primary-glow text-primary-glow" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students by name or grade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterLevel} onValueChange={setFilterLevel}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Student List */}
      <div className="grid gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="vedic-shadow-warm hover:vedic-shadow-cool vedic-transition">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Student Info */}
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-semibold text-lg">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.grade}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getLevelColor(student.level)}>
                        {student.level}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary-glow text-primary-glow" />
                        <span className="text-sm font-medium">{student.averageRating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress & Stats */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Session Attendance</span>
                      <span>{student.sessionsAttended}/{student.totalSessions}</span>
                    </div>
                    <Progress 
                      value={student.progress} 
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {student.progress}% completion rate
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-accent" />
                      <span>{student.certificates} certificates</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span>{student.skills.length} skills</span>
                    </div>
                  </div>
                </div>

                {/* Skills & Recent Activity */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Skills Learned</h4>
                    <div className="flex flex-wrap gap-1">
                      {student.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-1">Recent Activity</h4>
                    <p className="text-xs text-muted-foreground">{student.recentActivity}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Students Found</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterLevel !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Student progress will appear here after workshops begin.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentProgress;