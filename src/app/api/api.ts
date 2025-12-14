import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  mockUsers,
  mockCourses,
  mockTests,
  mockUserTests,
  mockTransactions,
  mockCertificates,
  monthlyStats,
  testPassRates,
  topCourses,
  type User,
  type Course,
  type Test,
  type UserTest,
  type Transaction,
  type Certificate,
} from '../../lib/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Users', 'Courses', 'Tests', 'UserTests', 'Transactions', 'Certificates'],
  endpoints: (builder) => ({
    // Users
    getUsers: builder.query<User[], void>({
      queryFn: async () => {
        await delay(300);
        return { data: mockUsers };
      },
      providesTags: ['Users'],
    }),
    toggleUserStatus: builder.mutation<User, string>({
      queryFn: async (userId) => {
        await delay(200);
        const user = mockUsers.find((u) => u.id === userId);
        if (user) {
          user.status = user.status === 'active' ? 'inactive' : 'active';
          return { data: user };
        }
        return { error: { status: 404, data: 'User not found' } };
      },
      invalidatesTags: ['Users'],
    }),

    // Courses
    getCourses: builder.query<Course[], void>({
      queryFn: async () => {
        await delay(300);
        return { data: mockCourses };
      },
      providesTags: ['Courses'],
    }),

    // Tests
    getTests: builder.query<Test[], void>({
      queryFn: async () => {
        await delay(300);
        return { data: mockTests };
      },
      providesTags: ['Tests'],
    }),
    createTest: builder.mutation<Test, Omit<Test, 'id'>>({
      queryFn: async (newTest) => {
        await delay(300);
        const test: Test = {
          id: `t${Date.now()}`,
          ...newTest,
        };
        mockTests.push(test);
        return { data: test };
      },
      invalidatesTags: ['Tests'],
    }),

    // User Tests
    getUserTests: builder.query<UserTest[], void>({
      queryFn: async () => {
        await delay(300);
        return { data: mockUserTests };
      },
      providesTags: ['UserTests'],
    }),

    // Transactions
    getTransactions: builder.query<Transaction[], void>({
      queryFn: async () => {
        await delay(300);
        return { data: mockTransactions };
      },
      providesTags: ['Transactions'],
    }),

    // Certificates
    getCertificates: builder.query<Certificate[], void>({
      queryFn: async () => {
        await delay(300);
        return { data: mockCertificates };
      },
      providesTags: ['Certificates'],
    }),
    approveCertificate: builder.mutation<Certificate, string>({
      queryFn: async (certId) => {
        await delay(200);
        const cert = mockCertificates.find((c) => c.id === certId);
        if (cert) {
          cert.status = 'approved';
          cert.approvedAt = new Date().toISOString();
          return { data: cert };
        }
        return { error: { status: 404, data: 'Certificate not found' } };
      },
      invalidatesTags: ['Certificates'],
    }),

    // Dashboard Stats
    getDashboardStats: builder.query<
      {
        monthlyStats: typeof monthlyStats;
        testPassRates: typeof testPassRates;
        topCourses: typeof topCourses;
      },
      void
    >({
      queryFn: async () => {
        await delay(300);
        return {
          data: {
            monthlyStats,
            testPassRates,
            topCourses,
          },
        };
      },
    }),

    // Auth
    login: builder.mutation<{ user: User; token: string }, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        await delay(500);
        if (password === 'demo123') {
          const isAdmin = email.toLowerCase().includes('admin');
          const user: User = {
            id: `user_${Date.now()}`,
            name: isAdmin ? 'Admin User' : 'Demo User',
            email,
            role: isAdmin ? 'admin' : 'user',
            status: 'active',
            joinedAt: new Date().toISOString(),
            enrolledCourses: 3,
            completedTests: 5,
          };
          return { data: { user, token: 'mock-jwt-token' } };
        }
        return { error: { status: 401, data: 'Invalid credentials' } };
      },
    }),
    register: builder.mutation<{ user: User; token: string }, { name: string; email: string; password: string }>({
      queryFn: async ({ name, email }) => {
        await delay(500);
        const user: User = {
          id: `user_${Date.now()}`,
          name,
          email,
          role: 'user',
          status: 'active',
          joinedAt: new Date().toISOString(),
          enrolledCourses: 0,
          completedTests: 0,
        };
        return { data: { user, token: 'mock-jwt-token' } };
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useToggleUserStatusMutation,
  useGetCoursesQuery,
  useGetTestsQuery,
  useCreateTestMutation,
  useGetUserTestsQuery,
  useGetTransactionsQuery,
  useGetCertificatesQuery,
  useApproveCertificateMutation,
  useGetDashboardStatsQuery,
  useLoginMutation,
  useRegisterMutation,
} = api;
