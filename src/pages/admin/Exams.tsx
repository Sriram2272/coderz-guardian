import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Eye, Check, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { exams, getExamsByStatus } from '@/data/seedData';
import { cn } from '@/lib/utils';

export default function ExamsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const pendingExams = getExamsByStatus('PendingApproval');
  const approvedExams = getExamsByStatus('Approved');
  const rejectedExams = getExamsByStatus('Rejected');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PendingApproval': return <Badge className="badge-warning">Pending Approval</Badge>;
      case 'Approved': return <Badge className="badge-success">Approved</Badge>;
      case 'Rejected': return <Badge className="badge-destructive">Rejected</Badge>;
      case 'Published': return <Badge className="badge-info">Published</Badge>;
      case 'Completed': return <Badge className="badge-muted">Completed</Badge>;
      default: return <Badge className="badge-muted">{status}</Badge>;
    }
  };

  const ExamCard = ({ exam }: { exam: typeof exams[0] }) => (
    <div className="card-elevated p-6 hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">{exam.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">by {exam.teacherName}</p>
        </div>
        {getStatusBadge(exam.status)}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="text-xs">{exam.type}</Badge>
        {exam.sectionNames.map(s => (
          <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
        <div>
          <p className="text-muted-foreground">Duration</p>
          <p className="font-medium text-foreground">{exam.duration} min</p>
        </div>
        <div>
          <p className="text-muted-foreground">Total Marks</p>
          <p className="font-medium text-foreground">{exam.totalMarks}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Questions</p>
          <p className="font-medium text-foreground">{exam.questionsCount}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>Scheduled: {new Date(exam.schedule).toLocaleDateString()}</span>
        </div>
        <div className="flex gap-2">
          {exam.status === 'PendingApproval' && (
            <>
              <Button size="sm" variant="outline" className="text-destructive border-destructive/30">
                <X className="w-3 h-3 mr-1" /> Reject
              </Button>
              <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                <Check className="w-3 h-3 mr-1" /> Approve
              </Button>
            </>
          )}
          <Button size="sm" variant="outline">
            <Eye className="w-3 h-3 mr-1" /> Review
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="animate-fade-up opacity-0">
        <h1 className="text-2xl font-display font-bold text-foreground">Exam Approval Center</h1>
        <p className="text-muted-foreground">Review and approve exams submitted by teachers</p>
      </div>

      <div className="relative max-w-md animate-fade-up opacity-0 stagger-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search exams..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <Tabs defaultValue="pending" className="animate-fade-up opacity-0 stagger-2">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="pending" className="gap-2">Pending Approval <Badge className="bg-warning/20 text-warning">{pendingExams.length}</Badge></TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pendingExams.map(exam => <ExamCard key={exam.id} exam={exam} />)}
          </div>
        </TabsContent>
        <TabsContent value="approved" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {approvedExams.map(exam => <ExamCard key={exam.id} exam={exam} />)}
          </div>
        </TabsContent>
        <TabsContent value="rejected" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {rejectedExams.map(exam => <ExamCard key={exam.id} exam={exam} />)}
          </div>
        </TabsContent>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {exams.map(exam => <ExamCard key={exam.id} exam={exam} />)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
