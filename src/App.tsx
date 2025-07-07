import { Route, Routes } from "react-router-dom";
import Loginpage from "./pages/login-page";
import SignupPage from "./pages/signup-page";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupPage />} />
      <Route path="/Login" element={<Loginpage />} />
    </Routes>
  )
}

export default App