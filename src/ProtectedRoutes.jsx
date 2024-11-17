import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "./services/firebase_config"; 

const ProtectedRoutes = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
       
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return () => unsubscribe(); 
    }, []);

    
    if (user === null) {
        return <div>Loading...</div>; 
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
