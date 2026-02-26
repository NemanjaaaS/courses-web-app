import { createApi } from '@reduxjs/toolkit/query/react';
import {
  type Course,
  type Test,
  type UserTestResults,
  type Request,
  type TestList,
  type RequestTableFE,
  mapRequestToTableFE,
  mapUserTestBE2FE,
  type UserResultBE,
  type UserTable,
  type UserTableBE,
  mapUserTableBE2FE,
  type UserTest,
  type Question,
  type Answer,
  type CreateTestDTO,
  type Cerfiticates,
  type DashboardDTO,
  type UserDashboardDTO,
} from '../../lib/types';
import { axiosBaseQuery } from './apiService';
import type { UserData } from '../pages/auth/types/User';
import type { RegisterFormData } from '../pages/auth/RegisterPage';
import type { NewCourse } from '../pages/admin/AdminCoursesPage';

const authUrl = '/auth';
const coursesUrl = '/course';
const adminUrl = '/admin';
const testsUrl = '/test';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Users', 'Courses', 'Tests', 'UserTests', 'Transactions', 'Certificates', 'Requests'],
  endpoints: (builder) => ({
    // ================= COURSES =================
    getCourses: builder.query<Course[], void>({
      query: () => ({
        url: `${coursesUrl}/all`,
        method: 'GET',
      }),
      providesTags: ['Courses'],
    }),

    getCertificates: builder.query<Cerfiticates[], void>({
      query: () => ({
        url: `${coursesUrl}/certificates`,
        method: 'GET',
      }),
    }),

    getRequests: builder.query<RequestTableFE[], void>({
      query: () => ({
        url: `${coursesUrl}/requested-courses`,
        method: 'GET',
      }),
      transformResponse: (response: Request[]): RequestTableFE[] => response.map((request) => mapRequestToTableFE(request)),
      providesTags: ['Requests'],
    }),

    requestEnrollCourse: builder.mutation<string, number>({
      query: (courseId) => ({
        url: `${coursesUrl}/request-course/${courseId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Courses'],
    }),

    //GET All Users for table
    getAllUsers: builder.query<UserTable[], void>({
      query: () => ({
        url: `${adminUrl}/all-users`,
        method: 'GET',
      }),
      transformResponse: (response: UserTableBE[]): UserTable[] => response.map((user) => mapUserTableBE2FE(user)),
    }),
    // ================ ADMIN =================

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

    createTest: builder.mutation<Test, CreateTestDTO>({
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

    getAdminDashboard: builder.query<DashboardDTO, void>({
      query: () => ({
        url: `${adminUrl}/dashboard`,
        method: 'GET',
      }),
    }),

    changeRequestStatus: builder.mutation<string, { requestId: number; requestStatus: 'PENDING' | 'APPROVED' | 'REJECTED' }>({
      query: ({ requestId, requestStatus }) => ({
        url: `${adminUrl}/change-course-status`,
        method: 'POST',
        data: { requestId, requestStatus },
      }),
      invalidatesTags: ['Requests'],
    }),

    // ================= TESTS =================

    getTests: builder.query<TestList[], void>({
      query: () => ({
        url: `${testsUrl}/all`,
      }),
      providesTags: ['Tests'],
    }),

    //GET user tests
    getUserTests: builder.query<UserTest[], void>({
      query: () => ({
        url: `${testsUrl}/my-tests`,
        method: 'GET',
      }),

      providesTags: ['Tests'],
    }),

    getTestQuestions: builder.query<Question[], number>({
      query: (testId) => ({
        url: `${testsUrl}/questions/${testId}`,
        method: 'GET',
      }),
      providesTags: ['Tests'],
    }),
    submitTest: builder.mutation<{ percentage: number; passed: boolean }, { testId: number; answers: Answer[] }>({
      query: ({ testId, answers }) => ({
        url: `${testsUrl}/submit`,
        method: 'POST',
        data: { testId: testId, answers: answers },
      }),
      invalidatesTags: ['Tests'],
    }),

    getResults: builder.query<UserTestResults[], void>({
      query: () => ({
        url: `${testsUrl}/admin-tests-results`,
      }),
      transformResponse: (response: UserResultBE[]): UserTestResults[] => response.map((result) => mapUserTestBE2FE(result)),
      providesTags: ['Tests'],
    }),

    // ================ USER =================

    //GET User info
    getUserInfo: builder.mutation<UserData, void>({
      query: () => ({
        url: '/user/me',
        method: 'GET',
      }),
    }),

    getUserDashboard: builder.query<UserDashboardDTO, void>({
      query: () => ({
        url: `/user/dashboard`,
        method: 'GET',
      }),
    }),

    // ================= AUTH =================

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
  }),
});

export const {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useDeleteTestMutation,
  useGetTestsQuery,
  useCreateTestMutation,
  useGetRequestsQuery,
  useChangeRequestStatusMutation,
  useGetUserTestsQuery,
  useGetResultsQuery,
  useLazyGetTestQuestionsQuery,
  useSubmitTestMutation,
  useGetCertificatesQuery,
  useGetAdminDashboardQuery,
  useGetUserDashboardQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetUserInfoMutation,
  useGetAllUsersQuery,
  useRequestEnrollCourseMutation,
} = api;
