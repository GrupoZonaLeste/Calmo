import React, { useState } from 'react';
import './FormCadastro.css';
import { Link, useNavigate } from 'react-router-dom';
import criarUser from '../../models/models';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase_config';
import Swal from 'sweetalert2';
import { db } from '../../services/firebase_config'
import { doc, setDoc } from "firebase/firestore"; 
import axios from 'axios';

const showLoadingAlert = () => {
  Swal.fire({
    title: 'Carregando...',
    html: 'Por favor, aguarde.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
};

const FormCadastro = () => {
  const [dataUser, setDataUser] = useState(criarUser("", "", "", "", "", "", ""));
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const nav = useNavigate()
  
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  
  // Funções de atualização de estado
  const updateNome = (e) => setDataUser({ ...dataUser, nome: e.target.value });
  const updateSobrenome = (e) => setDataUser({ ...dataUser, sobrenome: e.target.value });
  const updateTelefone = (e) => setDataUser({ ...dataUser, telefone: e.target.value });
  const updateSenha = (e) => setDataUser(previousState => {
    return { ...previousState, password: e.target.value }
  })
  const updateEmail = (e) => setDataUser(previousState => {
    return { ...previousState, email: e.target.value }
  })

  // Função para adicionar dados do usuário no Firestore
  const AddUserToFirestore = async (user) => {
    try {
      // Usando o UID como ID do documento
      const userDocRef = doc(db, 'users', user.uid); // 'users' é sua coleção e user.uid é o ID do documento
      await setDoc(userDocRef, {
        nome: dataUser.nome,
        email: dataUser.email,
        telefone: dataUser.telefone,
        foto: dataUser.foto || "", // Optional
        senha: dataUser.password,
        tokensapi: {
          tokenspotify: "",
          tokengoogle: ""
        }
      });
    } catch (error) {
      console.error("Erro ao adicionar o usuário ao Firestore: ", error);
      Swal.fire("Erro", "Ocorreu um erro ao cadastrar o usuário no Firestore.", "error");
    }
  }

  // Função para lidar com o cadastro
  const handleCadastro = async (e) => {
    e.preventDefault();
    
    // Verificar se as senhas coincidem antes de enviar ao Firebase
    if (dataUser.password !== confirmarSenha) {
      Swal.fire("Erro", "As senhas não coincidem!", "error");
      return;
    }
    showLoadingAlert(); // Mostrar carregamento
    
    try {
      // Criar o usuário com Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(dataUser.email, dataUser.password);
      const user = userCredential.user; // Aqui está o objeto user com o uid

      // Adicionar o usuário ao Firestore usando o UID como ID do documento
      await AddUserToFirestore(user); 

      sessionStorage.setItem("emailuserid", dataUser.email);
      nav("/login");
      Swal.close(); // Fechar o alerta de carregamento após o cadastro
      Swal.fire("Sucesso!", "Usuário cadastrado com sucesso!", "success");

    } catch (error) {
      Swal.fire("Erro", error.message, "error");
    }
  };

  return (
    <div className="container-Cadastro">
      <Link to={"/login"}> 
        <button className="back-button-cadastro">
          &#8592;
        </button>
      </Link>
      <h1 className="title-cadastro">Cadastro</h1>
      <form className="form-cadastro" onSubmit={handleCadastro}>
        <label htmlFor="nome" className="input-label-cadastro">Nome:</label>
        <input type="text" id="nome-cadastro" placeholder="Digite o seu nome..." className="input-field-cadastro" onChange={updateNome} />

        <label htmlFor="sobrenome" className="input-label-cadastro">Sobrenome:</label>
        <input type="text" id="sobrenome-cadastro" placeholder="Digite o seu sobrenome..." className="input-field-cadastro" onChange={updateSobrenome} />

        <label htmlFor="email" className="input-label-cadastro">Email:</label>
        <input type="email" id="email-cadastro" placeholder="Digite o seu email..." 
          className="input-field-cadastro" onChange={updateEmail} 
        />

        <label htmlFor="telefone" className="input-label-cadastro">Telefone:</label>
        <input type="tel" id="telefone-cadastro" placeholder="Digite o seu telefone..." className="input-field-cadastro" onChange={updateTelefone} />

        <label htmlFor="senha" className="input-label-cadastro">Senha:</label>
        <input type="password" id="senha-cadastro" placeholder="Digite o sua senha..." className="input-field-cadastro" onChange={updateSenha} />

        <label htmlFor="confirmarSenha" className="input-label-cadastro">Confirmar Senha:</label>
        <input 
          type="password" 
          id="confirmarSenha-cadastro" 
          placeholder="Confirme sua senha..." 
          className="input-field-cadastro" 
          onChange={(e) => setConfirmarSenha(e.target.value)} 
        />

        <button type="submit" className="submit-button-cadastro">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default FormCadastro;
