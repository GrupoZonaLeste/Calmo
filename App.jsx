import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import EditPerfil from "./pages/EditarPerfil/EditPerfil";
import LandingPage from "./pages/LandingPage/LandingPage";
import FormLogin from "./pages/Login/Login";
import EsqueceuSenha from "./pages/EsqueceuSenha/RecuperarSenha";
import Cadastro from "./pages/Cadastro/Cadastro";
import Anotacoes from "./pages/ModoAnotações/Anotacoes";
import Musica from "./pages/ModoMusica/Musica";
import Leitura from "./pages/ModoLeitura/Leitura";
import Fitness from "./pages/ModoFitness/Fitness";
import Agenda from "./pages/ModoAgenda/Agenda";
import Grifos from "./pages/ModoLeitura/Grifos";
import PaginaAnotacoes from "./components/ModoAnotacoes/PaginaAnotacoes/PaginaAnotacoes";
import DietaPage from "./pages/ModoFitness/Dieta";
import RotinaPage from "./pages/ModoFitness/Rotina";
import TreinoPage from "./pages/ModoFitness/Treinos";

function App() {
  useEffect(() => {
    // Adiciona o script do VLibras ao carregar o componente
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = () => {
      // Inicializa o VLibras após o script carregar
      new window.VLibras.Widget("https://vlibras.gov.br/app");
    };

    // Adiciona o script ao corpo da página
    document.body.appendChild(script);

    return () => {
      // Remove o script quando o componente for desmontado
      document.body.removeChild(script);
    };
  }, []);

  return (
    <BrowserRouter>
      {/* Div que o VLibras vai associar */}
      <div vw="true" className="enabled" >
        <div vw-access-button="true" className="active"></div>
        <div vw-plugin-wrapper="true">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>

      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="home" element={<Home />} />
        <Route path="editar_perfil" element={<EditPerfil />} />
        <Route path="login" element={<FormLogin />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="esqueci_senha" element={<EsqueceuSenha />} />
        <Route path="anotacoes" element={<Anotacoes />} />
        <Route path="musicas" element={<Musica />} />
        <Route path="leitura" element={<Leitura />} />
        <Route path="meus_grifos" element={<Grifos />} />
        <Route path="fitness" element={<Fitness />} />
        <Route path="agenda" element={<Agenda />} />
        <Route path="pagina_teste" element={<PaginaAnotacoes />} />
        <Route path="dieta" element={<DietaPage />} />
        <Route path="rotinas" element={<RotinaPage />} />
        <Route path="treinos" element={<TreinoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;