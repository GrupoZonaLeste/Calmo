import React, { useEffect } from 'react';
import './FormLogin.css';
import { Link } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase_config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function FormLogin() {
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const navigate = useNavigate();

    // login com a api do google
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Usuário autenticado com Google:", user);

            // sucesso
            Swal.fire("Sucesso", "Login realizado com sucesso com o Google!", "success");

            // manda pra home
            navigate('/home');

            //erro
        } catch (error) {
            console.log("Erro no login com Google:", error);
            Swal.fire("Erro", error.message, "error");
        }
    };

    // login com email e senha padrão
    const handleEmailLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(email, password);
    };

    // loading
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

    // sucesso
    useEffect(() => {
        if (user) {
            Swal.fire("Sucesso", "Login realizado com sucesso!", "success");
            // Redireciona para a página inicial ou outra página
            navigate('/home'); // Usando navigate ao invés de history.push
        }
    }, [user, navigate]);

    // erro
    useEffect(() => {
        if (error) {
            // debug para dev: Swal.fire("Erro", error.message, "error");
            //Mensagem para o usuário:
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
                
                <Link to={"/esqueci_senha"} className="red">
                    Esqueceu a Senha? <span>CLIQUE AQUI</span>
                </Link>
                
                <Link to={"/cadastro"} className="blue">
                    Não Possui Conta? <span>CLIQUE AQUI</span>
                </Link>
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
