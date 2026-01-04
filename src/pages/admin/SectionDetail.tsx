import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Users, TrendingUp, Calendar, Clock, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { KPICard } from '@/components/admin/KPICard';
import { 
  getUniversityById, 
  getProgramsByUniversity, 
  batches, 
  sections,
  getStudentsBySection 
} from '@/data/seedData';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function SectionDetail() {
  const { id, programKey, batchId, sectionId } = useParams<{ 
    id: string; 
    programKey: string; 
    batchId: string;
    sectionId: string;
  }>();
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const university = getUniversityById(id || '');
  const programs = getProgramsByUniversity(id || '');
  const program = programs.find(p => p.key === programKey);
  const batch = batches.find(b => b.id === batchId);
  const section = sections.find(s => s.id === sectionId);
  const sectionStudents = getStudentsBySection(sectionId || '');

  const filteredStudents = useMemo(() => {
    if (!searchQuery) return sectionStudents;
    const query = searchQuery.toLowerCase();
    return sectionStudents.filter(s => 
      s.name.toLowerCase().includes(query) || 
      s.rollNo.toLowerCase().includes(query)
    );
  }, [sectionStudents, searchQuery]);

  // Score distribution data
  const scoreDistribution = useMemo(() => {
    const buckets = [
      { range: '0-40', count: 0, color: 'hsl(var(--destructive))' },
      { range: '41-60', count: 0, color: 'hsl(var(--warning))' },
      { range: '61-80', count: 0, color: 'hsl(var(--info))' },
      { range: '81-100', count: 0, color: 'hsl(var(--success))' },
    ];
    
    sectionStudents.forEach(s => {
      if (s.avgScore <= 40) buckets[0].count++;
      else if (s.avgScore <= 60) buckets[1].count++;
      else if (s.avgScore <= 80) buckets[2].count++;
      else buckets[3].count++;
    });
    
    return buckets;
  }, [sectionStudents]);

  // Attendance trend data (mock)
  const attendanceTrend = [
    { week: 'Week 1', attendance: 92 },
    { week: 'Week 2', attendance: 88 },
    { week: 'Week 3', attendance: 91 },
    { week: 'Week 4', attendance: 85 },
    { week: 'Week 5', attendance: 89 },
    { week: 'Week 6', attendance: 87 },
  ];

  if (!university || !program || !batch || !section) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-muted-foreground">Section not found</p>
        <Link to="/" className="text-primary hover:underline mt-2">Back to Dashboard</Link>
      </div>
    );
  }

  const activeStudents = sectionStudents.filter(s => s.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm flex-wrap">
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <Link to={`/universities/${university.id}`} className="text-muted-foreground hover:text-foreground transition-colors">
          {university.name}
        </Link>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <Link to={`/universities/${university.id}/programs/${programKey}`} className="text-muted-foreground hover:text-foreground transition-colors">
          {program.name}
        </Link>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <Link to={`/universities/${university.id}/programs/${programKey}/batches/${batchId}`} className="text-muted-foreground hover:text-foreground transition-colors">
          {batch.name}
        </Link>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <span className="text-foreground font-medium">{section.code}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to={`/universities/${university.id}/programs/${programKey}/batches/${batchId}`}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">{section.displayName}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {program.name} • {batch.name} • {university.name}
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={TrendingUp}
          iconBgColor="bg-success/10"
          iconColor="text-success"
          label="Avg Score"
          value={`${section.avgScore}%`}
          delay={1}
        />
        <KPICard
          icon={Calendar}
          iconBgColor="bg-info/10"
          iconColor="text-info"
          label="Attendance"
          value={`${section.attendance}%`}
          delay={2}
        />
        <KPICard
          icon={Clock}
          iconBgColor="bg-primary/10"
          iconColor="text-primary"
          label="Completion"
          value={`${section.completion}%`}
          delay={3}
        />
        <KPICard
          icon={Users}
          iconBgColor="bg-warning/10"
          iconColor="text-warning"
          label="Active Students"
          value={activeStudents}
          delay={4}
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <div className="card-elevated p-6">
          <h3 className="font-semibold text-foreground mb-4">Score Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={scoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {scoreDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Trend */}
        <div className="card-elevated p-6">
          <h3 className="font-semibold text-foreground mb-4">Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[70, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="attendance" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Students List */}
      <div className="card-elevated p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h3 className="font-semibold text-foreground">Students ({sectionStudents.length})</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-10 w-64 bg-secondary border-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Student Name</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Roll No</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Score %</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Attendance %</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Progress %</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    No students found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-foreground">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-muted-foreground">{student.rollNo}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Badge 
                        variant="secondary"
                        className={
                          student.avgScore >= 80 ? 'bg-success/10 text-success' :
                          student.avgScore >= 60 ? 'bg-info/10 text-info' :
                          student.avgScore >= 40 ? 'bg-warning/10 text-warning' :
                          'bg-destructive/10 text-destructive'
                        }
                      >
                        {student.avgScore}%
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`text-sm font-medium ${student.attendance >= 75 ? 'text-success' : 'text-destructive'}`}>
                        {student.attendance}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm text-foreground">{student.completion}%</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm text-muted-foreground">{student.lastActivity}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}