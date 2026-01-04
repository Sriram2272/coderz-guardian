// Seed data for Admin Console

export interface Organization {
  id: string;
  name: string;
  code: string;
  logo?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  programsCount: number;
  batchesCount: number;
  sectionsCount: number;
  studentsCount: number;
  teachersCount: number;
  avgScore: number;
  completion: number;
  attendance: number;
}

export interface Program {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  batchesCount: number;
  studentsCount: number;
  avgScore: number;
  completion: number;
  attendance: number;
  lastUpdated: string;
}

export interface Batch {
  id: string;
  organizationId: string;
  programId: string;
  name: string;
  startYear: number;
  endYear: number;
  status: 'active' | 'inactive' | 'completed';
  sectionsCount: number;
  studentsCount: number;
  avgScore: number;
  completion: number;
  attendance: number;
}

export interface Section {
  id: string;
  organizationId: string;
  programId: string;
  batchId: string;
  code: string;
  displayName: string;
  status: 'active' | 'inactive';
  studentsCount: number;
  assignedTeacherIds: string[];
  avgScore: number;
  completion: number;
  attendance: number;
}

export interface Student {
  id: string;
  organizationId: string;
  programId: string;
  batchId: string;
  sectionId: string;
  name: string;
  email: string;
  rollNo: string;
  avatar?: string;
  status: 'active' | 'inactive';
  joinedAt: string;
  avgScore: number;
  completion: number;
  attendance: number;
  examAvg: number;
  assignmentCompletion: number;
  timeSpent: number;
  lastActivity: string;
}

export interface Teacher {
  id: string;
  organizationId: string;
  programs: string[];
  sections: string[];
  name: string;
  email: string;
  avatar?: string;
  status: 'active' | 'inactive';
  joinedAt: string;
  avgRating: number;
  feedbackCount: number;
  responseRate: number;
  studentsCount: number;
}

export interface Exam {
  id: string;
  createdByTeacherId: string;
  teacherName: string;
  organizationId: string;
  programId: string;
  batchId: string;
  sectionIds: string[];
  sectionNames: string[];
  type: 'MCQ' | 'Coding' | 'Mixed';
  title: string;
  schedule: string;
  duration: number;
  totalMarks: number;
  status: 'Draft' | 'PendingApproval' | 'Approved' | 'Rejected' | 'Published' | 'Completed';
  submittedAt?: string;
  approvedByAdminId?: string;
  approvalNotes?: string;
  questionsCount: number;
}

export interface Notification {
  id: string;
  type: 'exam_approval' | 'teacher_created' | 'organization_created' | 'student_alert' | 'system';
  title: string;
  message: string;
  entityType?: string;
  entityId?: string;
  createdAt: string;
  isRead: boolean;
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: string;
  details: string;
}

// Organizations
export const organizations: Organization[] = [
  {
    id: 'org-1',
    name: 'XYZ University',
    code: 'XYZ',
    status: 'active',
    createdAt: '2024-01-15',
    programsCount: 3,
    batchesCount: 6,
    sectionsCount: 18,
    studentsCount: 1450,
    teachersCount: 45,
    avgScore: 78,
    completion: 72,
    attendance: 85,
  },
  {
    id: 'org-2',
    name: 'ABC Institute of Technology',
    code: 'AIT',
    status: 'active',
    createdAt: '2024-02-20',
    programsCount: 2,
    batchesCount: 4,
    sectionsCount: 12,
    studentsCount: 890,
    teachersCount: 28,
    avgScore: 82,
    completion: 78,
    attendance: 88,
  },
  {
    id: 'org-3',
    name: 'Global Tech Academy',
    code: 'GTA',
    status: 'active',
    createdAt: '2024-03-10',
    programsCount: 2,
    batchesCount: 3,
    sectionsCount: 9,
    studentsCount: 620,
    teachersCount: 19,
    avgScore: 75,
    completion: 68,
    attendance: 82,
  },
];

