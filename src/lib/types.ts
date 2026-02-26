// Mock data for the LMS application

import type { UserData } from '../app/pages/auth/types/User';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  joinedAt: string;
  status: 'active' | 'inactive';
  enrolledCourses: number;
  completedTests: number;
}

export interface Course {
  id: number;
  title: string;
  shortDescription: string;
  category: string;
  durationHours: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  enrolled: number;
  rating: number;
  price: number;
  image?: string;
  instructor: string;
  courseRequested: boolean;
}
export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number; // current page
  size: number;
}

export interface Test {
  id: string;
  courseId: string;
  title: string;
  questions: Question[];
  duration: number; // in minutes
  passingScore: number;
}

export type CreateQuestionDTO = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
};
export type CreateTestDTO = {
  title: string;
  courseId: number;
  durationMinutes: number;
  passingScorePercentage: number;
  createQuestionDTOS: CreateQuestionDTO[];
};

export interface TestList {
  id: string;
  course: Course;
  title: string;
  numberOfQuestions: number;
  durationMinutes: number; // in minutes
  passingScorePercentage: number;
  createdAt: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface Answer {
  questionId: number;
  answer: string;
}

export interface UserTest {
  id: number;
  title: string;
  numberOfQuestions: number;
  durationMinutes: number;
  passingScorePercentage: number;
  attended: boolean;
  passed: boolean;
  course: Course;
}

export interface UserResultBE {
  id: number;
  title: string;
  passingScorePercentage: number;
  attended: boolean;
  passed: boolean;
  userScore: number;
  user: UserData;
}

export interface Cerfiticates {
  courseName: string;
  userFullName: string;
  completionDate: string;
}

export interface UserTestResults {
  id: number;
  userName: string;
  testName: string;
  score: number;
  userScore: number;
  passed: boolean;
  status: 'in-progress' | 'completed';
}

export const mapUserTestBE2FE = (backend: UserResultBE): UserTestResults => ({
  id: backend.id,
  userName: backend.user.fullName,
  testName: backend.title,
  score: backend.passingScorePercentage,
  userScore: backend.userScore,
  passed: backend.passed,
  status: backend.passed ? 'completed' : 'in-progress',
});

export interface UserTableBE {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  enrolledCourses: number;
  completedCourses: number;
  passedTests: number;
  failedTests: number;
}

export interface UserTable {
  id: number;
  fullName: string;
  email: string;
  enrolledCourses: number;
  completedCourses: number;
  passedTests: number;
  failedTests: number;
}

export const mapUserTableBE2FE = (backend: UserTableBE): UserTable => ({
  id: backend.id,
  fullName: backend.firstName + ' ' + backend.lastName,
  email: backend.email,
  enrolledCourses: backend.enrolledCourses,
  completedCourses: backend.completedCourses,
  passedTests: backend.passedTests,
  failedTests: backend.failedTests,
});

export interface MonthlyRevenueDTO {
  month: string;
  revenue: number;
}

export interface DashboardDTO {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  totalRevenue: number;
  pendingRevenue: number;
  conversionRate: number;
  revenueByMonth: MonthlyRevenueDTO[];
  passRate: number;
  averageTestScoreList: { tests: TestList; averageScore: number }[];
  passedTests: number;
  failedTests: number;
  cumulativeUserCount: { cumulativeTotal: number; createdAt: string }[];
  topCourseDTOS: {
    courseName: string;
    numberOfEnrollments: number;
  }[];
}

export interface CourseProgressDTO {
  courseId: number;
  courseName: string;

  totalTests: number;
  completedTests: number;

  progressPercentage: number;

  status: 'not-started' | 'in-progress' | 'completed';
}

export interface RecentActivityDTO {
  testId: number;
  courseName: string;

  score: number;
  passed: boolean;

  status: 'completed' | 'in-progress' | 'failed';

  date: string; // ISO string
}

export interface UserDashboardDTO {
  totalEnrollments: number;
  completedCourses: number;
  inProgressCourses: number;
  averageScore: number;
  passedTests: number;
  failedTests: number;
  courseProgress: CourseProgressDTO[];
  recentTests: RecentActivityDTO[];
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'refunded';
}

export interface Request {
  id: number;
  requestDate: string;
  processedDate: string | null;
  status: 'PENDING' | 'APPROVED';
  user: UserData;
  course: Course;
}

export interface RequestTableFE {
  id: number;
  requestDate: string;
  processedDate: string | null;
  status: 'PENDING' | 'APPROVED';
  userName: string;
  courseName: string;
  price: number;
}

export const mapRequestToTableFE = (backend: Request): RequestTableFE => {
  return {
    id: backend.id,
    requestDate: backend.requestDate,
    processedDate: backend.processedDate,
    status: backend.status,
    userName: backend.user.fullName,
    courseName: backend.course.title,
    price: backend.course.price,
  };
};

// Dashboard Stats
export const monthlyStats = [
  { month: 'Jan', users: 45, enrollments: 78, revenue: 125000 },
  { month: 'Feb', users: 52, enrollments: 95, revenue: 189000 },
  { month: 'Mar', users: 61, enrollments: 112, revenue: 234000 },
  { month: 'Apr', users: 78, enrollments: 145, revenue: 312000 },
  { month: 'Maj', users: 89, enrollments: 167, revenue: 378000 },
  { month: 'Jun', users: 102, enrollments: 189, revenue: 445000 },
];
