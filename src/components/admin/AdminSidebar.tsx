import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  GraduationCap, 
  Users, 
  BookOpen, 
  ClipboardCheck, 
  FileText, 
  BarChart3, 
  GitCompare, 
  Bell, 
  Settings, 
  FileSearch,
  ChevronLeft,
  LogOut,
  User,
  Layers,
  UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Building2, label: 'Organizations', path: '/organizations' },
  { icon: GraduationCap, label: 'Programs', path: '/programs' },
  { icon: Users, label: 'Students', path: '/students' },
  { icon: UserCheck, label: 'Teachers', path: '/teachers' },
  { icon: ClipboardCheck, label: 'Exams', path: '/exams' },
  { icon: FileText, label: 'Assignments', path: '/assignments' },
  { icon: BarChart3, label: 'Analytics & Reports', path: '/analytics' },
  { icon: GitCompare, label: 'Compare', path: '/compare' },
  { icon: FileSearch, label: 'Audit Logs', path: '/audit-logs' },
];

export function AdminSidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">Z</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sidebar-foreground font-display font-bold text-lg">codersZ</span>
              <span className="text-sidebar-foreground/60 text-xs">Admin Console</span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "w-7 h-7 rounded-lg bg-sidebar-accent flex items-center justify-center transition-transform hover:bg-sidebar-accent/80",
            isCollapsed && "rotate-180"
          )}
        >
          <ChevronLeft className="w-4 h-4 text-sidebar-foreground" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "sidebar-nav-item",
                  isActive && "active",
                  isCollapsed && "justify-center px-2"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/70")} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Profile */}
      <div className="p-3 border-t border-sidebar-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={cn(
              "w-full flex items-center gap-3 p-2 rounded-xl hover:bg-sidebar-accent transition-colors",
              isCollapsed && "justify-center"
            )}>
              <div className="w-9 h-9 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
                <span className="text-sidebar-primary font-semibold text-sm">AU</span>
              </div>
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-sidebar-foreground">Admin User</p>
                  <p className="text-xs text-sidebar-foreground/60">Super Admin</p>
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
