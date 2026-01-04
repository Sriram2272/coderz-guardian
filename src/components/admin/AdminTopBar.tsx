import { useState, useRef, useEffect } from 'react';
import { Search, Moon, HelpCircle, Bell, X, ExternalLink, Keyboard, Bug } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  notifications as allNotifications, 
  organizations, 
  programs, 
  sections, 
  students, 
  teachers,
  getUnreadNotifications
} from '@/data/seedData';
import { Link } from 'react-router-dom';
import { Building2, GraduationCap, BookOpen, Users, UserCheck, ClipboardCheck } from 'lucide-react';

interface SearchResult {
  type: 'organization' | 'program' | 'section' | 'student' | 'teacher' | 'exam';
  id: string;
  name: string;
  meta: string;
  path: string;
}

export function AdminTopBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = getUnreadNotifications();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      setShowSearch(false);
      return;
    }

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search organizations
    organizations.filter(o => o.name.toLowerCase().includes(lowerQuery) || o.code.toLowerCase().includes(lowerQuery))
      .forEach(o => results.push({
        type: 'organization',
        id: o.id,
        name: o.name,
        meta: `${o.studentsCount} students • ${o.programsCount} programs`,
        path: `/organizations/${o.id}`
      }));

    // Search programs
    programs.filter(p => p.name.toLowerCase().includes(lowerQuery))
      .forEach(p => results.push({
        type: 'program',
        id: p.id,
        name: p.name,
        meta: `${p.studentsCount} students • ${p.batchesCount} batches`,
        path: `/programs/${p.id}`
      }));

    // Search sections
    sections.filter(s => s.code.toLowerCase().includes(lowerQuery) || s.displayName.toLowerCase().includes(lowerQuery))
      .forEach(s => results.push({
        type: 'section',
        id: s.id,
        name: s.code,
        meta: `${s.studentsCount} students • Batch ${s.batchId}`,
        path: `/sections/${s.id}`
      }));

    // Search students
    students.filter(s => s.name.toLowerCase().includes(lowerQuery) || s.rollNo.toLowerCase().includes(lowerQuery))
      .forEach(s => results.push({
        type: 'student',
        id: s.id,
        name: s.name,
        meta: `${s.rollNo} • Section ${s.sectionId}`,
        path: `/students/${s.id}`
      }));

    // Search teachers
    teachers.filter(t => t.name.toLowerCase().includes(lowerQuery))
      .forEach(t => results.push({
        type: 'teacher',
        id: t.id,
        name: t.name,
        meta: `${t.sections.length} sections • ${t.studentsCount} students`,
        path: `/teachers/${t.id}`
      }));

    setSearchResults(results.slice(0, 10));
    setShowSearch(true);
  };

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'organization': return Building2;
      case 'program': return GraduationCap;
      case 'section': return BookOpen;
      case 'student': return Users;
      case 'teacher': return UserCheck;
      case 'exam': return ClipboardCheck;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'exam_approval': return ClipboardCheck;
      case 'student_alert': return Users;
      case 'organization_created': return Building2;
      case 'teacher_created': return UserCheck;
      default: return Bell;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Search */}
      <div ref={searchRef} className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search universities, programs, batches, sections, students…"
          className="pl-10 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => searchQuery.length >= 2 && setShowSearch(true)}
        />
        
        {/* Search Results Dropdown */}
        {showSearch && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl border border-border shadow-elevated overflow-hidden z-50">
            {searchResults.map((result) => {
              const Icon = getTypeIcon(result.type);
              return (
                <Link
                  key={`${result.type}-${result.id}`}
                  to={result.path}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery('');
                  }}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{result.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{result.meta}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs capitalize">{result.type}</Badge>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Right side icons */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" className="rounded-full">
          <Moon className="w-5 h-5 text-muted-foreground" />
        </Button>

        {/* Help */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <ExternalLink className="w-4 h-4 mr-2" />
              Help Center
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bug className="w-4 h-4 mr-2" />
              Report a bug
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Keyboard className="w-4 h-4 mr-2" />
              Keyboard shortcuts
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            {unreadNotifications.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-medium rounded-full flex items-center justify-center">
                {unreadNotifications.length}
              </span>
            )}
          </Button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 w-96 bg-card rounded-xl border border-border shadow-elevated overflow-hidden z-50">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  {unreadNotifications.length > 0 && (
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      {unreadNotifications.length} new
                    </Badge>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-7 h-7"
                  onClick={() => setShowNotifications(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Notification Items */}
              <div className="max-h-96 overflow-y-auto">
                {allNotifications.slice(0, 5).map((notif) => {
                  const Icon = getNotificationIcon(notif.type);
                  return (
                    <div 
                      key={notif.id} 
                      className={cn(
                        "flex items-start gap-3 px-4 py-3 hover:bg-secondary transition-colors cursor-pointer",
                        !notif.isRead && "bg-primary/5"
                      )}
                    >
                      <div className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                        notif.type === 'exam_approval' && "bg-warning/10",
                        notif.type === 'student_alert' && "bg-destructive/10",
                        notif.type === 'organization_created' && "bg-success/10",
                        notif.type === 'system' && "bg-info/10"
                      )}>
                        <Icon className={cn(
                          "w-4 h-4",
                          notif.type === 'exam_approval' && "text-warning",
                          notif.type === 'student_alert' && "text-destructive",
                          notif.type === 'organization_created' && "text-success",
                          notif.type === 'system' && "text-info"
                        )} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{notif.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{notif.message}</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">{formatTime(notif.createdAt)}</p>
                      </div>
                      {!notif.isRead && (
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="border-t border-border">
                <Link 
                  to="/notifications" 
                  className="block px-4 py-3 text-sm text-primary font-medium text-center hover:bg-secondary transition-colors"
                  onClick={() => setShowNotifications(false)}
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