// Programs
export const programs: Program[] = [
  {
    id: 'prog-1',
    organizationId: 'org-1',
    name: 'GenAI',
    description: 'Generative AI and Machine Learning Program',
    status: 'active',
    batchesCount: 2,
    studentsCount: 520,
    avgScore: 79,
    completion: 74,
    attendance: 86,
    lastUpdated: '2024-12-28',
  },
  {
    id: 'prog-2',
    organizationId: 'org-1',
    name: 'Data Science',
    description: 'Advanced Data Science and Analytics',
    status: 'active',
    batchesCount: 2,
    studentsCount: 480,
    avgScore: 77,
    completion: 71,
    attendance: 84,
    lastUpdated: '2024-12-27',
  },
  {
    id: 'prog-3',
    organizationId: 'org-1',
    name: 'PEP',
    description: 'Professional Enhancement Program',
    status: 'active',
    batchesCount: 2,
    studentsCount: 450,
    avgScore: 78,
    completion: 70,
    attendance: 85,
    lastUpdated: '2024-12-26',
  },
  {
    id: 'prog-4',
    organizationId: 'org-2',
    name: 'GenAI',
    description: 'Generative AI and Machine Learning Program',
    status: 'active',
    batchesCount: 2,
    studentsCount: 445,
    avgScore: 83,
    completion: 79,
    attendance: 89,
    lastUpdated: '2024-12-28',
  },
  {
    id: 'prog-5',
    organizationId: 'org-2',
    name: 'Data Science',
    description: 'Advanced Data Science and Analytics',
    status: 'active',
    batchesCount: 2,
    studentsCount: 445,
    avgScore: 81,
    completion: 77,
    attendance: 87,
    lastUpdated: '2024-12-27',
  },
];

// Batches
export const batches: Batch[] = [
  {
    id: 'batch-1',
    organizationId: 'org-1',
    programId: 'prog-1',
    name: '2024-2028',
    startYear: 2024,
    endYear: 2028,
    status: 'active',
    sectionsCount: 3,
    studentsCount: 280,
    avgScore: 80,
    completion: 76,
    attendance: 87,
  },
  {
    id: 'batch-2',
    organizationId: 'org-1',
    programId: 'prog-1',
    name: '2025-2029',
    startYear: 2025,
    endYear: 2029,
    status: 'active',
    sectionsCount: 3,
    studentsCount: 240,
    avgScore: 78,
    completion: 72,
    attendance: 85,
  },
  {
    id: 'batch-3',
    organizationId: 'org-1',
    programId: 'prog-2',
    name: '2024-2028',
    startYear: 2024,
    endYear: 2028,
    status: 'active',
    sectionsCount: 3,
    studentsCount: 250,
    avgScore: 77,
    completion: 73,
    attendance: 84,
  },
];

// Sections
export const sections: Section[] = [
  {
    id: 'sec-1',
    organizationId: 'org-1',
    programId: 'prog-1',
    batchId: 'batch-1',
    code: 'K24BX',
    displayName: 'Section K24BX',
    status: 'active',
    studentsCount: 95,
    assignedTeacherIds: ['teacher-1'],
    avgScore: 82,
    completion: 78,
    attendance: 89,
  },
  {
    id: 'sec-2',
    organizationId: 'org-1',
    programId: 'prog-1',
    batchId: 'batch-1',
    code: 'P24KX',
    displayName: 'Section P24KX',
    status: 'active',
    studentsCount: 92,
    assignedTeacherIds: ['teacher-2'],
    avgScore: 79,
    completion: 75,
    attendance: 86,
  },
  {
    id: 'sec-3',
    organizationId: 'org-1',
    programId: 'prog-1',
    batchId: 'batch-1',
    code: 'G24KX',
    displayName: 'Section G24KX',
    status: 'active',
    studentsCount: 93,
    assignedTeacherIds: ['teacher-3'],
    avgScore: 80,
    completion: 74,
    attendance: 85,
  },
  {
    id: 'sec-4',
    organizationId: 'org-1',
    programId: 'prog-1',
    batchId: 'batch-2',
    code: 'K25BX',
    displayName: 'Section K25BX',
    status: 'active',
    studentsCount: 80,
    assignedTeacherIds: ['teacher-1'],
    avgScore: 78,
    completion: 72,
    attendance: 85,
  },
];

