import { Route, Routes } from "react-router-dom";
import Mainpage from "./pages/main-page";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
    </Routes>
  )
}

export default App