import React, { useEffect } from 'react';
import './FormLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useAuthState } from 'react-firebase-hooks/auth'; // Importante para autenticação, não mexer!
import { auth } from '../../services/firebase_config';
import Swal from 'sweetalert2';

function FormLogin() {
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [authUser, authLoading] = useAuthState(auth); // Verifica o estado de autenticação do usuário
    const navigate = useNavigate();

    // Se o o usuário ja tiver logado já manda ele pra home 🔥
    useEffect(() => {
        if (authUser) {
            navigate('/home');
        }
    }, [authUser, navigate]);

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Usuário autenticado com Google:", user);

            Swal.fire("Sucesso", "Login realizado com sucesso com o Google!", "success");
            navigate('/home');
        } catch (error) {
            console.log("Erro no login com Google:", error);
            Swal.fire("Erro", error.message, "error");
        }
    };

    const handleEmailLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(email, password);
    };
    //Quando tiver carregando
    useEffect(() => {
        if (loading) {
            Swal.fire({
                title: 'Carregando...',
                text: 'Autenticando usuário...',
                didOpen: () => {
                    Swal.showLoading();
                }
            });
        }
    }, [loading]);
     //Quando der tudo certo
    useEffect(() => {
        if (user) {
            Swal.fire("Sucesso", "Login realizado com sucesso!", "success");
            navigate('/home');
        }
    }, [user, navigate]);
    //Quando der erro
    useEffect(() => {
        if (error) {
            Swal.fire("Algo está errado!","Erro no login, Verifique suas credenciais", "error")
        }
    }, [error]);

    return (
        <div className="login-box">
            <Link to={"/"}><div className="back-button-login">←</div></Link>
            <h1>LOGIN</h1>
            <form onSubmit={handleEmailLogin}>
                <input type="email" name="email" placeholder="Digite o seu email" required />
                <input type="password" name="password" placeholder="Digite a sua senha" required />
                <button className="button-entrar" type="submit" disabled={loading}>
                    {loading ? "Carregando..." : "ENTRAR"}
                </button>
                <div className="divider-login"></div>
                <Link to={"/esqueci_senha"} className="red">Esqueceu a Senha? <span>CLIQUE AQUI</span></Link>
                <Link to={"/cadastro"} className="blue">Não Possui Conta? <span>CLIQUE AQUI</span></Link>
            </form>
            {/* Botão de login com Google */}
            <button className="google-login-button" onClick={handleGoogleLogin}>
                <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google logo" className="google-icon" height="20px" />
                Entrar com Google
            </button>
        </div>
    );
}

export default FormLogin;
