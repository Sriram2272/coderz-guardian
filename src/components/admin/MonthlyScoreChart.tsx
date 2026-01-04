import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Org Avg', value: 72 },
  { name: 'Platform Avg', value: 78 },
  { name: 'Top Org', value: 92 },
];

const colors = ['hsl(var(--info))', 'hsl(var(--primary))', 'hsl(var(--success))'];

export function MonthlyScoreChart() {
  return (
    <div className="card-elevated p-6 h-full animate-fade-up opacity-0 stagger-2">
      <h3 className="font-semibold text-foreground mb-1">Platform Monthly Score</h3>
      <p className="text-xs text-muted-foreground mb-4">Updated today • Last 30 days</p>
      
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="25%">
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <div 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: colors[index] }}
            />
            <span className="text-xs text-muted-foreground">{item.name}</span>
            <span className="text-xs font-semibold text-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
