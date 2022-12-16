import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import AllOrdersPage from './pages/AllOrdersPage';
import NewOrderPage from './pages/NewOrderPage';
import AllCustomersPage from './pages/AllCustomersPage';
import DeliveriesPage from './pages/DeliveriesPage';
import RegistrationPage from './pages/RegistrationPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'all-orders', element: <AllOrdersPage /> },
        { path: 'new-order', element: <NewOrderPage /> },
        { path: 'all-customers', element: <AllCustomersPage /> },
        { path: 'deliveries', element: <DeliveriesPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegistrationPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
