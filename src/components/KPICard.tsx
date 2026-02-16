import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  iconColor?: string;
}

export default function KPICard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "bg-primary-100 text-primary-600",
}: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <div className="flex items-center gap-1.5 mt-2">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span
              className={cn(
                "text-sm font-medium",
                isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {isPositive ? "+" : ""}
              {change}%
            </span>
            <span className="text-xs text-gray-400">vs mês anterior</span>
          </div>
        </div>
        <div className={cn("p-3 rounded-xl", iconColor)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
