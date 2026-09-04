import { StatCard } from "../../components/stat-card";
import { Card } from "../../components/ui/card";
import { Users, GraduationCap, BookOpen, DollarSign, TrendingUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const growthData = [
  { month: "Jan", users: 12000, revenue: 45000 },
  { month: "Feb", users: 15000, revenue: 52000 },
  { month: "Mar", users: 18500, revenue: 61000 },
  { month: "Apr", users: 22000, revenue: 72000 },
  { month: "May", users: 27000, revenue: 85000 },
  { month: "Jun", users: 32000, revenue: 95000 },
];

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Platform Overview</h1>
        <p className="text-muted-foreground">Monitor your platform's performance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value="2.5M" change="+18.2%" changeType="positive" icon={Users} iconColor="#4F46E5" />
        <StatCard title="Instructors" value="50.2K" change="+12.5%" changeType="positive" icon={GraduationCap} iconColor="#10b981" />
        <StatCard title="Total Courses" value="125K" change="+8.3%" changeType="positive" icon={BookOpen} iconColor="#06B6D4" />
        <StatCard title="Revenue (MTD)" value="$2.8M" change="+24.1%" changeType="positive" icon={DollarSign} iconColor="#7C3AED" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">User Growth</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" tick={{ fill: "currentColor" }} />
                <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                />
                <Line type="monotone" dataKey="users" stroke="#4F46E5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Revenue Growth</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" tick={{ fill: "currentColor" }} />
                <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                />
                <Bar dataKey="revenue" fill="#7C3AED" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { event: "New instructor registered", user: "Dr. Sarah Johnson", time: "2 minutes ago" },
            { event: "Course published", user: "Michael Chen", time: "15 minutes ago" },
            { event: "User reported content", user: "Emma Davis", time: "1 hour ago" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
              <div>
                <p className="font-semibold">{activity.event}</p>
                <p className="text-sm text-muted-foreground">{activity.user}</p>
              </div>
              <span className="text-sm text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
