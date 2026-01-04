import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  ClipboardCheck, 
  ArrowRight,
  GraduationCap,
  TrendingUp,
  Target
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Import university images
import lpuCampus from '@/assets/universities/lpu-campus.jpg';
import bitsCampus from '@/assets/universities/bits-campus.jpg';
import srmCampus from '@/assets/universities/srm-campus.jpg';
import { universities, getPendingExams } from '@/data/seedData';

const universityImages: Record<string, string> = {
  'lpu': lpuCampus,
  'bits': bitsCampus,
  'srm': srmCampus,
};

export default function Dashboard() {
  const totalStudents = universities.reduce((sum, u) => sum + u.studentsCount, 0);
  const pendingExams = getPendingExams();

  const kpis = [
    { 
      label: 'Universities', 
      value: universities.length, 
      icon: Building2, 
      color: 'text-primary',
      bg: 'bg-primary/8'
    },
    { 
      label: 'Students', 
      value: totalStudents.toLocaleString(), 
      icon: GraduationCap, 
      color: 'text-success',
      bg: 'bg-success/8'
    },
    { 
      label: 'Trainers', 
      value: '100', 
      icon: Users, 
      color: 'text-info',
      bg: 'bg-info/8'
    },
    { 
      label: 'Pending Approvals', 
      value: pendingExams.length, 
      icon: ClipboardCheck, 
      color: 'text-warning',
      bg: 'bg-warning/8',
      href: '/exams'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Compact Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Welcome back! Here's your overview.</p>
        </div>
      </div>

      {/* KPI Row - Clean & Compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const content = (
            <div 
              key={kpi.label}
              className={`group relative p-5 rounded-2xl border border-border/60 bg-card hover:border-border hover:shadow-sm transition-all duration-200 ${kpi.href ? 'cursor-pointer' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{kpi.label}</p>
                  <p className="text-3xl font-display font-bold text-foreground">{kpi.value}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
              </div>
            </div>
          );

          return kpi.href ? (
            <Link key={kpi.label} to={kpi.href}>{content}</Link>
          ) : (
            <div key={kpi.label}>{content}</div>
          );
        })}
      </div>

      {/* Universities Section */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-display font-semibold text-foreground">Universities</h2>
          <Link 
            to="/universities" 
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* University Cards - Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {universities.map((university) => (
            <Link 
              key={university.id} 
              to={`/universities/${university.id}`}
              className="group relative bg-card rounded-2xl border border-border/60 overflow-hidden hover:border-border hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={universityImages[university.id]} 
                  alt={university.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h3 className="font-display font-bold text-lg text-white">{university.name}</h3>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Quick Stats Row */}
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <GraduationCap className="w-4 h-4" />
                    <span className="font-medium text-foreground">{university.studentsCount.toLocaleString()}</span>
                  </div>
                  <span className="text-border">•</span>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium text-foreground">{university.avgScore}%</span>
                  </div>
                  <span className="text-border">•</span>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Target className="w-4 h-4" />
                    <span className="font-medium text-foreground">{university.completion}%</span>
                  </div>
                </div>

                {/* Performance Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Performance</span>
                    <span className="font-medium text-foreground">{Math.round((university.avgScore + university.completion + university.attendance) / 3)}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${Math.round((university.avgScore + university.completion + university.attendance) / 3)}%` }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <Badge variant="secondary" className="text-xs font-normal">
                    {university.attendance}% Attendance
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}