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
                const { UserDashboardRoute } = await import('./pages/user/UserDashboardRoute');
                return { Component: UserDashboardRoute };
              },
            },
            {
              path: 'courses',
              lazy: async () => {
                const { UserCoursesRoute } = await import('./pages/user/UserCoursesRoute');
                return { Component: UserCoursesRoute };
              },
            },
            {
              path: 'my-tests',
              lazy: async () => {
                const { MyTestsRoute } = await import('./pages/user/MyTestsRoute');
                return { Component: MyTestsRoute };
              },
            },
            {
              path: 'certificates',
              lazy: async () => {
                const { CertificatesRoute } = await import('./pages/user/CertificatesRoute');
                return { Component: CertificatesRoute };
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
