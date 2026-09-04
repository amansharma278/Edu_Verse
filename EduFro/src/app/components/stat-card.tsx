import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "#4F46E5",
}: StatCardProps) {
  const changeColors = {
    positive: "text-[#10b981]",
    negative: "text-[#ef4444]",
    neutral: "text-muted-foreground",
  };

  return (
    <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold mb-2">{value}</p>
          {change && (
            <p className={`text-sm ${changeColors[changeType]}`}>{change}</p>
          )}
        </div>
        <div
          className="rounded-xl p-3"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon className="h-6 w-6" style={{ color: iconColor }} />
        </div>
      </div>
    </Card>
  );
}
