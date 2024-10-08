import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import EditPerfil from "./pages/EditPerfil"
import LandingPage from "./pages/LandingPage"
import FormLogin from "./components/FormLogin/FormLogin";
import ForgotPassword from "./components/EsqueceuSenha/ForgotPassword";
import VerifyCode from "./components/EsqueceuSenha/VerifyCode"
import ResetPassword from "./components/EsqueceuSenha/ResetPassword"
import Cadastro from "./components/Cadastro/Cadastro";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  exact element={<LandingPage />}/>
        <Route path="home" element={<Home />} />
        <Route path="editar_perfil" element={<EditPerfil/>}/>
        <Route path="login" element={<FormLogin/>} />
        <Route path="cadastro" element={<Cadastro/>} />
        <Route path="esqueci_senha" element={<ForgotPassword/>} />
        <Route path="verify-code" element={<VerifyCode/>} />
        <Route path="resetar-senha" element={<ResetPassword/>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
