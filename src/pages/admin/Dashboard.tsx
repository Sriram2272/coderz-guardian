import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  ClipboardCheck, 
  GraduationCap,
  Eye,
  Plus,
  UserPlus,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { KPICard } from '@/components/admin/KPICard';
import { universities, getPendingExams } from '@/data/seedData';

// Import university images
import lpuCampus from '@/assets/universities/lpu-campus.jpg';
import bitsCampus from '@/assets/universities/bits-campus.jpg';
import srmCampus from '@/assets/universities/srm-campus.jpg';

const universityImages: Record<string, string> = {
  'lpu': lpuCampus,
  'bits': bitsCampus,
  'srm': srmCampus,
};

export default function Dashboard() {
  const totalStudents = universities.reduce((sum, u) => sum + u.studentsCount, 0);
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
          delay={3}
        />
        <KPICard
          icon={GraduationCap}
          iconBgColor="bg-primary/10"
          iconColor="text-primary"
          label="Trainers"
          value={100}
          delay={4}
        />
        <KPICard
          icon={ClipboardCheck}
          iconBgColor="bg-warning/10"
          iconColor="text-warning"
          label="Pending Exam Approvals"
          value={pendingExams.length}
          href="/exams"
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {universities.map((university) => (
            <Link 
              key={university.id} 
              to={`/universities/${university.id}`}
              className="card-elevated overflow-hidden hover:border-primary/30 transition-all group"
            >
              {/* University Image */}
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={universityImages[university.id]} 
                  alt={university.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                  {university.code}
                </Badge>
              </div>
              
              {/* Card Content */}
              <div className="p-5">
                <h4 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-1">
                  {university.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {university.studentsCount.toLocaleString()} Students
                </p>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-success">{university.avgScore}%</p>
                    <p className="text-xs text-muted-foreground">Avg Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{university.completion}%</p>
                    <p className="text-xs text-muted-foreground">Completion</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{university.attendance}%</p>
                    <p className="text-xs text-muted-foreground">Attendance</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-sm font-medium text-primary">View University</span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}