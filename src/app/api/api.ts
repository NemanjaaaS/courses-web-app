import { createApi } from '@reduxjs/toolkit/query/react';
import {
  mockUsers,
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
  type TestList,
} from '../../lib/types';
import { axiosBaseQuery } from './apiService';
import type { UserData } from '../pages/auth/types/User';
import type { RegisterFormData } from '../pages/auth/RegisterPage';
import type { NewCourse } from '../pages/admin/AdminCoursesPage';
import type { TestFormData } from '../pages/admin/AdminTestsPage';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const authUrl = '/auth';
const coursesUrl = '/course';
const adminUrl = '/admin';
const testsUrl = '/test';

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
      query: () => ({
        url: `${coursesUrl}/all`,
        method: 'GET',
      }),
      providesTags: ['Courses'],
    }),

    createCourse: builder.mutation<Course, NewCourse>({
      query: (data) => ({
        url: `${adminUrl}/create-course`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Courses'],
    }),

    deleteCourse: builder.mutation<string, number>({
      query: (courseId) => ({
        url: `${adminUrl}/delete-course/${courseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Courses'],
    }),

    getTests: builder.query<TestList[], void>({
      query: () => ({
        url: `${testsUrl}/all`,
      }),
      providesTags: ['Tests'],
    }),

    createTest: builder.mutation<Test, TestFormData>({
      query: (test) => ({
        url: `${adminUrl}/create-test`,
        method: 'POST',
        data: test,
      }),
      invalidatesTags: ['Tests'],
    }),

    deleteTest: builder.mutation<string, number>({
      query: (testId) => ({
        url: `${adminUrl}/delete-test/${testId}`,
        method: 'DELETE',
      }),
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
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useDeleteTestMutation,
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
