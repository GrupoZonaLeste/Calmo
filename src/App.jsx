import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home"
import EditPerfil from "./pages/EditarPerfil/EditPerfil"
import LandingPage from "./pages/LandingPage/LandingPage"
import FormLogin from "./pages/Login/Login";
import EsqueceuSenha from "./pages/EsqueceuSenha/RecuperarSenha"
import Cadastro from "./pages/Cadastro/Cadastro"
import Anotacoes from "./pages/ModoAnotações/Anotacoes";
import Musica from "./pages/ModoMusica/Musica";
import Leitura from "./pages/ModoLeitura/Leitura";
import Fitness from "./pages/ModoFitness/Fitness";
import Agenda from "./pages/ModoAgenda/Agenda"
import Grifos from "./pages/ModoLeitura/Grifos";
import PaginaAnotacoes from "./components/ModoAnotacoes/PaginaAnotacoes/PaginaAnotacoes";
import DietaPage from "./pages/ModoFitness/Dieta";
import RotinaPage from "./pages/ModoFitness/Rotina";
import TreinoPage from "./pages/ModoFitness/Treinos"
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  exact element={<LandingPage />}/>
        <Route path="home" element={<Home />} />
        <Route path="editar_perfil" element={<EditPerfil/>}/>
        <Route path="login" element={<FormLogin/>} />
        <Route path="cadastro" element={<Cadastro/>} />
        <Route path="esqueci_senha" element={<EsqueceuSenha/>} />
        <Route path="anotacoes" element={<Anotacoes/>}/>
        <Route path="musicas" element={<Musica/>}/>
        <Route path="leitura" element={<Leitura/>}/>
        <Route path="meus_grifos" element={<Grifos/>}/>
        <Route path="fitness" element={<Fitness/>}/>
        <Route path="agenda" element={<Agenda/>}/>
        <Route path="pagina/:idpagina" element={<PaginaAnotacoes/>}/>
        <Route path="dieta" element={<DietaPage/>}/>
        <Route path="rotinas" element={<RotinaPage/>}/>
        <Route path="treinos" element={<TreinoPage/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
