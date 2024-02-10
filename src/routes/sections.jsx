import { Pending } from '@mui/icons-material';
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const LoginPage = lazy(() => import('src/pages/login'));
export const CatagoryPage = lazy(() => import('src/pages/catagories'));
export const CoursePage = lazy(() => import('src/pages/courses'));
export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const QuizPage = lazy(() => import('src/pages/qizzes'));
export const FeedbackPage = lazy(() => import('src/pages/feedback'));
export const PendingPage = lazy(() => import('src/pages/pending'));
export const NotificationPage = lazy(() => import('src/pages/notifications'));

export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '', // Root route
      element: <LoginPage />, // Show login page by default
    },

    {
      path: 'dashboard', // Dashboard route
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'category', element: <CatagoryPage /> },
        { path: 'course', element: <CoursePage /> },
        { path: 'quiz', element: <QuizPage /> },
        { path: 'feedbacks', element: <FeedbackPage /> },
        { path: 'pending', element: <PendingPage /> },
        { path: 'notifications', element: <NotificationPage /> },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
