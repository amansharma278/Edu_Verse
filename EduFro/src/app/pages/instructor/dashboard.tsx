import { Link } from "react-router";
import { StatCard } from "../../components/stat-card";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { BookOpen, Users, DollarSign, Star, TrendingUp, ChevronRight } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "../../contexts/auth-context";

const revenueData = [
  { month: "Jan", revenue: 4500 },
  { month: "Feb", revenue: 5200 },
  { month: "Mar", revenue: 6100 },
  { month: "Apr", revenue: 5800 },
  { month: "May", revenue: 7200 },
  { month: "Jun", revenue: 8500 },
];

const studentGrowthData = [
  { month: "Jan", students: 1200 },
  { month: "Feb", students: 1850 },
  { month: "Mar", students: 2400 },
  { month: "Apr", students: 2900 },
  { month: "May", students: 3600 },
  { month: "Jun", students: 4200 },
];

export function InstructorDashboard() {
  const { user } = useAuth();
  const displayName = user?.name || "Instructor";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {displayName}!</h1>
        <p className="text-muted-foreground">
          Here's an overview of your teaching performance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Courses"
          value="42"
          icon={BookOpen}
          iconColor="#4F46E5"
        />
        <StatCard
          title="Total Students"
          value="234.5K"
          change="+12.5% this month"
          changeType="positive"
          icon={Users}
          iconColor="#10b981"
        />
        <StatCard
          title="Total Revenue"
          value="$52,450"
          change="+18.2% this month"
          changeType="positive"
          icon={DollarSign}
          iconColor="#06B6D4"
        />
        <StatCard
          title="Average Rating"
          value="4.8"
          change="From 435K reviews"
          changeType="neutral"
          icon={Star}
          iconColor="#f59e0b"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 border-0 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-1">Revenue Over Time</h2>
            <p className="text-sm text-muted-foreground">Monthly revenue performance</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" tick={{ fill: "currentColor" }} />
                <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-1">Student Growth</h2>
            <p className="text-sm text-muted-foreground">Total enrolled students</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentGrowthData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" tick={{ fill: "currentColor" }} />
                <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="students" fill="#06B6D4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Top Performing Courses</h2>
          <Link to="/instructor/my-courses">
            <Button variant="ghost" className="gap-2">
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          {[
            { title: "Complete Web Development Bootcamp 2026", students: 45230, revenue: "$12,450", rating: 4.8 },
            { title: "Python Programming Masterclass", students: 32145, revenue: "$9,230", rating: 4.9 },
            { title: "Data Science & Machine Learning", students: 28543, revenue: "$8,120", rating: 4.7 },
          ].map((course, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
              <div>
                <h4 className="font-semibold mb-1">{course.title}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{course.students.toLocaleString()} students</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                    <span>{course.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{course.revenue}</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
