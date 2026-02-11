import React, { useEffect, useState } from "react";

interface Topic {
  id: number;
  title: string;
  scheduledDate: string;
}

interface TopicNotificationsProps {
  darkMode?: boolean;
}

const TopicNotifications: React.FC<TopicNotificationsProps> = ({ darkMode = true }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());

  // Update current time every second for countdown
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const mockTopics: Topic[] = [
      {
        id: 1,
        title: "Algebra: Quadratic Equations",
        scheduledDate: "2025-09-01T10:00:00Z",
      },
      {
        id: 2,
        title: "History: Ancient Civilizations",
        scheduledDate: "2025-09-02T10:00:00Z",
      },
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
    // Add redirect logic here
  };

  if (loading)
    return <p className={darkMode ? "text-gray-300" : "text-gray-700"}>Loading upcoming topics...</p>;
  if (topics.length === 0)
    return <p className={darkMode ? "text-gray-300" : "text-gray-700"}>No upcoming topics scheduled.</p>;

  return (
    <div className="space-y-3">
      <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
        UPCOMING TOPIC
      </h2>
      <ul className="space-y-3">
        {topics.map((topic) => (
          <li
            key={topic.id}
            className={`p-4 rounded-xl border shadow-md flex justify-between items-center transition-all
              ${darkMode
                ? "bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
                : "bg-white border-gray-300 hover:bg-gray-100 text-gray-900"}`}
          >
            <div>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {topic.title}
              </p>
              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {new Date(topic.scheduledDate).toLocaleDateString()} | Time left:{" "}
                {getTimeLeft(topic.scheduledDate)}
              </p>
            </div>
            <button
              onClick={() => handleJoin(topic)}
              className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105
                ${darkMode
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"}`}
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
