import { Card } from "../../components/ui/card";
import { StatCard } from "../../components/stat-card";
import { DollarSign, TrendingUp, CreditCard, Wallet } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 61000 },
  { month: "Apr", revenue: 72000 },
  { month: "May", revenue: 85000 },
  { month: "Jun", revenue: 95000 },
];

export function AdminRevenue() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Revenue Analytics</h1>
        <p className="text-muted-foreground">Track platform revenue and financial metrics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value="$2.8M" change="+24.1%" changeType="positive" icon={DollarSign} iconColor="#10b981" />
        <StatCard title="This Month" value="$450K" change="+18.2%" changeType="positive" icon={TrendingUp} iconColor="#4F46E5" />
        <StatCard title="Platform Fee" value="$560K" icon={CreditCard} iconColor="#06B6D4" />
        <StatCard title="Instructor Payouts" value="$2.24M" icon={Wallet} iconColor="#7C3AED" />
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Revenue Over Time</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" tick={{ fill: "currentColor" }} />
              <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
              />
              <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
