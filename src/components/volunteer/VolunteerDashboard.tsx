import React, { useState } from "react";
import { Calendar, Upload, Award, BarChart, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const VolunteerDashboard = () => {
  const [report, setReport] = useState<File | null>(null);

  // Mock stats
  const stats = {
    studentsReached: 120,
    avgFeedback: 4.7,
    badges: ["Super Mentor", "100+ Students", "Top Rated"],
  };

  const handleReportUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setReport(event.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold vedic-text-gradient">
              Volunteer Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Welcome back, Mentor!</p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Students Reached</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.studentsReached}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avg Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.avgFeedback} ⭐</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges Earned</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 flex-wrap">
              {stats.badges.map((badge) => (
                <Badge key={badge}>{badge}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="sessions" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="sessions" aria-label="My Sessions">
              <Calendar className="h-4 w-4 mr-1" /> My Sessions
            </TabsTrigger>
            <TabsTrigger value="reports" aria-label="Upload Report">
              <Upload className="h-4 w-4 mr-1" /> Upload Report
            </TabsTrigger>
            <TabsTrigger value="badges" aria-label="View Badges">
              <Award className="h-4 w-4 mr-1" /> Badges
            </TabsTrigger>
            <TabsTrigger value="impact" aria-label="Impact Tracker">
              <BarChart className="h-4 w-4 mr-1" /> Impact Tracker
            </TabsTrigger>
            <TabsTrigger value="profile" aria-label="Profile">
              <User className="h-4 w-4 mr-1" /> Profile
            </TabsTrigger>
          </TabsList>

          {/* Sessions */}
          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming & Past Sessions</CardTitle>
                <CardDescription>Your assigned workshops</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Calendar integration coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Upload Session Report</CardTitle>
              </CardHeader>
              <CardContent>
                <label
                  htmlFor="reportUpload"
                  className="block text-sm font-medium mb-2"
                >
                  Choose Report File
                </label>
                <input
                  id="reportUpload"
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleReportUpload}
                  aria-label="Upload session report"
                />
                {report && (
                  <p className="mt-2 text-sm">Uploaded: {report.name}</p>
                )}
                <Button className="mt-4" aria-label="Submit Report">
                  Submit Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Badges */}
          <TabsContent value="badges">
            <Card>
              <CardHeader>
                <CardTitle>Earned Badges</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2 flex-wrap">
                {stats.badges.map((badge) => (
                  <Badge key={badge} variant="secondary">
                    {badge}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Impact */}
          <TabsContent value="impact">
            <Card>
              <CardHeader>
                <CardTitle>Impact Tracker</CardTitle>
                <CardDescription>Monitor your contribution</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Students reached: {stats.studentsReached}
                </p>
                <p className="text-muted-foreground">
                  Feedback Score: {stats.avgFeedback}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Add your skills, interests, and availability here.
                </p>
                <Button className="mt-4" aria-label="Edit Profile">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default VolunteerDashboard;