// Students
export const students: Student[] = [
  {
    id: 'student-1',
    organizationId: 'org-1',
    programId: 'prog-1',
    batchId: 'batch-1',
    sectionId: 'sec-1',
    name: 'Arjun Patel',
    email: 'arjun.patel@xyz.edu',
    rollNo: 'K24BX001',
    status: 'active',
    joinedAt: '2024-08-15',
    avgScore: 92,
    completion: 95,
    attendance: 98,
    examAvg: 94,
    assignmentCompletion: 100,
    timeSpent: 145,
    lastActivity: '2024-12-28',
  },
  {
    id: 'student-2',
    organizationId: 'org-1',
    programId: 'prog-1',
    batchId: 'batch-1',
    sectionId: 'sec-1',
    name: 'Priya Sharma',
    email: 'priya.sharma@xyz.edu',
    rollNo: 'K24BX002',
    status: 'active',
    joinedAt: '2024-08-15',
    avgScore: 89,
    completion: 92,
    attendance: 96,
    examAvg: 91,
    assignmentCompletion: 95,
    timeSpent: 132,
    lastActivity: '2024-12-28',
  },
  {
    id: 'student-3',
    organizationId: 'org-1',
    programId: 'prog-1',
    batchId: 'batch-1',
    sectionId: 'sec-1',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@xyz.edu',
    rollNo: 'K24BX003',
    status: 'active',
    joinedAt: '2024-08-15',
    avgScore: 86,
    completion: 88,
    attendance: 94,
    examAvg: 88,
    assignmentCompletion: 90,
    timeSpent: 118,
    lastActivity: '2024-12-27',
  },
  {
    id: 'student-4',
    organizationId: 'org-1',
    programId: 'prog-1',
    batchId: 'batch-1',
    sectionId: 'sec-1',
    name: 'Neha Gupta',
    email: 'neha.gupta@xyz.edu',
    rollNo: 'K24BX004',
    status: 'active',
    joinedAt: '2024-08-15',
    avgScore: 58,
    completion: 45,
    attendance: 62,
    examAvg: 55,
    assignmentCompletion: 40,
    timeSpent: 42,
    lastActivity: '2024-12-20',
  },
  {
    id: 'student-5',
    organizationId: 'org-1',
    programId: 'prog-1',
    batchId: 'batch-1',
    sectionId: 'sec-1',
    name: 'Amit Singh',
    email: 'amit.singh@xyz.edu',
    rollNo: 'K24BX005',
    status: 'active',
    joinedAt: '2024-08-15',
    avgScore: 52,
    completion: 38,
    attendance: 55,
    examAvg: 48,
    assignmentCompletion: 35,
    timeSpent: 28,
    lastActivity: '2024-12-18',
  },
];

// Teachers
export const teachers: Teacher[] = [
  {
    id: 'teacher-1',
    organizationId: 'org-1',
    programs: ['prog-1', 'prog-2'],
    sections: ['sec-1', 'sec-4'],
    name: 'Prof. Ananya Sharma',
    email: 'ananya.sharma@xyz.edu',
    status: 'active',
    joinedAt: '2023-06-15',
    avgRating: 4.6,
    feedbackCount: 156,
    responseRate: 92,
    studentsCount: 175,
  },
  {
    id: 'teacher-2',
    organizationId: 'org-1',
    programs: ['prog-1'],
    sections: ['sec-2'],
    name: 'Dr. Rajesh Menon',
    email: 'rajesh.menon@xyz.edu',
    status: 'active',
    joinedAt: '2023-08-20',
    avgRating: 4.4,
    feedbackCount: 98,
    responseRate: 88,
    studentsCount: 92,
  },
  {
    id: 'teacher-3',
    organizationId: 'org-1',
    programs: ['prog-1', 'prog-3'],
    sections: ['sec-3'],
    name: 'Prof. Kavita Iyer',
    email: 'kavita.iyer@xyz.edu',
    status: 'active',
    joinedAt: '2023-05-10',
    avgRating: 4.8,
    feedbackCount: 203,
    responseRate: 95,
    studentsCount: 93,
  },
  {
    id: 'teacher-4',
    organizationId: 'org-2',
    programs: ['prog-4'],
    sections: [],
    name: 'Dr. Suresh Nair',
    email: 'suresh.nair@ait.edu',
    status: 'active',
    joinedAt: '2024-01-10',
    avgRating: 4.2,
    feedbackCount: 45,
    responseRate: 85,
    studentsCount: 120,
  },
];

