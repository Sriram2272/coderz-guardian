import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Download, Plus, MoreHorizontal, GraduationCap } from 'lucide-react';
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
import { programs, universities, batches, sections } from '@/data/seedData';

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-success/10 text-success border-0 hover:bg-success/20';
    case 'inactive':
      return 'bg-destructive/10 text-destructive border-0 hover:bg-destructive/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getProgramColor = (name: string) => {
  const colors = [
    'bg-primary',
    'bg-chart-1',
    'bg-chart-2',
    'bg-chart-3',
    'bg-chart-4',
    'bg-chart-5',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export default function Programs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [universityFilter, setUniversityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Get unique program names with aggregated data
  const uniquePrograms = programs.reduce((acc, program) => {
    const existing = acc.find(p => p.name === program.name);
    if (existing) {
      existing.universities.push(program.universityId);
      existing.totalStudents += program.studentsCount;
      existing.totalBatches += program.batchesCount;
    } else {
      acc.push({
        id: program.key,
        name: program.name,
        key: program.key,
        description: program.description,
        status: program.status,
        universities: [program.universityId],
        totalStudents: program.studentsCount,
        totalBatches: program.batchesCount,
        avgScore: program.avgScore,
        lastUpdated: program.lastUpdated,
      });
    }
    return acc;
  }, [] as {
    id: string;
    name: string;
    key: string;
    description: string;
    status: string;
    universities: string[];
    totalStudents: number;
    totalBatches: number;
    avgScore: number;
    lastUpdated: string;
  }[]);

  // Calculate sections count per program
  const programsWithSections = uniquePrograms.map(program => {
    const programSections = sections.filter(s => s.programKey === program.key);
    return {
      ...program,
      sectionsCount: programSections.length,
    };
  });

  const filteredPrograms = programsWithSections.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUniversity = universityFilter === 'all' || program.universities.includes(universityFilter);
    const matchesStatus = statusFilter === 'all' || program.status === statusFilter;
    return matchesSearch && matchesUniversity && matchesStatus;
  });

  const getUniversityNames = (universityIds: string[]) => {
    return universityIds.map(id => universities.find(u => u.id === id)?.code || id).join(', ');
  };

  return (
    <div className="space-y-6">
      {/* Filters Row */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[280px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={universityFilter} onValueChange={setUniversityFilter}>
            <SelectTrigger className="w-[140px] bg-card border-border">
              <SelectValue placeholder="University" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Universities</SelectItem>
              {universities.map(uni => (
                <SelectItem key={uni.id} value={uni.id}>{uni.code}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px] bg-card border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
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
            Add Program
          </Button>
        </div>
      </div>

      {/* Programs Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="text-muted-foreground font-medium">PROGRAM</TableHead>
              <TableHead className="text-muted-foreground font-medium">UNIVERSITIES</TableHead>
              <TableHead className="text-muted-foreground font-medium">STUDENTS</TableHead>
              <TableHead className="text-muted-foreground font-medium">BATCHES</TableHead>
              <TableHead className="text-muted-foreground font-medium">SECTIONS</TableHead>
              <TableHead className="text-muted-foreground font-medium">STATUS</TableHead>
              <TableHead className="text-muted-foreground font-medium">AVG SCORE</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrograms.map((program) => (
              <TableRow key={program.id} className="border-border hover:bg-muted/50">
                <TableCell>
                  <Link to={`/programs/${program.key}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className={`w-10 h-10 rounded-lg ${getProgramColor(program.name)} flex items-center justify-center`}>
                      <GraduationCap className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{program.name}</p>
                      <p className="text-sm text-muted-foreground">{program.description}</p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {program.universities.map(uniId => (
                      <Badge key={uniId} variant="secondary" className="text-xs">
                        {universities.find(u => u.id === uniId)?.code || uniId}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-foreground font-medium">{program.totalStudents.toLocaleString()}</TableCell>
                <TableCell className="text-foreground">{program.totalBatches}</TableCell>
                <TableCell className="text-foreground">{program.sectionsCount}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeVariant(program.status)}>
                    {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-success font-medium">{program.avgScore}%</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/programs/${program.key}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Program</DropdownMenuItem>
                      <DropdownMenuItem>Manage Batches</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">1-{filteredPrograms.length}</span> of{' '}
            <span className="font-medium text-foreground">{filteredPrograms.length}</span> programs
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
