import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Building2, 
  Users, 
  GraduationCap,
  BookOpen,
  MoreHorizontal,
  Eye,
  Edit,
  Archive
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { organizations } from '@/data/seedData';
import { cn } from '@/lib/utils';

export default function OrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const filteredOrgs = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || org.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-up opacity-0">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Organizations</h1>
          <p className="text-muted-foreground">Manage all universities and institutions on the platform</p>
        </div>
        <Button className="gradient-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Create Organization
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0 stagger-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search organizations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-up opacity-0 stagger-2">
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">{organizations.length}</p>
              <p className="text-xs text-muted-foreground">Total Orgs</p>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">
                {organizations.reduce((sum, o) => sum + o.studentsCount, 0).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Total Students</p>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-info" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">
                {organizations.reduce((sum, o) => sum + o.programsCount, 0)}
              </p>
              <p className="text-xs text-muted-foreground">Total Programs</p>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">
                {organizations.reduce((sum, o) => sum + o.sectionsCount, 0)}
              </p>
              <p className="text-xs text-muted-foreground">Total Sections</p>
            </div>
          </div>
        </div>
      </div>

      {/* Organizations Table */}
      <div className="card-elevated overflow-hidden animate-fade-up opacity-0 stagger-3">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground py-4 px-6">Organization</th>
                <th className="text-center text-xs font-medium text-muted-foreground py-4 px-4">Programs</th>
                <th className="text-center text-xs font-medium text-muted-foreground py-4 px-4">Batches</th>
                <th className="text-center text-xs font-medium text-muted-foreground py-4 px-4">Sections</th>
                <th className="text-center text-xs font-medium text-muted-foreground py-4 px-4">Students</th>
                <th className="text-center text-xs font-medium text-muted-foreground py-4 px-4">Avg Score</th>
                <th className="text-center text-xs font-medium text-muted-foreground py-4 px-4">Completion</th>
                <th className="text-center text-xs font-medium text-muted-foreground py-4 px-4">Attendance</th>
                <th className="text-center text-xs font-medium text-muted-foreground py-4 px-4">Status</th>
                <th className="text-center text-xs font-medium text-muted-foreground py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrgs.map((org, index) => (
                <tr 
                  key={org.id} 
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <Link to={`/organizations/${org.id}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{org.code}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{org.name}</p>
                        <p className="text-xs text-muted-foreground">Created {org.createdAt}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="text-sm font-medium text-foreground">{org.programsCount}</span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="text-sm font-medium text-foreground">{org.batchesCount}</span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="text-sm font-medium text-foreground">{org.sectionsCount}</span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="text-sm font-medium text-foreground">{org.studentsCount.toLocaleString()}</span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className={cn(
                      "text-sm font-semibold",
                      org.avgScore >= 80 ? "text-success" : org.avgScore >= 60 ? "text-warning" : "text-destructive"
                    )}>{org.avgScore}%</span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full gradient-success rounded-full"
                          style={{ width: `${org.completion}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{org.completion}%</span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className={cn(
                      "text-sm font-semibold",
                      org.attendance >= 85 ? "text-success" : org.attendance >= 70 ? "text-warning" : "text-destructive"
                    )}>{org.attendance}%</span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <Badge className={cn(
                      "text-xs",
                      org.status === 'active' ? "badge-success" : "badge-muted"
                    )}>
                      {org.status}
                    </Badge>
                  </td>
                  <td className="text-center py-4 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/organizations/${org.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Archive className="w-4 h-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
