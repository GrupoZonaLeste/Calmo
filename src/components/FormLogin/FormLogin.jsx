import React from 'react';
import { jwtDecode } from "jwt-decode";
import './FormLogin.css';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function FormLogin() {
    const responseGoogle = (response) => {
        const token = response.credential;
        const userInfo = jwtDecode(token);
        console.log("Dados do usuário:", userInfo);
    };

    const responseError = () => {
        console.log("Falha no login");
    };

    return (
        <div className="login-box">
            <Link to={"/"}><div className="back-button-login">←</div></Link>
            <h1>LOGIN</h1>
            <form>
                <input type="email" placeholder="Digite o seu email" />
                <input type="password" placeholder="Digite a sua senha" />

                <Link to={"/home"}><button type="submit">ENTRAR</button></Link>
                <div className="divider-logi"></div>
                <Link to={"/esqueci_senha"} className="red">Esqueceu a Senha? <span>CLIQUE AQUI</span></Link>
                <Link to={"/cadastro"} className="blue">Não Possui Conta? <span>CLIQUE AQUI</span></Link>
            </form>

            <GoogleOAuthProvider clientId="636876737817-3jf723ketrc3p8abh3e458gqkn4ts1pa.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={responseGoogle}
                    onError={responseError}
                    text="signin_with"
                    size="medium"
                    theme="filled_black"
                    shape='circle'
                />
            </GoogleOAuthProvider>
        </div>
    );
}

export default FormLogin;
