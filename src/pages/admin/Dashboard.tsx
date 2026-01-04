import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  ClipboardCheck, 
  TrendingUp,
  Eye,
  Plus,
  UserPlus,
  Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KPICard } from '@/components/admin/KPICard';
import { ProgressTracker } from '@/components/admin/ProgressTracker';
import { ActivityHeatmap } from '@/components/admin/ActivityHeatmap';
import { TopPerformersList } from '@/components/admin/TopPerformersList';
import { MonthlyScoreChart } from '@/components/admin/MonthlyScoreChart';
import { 
  organizations, 
  programs, 
  getTopPerformers, 
  getNeedsSupport,
  getPendingExams,
} from '@/data/seedData';

export default function Dashboard() {
  const totalStudents = organizations.reduce((sum, org) => sum + org.studentsCount, 0);
  const totalTeachers = organizations.reduce((sum, org) => sum + org.teachersCount, 0);
  const avgScore = Math.round(organizations.reduce((sum, org) => sum + org.avgScore, 0) / organizations.length);
  const avgCompletion = Math.round(organizations.reduce((sum, org) => sum + org.completion, 0) / organizations.length);
  
  const pendingExams = getPendingExams();
  const topPerformers = getTopPerformers(3);
  const needsSupport = getNeedsSupport(3);

  const programProgress = programs.slice(0, 3).map(p => ({
    id: p.id,
    code: p.name.slice(0, 2).toUpperCase(),
    label: p.name,
    progress: p.completion,
  }));

  const recentActivity = [
    { id: '1', action: 'Prof. Ananya Sharma submitted exam for approval', time: '5 min ago', type: 'exam' },
    { id: '2', action: 'New batch 2025-2029 created in GenAI', time: '2 hours ago', type: 'batch' },
    { id: '3', action: 'Global Tech Academy onboarded', time: '1 day ago', type: 'org' },
    { id: '4', action: 'Dr. Suresh Nair joined as teacher', time: '2 days ago', type: 'teacher' },
  ];

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
              Manage organizations, review exams, and monitor platform performance from your global admin console.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/exams">
              <Button variant="secondary" className="bg-card/90 hover:bg-card text-foreground">
                <Eye className="w-4 h-4 mr-2" />
                Review Exams
              </Button>
            </Link>
            <Link to="/organizations">
              <Button className="bg-primary-foreground/10 border border-primary-foreground/20 hover:bg-primary-foreground/20 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Create Organization
              </Button>
            </Link>
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
          label="Total Organizations"
          value={organizations.length}
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

      {/* 3-Column Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Program Progress Tracker */}
        <div className="card-elevated p-6 animate-fade-up opacity-0 stagger-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Program Progress Tracker</h3>
              <p className="text-sm text-muted-foreground">Completion rates</p>
            </div>
            <div className="flex items-center gap-2 text-success">
              <Flame className="w-4 h-4" />
              <span className="text-sm font-medium">12 day streak</span>
            </div>
          </div>
          <ProgressTracker items={programProgress} />
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Overall Progress</p>
                  <p className="text-xs text-muted-foreground">{programs.length} programs active</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-display font-bold text-success">{avgCompletion}%</p>
              </div>
            </div>
            <Link to="/programs" className="block mt-3 text-xs text-primary hover:underline text-center">
              View all programs
            </Link>
          </div>
        </div>

        {/* Middle: Monthly Score Chart */}
        <MonthlyScoreChart />

        {/* Right: Monthly Activity Heatmap */}
        <div className="card-elevated p-6 animate-fade-up opacity-0 stagger-3">
          <h3 className="font-semibold text-foreground mb-4">Monthly Activity</h3>
          <ActivityHeatmap reviews={pendingExams.length + 15} uploads={totalTeachers} />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Activity & Orgs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <div className="card-elevated p-6 animate-fade-up opacity-0 stagger-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Recent Activity</h3>
              <Link to="/audit-logs" className="text-xs text-primary hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Organizations Snapshot */}
          <div className="card-elevated p-6 animate-fade-up opacity-0 stagger-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Organizations Snapshot</h3>
              <Link to="/organizations" className="text-xs text-primary hover:underline">View all</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground py-3">Organization</th>
                    <th className="text-right text-xs font-medium text-muted-foreground py-3">Students</th>
                    <th className="text-right text-xs font-medium text-muted-foreground py-3">Avg Score</th>
                    <th className="text-right text-xs font-medium text-muted-foreground py-3">Completion</th>
                    <th className="text-right text-xs font-medium text-muted-foreground py-3">Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {organizations.map((org) => (
                    <tr key={org.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-3">
                        <Link to={`/organizations/${org.id}`} className="flex items-center gap-3 hover:text-primary">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-semibold text-primary">{org.code}</span>
                          </div>
                          <span className="text-sm font-medium text-foreground">{org.name}</span>
                        </Link>
                      </td>
                      <td className="text-right text-sm text-foreground py-3">{org.studentsCount.toLocaleString()}</td>
                      <td className="text-right text-sm text-foreground py-3">{org.avgScore}%</td>
                      <td className="text-right text-sm text-foreground py-3">{org.completion}%</td>
                      <td className="text-right text-sm text-foreground py-3">{org.attendance}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Top Performers */}
          <TopPerformersList
            title="Top Performers"
            items={topPerformers.map(s => ({
              id: s.id,
              name: s.name,
              subtitle: `${s.rollNo} • ${s.sectionId}`,
              score: s.avgScore,
              trend: 'up' as const,
            }))}
            type="success"
            linkTo="/students"
          />

          {/* Needs Support */}
          <TopPerformersList
            title="Needs Support"
            items={needsSupport.map(s => ({
              id: s.id,
              name: s.name,
              subtitle: `${s.rollNo} • Attendance: ${s.attendance}%`,
              score: s.avgScore,
            }))}
            type="warning"
            linkTo="/students"
          />
        </div>
      </div>
    </div>
  );
}
