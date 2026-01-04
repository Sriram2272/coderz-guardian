import { useState } from 'react';
import { Search, Filter, Download, Plus, MoreHorizontal, FileText, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

const mockAssignments = [
  { id: 1, name: 'Machine Learning Basics', course: 'GenAI', dueDate: 'Jan 15, 2026', submissions: 342, total: 400, status: 'Active', createdBy: 'Prof. Sharma' },
  { id: 2, name: 'Data Visualization Project', course: 'Data Science', dueDate: 'Jan 18, 2026', submissions: 289, total: 350, status: 'Active', createdBy: 'Dr. Menon' },
  { id: 3, name: 'Cloud Architecture Design', course: 'Cloud Computing', dueDate: 'Jan 10, 2026', submissions: 425, total: 425, status: 'Completed', createdBy: 'Prof. Nair' },
  { id: 4, name: 'Neural Networks Implementation', course: 'GenAI', dueDate: 'Jan 20, 2026', submissions: 156, total: 400, status: 'Active', createdBy: 'Prof. Sharma' },
  { id: 5, name: 'SQL Query Optimization', course: 'Data Science', dueDate: 'Jan 08, 2026', submissions: 350, total: 350, status: 'Completed', createdBy: 'Dr. Kapoor' },
  { id: 6, name: 'Kubernetes Deployment', course: 'Cloud Computing', dueDate: 'Jan 25, 2026', submissions: 0, total: 380, status: 'Draft', createdBy: 'Prof. Nair' },
  { id: 7, name: 'NLP Text Classification', course: 'GenAI', dueDate: 'Jan 22, 2026', submissions: 89, total: 400, status: 'Active', createdBy: 'Dr. Iyer' },
  { id: 8, name: 'Big Data Pipeline', course: 'Data Science', dueDate: 'Jan 05, 2026', submissions: 320, total: 350, status: 'Overdue', createdBy: 'Dr. Menon' },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-primary/10 text-primary border-0 hover:bg-primary/20';
    case 'Completed':
      return 'bg-success/10 text-success border-0 hover:bg-success/20';
    case 'Draft':
      return 'bg-muted text-muted-foreground border-0';
    case 'Overdue':
      return 'bg-destructive/10 text-destructive border-0 hover:bg-destructive/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getAssignmentColor = (course: string) => {
  const colors: Record<string, string> = {
    'GenAI': 'bg-chart-1',
    'Data Science': 'bg-chart-2',
    'Cloud Computing': 'bg-chart-3',
  };
  return colors[course] || 'bg-primary';
};

export default function Assignments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAssignments = mockAssignments.filter(assignment => {
    const matchesSearch = assignment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = courseFilter === 'all' || assignment.course === courseFilter;
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filters Row */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[280px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-[150px] bg-card border-border">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="GenAI">GenAI</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
              <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px] bg-card border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button className="gap-2 gradient-primary text-primary-foreground">
            <Plus className="w-4 h-4" />
            Create Assignment
          </Button>
        </div>
      </div>

      {/* Assignments Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="text-muted-foreground font-medium">ASSIGNMENT</TableHead>
              <TableHead className="text-muted-foreground font-medium">COURSE</TableHead>
              <TableHead className="text-muted-foreground font-medium">DUE DATE</TableHead>
              <TableHead className="text-muted-foreground font-medium">SUBMISSIONS</TableHead>
              <TableHead className="text-muted-foreground font-medium">STATUS</TableHead>
              <TableHead className="text-muted-foreground font-medium">CREATED BY</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssignments.map((assignment) => {
              const submissionPercentage = Math.round((assignment.submissions / assignment.total) * 100);
              return (
                <TableRow key={assignment.id} className="border-border hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${getAssignmentColor(assignment.course)} flex items-center justify-center`}>
                        <FileText className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{assignment.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{assignment.course}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-foreground">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {assignment.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 min-w-[120px]">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground font-medium">{assignment.submissions}/{assignment.total}</span>
                        <span className="text-muted-foreground">{submissionPercentage}%</span>
                      </div>
                      <Progress value={submissionPercentage} className="h-1.5" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeVariant(assignment.status)}>
                      {assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{assignment.createdBy}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Assignment</DropdownMenuItem>
                        <DropdownMenuItem>View Submissions</DropdownMenuItem>
                        <DropdownMenuItem>Download Report</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">1-{filteredAssignments.length}</span> of{' '}
            <span className="font-medium text-foreground">156</span> assignments
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
