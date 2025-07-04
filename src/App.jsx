import { Route, Routes } from "react-router-dom"
import "./assets/css/App.css"
import Login from "./pages/Login"
import Welcome from "./pages/Welcome"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import VerifyEmail from "./pages/VerifyEmail"
import VerifyNumber from "./pages/VerifyNumber"
import CreatePassword from "./pages/CreatePasword"
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verify-number" element={<VerifyNumber />} />
      <Route path="/create-password" element={<CreatePassword />} />
    </Routes>
  )
}

export default App