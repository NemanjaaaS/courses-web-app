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
  id: string;
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
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface UserTest {
  id: string;
  userId: string;
  testId: string;
  courseName: string;
  score: number;
  passed: boolean;
  completedAt: string;
  status: 'in-progress' | 'completed';
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

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Marko Petrović',
    email: 'marko@email.com',
    role: 'user',
    joinedAt: '2024-01-15',
    status: 'active',
    enrolledCourses: 3,
    completedTests: 2,
  },
  {
    id: '2',
    name: 'Ana Jovanović',
    email: 'ana@email.com',
    role: 'user',
    joinedAt: '2024-02-20',
    status: 'active',
    enrolledCourses: 5,
    completedTests: 4,
  },
  {
    id: '3',
    name: 'Nikola Đorđević',
    email: 'nikola@email.com',
    role: 'user',
    joinedAt: '2024-03-10',
    status: 'active',
    enrolledCourses: 2,
    completedTests: 1,
  },
  {
    id: '4',
    name: 'Milica Stanković',
    email: 'milica@email.com',
    role: 'user',
    joinedAt: '2024-04-05',
    status: 'inactive',
    enrolledCourses: 1,
    completedTests: 0,
  },
  {
    id: '5',
    name: 'Stefan Ilić',
    email: 'stefan@email.com',
    role: 'user',
    joinedAt: '2024-05-12',
    status: 'active',
    enrolledCourses: 4,
    completedTests: 3,
  },
  {
    id: '6',
    name: 'Jovana Nikolić',
    email: 'jovana@email.com',
    role: 'admin',
    joinedAt: '2023-12-01',
    status: 'active',
    enrolledCourses: 0,
    completedTests: 0,
  },
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Web Development Fundamentals',
    shortDescription: 'Naučite osnove web razvoja sa HTML, CSS i JavaScript.',
    category: 'Programiranje',
    durationHours: '8 sati',
    level: 'ADVANCED',
    enrolled: 245,
    rating: 4.8,
    price: 4999,
    instructor: 'Dr. Milan Todorović',
  },
  {
    id: '2',
    title: 'React & TypeScript Mastery',
    shortDescription: 'Napredni kurs za izgradnju modernih web aplikacija.',
    category: 'Programiranje',
    durationHours: '12 sati',
    level: 'INTERMEDIATE',
    enrolled: 189,
    rating: 4.9,
    price: 7999,
    instructor: 'Prof. Ana Mitrović',
  },
  {
    id: '3',
    title: 'Python za Data Science',
    shortDescription: 'Analiza podataka i mašinsko učenje sa Python-om.',
    category: 'Data Science',
    durationHours: '15 sati',
    level: 'INTERMEDIATE',
    enrolled: 312,
    rating: 4.7,
    price: 8999,
    instructor: 'Dr. Petar Lazarević',
  },
  {
    id: '4',
    title: 'UI/UX Dizajn Principi',
    shortDescription: 'Kreirajte korisničke interfejse koji oduševljavaju.',
    category: 'Dizajn',
    durationHours: '6 sati',
    level: 'BEGINNER',
    enrolled: 178,
    rating: 4.6,
    price: 3999,
    instructor: 'Marina Popović',
  },
  {
    id: '5',
    title: 'DevOps & Cloud Computing',
    shortDescription: 'Docker, Kubernetes i AWS za moderne aplikacije.',
    category: 'DevOps',
    durationHours: '20 sati',
    level: 'ADVANCED',
    enrolled: 134,
    rating: 4.8,
    price: 12999,
    instructor: 'Aleksa Janković',
  },
  {
    id: '6',
    title: 'Cybersecurity Essentials',
    shortDescription: 'Zaštitite sisteme od modernih pretnji.',
    category: 'Security',
    durationHours: '10 sati',
    level: 'INTERMEDIATE',
    enrolled: 98,
    rating: 4.5,
    price: 6999,
    instructor: 'Dr. Luka Pavlović',
  },
];

