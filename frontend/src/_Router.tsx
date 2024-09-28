import 
  React,
  { 
    lazy, 
    Suspense 
  } 
from "react";
import 
  {
    BrowserRouter,
    Routes,
    Route,
  } 
from "react-router-dom";
import PrivateRoute from "./utils/RouteController/PrivateRoute";
import PublicRoute from "./utils/RouteController/PublicRoute";
import { AuthProvider } from "./utils/RouteController/AuthProvider";
import SuspenseLoader from "./components/SuspenseLoader";

const Dashboard = lazy(() => import('./components/Dashboard'));
const ErrorPage = lazy(() => import('./error-page'));
const RootPage = lazy(() => import('./pages/root'));
const LoginPage = lazy(() => import('./pages/login'));
const StatisticsPage = lazy(() => import('./pages/StatisticsPage'));
const DebtCentralPage = lazy(() => import('./pages/debt'));
const InventoryCentralPage = lazy(() => import('./pages/inventory'));
const AccountPage = lazy(() => import('./pages/account'));

const Routers: React.FC = () => {

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<SuspenseLoader />}>
          <AuthProvider>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="" element={<RootPage />} />
                <Route path="login" element={<LoginPage />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route index element={<StatisticsPage />} />
                  <Route path="debt" element={<DebtCentralPage />} />
                  <Route path="inventory" element={<InventoryCentralPage />} />
                  <Route path="account" element={<AccountPage />} />
                </Route>
              </Route>
              <Route path="*" element={<ErrorPage />} /> 
            </Routes>
          </AuthProvider>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default Routers;