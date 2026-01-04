import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  ClipboardCheck, 
  TrendingUp,
  Eye,
  Plus,
  UserPlus,
  ArrowRight,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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

const universityBadges: Record<string, string> = {
  'lpu': 'Top Performer',
  'bits': 'High Attendance',
  'srm': 'Growing Fast',
};

export default function Dashboard() {
  const totalStudents = universities.reduce((sum, u) => sum + u.studentsCount, 0);
  const avgScore = Math.round(universities.reduce((sum, u) => sum + u.avgScore, 0) / universities.length);
  const pendingExams = getPendingExams();

  // Calculate overall performance for each university
  const getOverallPerformance = (university: typeof universities[0]) => {
    return Math.round((university.avgScore + university.completion + university.attendance) / 3);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] gap-6">
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

      {/* KPI Cards - Compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
          icon={ClipboardCheck}
          iconBgColor="bg-warning/10"
          iconColor="text-warning"
          label="Pending Exam Approvals"
          value={pendingExams.length}
          href="/exams"
          delay={4}
        />
        <KPICard
          icon={Users}
          iconBgColor="bg-primary/10"
          iconColor="text-primary"
          label="Total Trainers"
          value="100"
          delay={5}
        />
      </div>

      {/* Universities Overview Section - Fills Remaining Space */}
      <div className="flex-1 animate-fade-up opacity-0 stagger-3 pb-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-display font-bold text-foreground">Universities Overview</h3>
            <p className="text-sm text-muted-foreground mt-1">Manage and monitor all partner universities</p>
          </div>
          <Link 
            to="/universities" 
            className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-2 bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-xl transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* University Cards Grid - Full Height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
          {universities.map((university) => {
            const overallPerformance = getOverallPerformance(university);
            
            return (
              <Link 
                key={university.id} 
                to={`/universities/${university.id}`}
                className="group relative bg-card rounded-2xl border border-border/50 overflow-hidden flex flex-col min-h-[420px] hover:shadow-2xl hover:scale-[1.02] hover:border-primary/30 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                {/* Image Header - 45% height */}
                <div className="relative h-[180px] overflow-hidden">
                  <img 
                    src={universityImages[university.id]} 
                    alt={university.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Badges on image */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                      University
                    </Badge>
                    <Badge className="bg-success/90 text-success-foreground backdrop-blur-sm flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      {universityBadges[university.id]}
                    </Badge>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Title & Subtitle */}
                  <div className="mb-4">
                    <h4 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                      {university.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Total Students: <span className="font-semibold text-foreground">{university.studentsCount.toLocaleString()}</span>
                    </p>
                  </div>
                  
                  {/* Stats Chips */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <div className="flex items-center gap-2 bg-success/10 text-success px-3 py-1.5 rounded-lg">
                      <span className="text-xs font-medium">Avg Score</span>
                      <span className="text-sm font-bold">{university.avgScore}%</span>
                    </div>
                    <div className="flex items-center gap-2 bg-info/10 text-info px-3 py-1.5 rounded-lg">
                      <span className="text-xs font-medium">Completion</span>
                      <span className="text-sm font-bold">{university.completion}%</span>
                    </div>
                    <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg">
                      <span className="text-xs font-medium">Attendance</span>
                      <span className="text-sm font-bold">{university.attendance}%</span>
                    </div>
                  </div>

                  {/* Overall Performance Progress */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">Overall Performance</span>
                      <span className="text-sm font-bold text-foreground">{overallPerformance}%</span>
                    </div>
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${overallPerformance}%`,
                          background: 'var(--gradient-primary)'
                        }}
                      />
                    </div>
                  </div>

                  {/* CTA Row - Push to bottom */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm font-semibold text-primary group-hover:underline">
                      View University
                    </span>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-primary group-hover:text-primary-foreground group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
