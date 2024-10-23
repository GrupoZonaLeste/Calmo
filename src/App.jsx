import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home"
import EditPerfil from "./pages/EditarPerfil/EditPerfil"
import LandingPage from "./pages/LandingPage/LandingPage"
import FormLogin from "./components/FormLogin/FormLogin";
import ForgotPassword from "./components/EsqueceuSenha/ForgotPassword";
import VerifyCode from "./components/EsqueceuSenha/VerifyCode"
import ResetPassword from "./components/EsqueceuSenha/ResetPassword"
import Cadastro from "./components/Cadastro/Cadastro";
import Anotacoes from "./pages/ModoAnotações/Anotacoes";
import Musica from "./pages/ModoMusica/Musica";
import Leitura from "./pages/ModoLeitura/Leitura";
import Fitness from "./pages/ModoFitness/Fitness";
import Agenda from "./pages/ModoAgenda/Agenda"
import PaginaAnotacoes from "./components/ModoAnotacoes/PaginaAnotacoes/PaginaAnotacoes";

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
        <Route path="anotacoes" element={<Anotacoes/>}/>
        <Route path="musicas" element={<Musica/>}/>
        <Route path="leitura" element={<Leitura/>}/>
        <Route path="fitness" element={<Fitness/>}/>
        <Route path="agenda" element={<Agenda/>}/>
        <Route path="pagina_teste" element={<PaginaAnotacoes/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
