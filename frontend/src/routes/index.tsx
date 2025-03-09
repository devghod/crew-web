import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../utils/RouteController/PrivateRoute';
import PublicRoute from '../utils/RouteController/PublicRoute';
import { AuthProvider } from '../utils/RouteController/AuthProvider';
import SuspenseLoader from '../components/SuspenseLoader';

const Dashboard = lazy(() => import('../components/Dashboard'));
const ErrorPage = lazy(() => import('../error-page'));
const RootPage = lazy(() => import('../pages/root'));
const LoginPage = lazy(() => import('../pages/login'));
const StatisticsPage = lazy(() => import('../pages/main'));
const AccountPage = lazy(() => import('../pages/account'));
const AccountDetails = lazy(() => import('../pages/account/AccountDetails'));
const InventoryPage = lazy(() => import('../pages/inventory'));

const Routers = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<SuspenseLoader />}>
        <AuthProvider>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path='' element={<RootPage />} />
              <Route path='login' element={<LoginPage />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/dashboard' element={<Dashboard />}>
                <Route path='' element={<StatisticsPage />} />
                <Route path='account' element={<AccountPage />} />
                <Route path='account/:id' element={<AccountDetails />} />
                <Route path='inventory' element={<InventoryPage />} />
              </Route>
            </Route>
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
