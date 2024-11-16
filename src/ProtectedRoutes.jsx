import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "./services/firebase_config"; // Importe o Firebase Authentication

import './index.css'

const ProtectedRoutes = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Verifica o estado de autenticação
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return () => unsubscribe(); // Limpa o listener quando o componente for desmontado
    }, []);

    // Se não houver usuário, redireciona para o login
    if (user === null) {
        return <div className="loading">Carregando...</div>; // Você pode exibir uma tela de loading enquanto espera o estado de autenticação
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
