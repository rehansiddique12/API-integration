import DashboardLayout from "./components/layout/dashboard-layout";
import RouteGuard from "./components/route-guard";
import Dashboard from "./pages/dashboard";

import Loginpage from "./pages/login-page";
import Products from "./pages/product";
import SignupPage from "./pages/signup-page";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<SignupPage />} />
      <Route path="/" element={<Loginpage />} />
      <Route
        element={
          <RouteGuard>
            <DashboardLayout />
          </RouteGuard>
        }
      >
        <Route path="/products" element={<Products />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
