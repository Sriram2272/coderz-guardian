import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Users, TrendingUp, Layers, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getUniversityById, getProgramsByUniversity, getBatchesByProgram } from '@/data/seedData';

export default function ProgramDetail() {
  const { id, programKey } = useParams<{ id: string; programKey: string }>();
  const university = getUniversityById(id || '');
  const programs = getProgramsByUniversity(id || '');
  const program = programs.find(p => p.key === programKey);
  const programBatches = getBatchesByProgram(id || '', programKey || '');

  if (!university || !program) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-muted-foreground">Program not found</p>
        <Link to="/" className="text-primary hover:underline mt-2">Back to Dashboard</Link>
      </div>
    );
  }

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
        <span className="text-foreground font-medium">{program.name}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to={`/universities/${university.id}`}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">{program.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{program.description}</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{programBatches.length}</p>
            <p className="text-xs text-muted-foreground">Batches</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{program.studentsCount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Students</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{program.avgScore}%</p>
            <p className="text-xs text-muted-foreground">Avg Score</p>
          </div>
        </div>
      </div>

      {/* Batches Section */}
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground mb-4">Batches</h2>
        {programBatches.length === 0 ? (
          <div className="card-elevated p-8 text-center">
            <p className="text-muted-foreground">No batches found for this program</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {programBatches.map((batch) => (
              <Link
                key={batch.id}
                to={`/universities/${university.id}/programs/${programKey}/batches/${batch.id}`}
                className="card-elevated p-6 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {batch.name}
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className={batch.status === 'active' ? 'bg-success/10 text-success' : ''}
                    >
                      {batch.status}
                    </Badge>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Layers className="w-4 h-4" />
                      <span className="text-sm">Sections</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{batch.sectionsCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Students</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{batch.studentsCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">Avg Score</span>
                    </div>
                    <span className="text-sm font-semibold text-success">{batch.avgScore}%</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/10">
                    View Batch
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}