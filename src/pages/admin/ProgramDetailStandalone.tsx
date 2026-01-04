import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Users, GraduationCap, Layers, TrendingUp, Building2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { KPICard } from '@/components/admin/KPICard';
import { programs, universities, batches, sections } from '@/data/seedData';

export default function ProgramDetailStandalone() {
  const { programKey } = useParams<{ programKey: string }>();

  // Get all programs with this key (across universities)
  const programInstances = programs.filter(p => p.key === programKey);
  
  if (programInstances.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-muted-foreground">Program not found</p>
        <Link to="/programs" className="text-primary hover:underline mt-2">Back to Programs</Link>
      </div>
    );
  }

  // Aggregate data across all universities
  const programName = programInstances[0].name;
  const programDescription = programInstances[0].description;
  const totalStudents = programInstances.reduce((sum, p) => sum + p.studentsCount, 0);
  const totalBatches = programInstances.reduce((sum, p) => sum + p.batchesCount, 0);
  const avgScore = Math.round(programInstances.reduce((sum, p) => sum + p.avgScore, 0) / programInstances.length);
  
  // Get all sections for this program
  const programSections = sections.filter(s => s.programKey === programKey);
  const totalSections = programSections.length;

  // Get universities offering this program
  const programUniversities = programInstances.map(p => {
    const uni = universities.find(u => u.id === p.universityId);
    return {
      ...uni!,
      programData: p,
    };
  });

  // Get all batches for this program
  const programBatches = batches.filter(b => b.programKey === programKey);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm flex-wrap">
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <Link to="/programs" className="text-muted-foreground hover:text-foreground transition-colors">Programs</Link>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <span className="text-foreground font-medium">{programName}</span>
      </nav>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Total Students"
          value={totalStudents.toLocaleString()}
          icon={Users}
          trend={{ value: "12%", positive: true }}
        />
        <KPICard
          label="Universities"
          value={programUniversities.length}
          icon={Building2}
        />
        <KPICard
          label="Total Batches"
          value={totalBatches}
          icon={Layers}
        />
        <KPICard
          label="Avg Score"
          value={`${avgScore}%`}
          icon={TrendingUp}
          trend={{ value: "3%", positive: true }}
        />
      </div>

      {/* Universities Section */}
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground mb-4">Universities Offering This Program</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programUniversities.map((uni) => (
            <Link
              key={uni.id}
              to={`/universities/${uni.id}/programs/${programKey}`}
              className="card-elevated p-6 hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">{uni.code.slice(0, 2)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {uni.name}
                    </h3>
                    <Badge variant="secondary" className="bg-success/10 text-success border-0">
                      Active
                    </Badge>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Students</span>
                  <span className="text-sm font-semibold text-foreground">{uni.programData.studentsCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Batches</span>
                  <span className="text-sm font-semibold text-foreground">{uni.programData.batchesCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Score</span>
                  <span className="text-sm font-semibold text-success">{uni.programData.avgScore}%</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Sections Overview */}
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground mb-4">All Sections ({totalSections})</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-muted-foreground font-medium text-sm">SECTION</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium text-sm">UNIVERSITY</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium text-sm">BATCH</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium text-sm">STUDENTS</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium text-sm">STATUS</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium text-sm">AVG SCORE</th>
              </tr>
            </thead>
            <tbody>
              {programSections.slice(0, 10).map((section) => {
                const uni = universities.find(u => u.id === section.universityId);
                const batch = batches.find(b => b.id === section.batchId);
                return (
                  <tr key={section.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Layers className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{section.displayName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary">{uni?.code}</Badge>
                    </td>
                    <td className="px-6 py-4 text-foreground">{batch?.name}</td>
                    <td className="px-6 py-4 text-foreground font-medium">{section.studentsCount}</td>
                    <td className="px-6 py-4">
                      <Badge className="bg-success/10 text-success border-0">
                        {section.status.charAt(0).toUpperCase() + section.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-success font-medium">{section.avgScore}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {programSections.length > 10 && (
            <div className="px-6 py-4 border-t border-border text-center">
              <Button variant="ghost" className="text-primary">
                View all {programSections.length} sections
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
