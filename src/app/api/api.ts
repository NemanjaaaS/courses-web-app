import { createApi } from '@reduxjs/toolkit/query/react';
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
import { axiosBaseQuery } from './apiService';
import type { UserData } from '../pages/auth/types/User';
import type { RegisterFormData } from '../pages/auth/RegisterPage';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const authUrl = '/auth';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Users', 'Courses', 'Tests', 'UserTests', 'Transactions', 'Certificates'],
  endpoints: (builder) => ({
    // ================= MOCK =================

    getUsers: builder.query<User[], void>({
      queryFn: async () => {
        await delay(300);
        return { data: mockUsers };
      },
      providesTags: ['Users'],
    }),

    // toggleUserStatus: builder.mutation<User, string>({
    //   queryFn: async (userId) => {
    //     await delay(200);
    //     const user = mockUsers.find((u) => u.id === userId);
    //     if (user) {
    //       user.status = user.status === 'active' ? 'inactive' : 'active';
    //       return { data: user };
    //     }
    //     return { error: { status: 404, data: 'User not found' } };
    //   },
    //   invalidatesTags: ['Users'],
    // }),

    getCourses: builder.query<Course[], void>({
      queryFn: async () => {
        await delay(300);
        return { data: mockCourses };
      },
      providesTags: ['Courses'],
    }),

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

    getUserTests: builder.query<UserTest[], void>({
      queryFn: async () => {
        await delay(300);
        return { data: mockUserTests };
      },
      providesTags: ['UserTests'],
    }),

    getTransactions: builder.query<Transaction[], void>({
      queryFn: async () => {
        await delay(300);
        return { data: mockTransactions };
      },
      providesTags: ['Transactions'],
    }),

    getCertificates: builder.query<Certificate[], void>({
      queryFn: async () => {
        await delay(300);
        return { data: mockCertificates };
      },
      providesTags: ['Certificates'],
    }),

    // approveCertificate: builder.mutation<Certificate, string>({
    //   queryFn: async (certId) => {
    //     await delay(200);
    //     const cert = mockCertificates.find((c) => c.id === certId);
    //     if (cert) {
    //       cert.status = 'approved';
    //       cert.approvedAt = new Date().toISOString();
    //       return { data: cert };
    //     }
    //     return { error: { status: 404, data: 'Certificate not found' } };
    //   },
    //   invalidatesTags: ['Certificates'],
    // }),

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

    // ================= REAL AUTH =================

    login: builder.mutation<{ authenticationToken: string; refreshToken: string }, { email: string; password: string }>({
      query: (body) => ({
        url: `${authUrl}/authenticate`,
        method: 'POST',
        data: body,
      }),
    }),

    register: builder.mutation<{ authenticationToken: string; refreshToken: string }, RegisterFormData>({
      query: (data) => ({
        url: `${authUrl}/register`,
        method: 'POST',
        data: data,
      }),
    }),

    //GET User info
    getUserInfo: builder.mutation<UserData, void>({
      query: () => ({
        url: '/user/me',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  // useToggleUserStatusMutation,
  useGetCoursesQuery,
  useGetTestsQuery,
  useCreateTestMutation,
  useGetUserTestsQuery,
  useGetTransactionsQuery,
  useGetCertificatesQuery,
  // useApproveCertificateMutation,
  useGetDashboardStatsQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetUserInfoMutation,
} = api;
