import { useState } from 'react';
import { Search, Filter, Download, UserPlus, MoreHorizontal } from 'lucide-react';
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

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@email.com', role: 'Student', status: 'Active', joinDate: 'Dec 15, 2025', lastActive: '2 hours ago' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', role: 'Instructor', status: 'Active', joinDate: 'Nov 20, 2025', lastActive: '30 min ago' },
  { id: 3, name: 'Mike Johnson', email: 'mike.j@email.com', role: 'Student', status: 'Suspended', joinDate: 'Oct 5, 2025', lastActive: '1 week ago' },
  { id: 4, name: 'Sarah Williams', email: 'sarah.w@email.com', role: 'Admin', status: 'Active', joinDate: 'Sep 12, 2025', lastActive: 'Just now' },
  { id: 5, name: 'Tom Brown', email: 'tom.brown@email.com', role: 'Student', status: 'Inactive', joinDate: 'Aug 28, 2025', lastActive: '1 month ago' },
  { id: 6, name: 'Emily Davis', email: 'emily.d@email.com', role: 'Instructor', status: 'Active', joinDate: 'Jul 19, 2025', lastActive: '5 hours ago' },
  { id: 7, name: 'Chris Wilson', email: 'chris.w@email.com', role: 'Student', status: 'Active', joinDate: 'Jun 30, 2025', lastActive: '1 day ago' },
  { id: 8, name: 'Anna Martinez', email: 'anna.m@email.com', role: 'Student', status: 'Active', joinDate: 'May 15, 2025', lastActive: '3 hours ago' },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-success/10 text-success border-0 hover:bg-success/20';
    case 'Suspended':
      return 'bg-warning/10 text-warning border-0 hover:bg-warning/20';
    case 'Inactive':
      return 'bg-destructive/10 text-destructive border-0 hover:bg-destructive/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getInitialColor = (name: string) => {
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

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filters Row */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[280px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[120px] bg-card border-border">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Instructor">Instructor</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px] bg-card border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button className="gap-2 gradient-primary text-primary-foreground">
            <UserPlus className="w-4 h-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="text-muted-foreground font-medium">USER</TableHead>
              <TableHead className="text-muted-foreground font-medium">ROLE</TableHead>
              <TableHead className="text-muted-foreground font-medium">STATUS</TableHead>
              <TableHead className="text-muted-foreground font-medium">JOIN DATE</TableHead>
              <TableHead className="text-muted-foreground font-medium">LAST ACTIVE</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="border-border hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${getInitialColor(user.name)} flex items-center justify-center`}>
                      <span className="text-primary-foreground font-semibold text-sm">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-foreground">{user.role}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeVariant(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-foreground">{user.joinDate}</TableCell>
                <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem>Reset Password</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Suspend User</DropdownMenuItem>
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
            Showing <span className="font-medium text-foreground">1-{filteredUsers.length}</span> of{' '}
            <span className="font-medium text-foreground">12,847</span> users
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
