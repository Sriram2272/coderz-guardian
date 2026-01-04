import { cn } from '@/lib/utils';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Generate sample activity data for the heatmap
const generateActivityData = () => {
  const data: number[][] = [];
  for (let week = 0; week < 7; week++) {
    const weekData: number[] = [];
    for (let day = 0; day < 7; day++) {
      weekData.push(Math.floor(Math.random() * 5));
    }
    data.push(weekData);
  }
  return data;
};

const activityData = generateActivityData();

const getIntensityColor = (value: number) => {
  switch (value) {
    case 0: return 'bg-secondary';
    case 1: return 'bg-primary/20';
    case 2: return 'bg-primary/40';
    case 3: return 'bg-primary/60';
    case 4: return 'bg-primary/80';
    default: return 'bg-primary';
  }
};

interface ActivityHeatmapProps {
  reviews?: number;
  uploads?: number;
}

export function ActivityHeatmap({ reviews = 24, uploads = 12 }: ActivityHeatmapProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {days.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-xs text-muted-foreground w-6 text-center">{day}</span>
            <div className="flex flex-col gap-1">
              {activityData.map((week, weekIndex) => (
                <div
                  key={weekIndex}
                  className={cn(
                    "w-6 h-6 rounded-md transition-colors",
                    getIntensityColor(week[i])
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className={cn("w-4 h-4 rounded", getIntensityColor(i))} />
          ))}
        </div>
        <span>More</span>
      </div>

      <div className="flex items-center justify-around pt-2 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-display font-bold text-foreground">{reviews}</p>
          <p className="text-xs text-muted-foreground">Reviews</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-display font-bold text-foreground">{uploads}</p>
          <p className="text-xs text-muted-foreground">Uploads</p>
        </div>
      </div>
    </div>
  );
}
