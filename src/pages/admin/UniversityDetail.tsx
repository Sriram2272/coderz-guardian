import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Users, TrendingUp, Clock, ArrowRight, GraduationCap, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getUniversityById, getProgramsByUniversity, batches, teachers } from '@/data/seedData';
import { AdminTopBar } from '@/components/admin/AdminTopBar';

export default function UniversityDetail() {
  const { id } = useParams<{ id: string }>();
  const university = getUniversityById(id || '');
  const universityPrograms = getProgramsByUniversity(id || '');
  const universityBatches = batches.filter(b => b.universityId === id);
  const universityTeachers = teachers.filter(t => t.universityId === id);

  if (!university) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-muted-foreground">University not found</p>
        <Link to="/universities" className="text-primary hover:underline mt-2">Back to Universities</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Custom Top Bar */}
      <AdminTopBar 
        title={university.name} 
        subtitle={`Manage programs, batches, and students for ${university.name}`}
      />
      
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <Link to="/universities" className="text-muted-foreground hover:text-foreground transition-colors">Universities</Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground font-medium">{university.name}</span>
        </nav>

        {/* Header with Logo */}
        <div className="flex items-center gap-4">
          <Link to="/universities">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold text-xl">{university.code.slice(0, 2)}</span>
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">{university.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary">{university.code}</Badge>
              <Badge className="bg-success/10 text-success border-0">Active</Badge>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-3xl font-bold text-foreground mt-1">{university.studentsCount.toLocaleString()}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Avg Score</p>
            <p className="text-3xl font-bold text-primary mt-1">{university.avgScore}%</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Completion</p>
            <p className="text-3xl font-bold text-foreground mt-1">{university.completion}%</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Attendance</p>
            <p className="text-3xl font-bold text-accent mt-1">{university.attendance}%</p>
          </div>
        </div>

        {/* Programs Section */}
        <div>
          <h2 className="text-lg font-display font-semibold text-foreground mb-4">Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {universityPrograms.map((program) => {
              const programBatches = batches.filter(b => b.universityId === university.id && b.programKey === program.key);
              
              return (
                <Link
                  key={program.id}
                  to={`/universities/${university.id}/programs/${program.key}`}
                  className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {program.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{program.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Batches</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">{programBatches.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">Students</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">{program.studentsCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">Avg Score</span>
                      </div>
                      <span className="text-sm font-semibold text-primary">{program.avgScore}%</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/10">
                      View Program
                    </Button>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
