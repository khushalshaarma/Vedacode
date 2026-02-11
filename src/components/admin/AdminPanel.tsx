import React from "react";
import { Users, Link2, BarChart2, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <h1 className="text-3xl font-bold vedic-text-gradient mb-6">Admin Panel</h1>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="matchmaking">Matchmaking Engine</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* User Management */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage schools, volunteers, and colleges</CardDescription>
            </CardHeader>
            <CardContent>
              <p>👨‍🏫 Schools: 25</p>
              <p>🙋 Volunteers: 40</p>
              <p>🎓 Colleges: 8</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Matchmaking Engine */}
        <TabsContent value="matchmaking">
          <Card>
            <CardHeader>
              <CardTitle>Matchmaking Engine</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Auto-assigning mentors based on skills coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total Workshops: 50</p>
              <p>Students Reached: 1200</p>
              <p>Avg Feedback: 4.6</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback */}
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Aggregator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Collecting feedback across all sessions...</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Export Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">📥 Report export feature coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