// Mock Tests
export const mockTests: Test[] = [
  {
    id: '1',
    courseId: '1',
    title: 'HTML & CSS Test',
    duration: 30,
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        text: 'Koji HTML tag se koristi za najveći naslov?',
        options: ['<heading>', '<h1>', '<head>', '<h6>'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        text: 'Koja CSS svojstva se koristi za boju teksta?',
        options: ['font-color', 'text-color', 'color', 'foreground'],
        correctAnswer: 2,
      },
      {
        id: 'q3',
        text: 'Šta znači CSS?',
        options: ['Cascading Style Sheets', 'Creative Style System', 'Computer Style Sheets', 'Colorful Style Sheets'],
        correctAnswer: 0,
      },
      {
        id: 'q4',
        text: 'Koji tag se koristi za linkove u HTML-u?',
        options: ['<link>', '<href>', '<a>', '<url>'],
        correctAnswer: 2,
      },
      {
        id: 'q5',
        text: 'Kako se dodaje komentar u CSS-u?',
        options: ['// komentar', '/* komentar */', '<!-- komentar -->', '# komentar'],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: '2',
    courseId: '2',
    title: 'React Fundamentals Test',
    duration: 45,
    passingScore: 75,
    questions: [
      {
        id: 'q1',
        text: 'Šta je JSX?',
        options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'],
        correctAnswer: 0,
      },
      {
        id: 'q2',
        text: 'Koja funkcija se koristi za kreiranje React komponente?',
        options: ['createComponent()', 'React.create()', 'function Component()', 'new Component()'],
        correctAnswer: 2,
      },
      {
        id: 'q3',
        text: 'Koji hook se koristi za state u funkcionalnim komponentama?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 1,
      },
      {
        id: 'q4',
        text: 'Šta je props u React-u?',
        options: ['Globalni state', 'Ulazni podaci komponente', 'CSS stilovi', 'Event handler'],
        correctAnswer: 1,
      },
      {
        id: 'q5',
        text: 'Kako se koristi useEffect za mounting?',
        options: ['useEffect(() => {})', 'useEffect(() => {}, [])', 'useEffect([])', 'useEffect({})'],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: '3',
    courseId: '3',
    title: 'React Fundamentals Test',
    duration: 45,
    passingScore: 75,
    questions: [
      {
        id: 'q1',
        text: 'Šta je JSX?',
        options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'],
        correctAnswer: 0,
      },
      {
        id: 'q2',
        text: 'Koja funkcija se koristi za kreiranje React komponente?',
        options: ['createComponent()', 'React.create()', 'function Component()', 'new Component()'],
        correctAnswer: 2,
      },
      {
        id: 'q3',
        text: 'Koji hook se koristi za state u funkcionalnim komponentama?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 1,
      },
      {
        id: 'q4',
        text: 'Šta je props u React-u?',
        options: ['Globalni state', 'Ulazni podaci komponente', 'CSS stilovi', 'Event handler'],
        correctAnswer: 1,
      },
      {
        id: 'q5',
        text: 'Kako se koristi useEffect za mounting?',
        options: ['useEffect(() => {})', 'useEffect(() => {}, [])', 'useEffect([])', 'useEffect({})'],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: '4',
    courseId: '4',
    title: 'React Fundamentals Test',
    duration: 45,
    passingScore: 75,
    questions: [
      {
        id: 'q1',
        text: 'Šta je JSX?',
        options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'],
        correctAnswer: 0,
      },
      {
        id: 'q2',
        text: 'Koja funkcija se koristi za kreiranje React komponente?',
        options: ['createComponent()', 'React.create()', 'function Component()', 'new Component()'],
        correctAnswer: 2,
      },
      {
        id: 'q3',
        text: 'Koji hook se koristi za state u funkcionalnim komponentama?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 1,
      },
      {
        id: 'q4',
        text: 'Šta je props u React-u?',
        options: ['Globalni state', 'Ulazni podaci komponente', 'CSS stilovi', 'Event handler'],
        correctAnswer: 1,
      },
      {
        id: 'q5',
        text: 'Kako se koristi useEffect za mounting?',
        options: ['useEffect(() => {})', 'useEffect(() => {}, [])', 'useEffect([])', 'useEffect({})'],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: '5',
    courseId: '5',
    title: 'React Fundamentals Test',
    duration: 45,
    passingScore: 75,
    questions: [
      {
        id: 'q1',
        text: 'Šta je JSX?',
        options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'],
        correctAnswer: 0,
      },
      {
        id: 'q2',
        text: 'Koja funkcija se koristi za kreiranje React komponente?',
        options: ['createComponent()', 'React.create()', 'function Component()', 'new Component()'],
        correctAnswer: 2,
      },
      {
        id: 'q3',
        text: 'Koji hook se koristi za state u funkcionalnim komponentama?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 1,
      },
      {
        id: 'q4',
        text: 'Šta je props u React-u?',
        options: ['Globalni state', 'Ulazni podaci komponente', 'CSS stilovi', 'Event handler'],
        correctAnswer: 1,
      },
      {
        id: 'q5',
        text: 'Kako se koristi useEffect za mounting?',
        options: ['useEffect(() => {})', 'useEffect(() => {}, [])', 'useEffect([])', 'useEffect({})'],
        correctAnswer: 1,
      },
    ],
  },
];

// Mock User Tests
export const mockUserTests: UserTest[] = [
  {
    id: '1',
    userId: '1',
    testId: '1',
    courseName: 'Web Development Fundamentals',
    score: 85,
    passed: true,
    completedAt: '2024-06-15',
    status: 'completed',
  },
  {
    id: '1',
    userId: '1',
    testId: '1',
    courseName: 'Web Development Fundamentals',
    score: 85,
    passed: true,
    completedAt: '2024-06-15',
    status: 'completed',
  },
  {
    id: '2',
    userId: '1',
    testId: '2',
    courseName: 'React & TypeScript Mastery',
    score: 92,
    passed: true,
    completedAt: '2024-07-20',
    status: 'completed',
  },
  {
    id: '3',
    userId: '2',
    testId: '1',
    courseName: 'Web Development Fundamentals',
    score: 78,
    passed: true,
    completedAt: '2024-06-18',
    status: 'completed',
  },
  {
    id: '4',
    userId: '2',
    testId: '2',
    courseName: 'React & TypeScript Mastery',
    score: 65,
    passed: false,
    completedAt: '2024-07-22',
    status: 'completed',
  },
  {
    id: '5',
    userId: '3',
    testId: '1',
    courseName: 'Web Development Fundamentals',
    score: 0,
    passed: false,
    completedAt: '',
    status: 'in-progress',
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Marko Petrović',
    courseId: '1',
    courseName: 'Web Development Fundamentals',
    amount: 4999,
    date: '2024-01-16',
    status: 'completed',
  },
  {
    id: '2',
    userId: '1',
    userName: 'Marko Petrović',
    courseId: '2',
    courseName: 'React & TypeScript Mastery',
    amount: 7999,
    date: '2024-03-10',
    status: 'completed',
  },
  {
    id: '3',
    userId: '2',
    userName: 'Ana Jovanović',
    courseId: '3',
    courseName: 'Python za Data Science',
    amount: 8999,
    date: '2024-02-25',
    status: 'completed',
  },
  {
    id: '4',
    userId: '3',
    userName: 'Nikola Đorđević',
    courseId: '4',
    courseName: 'UI/UX Dizajn Principi',
    amount: 3999,
    date: '2024-04-12',
    status: 'completed',
  },
  {
    id: '5',
    userId: '5',
    userName: 'Stefan Ilić',
    courseId: '5',
    courseName: 'DevOps & Cloud Computing',
    amount: 12999,
    date: '2024-05-20',
    status: 'pending',
  },
];

// Dashboard Stats
export const monthlyStats = [
  { month: 'Jan', users: 45, enrollments: 78, revenue: 125000 },
  { month: 'Feb', users: 52, enrollments: 95, revenue: 189000 },
  { month: 'Mar', users: 61, enrollments: 112, revenue: 234000 },
  { month: 'Apr', users: 78, enrollments: 145, revenue: 312000 },
  { month: 'Maj', users: 89, enrollments: 167, revenue: 378000 },
  { month: 'Jun', users: 102, enrollments: 189, revenue: 445000 },
];

export const testPassRates = [
  { name: 'Položili', value: 68, color: 'hsl(var(--success))' },
  { name: 'Pali', value: 32, color: 'hsl(var(--destructive))' },
];

export const topCourses = [
  { name: 'Python za Data Science', enrollments: 312 },
  { name: 'Web Development', enrollments: 245 },
  { name: 'React & TypeScript', enrollments: 189 },
  { name: 'UI/UX Dizajn', enrollments: 178 },
  { name: 'DevOps', enrollments: 134 },
];
