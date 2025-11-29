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
      path: '/app', // ← Fixed: added leading slash
      element: <App />,
      children: [
        {
          index: true,
          element: <Navigate to="/app/dashboard" replace />,
        },
        {
          path: 'dashboard',
          lazy: async () => {
            const { DashboardRoute } = await import('./routes/DashboardRoute.tsx');
            return { Component: DashboardRoute };
          },
        },
        {
          path: 'courses',
          lazy: async () => {
            const { CoursesTableRoute } = await import('./routes/CoursesTableRoute.tsx');
            return { Component: CoursesTableRoute };
          },
        },
      ],
    },
    // Optional: catch-all
    {
      path: '*',
      element: <Navigate to="/app" replace />,
    },
  ]);

export function AppRouter() {
  return <RouterProvider router={createAppRouter()} />;
}
