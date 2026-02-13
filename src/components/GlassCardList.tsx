import React, { useEffect, useState } from "react";

interface Topic {
  id: number;
  title: string;
  scheduledDate: string;
}

const TopicNotifications: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());

  // Update "now" every second for countdown
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Mock data directly
    const mockTopics: Topic[] = [
      { id: 1, title: "Algebra: Quadratic Equations", scheduledDate: "2025-09-01T10:00:00Z" },
      { id: 2, title: "History: Ancient Civilizations", scheduledDate: "2025-09-02T10:00:00Z" },
    ];

    setTopics(mockTopics);
    setLoading(false);
  }, []);

  const getTimeLeft = (scheduledDate: string) => {
    const diff = new Date(scheduledDate).getTime() - now.getTime();
    if (diff <= 0) return "Ongoing / Completed";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const handleJoin = (topic: Topic) => {
    alert(`Joining topic: ${topic.title}`);
    // redirect to meeting/class page
  };

  if (loading) return <p className="text-gray-200">Loading upcoming topics...</p>;
  if (topics.length === 0) return <p className="text-gray-200">No upcoming topics scheduled.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white drop-shadow">UPCOMING TOPICS</h2>

      <ul className="space-y-3">
        {topics.map((topic) => (
          <li
            key={topic.id}
            className="p-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 
                       shadow-lg flex justify-between items-center hover:bg-white/20 
                       hover:scale-[1.02] transition-all duration-300"
          >
            <div>
              <p className="font-semibold text-white drop-shadow-md">{topic.title}</p>
              <p className="text-sm text-gray-200">
                {new Date(topic.scheduledDate).toLocaleDateString()} | Time left:{" "}
                {getTimeLeft(topic.scheduledDate)}
              </p>
            </div>
            <button
              onClick={() => handleJoin(topic)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/80 to-pink-500/80 
                         text-white font-medium shadow-md hover:scale-105 
                         hover:from-purple-600/90 hover:to-pink-600/90 transition-all duration-300"
            >
              Join
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicNotifications;
