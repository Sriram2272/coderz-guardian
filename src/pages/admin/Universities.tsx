import { Link } from 'react-router-dom';
import { universities, batches, teachers } from '@/data/seedData';
import { Users, TrendingUp, CheckCircle, Clock, ArrowRight, Building2, GraduationCap, UserCheck, Search, Plus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import lpuCampus from '@/assets/universities/lpu-campus.jpg';
import bitsCampus from '@/assets/universities/bits-campus.jpg';
import srmCampus from '@/assets/universities/srm-campus.jpg';

const universityImages: Record<string, string> = {
  'lpu': lpuCampus,
  'bits': bitsCampus,
  'srm': srmCampus,
};

const universityBadges: Record<string, string> = {
  'lpu': 'Most Students',
  'bits': 'Top Performer',
  'srm': 'High Attendance',
};

// Calculate totals
const totalUniversities = universities.length;
const totalStudents = universities.reduce((sum, u) => sum + u.studentsCount, 0);
const totalBatches = batches.length;
const totalTrainers = teachers.length;

export default function Universities() {
  return (
    <div className="flex flex-col h-full">
      {/* Custom Top Bar for Universities */}
      <AdminTopBar 
        title="Organization" 
        subtitle="Manage and monitor all partner universities"
      />
      
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Total Universities</p>
            <p className="text-3xl font-bold text-foreground mt-1">{totalUniversities}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-3xl font-bold text-primary mt-1">{totalStudents.toLocaleString()}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Total Batches</p>
            <p className="text-3xl font-bold text-foreground mt-1">{totalBatches}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Total Trainers</p>
            <p className="text-3xl font-bold text-accent mt-1">{totalTrainers}</p>
          </div>
        </div>

        {/* Search and Actions Row */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search universities..."
              className="pl-10 bg-secondary border-0"
            />
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add University
          </Button>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni) => {
            const overallScore = Math.round((uni.avgScore + uni.completion + uni.attendance) / 3);
            
            return (
              <Link 
                key={uni.id}
                to={`/universities/${uni.id}`}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={universityImages[uni.id]} 
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
                      University
                    </span>
                    <span className="px-3 py-1 bg-accent/90 text-accent-foreground text-xs font-medium rounded-full backdrop-blur-sm">
                      {universityBadges[uni.id]}
                    </span>
                  </div>

                  {/* Code Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-black/50 text-white text-xs font-mono rounded backdrop-blur-sm">
                      {uni.code}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-4">
                  {/* Title & Students */}
                  <div>
                    <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors">
                      {uni.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      Total Students: {uni.studentsCount.toLocaleString()}
                    </p>
                  </div>

                  {/* Stats Chips */}
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-lg">
                      <TrendingUp className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-medium text-foreground">{uni.avgScore}% Avg</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 rounded-lg">
                      <CheckCircle className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs font-medium text-foreground">{uni.completion}% Complete</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium text-foreground">{uni.attendance}% Attend</span>
                    </div>
                  </div>

                  {/* Overall Performance */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Overall Performance</span>
                      <span className="font-semibold text-foreground">{overallScore}%</span>
                    </div>
                    <Progress value={overallScore} className="h-1.5" />
                  </div>

                  {/* CTA Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm font-medium text-primary group-hover:underline">
                      View University
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ArrowRight className="w-4 h-4" />
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
