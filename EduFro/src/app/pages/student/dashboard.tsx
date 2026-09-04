import { Link } from "react-router";
import { StatCard } from "../../components/stat-card";
import { CourseCard } from "../../components/course-card";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { BookOpen, CheckCircle, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "../../contexts/auth-context";

const enrolledCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2026",
    instructor: "Dr. Angela Yu",
    price: 84.99,
    rating: 4.8,
    reviewCount: 45230,
    students: 234567,
    duration: "52h 30m",
    lessons: 342,
    thumbnail: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800",
    category: "Development",
    progress: 45,
    showProgress: true,
  },
  {
    id: "2",
    title: "Advanced Data Science & Machine Learning",
    instructor: "Jose Portilla",
    price: 94.99,
    rating: 4.9,
    reviewCount: 32145,
    students: 187654,
    duration: "65h 15m",
    lessons: 428,
    thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=800",
    category: "Data Science",
    progress: 23,
    showProgress: true,
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass 2026",
    instructor: "Daniel Walter Scott",
    price: 79.99,
    rating: 4.7,
    reviewCount: 28543,
    students: 156234,
    duration: "45h 20m",
    lessons: 298,
    thumbnail: "https://images.unsplash.com/photo-1510832758362-af875829efcf?w=800",
    category: "Design",
    progress: 67,
    showProgress: true,
  },
];

const activityData = [
  { name: "Mon", hours: 2 },
  { name: "Tue", hours: 3.5 },
  { name: "Wed", hours: 1.5 },
  { name: "Thu", hours: 4 },
  { name: "Fri", hours: 2.5 },
  { name: "Sat", hours: 5 },
  { name: "Sun", hours: 3 },
];

export function StudentDashboard() {
  const { user } = useAuth();
  const firstName = user?.name.split(" ")[0] || "Student";

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {firstName}!</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your learning today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Enrolled Courses"
          value="12"
          icon={BookOpen}
          iconColor="#4F46E5"
        />
        <StatCard
          title="Completed Courses"
          value="8"
          change="+2 this month"
          changeType="positive"
          icon={CheckCircle}
          iconColor="#10b981"
        />
        <StatCard
          title="Learning Hours"
          value="156"
          change="+12 this week"
          changeType="positive"
          icon={Clock}
          iconColor="#06B6D4"
        />
        <StatCard
          title="Wishlist"
          value="24"
          icon={TrendingUp}
          iconColor="#7C3AED"
        />
      </div>

      {/* Learning Activity */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Learning Activity</h2>
            <p className="text-sm text-muted-foreground">
              Your learning hours this week
            </p>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                className="text-xs"
                tick={{ fill: "currentColor" }}
              />
              <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#4F46E5"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorHours)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Continue Learning */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Continue Learning</h2>
          <Link to="/student/my-courses">
            <Button variant="ghost" className="gap-2">
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course) => (
            <div key={course.id}>
              <CourseCard {...course} />
              <Link to={`/student/course/${course.id}/learn`}>
                <Button className="w-full mt-4 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90">
                  Continue Learning
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <Card className="p-6 border-0 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Recent Achievements 🎉</h2>
        <div className="space-y-4">
          {[
            {
              title: "Course Completion",
              description: "Completed 'JavaScript Basics'",
              date: "2 days ago",
              icon: CheckCircle,
              color: "#10b981",
            },
            {
              title: "Learning Streak",
              description: "7 days learning streak!",
              date: "Today",
              icon: TrendingUp,
              color: "#f59e0b",
            },
            {
              title: "First Certificate",
              description: "Earned your first certificate",
              date: "1 week ago",
              icon: BookOpen,
              color: "#4F46E5",
            },
          ].map((achievement, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${achievement.color}15` }}
              >
                <achievement.icon
                  className="h-6 w-6"
                  style={{ color: achievement.color }}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                {achievement.date}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
