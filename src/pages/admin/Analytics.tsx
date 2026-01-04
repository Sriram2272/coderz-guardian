import { useState } from 'react';
import { TrendingUp, Users, GraduationCap, Target, Calendar } from 'lucide-react';
import { KPICard } from '@/components/admin/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const performanceTrends = [
  { month: 'Jul', avgScore: 72, completion: 68, attendance: 82 },
  { month: 'Aug', avgScore: 74, completion: 71, attendance: 84 },
  { month: 'Sep', avgScore: 76, completion: 73, attendance: 85 },
  { month: 'Oct', avgScore: 78, completion: 75, attendance: 86 },
  { month: 'Nov', avgScore: 79, completion: 76, attendance: 87 },
  { month: 'Dec', avgScore: 81, completion: 78, attendance: 88 },
];

const universityComparison = [
  { name: 'LPU', avgScore: 79, students: 5200, completion: 74 },
  { name: 'BITS', avgScore: 83, students: 3900, completion: 78 },
  { name: 'SRM', avgScore: 76, students: 3900, completion: 71 },
];

const programDistribution = [
  { name: 'GenAI', value: 4600, color: 'hsl(var(--chart-1))' },
  { name: 'Data Science', value: 4300, color: 'hsl(var(--chart-2))' },
  { name: 'Cloud Computing', value: 4100, color: 'hsl(var(--chart-3))' },
];

const weeklyActivity = [
  { day: 'Mon', exams: 12, assignments: 28, logins: 3200 },
  { day: 'Tue', exams: 8, assignments: 32, logins: 3500 },
  { day: 'Wed', exams: 15, assignments: 25, logins: 3100 },
  { day: 'Thu', exams: 10, assignments: 30, logins: 3400 },
  { day: 'Fri', exams: 18, assignments: 22, logins: 2800 },
  { day: 'Sat', exams: 5, assignments: 15, logins: 1500 },
  { day: 'Sun', exams: 3, assignments: 10, logins: 1200 },
];

const completionRates = [
  { range: '0-25%', count: 450 },
  { range: '26-50%', count: 1200 },
  { range: '51-75%', count: 4500 },
  { range: '76-100%', count: 6850 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('6months');

  return (
    <div className="space-y-6">
      {/* Header with Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-display font-semibold text-foreground">Performance Overview</h2>
          <p className="text-sm text-muted-foreground">Track and analyze student performance metrics</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] bg-card border-border">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Avg Performance"
          value="79%"
          icon={TrendingUp}
          trend={{ value: "5%", positive: true }}
          delay={0}
        />
        <KPICard
          label="Completion Rate"
          value="74%"
          icon={Target}
          trend={{ value: "8%", positive: true }}
          delay={1}
        />
        <KPICard
          label="Active Students"
          value="12,847"
          icon={Users}
          trend={{ value: "12%", positive: true }}
          delay={2}
        />
        <KPICard
          label="Programs"
          value="9"
          icon={GraduationCap}
          delay={3}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground font-display">Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="avgScore"
                  name="Avg Score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
                <Line
                  type="monotone"
                  dataKey="completion"
                  name="Completion"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--chart-2))' }}
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  name="Attendance"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--chart-3))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* University Comparison */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground font-display">University Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={universityComparison} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={50} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="avgScore" name="Avg Score" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                <Bar dataKey="completion" name="Completion %" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Program Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground font-display">Students by Program</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={programDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {programDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground font-display">Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="logins"
                  name="Logins"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary) / 0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Completion Distribution */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground font-display">Completion Rate Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={completionRates}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" name="Students" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
