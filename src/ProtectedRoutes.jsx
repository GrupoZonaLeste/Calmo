import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "./services/firebase_config"; 

import './index.css'

const ProtectedRoutes = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
       
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return () => unsubscribe(); 
    }, []);

    
    if (user === null) {
        return <div className="loading">Carregando...</div>; // Você pode exibir uma tela de loading enquanto espera o estado de autenticação
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
