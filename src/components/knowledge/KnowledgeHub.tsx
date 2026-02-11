import React, { useState } from "react";
import { Book, Layers, HelpCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const KnowledgeHub = () => {
  const [topic, setTopic] = useState("Coding");

  const resources = {
    Coding: ["Intro to Python", "JavaScript Basics", "React for Beginners"],
    Robotics: ["Arduino Basics", "Line Following Robot", "IoT with Raspberry Pi"],
    AI: ["What is Machine Learning?", "Neural Networks 101", "AI in Real Life"],
    Cybersecurity: ["Password Safety", "Phishing Awareness", "Network Security"],
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <h1 className="text-3xl font-bold vedic-text-gradient mb-6">Technology Knowledge Hub</h1>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList>
          <TabsTrigger value="browse">Browse Topics</TabsTrigger>
          <TabsTrigger value="quiz">Interactive Quizzes</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="forum">Ask a Mentor</TabsTrigger>
        </TabsList>

        {/* Browse by Topic */}
        <TabsContent value="browse">
          <Card>
            <CardHeader>
              <CardTitle>Browse by Topic</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 mb-4">
                {Object.keys(resources).map((t) => (
                  <Button key={t} onClick={() => setTopic(t)} variant={topic === t ? "default" : "outline"}>
                    {t}
                  </Button>
                ))}
              </div>
              <ul className="list-disc ml-6">
                {resources[topic].map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quizzes */}
        <TabsContent value="quiz">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">⚡ Quizzes coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Downloadable Resources */}
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Downloadable Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <Button>Download Python Guide (PDF)</Button>
              <Button variant="outline" className="ml-3">Download AI Basics (PDF)</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forum */}
        <TabsContent value="forum">
          <Card>
            <CardHeader>
              <CardTitle>Ask a Mentor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Mentor Q&A forum coming soon 💬</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeHub;
