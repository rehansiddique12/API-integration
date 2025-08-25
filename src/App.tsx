import DashboardLayout from "./components/layout/dashboard-layout";
import RouteGuard from "./components/route-guard";
import Dashboard from "./pages/dashbord";
import Loginpage from "./pages/login-page";
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
      <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
