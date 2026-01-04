import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  ClipboardCheck, 
  TrendingUp,
  Eye,
  Plus,
  UserPlus,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { KPICard } from '@/components/admin/KPICard';
import { universities, getPendingExams } from '@/data/seedData';

export default function Dashboard() {
  const totalStudents = universities.reduce((sum, u) => sum + u.studentsCount, 0);
  const avgScore = Math.round(universities.reduce((sum, u) => sum + u.avgScore, 0) / universities.length);
  const pendingExams = getPendingExams();

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="hero-banner animate-fade-up opacity-0 stagger-1">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold flex items-center gap-3">
              Welcome back, Admin! <span className="text-3xl">👋</span>
            </h2>
            <p className="mt-2 text-primary-foreground/80 max-w-xl">
              Monitor universities, programs, batches, sections, and student performance.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/exams">
              <Button variant="secondary" className="bg-card/90 hover:bg-card text-foreground">
                <Eye className="w-4 h-4 mr-2" />
                Review Exams
              </Button>
            </Link>
            <Button className="bg-primary-foreground/10 border border-primary-foreground/20 hover:bg-primary-foreground/20 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Create University
            </Button>
            <Link to="/teachers">
              <Button className="bg-primary-foreground/10 border border-primary-foreground/20 hover:bg-primary-foreground/20 text-primary-foreground">
                <UserPlus className="w-4 h-4 mr-2" />
                Create Teacher
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={Building2}
          iconBgColor="bg-info/10"
          iconColor="text-info"
          label="Total Universities"
          value={universities.length}
          delay={2}
        />
        <KPICard
          icon={Users}
          iconBgColor="bg-success/10"
          iconColor="text-success"
          label="Total Students"
          value={totalStudents.toLocaleString()}
          trend={{ value: '12% this week', positive: true }}
          delay={3}
        />
        <KPICard
          icon={ClipboardCheck}
          iconBgColor="bg-warning/10"
          iconColor="text-warning"
          label="Pending Exam Approvals"
          value={pendingExams.length}
          delay={4}
        />
        <KPICard
          icon={TrendingUp}
          iconBgColor="bg-primary/10"
          iconColor="text-primary"
          label="Platform Avg Score"
          value={`${avgScore}%`}
          trend={{ value: '5% this month', positive: true }}
          delay={5}
        />
      </div>

      {/* Top Universities Section */}
      <div className="animate-fade-up opacity-0 stagger-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-semibold text-foreground">Top Universities</h3>
          <Link to="/universities" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {universities.map((university) => (
            <Link 
              key={university.id} 
              to={`/universities/${university.id}`}
              className="card-elevated p-6 hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">{university.code.slice(0, 2)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {university.name}
                    </h4>
                    <Badge variant="secondary" className="text-xs mt-1">{university.code}</Badge>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Students</span>
                  <span className="text-sm font-semibold text-foreground">{university.studentsCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Score</span>
                  <span className="text-sm font-semibold text-success">{university.avgScore}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Completion</span>
                  <span className="text-sm font-semibold text-foreground">{university.completion}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Attendance</span>
                  <span className="text-sm font-semibold text-foreground">{university.attendance}%</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/10">
                  View University
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}