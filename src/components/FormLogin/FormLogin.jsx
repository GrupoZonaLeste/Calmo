import React, { useEffect } from 'react';
import './FormLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useAuthState } from 'react-firebase-hooks/auth'; // Importante para autenticação, não mexer!
import { auth } from '../../services/firebase_config';
import Swal from 'sweetalert2';


import { db } from '../../services/firebase_config'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
 
function FormLogin(props) {
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [authUser, authLoading] = useAuthState(auth); // Verifica o estado de autenticação do usuário
    const navigate = useNavigate();

    // Se o o usuário ja tiver logado já manda ele pra home 🔥
    useEffect(() => {
        if (authUser) {
            navigate('/home');
        }
    }, [authUser, navigate]);

    async function AddCollectionVerificar(coll, key, valor, add){
    const querySnapshot = await getDocs(collection(db, coll));
        let userUnico = false
        querySnapshot.forEach(element => {
            if(element.data()[key] == valor){
                userUnico = true
            }
        })
        if(!userUnico){
            await addDoc(collection(db, coll), add);
        }
    }

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Usuário autenticado com Google:", user);
            
            AddCollectionVerificar("anotacoes", "user", user.email, {
                itens: [],
                user: user.email
            })
            AddCollectionVerificar("users", "email", user.email, {
                "nome": user.displayName,
                "email": user.email,
                "telefone": "",
                "foto": "",
                "tokensapi": {
                    "tokenspotify":"",
                    "tokengoogle": ""
                }
            })
            sessionStorage.setItem("emailuserid", user.email)
            Swal.fire("Sucesso", "Login realizado com sucesso com o Google!", "success");
            navigate('/home');
        } catch (error) {
            console.log("Erro no login com Google:", error);
            Swal.fire("Erro", error.message, "error");
        }
    };
    
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        sessionStorage.setItem("emailuserid", email)
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
        <div className="login-box" style={!props.lightmode ? {backgroundColor: "#ffffff"}: null}>
            <Link to={"/"}><div className="back-button-login" style={!props.lightmode ? {color: "#212121" }: null}>←</div></Link>
            <h1 style={!props.lightmode ? {color: "#212121"}: null}>LOGIN</h1>
            <form onSubmit={handleEmailLogin}>
                <label style={!props.lightmode ? {color: "#212121", margin: '0', display:'flex'}:{margin: '0', color:"#ffffff", display:'flex'}}>Nome:</label>
                <input type="email" name="email" placeholder="Digite o seu email" required  style={!props.lightmode ? {backgroundColor: "#f2f2f2", color: "#212121"}:null}/>
                <label style={!props.lightmode ? {color: "#212121", margin: '0', display:'flex'}:{margin: '0', color:"#ffffff", display:'flex'}} >Senha:</label>
                <input type="password" name="password" placeholder="Digite a sua senha" required style={!props.lightmode ? {backgroundColor: "#f2f2f2", color: "#212121"}:null} />
                <button className="button-entrar" type="submit" disabled={loading}>
                    {loading ? "Carregando..." : "ENTRAR"}
                </button>
                <div className="divider-login"></div>
                <Link to={"/esqueci_senha"} className="red"style={!props.lightmode ? {color: "#212121"}:null}>Esqueceu a Senha? <span>CLIQUE AQUI</span></Link>
                <Link to={"/cadastro"} className="blue" style={!props.lightmode ? {color: "#212121"}:null}>Não Possui Conta? <span>CLIQUE AQUI</span></Link>
                <div className="divider-login"></div>
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
