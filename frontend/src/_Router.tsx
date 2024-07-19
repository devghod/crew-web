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

const ErrorPage = lazy(() => import('./error-page'));
const RootPage = lazy(() => import('./pages/root'));
const LoginPage = lazy(() => import('./pages/login'));
const StatisticsPage = lazy(() => import('./pages/StatisticsPage'));
const DebtCentralPage = lazy(() => import('./pages/debt'));
const InventoryCentralPage = lazy(() => import('./pages/inventory'));
const Dashboard = lazy(() => import('./components/Dashboard'));

const Routers: React.FC = () => {

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<RootPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<StatisticsPage />} />
              <Route path="debt" element={<DebtCentralPage />} />
              <Route path="inventory" element={<InventoryCentralPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} /> 
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default Routers;