// Exams
export const exams: Exam[] = [
  {
    id: 'exam-1',
    createdByTeacherId: 'teacher-1',
    teacherName: 'Prof. Ananya Sharma',
    organizationId: 'org-1',
    programId: 'prog-1',
    batchId: 'batch-1',
    sectionIds: ['sec-1', 'sec-4'],
    sectionNames: ['K24BX', 'K25BX'],
    type: 'MCQ',
    title: 'Introduction to Neural Networks',
    schedule: '2025-01-15T10:00:00',
    duration: 90,
    totalMarks: 100,
    status: 'PendingApproval',
    submittedAt: '2024-12-28T14:30:00',
    questionsCount: 50,
  },
  {
    id: 'exam-2',
    createdByTeacherId: 'teacher-2',
    teacherName: 'Dr. Rajesh Menon',
    organizationId: 'org-1',
    programId: 'prog-1',
    batchId: 'batch-1',
    sectionIds: ['sec-2'],
    sectionNames: ['P24KX'],
    type: 'Coding',
    title: 'Python Data Structures Assessment',
    schedule: '2025-01-18T14:00:00',
    duration: 120,
    totalMarks: 150,
    status: 'PendingApproval',
    submittedAt: '2024-12-27T16:45:00',
    questionsCount: 8,
  },
  {
    id: 'exam-3',
    createdByTeacherId: 'teacher-3',
    teacherName: 'Prof. Kavita Iyer',
    organizationId: 'org-1',
    programId: 'prog-1',
    batchId: 'batch-1',
    sectionIds: ['sec-3'],
    sectionNames: ['G24KX'],
    type: 'Mixed',
    title: 'Machine Learning Fundamentals',
    schedule: '2025-01-20T09:00:00',
    duration: 180,
    totalMarks: 200,
    status: 'Approved',
    submittedAt: '2024-12-25T11:00:00',
    approvedByAdminId: 'admin-1',
    approvalNotes: 'Well-structured exam with good variety of questions.',
    questionsCount: 35,
  },
  {
    id: 'exam-4',
    createdByTeacherId: 'teacher-1',
    teacherName: 'Prof. Ananya Sharma',
    organizationId: 'org-1',
    programId: 'prog-1',
    batchId: 'batch-1',
    sectionIds: ['sec-1'],
    sectionNames: ['K24BX'],
    type: 'MCQ',
    title: 'Deep Learning Basics Quiz',
    schedule: '2024-12-20T10:00:00',
    duration: 60,
    totalMarks: 50,
    status: 'Completed',
    submittedAt: '2024-12-15T09:00:00',
    approvedByAdminId: 'admin-1',
    questionsCount: 25,
  },
  {
    id: 'exam-5',
    createdByTeacherId: 'teacher-2',
    teacherName: 'Dr. Rajesh Menon',
    organizationId: 'org-1',
    programId: 'prog-1',
    batchId: 'batch-1',
    sectionIds: ['sec-2'],
    sectionNames: ['P24KX'],
    type: 'Coding',
    title: 'Algorithm Design Challenge',
    schedule: '2025-01-25T14:00:00',
    duration: 150,
    totalMarks: 200,
    status: 'Rejected',
    submittedAt: '2024-12-26T10:30:00',
    approvalNotes: 'Please add more test cases for problem 3 and clarify constraints for problem 5.',
    questionsCount: 5,
  },
];

