import { Card } from "../../components/ui/card";
import { StatCard } from "../../components/stat-card";
import { TrendingUp, Users, Eye, Clock } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const engagementData = [
  { date: "Mon", views: 450, enrollments: 23 },
  { date: "Tue", views: 520, enrollments: 31 },
  { date: "Wed", views: 380, enrollments: 18 },
  { date: "Thu", views: 620, enrollments: 42 },
  { date: "Fri", views: 580, enrollments: 35 },
  { date: "Sat", views: 720, enrollments: 48 },
  { date: "Sun", views: 490, enrollments: 28 },
];

const courseDistribution = [
  { name: "Development", value: 42 },
  { name: "Data Science", value: 28 },
  { name: "Design", value: 18 },
  { name: "Marketing", value: 12 },
];

const COLORS = ["#4F46E5", "#06B6D4", "#7C3AED", "#10b981"];

export function InstructorAnalytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your teaching performance and student engagement</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Views" value="45.2K" change="+12.5%" changeType="positive" icon={Eye} iconColor="#4F46E5" />
        <StatCard title="Total Students" value="234.5K" change="+8.3%" changeType="positive" icon={Users} iconColor="#10b981" />
        <StatCard title="Avg. Watch Time" value="18.5m" icon={Clock} iconColor="#06B6D4" />
        <StatCard title="Engagement Rate" value="82%" change="+5.2%" changeType="positive" icon={TrendingUp} iconColor="#7C3AED" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Weekly Engagement</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" tick={{ fill: "currentColor" }} />
                <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                />
                <Bar dataKey="views" fill="#4F46E5" radius={[8, 8, 0, 0]} />
                <Bar dataKey="enrollments" fill="#06B6D4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Course Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={courseDistribution} cx="50%" cy="50%" labelLine={false} label outerRadius={100} fill="#8884d8" dataKey="value">
                  {courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
