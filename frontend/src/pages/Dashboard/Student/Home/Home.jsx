import "./Home.css";

import WelcomeCard from "../../../../components/Dashboard/Student/Home/WelcomeCard";
import ProfileSummary from "../../../../components/Dashboard/Student/Home/ProfileSummary";
import StatsCards from "../../../../components/Dashboard/Student/Home/StatsCards";
import CourseRecommendation from "../../../../components/Dashboard/Student/Home/CourseRecommendation";
import SuggestedUsers from "../../../../components/Dashboard/Student/Home/SuggestedUsers";
import LearningStreak from "../../../../components/Dashboard/Student/Home/LearningStreak";
import LearningAnalytics from "../../../../components/Dashboard/Student/Home/LearningAnalytics";

const Home = () => {

  // Dummy Data
  const user = {
    fullName: "Debabrata Andia",
    email: "debabrata@gmail.com",
    profilePhoto: "/images/profile.jpg",
    skills: ["React", "Node", "MongoDB", "Express", "JavaScript"],
    profileCompletion: 78,
  };

  const stats = {
    courses: 12,
    attendance: 95,
    tasks: 28,
    badges: 8,
  };

  const streak = {
    days: 45,
    progress: 85,
  };

  const analytics = {
    completedCourses: 12,
    hours: 145,
    growth: 32,
    weeklyData: [50, 80, 60, 95, 75, 90, 100],
  };

  const courses = [
    {
      _id: 1,
      thumbnail: "/images/react.jpg",
      title: "React Masterclass",
      category: "Frontend",
      rating: 4.9,
      lessons: 32,
    },
    {
      _id: 2,
      thumbnail: "/images/node.jpg",
      title: "Node.js API",
      category: "Backend",
      rating: 4.8,
      lessons: 26,
    },
    {
      _id: 3,
      thumbnail: "/images/mongo.jpg",
      title: "MongoDB Complete",
      category: "Database",
      rating: 5.0,
      lessons: 18,
    },
  ];

  const users = [
    {
      _id: 1,
      avatar: "/images/user1.jpg",
      fullName: "Rahul Kumar",
      role: "Frontend Developer",
      skills: ["React", "Tailwind", "Redux"],
      mutual: 3,
    },
    {
      _id: 2,
      avatar: "/images/user2.jpg",
      fullName: "Ankit Das",
      role: "Full Stack Developer",
      skills: ["Node", "MongoDB", "Express"],
      mutual: 5,
    },
    {
      _id: 3,
      avatar: "/images/user3.jpg",
      fullName: "Priya Sharma",
      role: "UI Designer",
      skills: ["Figma", "UI", "UX"],
      mutual: 2,
    },
  ];

  return (
    <div className="home-page">

      <WelcomeCard user={user}

        stats={stats}

        streak={streak} />

      <ProfileSummary user={user} />

      <StatsCards stats={stats} />

      <LearningStreak streak={streak} />

      <LearningAnalytics analytics={analytics} />

      <CourseRecommendation courses={courses} />

      <SuggestedUsers users={users} />

    </div>
  );
};

export default Home;