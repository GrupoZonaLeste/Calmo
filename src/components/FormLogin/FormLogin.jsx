import React from 'react';
import './FormLogin.css'; // Importa o CSS
import { Link } from 'react-router-dom';

const FormLogin = () => {
    return ( 
        <div className="login-box">
            <Link to={"/"}><div className="back-button-login">←</div></Link> {/* Seta na parte superior esquerda */}
            <h1>LOGIN</h1>
            <form>
                <input type="email" placeholder="Digite o seu email"  />
                <input type="password" placeholder="Digite a sua senha"  />

                {/* Botão Entrar */}
                <Link to={"/home"}><button type="submit">ENTRAR</button></Link>

                {/* Linha divisória */}
                <div className="divider-logi"></div>

                {/* Links abaixo da linha */}
                <Link to={"/esqueci_senha"}><a href="#" className="red">Esqueceu a Senha?  <span>CLIQUE AQUI</span></a></Link>
                <Link to={"/cadastro"}><a href="#" className="blue">Não Possui Conta? <span>CLIQUE AQUI</span></a></Link>
            </form>
        </div>
    );
};

export default FormLogin;
