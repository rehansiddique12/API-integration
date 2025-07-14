import {Navigate, Route, Routes } from "react-router-dom";
import Loginpage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import RouteGuard from "./copmponents/route-guard";
import Dashbord from "./pages/dashbord";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Login" replace />} />
      <Route path="/register" element={<SignupPage />} />
      <Route path="/Login" element={<Loginpage />} />
      <Route element={<RouteGuard/>}>
        <Route path="/dashbord" element={<Dashbord/>} />
      </Route>
    </Routes>
  )
}

export default App