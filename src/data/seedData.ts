// Seed data for Admin Console - Universities Structure

export interface University {
  id: string;
  name: string;
  code: string;
  logo?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  studentsCount: number;
  teachersCount: number;
  avgScore: number;
  completion: number;
  attendance: number;
}

export interface Program {
  id: string;
  universityId: string;
  name: string;
  key: string;
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
  universityId: string;
  programKey: string;
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
  universityId: string;
  programKey: string;
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
  universityId: string;
  programKey: string;
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
  universityId: string;
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
  universityId: string;
  programKey: string;
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
  type: 'exam_approval' | 'teacher_created' | 'university_created' | 'student_alert' | 'system';
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

// Universities
export const universities: University[] = [
  {
    id: 'lpu',
    name: 'LPU',
    code: 'LPU',
    status: 'active',
    createdAt: '2024-01-15',
    studentsCount: 5200,
    teachersCount: 156,
    avgScore: 79,
    completion: 74,
    attendance: 86,
  },
  {
    id: 'bits',
    name: 'BITS Pilani',
    code: 'BITS',
    status: 'active',
    createdAt: '2024-02-20',
    studentsCount: 3900,
    teachersCount: 117,
    avgScore: 83,
    completion: 78,
    attendance: 89,
  },
  {
    id: 'srm',
    name: 'SRM',
    code: 'SRM',
    status: 'active',
    createdAt: '2024-03-10',
    studentsCount: 3900,
    teachersCount: 117,
    avgScore: 76,
    completion: 71,
    attendance: 84,
  },
];

// Programs for each university
export const programs: Program[] = [
  // LPU Programs
  {
    id: 'lpu-genai',
    universityId: 'lpu',
    name: 'GenAI',
    key: 'genai',
    description: 'Generative AI and Machine Learning Program',
    status: 'active',
    batchesCount: 3,
    studentsCount: 1800,
    avgScore: 80,
    completion: 76,
    attendance: 87,
    lastUpdated: '2024-12-28',
  },
  {
    id: 'lpu-ds',
    universityId: 'lpu',
    name: 'Data Science',
    key: 'data-science',
    description: 'Advanced Data Science and Analytics',
    status: 'active',
    batchesCount: 3,
    studentsCount: 1700,
    avgScore: 78,
    completion: 73,
    attendance: 85,
    lastUpdated: '2024-12-27',
  },
  {
    id: 'lpu-cloud',
    universityId: 'lpu',
    name: 'Cloud Computing',
    key: 'cloud-computing',
    description: 'Cloud Infrastructure and DevOps',
    status: 'active',
    batchesCount: 2,
    studentsCount: 1700,
    avgScore: 79,
    completion: 73,
    attendance: 86,
    lastUpdated: '2024-12-26',
  },
  // BITS Programs
  {
    id: 'bits-genai',
    universityId: 'bits',
    name: 'GenAI',
    key: 'genai',
    description: 'Generative AI and Machine Learning Program',
    status: 'active',
    batchesCount: 3,
    studentsCount: 1400,
    avgScore: 84,
    completion: 80,
    attendance: 90,
    lastUpdated: '2024-12-28',
  },
  {
    id: 'bits-ds',
    universityId: 'bits',
    name: 'Data Science',
    key: 'data-science',
    description: 'Advanced Data Science and Analytics',
    status: 'active',
    batchesCount: 2,
    studentsCount: 1300,
    avgScore: 82,
    completion: 77,
    attendance: 88,
    lastUpdated: '2024-12-27',
  },
  {
    id: 'bits-cloud',
    universityId: 'bits',
    name: 'Cloud Computing',
    key: 'cloud-computing',
    description: 'Cloud Infrastructure and DevOps',
    status: 'active',
    batchesCount: 2,
    studentsCount: 1200,
    avgScore: 83,
    completion: 77,
    attendance: 89,
    lastUpdated: '2024-12-26',
  },
  // SRM Programs
  {
    id: 'srm-genai',
    universityId: 'srm',
    name: 'GenAI',
    key: 'genai',
    description: 'Generative AI and Machine Learning Program',
    status: 'active',
    batchesCount: 2,
    studentsCount: 1400,
    avgScore: 77,
    completion: 72,
    attendance: 85,
    lastUpdated: '2024-12-28',
  },
  {
    id: 'srm-ds',
    universityId: 'srm',
    name: 'Data Science',
    key: 'data-science',
    description: 'Advanced Data Science and Analytics',
    status: 'active',
    batchesCount: 2,
    studentsCount: 1300,
    avgScore: 75,
    completion: 70,
    attendance: 83,
    lastUpdated: '2024-12-27',
  },
  {
    id: 'srm-cloud',
    universityId: 'srm',
    name: 'Cloud Computing',
    key: 'cloud-computing',
    description: 'Cloud Infrastructure and DevOps',
    status: 'active',
    batchesCount: 2,
    studentsCount: 1200,
    avgScore: 76,
    completion: 71,
    attendance: 84,
    lastUpdated: '2024-12-26',
  },
];

// Batches
export const batches: Batch[] = [
  // LPU GenAI Batches
  { id: 'lpu-genai-2025', universityId: 'lpu', programKey: 'genai', name: '2025-2029', startYear: 2025, endYear: 2029, status: 'active', sectionsCount: 3, studentsCount: 650, avgScore: 81, completion: 78, attendance: 88 },
  { id: 'lpu-genai-2024', universityId: 'lpu', programKey: 'genai', name: '2024-2028', startYear: 2024, endYear: 2028, status: 'active', sectionsCount: 3, studentsCount: 600, avgScore: 80, completion: 75, attendance: 87 },
  { id: 'lpu-genai-2023', universityId: 'lpu', programKey: 'genai', name: '2023-2027', startYear: 2023, endYear: 2027, status: 'active', sectionsCount: 3, studentsCount: 550, avgScore: 79, completion: 74, attendance: 86 },
  // LPU Data Science Batches
  { id: 'lpu-ds-2025', universityId: 'lpu', programKey: 'data-science', name: '2025-2029', startYear: 2025, endYear: 2029, status: 'active', sectionsCount: 3, studentsCount: 600, avgScore: 79, completion: 74, attendance: 86 },
  { id: 'lpu-ds-2024', universityId: 'lpu', programKey: 'data-science', name: '2024-2028', startYear: 2024, endYear: 2028, status: 'active', sectionsCount: 3, studentsCount: 580, avgScore: 78, completion: 73, attendance: 85 },
  { id: 'lpu-ds-2023', universityId: 'lpu', programKey: 'data-science', name: '2023-2027', startYear: 2023, endYear: 2027, status: 'active', sectionsCount: 2, studentsCount: 520, avgScore: 77, completion: 72, attendance: 84 },
  // LPU Cloud Batches
  { id: 'lpu-cloud-2025', universityId: 'lpu', programKey: 'cloud-computing', name: '2025-2029', startYear: 2025, endYear: 2029, status: 'active', sectionsCount: 3, studentsCount: 900, avgScore: 80, completion: 74, attendance: 87 },
  { id: 'lpu-cloud-2024', universityId: 'lpu', programKey: 'cloud-computing', name: '2024-2028', startYear: 2024, endYear: 2028, status: 'active', sectionsCount: 3, studentsCount: 800, avgScore: 78, completion: 72, attendance: 85 },
  // BITS GenAI Batches
  { id: 'bits-genai-2025', universityId: 'bits', programKey: 'genai', name: '2025-2029', startYear: 2025, endYear: 2029, status: 'active', sectionsCount: 3, studentsCount: 500, avgScore: 85, completion: 82, attendance: 91 },
  { id: 'bits-genai-2024', universityId: 'bits', programKey: 'genai', name: '2024-2028', startYear: 2024, endYear: 2028, status: 'active', sectionsCount: 3, studentsCount: 480, avgScore: 84, completion: 79, attendance: 90 },
  { id: 'bits-genai-2023', universityId: 'bits', programKey: 'genai', name: '2023-2027', startYear: 2023, endYear: 2027, status: 'active', sectionsCount: 2, studentsCount: 420, avgScore: 83, completion: 79, attendance: 89 },
  // BITS Data Science Batches
  { id: 'bits-ds-2025', universityId: 'bits', programKey: 'data-science', name: '2025-2029', startYear: 2025, endYear: 2029, status: 'active', sectionsCount: 3, studentsCount: 700, avgScore: 83, completion: 78, attendance: 89 },
  { id: 'bits-ds-2024', universityId: 'bits', programKey: 'data-science', name: '2024-2028', startYear: 2024, endYear: 2028, status: 'active', sectionsCount: 2, studentsCount: 600, avgScore: 81, completion: 76, attendance: 87 },
  // BITS Cloud Batches
  { id: 'bits-cloud-2025', universityId: 'bits', programKey: 'cloud-computing', name: '2025-2029', startYear: 2025, endYear: 2029, status: 'active', sectionsCount: 3, studentsCount: 650, avgScore: 84, completion: 78, attendance: 90 },
  { id: 'bits-cloud-2024', universityId: 'bits', programKey: 'cloud-computing', name: '2024-2028', startYear: 2024, endYear: 2028, status: 'active', sectionsCount: 2, studentsCount: 550, avgScore: 82, completion: 76, attendance: 88 },
  // SRM GenAI Batches
  { id: 'srm-genai-2025', universityId: 'srm', programKey: 'genai', name: '2025-2029', startYear: 2025, endYear: 2029, status: 'active', sectionsCount: 3, studentsCount: 750, avgScore: 78, completion: 73, attendance: 86 },
  { id: 'srm-genai-2024', universityId: 'srm', programKey: 'genai', name: '2024-2028', startYear: 2024, endYear: 2028, status: 'active', sectionsCount: 3, studentsCount: 650, avgScore: 76, completion: 71, attendance: 84 },
  // SRM Data Science Batches
  { id: 'srm-ds-2025', universityId: 'srm', programKey: 'data-science', name: '2025-2029', startYear: 2025, endYear: 2029, status: 'active', sectionsCount: 3, studentsCount: 700, avgScore: 76, completion: 71, attendance: 84 },
  { id: 'srm-ds-2024', universityId: 'srm', programKey: 'data-science', name: '2024-2028', startYear: 2024, endYear: 2028, status: 'active', sectionsCount: 2, studentsCount: 600, avgScore: 74, completion: 69, attendance: 82 },
  // SRM Cloud Batches
  { id: 'srm-cloud-2025', universityId: 'srm', programKey: 'cloud-computing', name: '2025-2029', startYear: 2025, endYear: 2029, status: 'active', sectionsCount: 3, studentsCount: 650, avgScore: 77, completion: 72, attendance: 85 },
  { id: 'srm-cloud-2024', universityId: 'srm', programKey: 'cloud-computing', name: '2024-2028', startYear: 2024, endYear: 2028, status: 'active', sectionsCount: 2, studentsCount: 550, avgScore: 75, completion: 70, attendance: 83 },
];

// Sections
export const sections: Section[] = [
  // LPU GenAI 2025-2029 Sections
  { id: 'lpu-genai-2025-a', universityId: 'lpu', programKey: 'genai', batchId: 'lpu-genai-2025', code: 'Sec-A', displayName: 'Section A', status: 'active', studentsCount: 220, assignedTeacherIds: ['t1'], avgScore: 82, completion: 79, attendance: 89 },
  { id: 'lpu-genai-2025-b', universityId: 'lpu', programKey: 'genai', batchId: 'lpu-genai-2025', code: 'Sec-B', displayName: 'Section B', status: 'active', studentsCount: 215, assignedTeacherIds: ['t2'], avgScore: 80, completion: 77, attendance: 87 },
  { id: 'lpu-genai-2025-c', universityId: 'lpu', programKey: 'genai', batchId: 'lpu-genai-2025', code: 'Sec-C', displayName: 'Section C', status: 'active', studentsCount: 215, assignedTeacherIds: ['t3'], avgScore: 81, completion: 78, attendance: 88 },
  // LPU GenAI 2024-2028 Sections
  { id: 'lpu-genai-2024-a', universityId: 'lpu', programKey: 'genai', batchId: 'lpu-genai-2024', code: 'Sec-A', displayName: 'Section A', status: 'active', studentsCount: 200, assignedTeacherIds: ['t1'], avgScore: 81, completion: 76, attendance: 88 },
  { id: 'lpu-genai-2024-b', universityId: 'lpu', programKey: 'genai', batchId: 'lpu-genai-2024', code: 'Sec-B', displayName: 'Section B', status: 'active', studentsCount: 200, assignedTeacherIds: ['t2'], avgScore: 79, completion: 74, attendance: 86 },
  { id: 'lpu-genai-2024-c', universityId: 'lpu', programKey: 'genai', batchId: 'lpu-genai-2024', code: 'Sec-C', displayName: 'Section C', status: 'active', studentsCount: 200, assignedTeacherIds: ['t3'], avgScore: 80, completion: 75, attendance: 87 },
  // BITS GenAI 2025-2029 Sections
  { id: 'bits-genai-2025-a', universityId: 'bits', programKey: 'genai', batchId: 'bits-genai-2025', code: 'Sec-A', displayName: 'Section A', status: 'active', studentsCount: 170, assignedTeacherIds: ['t4'], avgScore: 86, completion: 83, attendance: 92 },
  { id: 'bits-genai-2025-b', universityId: 'bits', programKey: 'genai', batchId: 'bits-genai-2025', code: 'Sec-B', displayName: 'Section B', status: 'active', studentsCount: 165, assignedTeacherIds: ['t5'], avgScore: 84, completion: 81, attendance: 90 },
  { id: 'bits-genai-2025-c', universityId: 'bits', programKey: 'genai', batchId: 'bits-genai-2025', code: 'Sec-C', displayName: 'Section C', status: 'active', studentsCount: 165, assignedTeacherIds: ['t6'], avgScore: 85, completion: 82, attendance: 91 },
  // SRM GenAI 2025-2029 Sections
  { id: 'srm-genai-2025-a', universityId: 'srm', programKey: 'genai', batchId: 'srm-genai-2025', code: 'Sec-A', displayName: 'Section A', status: 'active', studentsCount: 250, assignedTeacherIds: ['t7'], avgScore: 79, completion: 74, attendance: 87 },
  { id: 'srm-genai-2025-b', universityId: 'srm', programKey: 'genai', batchId: 'srm-genai-2025', code: 'Sec-B', displayName: 'Section B', status: 'active', studentsCount: 250, assignedTeacherIds: ['t8'], avgScore: 77, completion: 72, attendance: 85 },
  { id: 'srm-genai-2025-c', universityId: 'srm', programKey: 'genai', batchId: 'srm-genai-2025', code: 'Sec-C', displayName: 'Section C', status: 'active', studentsCount: 250, assignedTeacherIds: ['t9'], avgScore: 78, completion: 73, attendance: 86 },
];

// Generate students for sections
const generateStudentsForSection = (section: Section, count: number): Student[] => {
  const students: Student[] = [];
  const firstNames = ['Arjun', 'Priya', 'Rahul', 'Neha', 'Amit', 'Sneha', 'Vikram', 'Ananya', 'Karan', 'Ishita', 'Rohan', 'Divya', 'Aditya', 'Kavya', 'Nikhil'];
  const lastNames = ['Patel', 'Sharma', 'Kumar', 'Gupta', 'Singh', 'Reddy', 'Nair', 'Menon', 'Iyer', 'Joshi', 'Kapoor', 'Malhotra', 'Chopra', 'Banerjee', 'Das'];
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
    const avgScore = Math.floor(Math.random() * 45) + 55; // 55-100
    const completion = Math.floor(Math.random() * 40) + 60; // 60-100
    const attendance = Math.floor(Math.random() * 30) + 70; // 70-100
    
    students.push({
      id: `${section.id}-s${i + 1}`,
      universityId: section.universityId,
      programKey: section.programKey,
      batchId: section.batchId,
      sectionId: section.id,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${section.universityId}.edu`,
      rollNo: `${section.code.replace('Sec-', '')}${String(i + 1).padStart(3, '0')}`,
      status: 'active',
      joinedAt: '2024-08-15',
      avgScore,
      completion,
      attendance,
      examAvg: avgScore + Math.floor(Math.random() * 6) - 3,
      assignmentCompletion: completion + Math.floor(Math.random() * 10) - 5,
      timeSpent: Math.floor(Math.random() * 100) + 50,
      lastActivity: ['2024-12-28', '2024-12-27', '2024-12-26', '2024-12-25'][Math.floor(Math.random() * 4)],
    });
  }
  return students;
};

export const students: Student[] = sections.flatMap(section => 
  generateStudentsForSection(section, Math.min(section.studentsCount, 15))
);

// Teachers
export const teachers: Teacher[] = [
  { id: 't1', universityId: 'lpu', programs: ['genai', 'data-science'], sections: ['lpu-genai-2025-a', 'lpu-genai-2024-a'], name: 'Prof. Ananya Sharma', email: 'ananya.sharma@lpu.edu', status: 'active', joinedAt: '2023-06-15', avgRating: 4.6, feedbackCount: 156, responseRate: 92, studentsCount: 420 },
  { id: 't2', universityId: 'lpu', programs: ['genai'], sections: ['lpu-genai-2025-b', 'lpu-genai-2024-b'], name: 'Dr. Rajesh Menon', email: 'rajesh.menon@lpu.edu', status: 'active', joinedAt: '2023-08-20', avgRating: 4.4, feedbackCount: 98, responseRate: 88, studentsCount: 415 },
  { id: 't3', universityId: 'lpu', programs: ['genai', 'cloud-computing'], sections: ['lpu-genai-2025-c', 'lpu-genai-2024-c'], name: 'Prof. Suresh Nair', email: 'suresh.nair@lpu.edu', status: 'active', joinedAt: '2023-09-10', avgRating: 4.5, feedbackCount: 112, responseRate: 90, studentsCount: 415 },
  { id: 't4', universityId: 'bits', programs: ['genai'], sections: ['bits-genai-2025-a'], name: 'Dr. Meera Iyer', email: 'meera.iyer@bits.edu', status: 'active', joinedAt: '2022-07-01', avgRating: 4.8, feedbackCount: 203, responseRate: 95, studentsCount: 170 },
  { id: 't5', universityId: 'bits', programs: ['genai', 'data-science'], sections: ['bits-genai-2025-b'], name: 'Prof. Arun Kapoor', email: 'arun.kapoor@bits.edu', status: 'active', joinedAt: '2022-08-15', avgRating: 4.7, feedbackCount: 187, responseRate: 93, studentsCount: 165 },
  { id: 't6', universityId: 'bits', programs: ['genai'], sections: ['bits-genai-2025-c'], name: 'Dr. Priya Reddy', email: 'priya.reddy@bits.edu', status: 'active', joinedAt: '2023-01-10', avgRating: 4.6, feedbackCount: 145, responseRate: 91, studentsCount: 165 },
  { id: 't7', universityId: 'srm', programs: ['genai', 'cloud-computing'], sections: ['srm-genai-2025-a'], name: 'Prof. Vikram Das', email: 'vikram.das@srm.edu', status: 'active', joinedAt: '2023-03-15', avgRating: 4.3, feedbackCount: 89, responseRate: 85, studentsCount: 250 },
  { id: 't8', universityId: 'srm', programs: ['genai'], sections: ['srm-genai-2025-b'], name: 'Dr. Kavitha Nair', email: 'kavitha.nair@srm.edu', status: 'active', joinedAt: '2023-05-20', avgRating: 4.4, feedbackCount: 95, responseRate: 87, studentsCount: 250 },
  { id: 't9', universityId: 'srm', programs: ['genai', 'data-science'], sections: ['srm-genai-2025-c'], name: 'Prof. Ravi Kumar', email: 'ravi.kumar@srm.edu', status: 'active', joinedAt: '2023-06-01', avgRating: 4.2, feedbackCount: 78, responseRate: 84, studentsCount: 250 },
];

// Exams
export const exams: Exam[] = [
  {
    id: 'exam-1',
    createdByTeacherId: 't1',
    teacherName: 'Prof. Ananya Sharma',
    universityId: 'lpu',
    programKey: 'genai',
    batchId: 'lpu-genai-2025',
    sectionIds: ['lpu-genai-2025-a', 'lpu-genai-2025-b'],
    sectionNames: ['Sec-A', 'Sec-B'],
    type: 'MCQ',
    title: 'GenAI Fundamentals Mid-Term',
    schedule: '2025-01-15T10:00:00',
    duration: 90,
    totalMarks: 100,
    status: 'PendingApproval',
    submittedAt: '2024-12-28T14:30:00',
    questionsCount: 50,
  },
  {
    id: 'exam-2',
    createdByTeacherId: 't4',
    teacherName: 'Dr. Meera Iyer',
    universityId: 'bits',
    programKey: 'genai',
    batchId: 'bits-genai-2025',
    sectionIds: ['bits-genai-2025-a'],
    sectionNames: ['Sec-A'],
    type: 'Coding',
    title: 'Prompt Engineering Lab Assessment',
    schedule: '2025-01-18T14:00:00',
    duration: 120,
    totalMarks: 100,
    status: 'PendingApproval',
    submittedAt: '2024-12-27T11:00:00',
    questionsCount: 5,
  },
  {
    id: 'exam-3',
    createdByTeacherId: 't2',
    teacherName: 'Dr. Rajesh Menon',
    universityId: 'lpu',
    programKey: 'genai',
    batchId: 'lpu-genai-2024',
    sectionIds: ['lpu-genai-2024-b'],
    sectionNames: ['Sec-B'],
    type: 'Mixed',
    title: 'Neural Networks Final Exam',
    schedule: '2025-01-20T09:00:00',
    duration: 180,
    totalMarks: 150,
    status: 'Approved',
    submittedAt: '2024-12-20T16:00:00',
    approvedByAdminId: 'admin-1',
    approvalNotes: 'Well structured exam with good coverage',
    questionsCount: 35,
  },
  {
    id: 'exam-4',
    createdByTeacherId: 't7',
    teacherName: 'Prof. Vikram Das',
    universityId: 'srm',
    programKey: 'genai',
    batchId: 'srm-genai-2025',
    sectionIds: ['srm-genai-2025-a', 'srm-genai-2025-b', 'srm-genai-2025-c'],
    sectionNames: ['Sec-A', 'Sec-B', 'Sec-C'],
    type: 'MCQ',
    title: 'LLM Architecture Quiz',
    schedule: '2025-01-10T11:00:00',
    duration: 45,
    totalMarks: 50,
    status: 'Published',
    submittedAt: '2024-12-15T09:00:00',
    approvedByAdminId: 'admin-1',
    questionsCount: 25,
  },
];

// Notifications
export const notifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'exam_approval',
    title: 'Exam Pending Approval',
    message: 'Prof. Ananya Sharma submitted "GenAI Fundamentals Mid-Term" for approval',
    entityType: 'exam',
    entityId: 'exam-1',
    createdAt: '2024-12-28T14:30:00',
    isRead: false,
  },
  {
    id: 'notif-2',
    type: 'exam_approval',
    title: 'Exam Pending Approval',
    message: 'Dr. Meera Iyer submitted "Prompt Engineering Lab Assessment" for approval',
    entityType: 'exam',
    entityId: 'exam-2',
    createdAt: '2024-12-27T11:00:00',
    isRead: false,
  },
  {
    id: 'notif-3',
    type: 'teacher_created',
    title: 'New Teacher Added',
    message: 'Prof. Vikram Das joined SRM as GenAI instructor',
    entityType: 'teacher',
    entityId: 't7',
    createdAt: '2024-12-26T09:00:00',
    isRead: true,
  },
  {
    id: 'notif-4',
    type: 'student_alert',
    title: 'At-Risk Student Alert',
    message: '5 students in LPU GenAI Sec-A have attendance below 70%',
    entityType: 'section',
    entityId: 'lpu-genai-2025-a',
    createdAt: '2024-12-25T16:00:00',
    isRead: true,
  },
];

// Audit Logs
export const auditLogs: AuditLog[] = [
  { id: 'log-1', adminId: 'admin-1', adminName: 'Admin User', action: 'Approved Exam', entityType: 'exam', entityId: 'exam-3', timestamp: '2024-12-21T10:00:00', details: 'Approved "Neural Networks Final Exam"' },
  { id: 'log-2', adminId: 'admin-1', adminName: 'Admin User', action: 'Created Teacher', entityType: 'teacher', entityId: 't9', timestamp: '2024-12-20T14:00:00', details: 'Added Prof. Ravi Kumar to SRM' },
  { id: 'log-3', adminId: 'admin-1', adminName: 'Admin User', action: 'Updated University', entityType: 'university', entityId: 'bits', timestamp: '2024-12-19T09:30:00', details: 'Updated BITS Pilani contact details' },
];

// Helper functions
export const getUniversityById = (id: string) => universities.find(u => u.id === id);

export const getProgramsByUniversity = (universityId: string) => 
  programs.filter(p => p.universityId === universityId);

export const getBatchesByProgram = (universityId: string, programKey: string) => 
  batches.filter(b => b.universityId === universityId && b.programKey === programKey);

export const getSectionsByBatch = (batchId: string) => 
  sections.filter(s => s.batchId === batchId);

export const getStudentsBySection = (sectionId: string) => 
  students.filter(s => s.sectionId === sectionId);

export const getPendingExams = () => exams.filter(e => e.status === 'PendingApproval');

export const getUnreadNotifications = () => notifications.filter(n => !n.isRead);

export const getTopPerformers = (sectionId: string, limit: number = 3) => 
  students
    .filter(s => s.sectionId === sectionId)
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, limit);

export const getNeedsSupport = (sectionId: string, limit: number = 3) =>
  students
    .filter(s => s.sectionId === sectionId && (s.avgScore < 60 || s.attendance < 70))
    .sort((a, b) => a.avgScore - b.avgScore)
    .slice(0, limit);
