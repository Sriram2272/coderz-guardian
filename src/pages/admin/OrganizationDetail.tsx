import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  Layers,
  TrendingUp,
  Calendar,
  MoreHorizontal,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KPICard } from '@/components/admin/KPICard';
import { ProgressTracker } from '@/components/admin/ProgressTracker';
import { TopPerformersList } from '@/components/admin/TopPerformersList';
import { 
  getOrganizationById, 
  getProgramsByOrganization,
  getTeachersByOrganization,
  students,
  batches,
  sections,
  programs
} from '@/data/seedData';
import { cn } from '@/lib/utils';

export default function OrganizationDetail() {
  const { id } = useParams<{ id: string }>();
  const organization = getOrganizationById(id || '');
  const orgPrograms = getProgramsByOrganization(id || '');
  const orgTeachers = getTeachersByOrganization(id || '');

  if (!organization) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Organization not found</p>
      </div>
    );
  }

  const orgStudents = students.filter(s => s.organizationId === id);
  const topPerformers = [...orgStudents].sort((a, b) => b.avgScore - a.avgScore).slice(0, 3);
  const needsSupport = orgStudents.filter(s => s.attendance < 70 || s.completion < 50).slice(0, 3);

  const programProgress = orgPrograms.map(p => ({
    id: p.id,
    code: p.name.slice(0, 2).toUpperCase(),
    label: p.name,
    progress: p.completion,
  }));

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div className="animate-fade-up opacity-0">
        <Link to="/organizations" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Organizations
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">{organization.code}</span>
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">{organization.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="badge-success">{organization.status}</Badge>
                <span className="text-sm text-muted-foreground">Created {organization.createdAt}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Edit</Button>
            <Button className="gradient-primary text-primary-foreground">Send Notification</Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="animate-fade-up opacity-0 stagger-1">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="batches">Batches</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              icon={Users}
              iconBgColor="bg-success/10"
              iconColor="text-success"
              label="Total Students"
              value={organization.studentsCount.toLocaleString()}
              delay={0}
            />
            <KPICard
              icon={GraduationCap}
              iconBgColor="bg-info/10"
              iconColor="text-info"
              label="Teachers"
              value={organization.teachersCount}
              delay={1}
            />
            <KPICard
              icon={Layers}
              iconBgColor="bg-warning/10"
              iconColor="text-warning"
              label="Programs"
              value={organization.programsCount}
              delay={2}
            />
            <KPICard
              icon={BookOpen}
              iconBgColor="bg-primary/10"
              iconColor="text-primary"
              label="Active Batches"
              value={organization.batchesCount}
              delay={3}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Program Progress */}
            <div className="lg:col-span-2 card-elevated p-6">
              <h3 className="font-semibold text-foreground mb-4">Program Progress Tracker</h3>
              <ProgressTracker items={programProgress} />
            </div>

            {/* Performance Summary */}
            <div className="card-elevated p-6">
              <h3 className="font-semibold text-foreground mb-4">Performance Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Score</span>
                  <span className={cn(
                    "text-lg font-semibold",
                    organization.avgScore >= 80 ? "text-success" : "text-warning"
                  )}>{organization.avgScore}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Completion</span>
                  <span className="text-lg font-semibold text-foreground">{organization.completion}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Attendance</span>
                  <span className={cn(
                    "text-lg font-semibold",
                    organization.attendance >= 85 ? "text-success" : "text-warning"
                  )}>{organization.attendance}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performers & Needs Support */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopPerformersList
              title="Top 3 Students"
              items={topPerformers.map(s => ({
                id: s.id,
                name: s.name,
                subtitle: `${s.rollNo} • Section ${s.sectionId}`,
                score: s.avgScore,
                trend: 'up' as const,
              }))}
              type="success"
            />
            <TopPerformersList
              title="Needs Support"
              items={needsSupport.map(s => ({
                id: s.id,
                name: s.name,
                subtitle: `Attendance: ${s.attendance}% • Completion: ${s.completion}%`,
                score: s.avgScore,
              }))}
              type="warning"
            />
          </div>
        </TabsContent>

        {/* Programs Tab */}
        <TabsContent value="programs" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orgPrograms.map((program) => (
              <Link 
                key={program.id}
                to={`/programs/${program.id}`}
                className="card-elevated p-6 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <Badge className="badge-success">{program.status}</Badge>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{program.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Batches</p>
                    <p className="font-semibold text-foreground">{program.batchesCount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Students</p>
                    <p className="font-semibold text-foreground">{program.studentsCount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg Score</p>
                    <p className="font-semibold text-success">{program.avgScore}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Completion</p>
                    <p className="font-semibold text-foreground">{program.completion}%</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>

        {/* Other Tabs - Placeholder content */}
        <TabsContent value="batches" className="mt-6">
          <div className="card-elevated p-6">
            <p className="text-muted-foreground">Batches content for {organization.name}</p>
          </div>
        </TabsContent>

        <TabsContent value="sections" className="mt-6">
          <div className="card-elevated p-6">
            <p className="text-muted-foreground">Sections content for {organization.name}</p>
          </div>
        </TabsContent>

        <TabsContent value="students" className="mt-6">
          <div className="card-elevated p-6">
            <p className="text-muted-foreground">Students content for {organization.name}</p>
          </div>
        </TabsContent>

        <TabsContent value="teachers" className="mt-6">
          <div className="card-elevated p-6">
            <p className="text-muted-foreground">Teachers content for {organization.name}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
