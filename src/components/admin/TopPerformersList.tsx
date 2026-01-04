import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PerformerItem {
  id: string;
  name: string;
  subtitle: string;
  score: number;
  trend?: 'up' | 'down';
  avatar?: string;
}

interface TopPerformersListProps {
  title: string;
  items: PerformerItem[];
  type: 'success' | 'warning';
  linkTo?: string;
}

export function TopPerformersList({ title, items, type, linkTo }: TopPerformersListProps) {
  const isSuccess = type === 'success';

  return (
    <div className="card-elevated p-6 animate-fade-up opacity-0 stagger-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {linkTo && (
          <Link to={linkTo} className="text-xs text-primary hover:underline">
            View all
          </Link>
        )}
      </div>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <Link
            key={item.id}
            to={`/students/${item.id}`}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
              isSuccess ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
            )}>
              {item.avatar || item.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
            </div>
            <div className="flex items-center gap-1">
              {isSuccess ? (
                <>
                  <span className={cn(
                    "text-sm font-semibold",
                    item.score >= 80 ? "text-success" : "text-foreground"
                  )}>
                    {item.score}%
                  </span>
                  {item.trend === 'up' && <TrendingUp className="w-4 h-4 text-success" />}
                  {item.trend === 'down' && <TrendingDown className="w-4 h-4 text-destructive" />}
                </>
              ) : (
                <div className="flex items-center gap-1 text-warning">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-semibold">{item.score}%</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
