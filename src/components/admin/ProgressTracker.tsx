import { cn } from '@/lib/utils';

interface ProgressTrackerProps {
  items: {
    id: string;
    code: string;
    label: string;
    progress: number;
  }[];
  onItemClick?: (id: string) => void;
}

export function ProgressTracker({ items, onItemClick }: ProgressTrackerProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div 
          key={item.id}
          className={cn(
            "flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer animate-fade-up opacity-0",
          )}
          style={{ animationDelay: `${(index + 2) * 0.08}s` }}
          onClick={() => onItemClick?.(item.id)}
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-primary">{item.code}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{item.label}</span>
              <span className="text-sm font-semibold text-foreground">{item.progress}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full gradient-success transition-all duration-500"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
          <svg className="w-5 h-5 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      ))}
    </div>
  );
}