// Notifications
export const notifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'exam_approval',
    title: 'Exam Pending Approval',
    message: 'Prof. Ananya Sharma submitted "Introduction to Neural Networks" for approval',
    entityType: 'exam',
    entityId: 'exam-1',
    createdAt: '2024-12-28T14:35:00',
    isRead: false,
  },
  {
    id: 'notif-2',
    type: 'exam_approval',
    title: 'Exam Pending Approval',
    message: 'Dr. Rajesh Menon submitted "Python Data Structures Assessment" for approval',
    entityType: 'exam',
    entityId: 'exam-2',
    createdAt: '2024-12-27T16:50:00',
    isRead: false,
  },
  {
    id: 'notif-3',
    type: 'student_alert',
    title: 'At-Risk Student Alert',
    message: 'Amit Singh (K24BX005) has low attendance (55%) and needs intervention',
    entityType: 'student',
    entityId: 'student-5',
    createdAt: '2024-12-27T09:00:00',
    isRead: false,
  },
  {
    id: 'notif-4',
    type: 'organization_created',
    title: 'New Organization Added',
    message: 'Global Tech Academy has been successfully onboarded',
    entityType: 'organization',
    entityId: 'org-3',
    createdAt: '2024-12-26T11:20:00',
    isRead: true,
  },
  {
    id: 'notif-5',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on January 5th, 2025 from 2:00 AM to 4:00 AM IST',
    createdAt: '2024-12-25T15:00:00',
    isRead: true,
  },
];

// Audit Logs
export const auditLogs: AuditLog[] = [
  {
    id: 'log-1',
    adminId: 'admin-1',
    adminName: 'Admin User',
    action: 'APPROVED_EXAM',
    entityType: 'exam',
    entityId: 'exam-3',
    timestamp: '2024-12-25T11:30:00',
    details: 'Approved exam "Machine Learning Fundamentals" with notes',
  },
  {
    id: 'log-2',
    adminId: 'admin-1',
    adminName: 'Admin User',
    action: 'REJECTED_EXAM',
    entityType: 'exam',
    entityId: 'exam-5',
    timestamp: '2024-12-26T14:15:00',
    details: 'Rejected exam "Algorithm Design Challenge" - needs more test cases',
  },
  {
    id: 'log-3',
    adminId: 'admin-1',
    adminName: 'Admin User',
    action: 'CREATED_ORGANIZATION',
    entityType: 'organization',
    entityId: 'org-3',
    timestamp: '2024-12-26T11:20:00',
    details: 'Created new organization "Global Tech Academy"',
  },
  {
    id: 'log-4',
    adminId: 'admin-1',
    adminName: 'Admin User',
    action: 'CREATED_TEACHER',
    entityType: 'teacher',
    entityId: 'teacher-4',
    timestamp: '2024-12-24T09:45:00',
    details: 'Created teacher account for Dr. Suresh Nair',
  },
];

// Helper functions
export const getOrganizationById = (id: string) => organizations.find(o => o.id === id);
export const getProgramById = (id: string) => programs.find(p => p.id === id);
export const getBatchById = (id: string) => batches.find(b => b.id === id);
export const getSectionById = (id: string) => sections.find(s => s.id === id);
export const getStudentById = (id: string) => students.find(s => s.id === id);
export const getTeacherById = (id: string) => teachers.find(t => t.id === id);
export const getExamById = (id: string) => exams.find(e => e.id === id);

export const getProgramsByOrganization = (orgId: string) => programs.filter(p => p.organizationId === orgId);
export const getBatchesByProgram = (programId: string) => batches.filter(b => b.programId === programId);
export const getSectionsByBatch = (batchId: string) => sections.filter(s => s.batchId === batchId);
export const getStudentsBySection = (sectionId: string) => students.filter(s => s.sectionId === sectionId);
export const getTeachersByOrganization = (orgId: string) => teachers.filter(t => t.organizationId === orgId);
export const getExamsByStatus = (status: Exam['status']) => exams.filter(e => e.status === status);

export const getTopPerformers = (count: number = 3) => 
  [...students].sort((a, b) => b.avgScore - a.avgScore).slice(0, count);

export const getNeedsSupport = (count: number = 5) => 
  students.filter(s => s.attendance < 70 || s.completion < 50 || s.avgScore < 60).slice(0, count);

export const getPendingExams = () => exams.filter(e => e.status === 'PendingApproval');
export const getUnreadNotifications = () => notifications.filter(n => !n.isRead);
