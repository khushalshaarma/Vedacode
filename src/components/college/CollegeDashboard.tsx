import React from "react";
import { Users, Calendar, ClipboardList, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const CollegeDashboard = () => {
  const mentors = [
    { name: "Rahul Sharma", skills: "AI, Python", sessions: 3 },
    { name: "Priya Verma", skills: "Web Dev, React", sessions: 5 },
    { name: "Amit Patel", skills: "Cybersecurity", sessions: 2 },
  ];

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <h1 className="text-3xl font-bold vedic-text-gradient mb-6">College Dashboard</h1>

      <Tabs defaultValue="mentors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="mentors">Mentor Roster</TabsTrigger>
          <TabsTrigger value="sessions">Session Overview</TabsTrigger>
          <TabsTrigger value="requests">School Requests</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Mentor Roster */}
        <TabsContent value="mentors">
          <Card>
            <CardHeader>
              <CardTitle>Mentor Roster</CardTitle>
              <CardDescription>All active student mentors</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {mentors.map((m, i) => (
                  <li key={i} className="flex justify-between border-b pb-2">
                    <div>
                      <p className="font-semibold">{m.name}</p>
                      <p className="text-sm text-muted-foreground">{m.skills}</p>
                    </div>
                    <span className="text-sm">Sessions: {m.sessions}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Session Overview */}
        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>Session Overview</CardTitle>
              <CardDescription>Workshops conducted by mentors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>AI & Python – 3 Sessions</p>
              <p>Web Development – 5 Sessions</p>
              <p>Cybersecurity – 2 Sessions</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* School Requests */}
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>School Requests</CardTitle>
              <CardDescription>Pending requests from schools</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No pending requests 🎉</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Impact of your college mentors</CardDescription>
            </CardHeader>
            <CardContent>
              <p>📊 Total Sessions: 10</p>
              <p>👩‍🎓 Students Reached: 350</p>
              <p>⭐ Avg Feedback: 4.8</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollegeDashboard;
