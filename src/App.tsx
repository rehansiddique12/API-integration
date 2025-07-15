import Dashbord from "./pages/dashbord";
import Loginpage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import RouteGuard from "./components/route-guard";
import {Navigate, Route, Routes } from "react-router-dom";


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