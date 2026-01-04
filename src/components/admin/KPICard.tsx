import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
  delay?: number;
}

export function KPICard({ 
  icon: Icon, 
  iconBgColor = 'bg-primary/10',
  iconColor = 'text-primary',
  label, 
  value, 
  trend,
  className,
  delay = 0
}: KPICardProps) {
  return (
    <div 
      className={cn("kpi-card animate-fade-up opacity-0", className)}
      style={{ animationDelay: `${delay * 0.08}s` }}
    >
      <div className="flex items-start justify-between">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconBgColor)}>
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trend.positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          )}>
            {trend.positive ? '+' : ''}{trend.value}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-display font-bold text-foreground mt-1">{value}</p>
      </div>
    </div>
  );
}
