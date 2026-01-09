// router.tsx or AppRouter.tsx
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from '../App';

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/app" replace />,
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
                const { CoursesTableRoute } = await import('./pages/admin/AdminCoursesTablePage');
                return { Component: CoursesTableRoute };
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
                const { ResultsRoute } = await import('./pages/admin/AdminResultsPage');
                return { Component: ResultsRoute };
              },
            },
            {
              path: 'certificates',
              lazy: async () => {
                const { CretificatesRoute } = await import('./pages/admin/AdminCretificatesPage');
                return { Component: CretificatesRoute };
              },
            },
            {
              path: 'transactions',
              lazy: async () => {
                const { TransactionsRoute } = await import('./pages/admin/AdminTransactionsPage');
                return { Component: TransactionsRoute };
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
