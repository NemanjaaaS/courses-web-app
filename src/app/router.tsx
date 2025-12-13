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
                const { AdminDashboardRoute } = await import('./routes/admin/AdminDashboardRoute');
                return { Component: AdminDashboardRoute };
              },
            },
            {
              path: 'users',
              lazy: async () => {
                const { UsersRoute } = await import('./routes/admin/UsersRoute');
                return { Component: UsersRoute };
              },
            },
            {
              path: 'courses',
              lazy: async () => {
                const { CoursesTableRoute } = await import('./routes/admin/CoursesTableRoute');
                return { Component: CoursesTableRoute };
              },
            },
            {
              path: 'tests',
              lazy: async () => {
                const { TestsRoute } = await import('./routes/admin/TestsRoute');
                return { Component: TestsRoute };
              },
            },
            {
              path: 'results',
              lazy: async () => {
                const { ResultsRoute } = await import('./routes/admin/ResultsRoute');
                return { Component: ResultsRoute };
              },
            },
            {
              path: 'certificates',
              lazy: async () => {
                const { CretificatesRoute } = await import('./routes/admin/CretificatesRoute');
                return { Component: CretificatesRoute };
              },
            },
            {
              path: 'transactions',
              lazy: async () => {
                const { TransactionsRoute } = await import('./routes/admin/TransactionsRoute');
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
                const { UserDashboardRoute } = await import('./routes/user/UserDashboardRoute');
                return { Component: UserDashboardRoute };
              },
            },
            {
              path: 'courses',
              lazy: async () => {
                const { UserCoursesRoute } = await import('./routes/user/UserCoursesRoute');
                return { Component: UserCoursesRoute };
              },
            },
            {
              path: 'my-tests',
              lazy: async () => {
                const { MyTestsRoute } = await import('./routes/user/MyTestsRoute');
                return { Component: MyTestsRoute };
              },
            },
            {
              path: 'certificates',
              lazy: async () => {
                const { CertificatesRoute } = await import('./routes/user/CertificatesRoute');
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
