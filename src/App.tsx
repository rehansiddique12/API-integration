import RouteGuard from "./components/route-guard";
import Dashbord from "./pages/dashbord";
import Loginpage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import {Navigate, Route, Routes } from "react-router-dom";



const App = () => {
  return (
    <Routes>
      <Route
        element={
          <RouteGuard>
            <Dashbord/>
          </RouteGuard>
        }
      ></Route>
      <Route path="/" element={<Navigate to="/Login" replace />} />
      <Route path="/register" element={<SignupPage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/dashboard" element={<Dashbord/>} />
      
    </Routes>
  )
}

export default App