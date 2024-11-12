import React, { useState } from 'react';
import './FormCadastro.css';
import { Link } from 'react-router-dom';
import criarUser from '../../models/models';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase_config';
import Swal from 'sweetalert2';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  // Funções de atualização de estado (não estavam definidas)
  const updateNome = (e) => setDataUser({ ...dataUser, nome: e.target.value });
  const updateSobrenome = (e) => setDataUser({ ...dataUser, sobrenome: e.target.value });
  const updateTelefone = (e) => setDataUser({ ...dataUser, telefone: e.target.value });
  const updateSenha = (e) => setPassword(e.target.value);

  // Função para lidar com o cadastro
  const handleCadastro = async (e) => {
    e.preventDefault();

    // Verificar se as senhas coincidem antes de enviar ao Firebase
    if (password !== confirmarSenha) {
      Swal.fire("Erro", "As senhas não coincidem!", "error");
      return;
    }

    showLoadingAlert(); // Mostrar carregamento

    try {
      await createUserWithEmailAndPassword(email, password);
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
        <label htmlFor="nome" className="input-label-cadastro">Nome</label>
        <input type="text" id="nome-cadastro" placeholder="Nome" className="input-field-cadastro" onChange={updateNome} />

        <label htmlFor="sobrenome" className="input-label-cadastro">Sobrenome</label>
        <input type="text" id="sobrenome-cadastro" placeholder="Sobrenome" className="input-field-cadastro" onChange={updateSobrenome} />

        <label htmlFor="email" className="input-label-cadastro">Email</label>
        <input 
          type="email" 
          id="email-cadastro" 
          placeholder="Email" 
          className="input-field-cadastro" 
          onChange={(e) => setEmail(e.target.value)} 
        />

        <label htmlFor="telefone" className="input-label-cadastro">Telefone</label>
        <input type="tel" id="telefone-cadastro" placeholder="Telefone" className="input-field-cadastro" onChange={updateTelefone} />

        <label htmlFor="senha" className="input-label-cadastro">Senha</label>
        <input type="password" id="senha-cadastro" placeholder="Senha" className="input-field-cadastro" onChange={updateSenha} />

        <label htmlFor="confirmarSenha" className="input-label-cadastro">Confirmar Senha</label>
        <input 
          type="password" 
          id="confirmarSenha-cadastro" 
          placeholder="Confirmar Senha" 
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