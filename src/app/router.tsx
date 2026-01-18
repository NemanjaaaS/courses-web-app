// router.tsx or AppRouter.tsx
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from '../App';
import { AuthRoot } from './pages/auth/AuthRoute';

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/app" replace />,
    },
    {
      path: '/auth',
      element: <AuthRoot />,
      children: [
        {
          path: 'register',
          lazy: async () => {
            const { RegisterPage } = await import('./pages/auth/RegisterPage');
            return { Component: RegisterPage };
          },
        },
        {
          path: 'login',
          lazy: async () => {
            const { LoginPage } = await import('./pages/auth/LoginPage');
            return { Component: LoginPage };
          },
        },
      ],
    },
    {
      path: '/app',
      element: <App />, // common shell (auth, theme, etc.)
      children: [
        // ---------- ADMIN ----------
        {
          path: 'admin',
          children: [
            { index: true, element: <Navigate to="dashboard" replace /> },

            {
              path: 'dashboard',
              lazy: async () => {
                const { AdminDashboardRoute } = await import('./pages/admin/AdminDashboardPage');
                return { Component: AdminDashboardRoute };
              },
            },
            {
              path: 'users',
              lazy: async () => {
                const { UsersRoute } = await import('./pages/admin/AdminUsersPage');
                return { Component: UsersRoute };
              },
            },
            {
              path: 'courses',
              lazy: async () => {
                const { AdminCoursesPage } = await import('./pages/admin/AdminCoursesPage');
                return { Component: AdminCoursesPage };
              },
            },
            {
              path: 'tests',
              lazy: async () => {
                const { AdminTestsPage } = await import('./pages/admin/AdminTestsPage');
                return { Component: AdminTestsPage };
              },
            },
            {
              path: 'results',
              lazy: async () => {
                const { AdminResultsPage } = await import('./pages/admin/AdminResultsPage');
                return { Component: AdminResultsPage };
              },
            },
            {
              path: 'requests',
              lazy: async () => {
                const { AdminRequestsPage } = await import('./pages/admin/AdminRequestsPage');
                return { Component: AdminRequestsPage };
              },
            },
            {
              path: 'transactions',
              lazy: async () => {
                const { AdminTransactionsPage } = await import('./pages/admin/AdminTransactionsPage');
                return { Component: AdminTransactionsPage };
              },
            },
          ],
        },

        // ---------- USER ----------
        {
          path: 'user',
          children: [
            { index: true, element: <Navigate to="dashboard" replace /> },

            {
              path: 'dashboard',
              lazy: async () => {
                const { UserDashboardPage } = await import('./pages/user/UserDashboardPage');
                return { Component: UserDashboardPage };
              },
            },
            {
              path: 'user-courses',
              lazy: async () => {
                const { UserCoursesPage } = await import('./pages/user/UserCoursesPage');
                return { Component: UserCoursesPage };
              },
            },
            {
              path: 'my-tests',
              lazy: async () => {
                const { UserTestsPage } = await import('./pages/user/UserTestsPage');
                return { Component: UserTestsPage };
              },
            },
            {
              path: 'my-tests/:id',
              lazy: async () => {
                const { TestTakingPage } = await import('./pages/user/TestTakingPage');
                return { Component: TestTakingPage };
              },
            },
            {
              path: 'certificates',
              lazy: async () => {
                const { UserCertificatesPage } = await import('./pages/user/UserCertificatesPage');
                return { Component: UserCertificatesPage };
              },
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/app" replace />,
    },
  ]);

export function AppRouter() {
  return <RouterProvider router={createAppRouter()} />;
}
