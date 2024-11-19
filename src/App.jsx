import React, { useState } from 'react';
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
import TreinoPage from "./pages/ModoFitness/Treinos";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  const [lightMode, setLightMode] = useState(true)
  console.log(lightMode)
  return (
    <>
    <button className={lightMode ? "btnDarkLight" : "btnDarkLightOK"} onClick={() => {
      setLightMode(!lightMode)
      if(lightMode) document.body.style.backgroundColor = "#f2f2f2" 
      if(!lightMode) document.body.style.backgroundColor = "#212121" 
    }}>{lightMode == false ? "Modo Dark" : "Modo Light"}</button>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage lightmode={lightMode} />} />
        <Route path="login" element={<FormLogin lightmode={lightMode} />} />
        <Route path="cadastro" element={<Cadastro lightmode={lightMode} />} />
        <Route path="esqueci_senha" element={<EsqueceuSenha lightmode={lightMode} />} />

        {/* Rotas protegidas */}
        <Route element={<ProtectedRoutes />}>
          <Route path="home" element={<Home lightmode={lightMode} />} />
          <Route path="editar_perfil" element={<EditPerfil lightmode={lightMode} />} />
          <Route path="anotacoes" element={<Anotacoes lightmode={lightMode} />} />
          <Route path="musicas" element={<Musica lightmode={lightMode} />} />
          <Route path="leitura" element={<Leitura lightmode={lightMode} />} />
          <Route path="meus_grifos" element={<Grifos lightmode={lightMode} />} />
          <Route path="fitness" element={<Fitness lightmode={lightMode} />} />
          <Route path="agenda" element={<Agenda lightmode={lightMode} />} />
          <Route path="pagina/:idpagina" element={<PaginaAnotacoes lightmode={lightMode} />} />
          
          
          {/* Dietas e ModoFitness */}
          <Route path="/dietas/:dietId" element={<DietaPage lightmode={lightMode} />} />
          <Route path="/fitness" element={<Fitness lightmode={lightMode} />} />
          <Route path="treinos/:treinoId" element={<TreinoPage lightmode={lightMode} />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
