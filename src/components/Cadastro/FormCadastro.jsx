import React, { useState } from 'react';
import './FormCadastro.css';
import { Link } from 'react-router-dom';
import Axios from "axios";
import criarUser from '../../models/models'

//fazer handleback depois na linha 8 {navigate-1}
const FormCadastro = () => {
  const [dataUser, setDataUser] = useState(criarUser("","","","","","",""))
  const [confirmarSenha, setConfirmarSenha] = useState("")

  async function cadastrar(){
    if(dataUser.nome == "" || dataUser.email == "" || dataUser.telefone == "" || dataUser.senha == ""){
      alert("preencha os campos")
      return
    } if (confirmarSenha.target.value != dataUser.senha){
      console.log(confirmarSenha , dataUser.senha)
      alert("senhas não correspondem")
      return
    }
    await Axios.request({
      method: "POST",
      url: `${import.meta.env.VITE_URL_SERVER}/cadastrar`,
      data: dataUser
    })
      alert("cadastro feito com sucesso!")
      let url = window.location.toString();
      window.location = url.replace("/cadastro", "/login")
  }
  
  const updateNome = (event) => {
    setDataUser(previousState => {
      return { ...previousState, nome: event.target.value }
    });
  }
  const updateEmail = (event) => {
    setDataUser(previousState => {
      return { ...previousState, email: event.target.value }
    });
  }
  const updateTelefone = (event) => {
    setDataUser(previousState => {
      return { ...previousState, telefone: event.target.value }
    });
  }
  const updateSenha = (event) => {
    setDataUser(previousState => {
      return { ...previousState, senha: event.target.value }
    });
  }
  
  return (
    <div className="container-Cadastro">
      <Link to={"/login"}> 
        <button className="back-button-cadastro">
          &#8592;
        </button>
      </Link>
      <h1 className="title-cadastro">Cadastro</h1>
      <form className="form-cadastro">
        <label htmlFor="nome" className="input-label-cadastro">Nome</label>
        <input type="text" id="nome-cadastro" placeholder="Nome" className="input-field-cadastro" onChange={updateNome}/>

        <label htmlFor="sobrenome" className="input-label-cadastro">Sobrenome</label>
        <input type="text" id="sobrenome-cadastro" placeholder="Sobrenome" className="input-field-cadastro" />

        <label htmlFor="email" className="input-label-cadastro">Email</label>
        <input type="email" id="email-cadastro" placeholder="Email" className="input-field-cadastro" onChange={updateEmail}/>

        <label htmlFor="telefone" className="input-label-cadastro">Telefone</label>
        <input type="tel" id="telefone-cadastro" placeholder="Telefone" className="input-field-cadastro" onChange={updateTelefone} />

        <label htmlFor="senha" className="input-label-cadastro">Senha</label>
        <input type="password" id="senha-cadastro" placeholder="Senha" className="input-field-cadastro" onChange={updateSenha} />

        <label htmlFor="confirmarSenha" className="input-label-cadastro">Confirmar Senha</label>
        <input type="password" id="confirmarSenha-cadastro" placeholder="Confirmar Senha" className="input-field-cadastro" onChange={setConfirmarSenha}/>

          <button type="submit" className="submit-button-cadastro" onClick={cadastrar}>
            Cadastrar
          </button>
      </form>
    </div>
  );
}


export default FormCadastro;