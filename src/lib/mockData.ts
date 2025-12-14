// Mock data for the LMS application

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
  description: string;
  category: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  enrolled: number;
  rating: number;
  price: number;
  image?: string;
  instructor: string;
}

export interface Test {
  id: string;
  courseId: string;
  title: string;
  questions: Question[];
  duration: number; // in minutes
  passingScore: number;
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

export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  courseName: string;
  issuedAt: string;
  approvedAt?: string;
  status: 'approved' | 'pending';
}

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
    description: 'Naučite osnove web razvoja sa HTML, CSS i JavaScript.',
    category: 'Programiranje',
    duration: '8 sati',
    difficulty: 'beginner',
    enrolled: 245,
    rating: 4.8,
    price: 4999,
    instructor: 'Dr. Milan Todorović',
  },
  {
    id: '2',
    title: 'React & TypeScript Mastery',
    description: 'Napredni kurs za izgradnju modernih web aplikacija.',
    category: 'Programiranje',
    duration: '12 sati',
    difficulty: 'intermediate',
    enrolled: 189,
    rating: 4.9,
    price: 7999,
    instructor: 'Prof. Ana Mitrović',
  },
  {
    id: '3',
    title: 'Python za Data Science',
    description: 'Analiza podataka i mašinsko učenje sa Python-om.',
    category: 'Data Science',
    duration: '15 sati',
    difficulty: 'intermediate',
    enrolled: 312,
    rating: 4.7,
    price: 8999,
    instructor: 'Dr. Petar Lazarević',
  },
  {
    id: '4',
    title: 'UI/UX Dizajn Principi',
    description: 'Kreirajte korisničke interfejse koji oduševljavaju.',
    category: 'Dizajn',
    duration: '6 sati',
    difficulty: 'beginner',
    enrolled: 178,
    rating: 4.6,
    price: 3999,
    instructor: 'Marina Popović',
  },
  {
    id: '5',
    title: 'DevOps & Cloud Computing',
    description: 'Docker, Kubernetes i AWS za moderne aplikacije.',
    category: 'DevOps',
    duration: '20 sati',
    difficulty: 'advanced',
    enrolled: 134,
    rating: 4.8,
    price: 12999,
    instructor: 'Aleksa Janković',
  },
  {
    id: '6',
    title: 'Cybersecurity Essentials',
    description: 'Zaštitite sisteme od modernih pretnji.',
    category: 'Security',
    duration: '10 sati',
    difficulty: 'intermediate',
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

// Mock Certificates
export const mockCertificates: Certificate[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Marko Petrović',
    courseName: 'Web Development Fundamentals',
    issuedAt: '2024-06-16',
    status: 'approved',
  },
  {
    id: '2',
    userId: '1',
    userName: 'Marko Petrović',
    courseName: 'React & TypeScript Mastery',
    issuedAt: '2024-07-21',
    status: 'approved',
  },
  {
    id: '3',
    userId: '2',
    userName: 'Ana Jovanović',
    courseName: 'Web Development Fundamentals',
    issuedAt: '2024-06-19',
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
