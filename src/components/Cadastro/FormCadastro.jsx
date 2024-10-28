import React from 'react';
import './FormCadastro.css';
import { Link } from 'react-router-dom';

//fazer handleback depois na linha 8 {navigate-1}
const FormCadastro = () => {
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
        <input type="text" id="nome-cadastro" placeholder="Nome" className="input-field-cadastro" />

        <label htmlFor="sobrenome" className="input-label-cadastro">Sobrenome</label>
        <input type="text" id="sobrenome-cadastro" placeholder="Sobrenome" className="input-field-cadastro" />

        <label htmlFor="email" className="input-label-cadastro">Email</label>
        <input type="email" id="email-cadastro" placeholder="Email" className="input-field-cadastro" />

        <label htmlFor="telefone" className="input-label-cadastro">Telefone</label>
        <input type="tel" id="telefone-cadastro" placeholder="Telefone" className="input-field-cadastro" />

        <label htmlFor="senha" className="input-label-cadastro">Senha</label>
        <input type="password" id="senha-cadastro" placeholder="Senha" className="input-field-cadastro" />

        <label htmlFor="confirmarSenha" className="input-label-cadastro">Confirmar Senha</label>
        <input type="password" id="confirmarSenha-cadastro" placeholder="Confirmar Senha" className="input-field-cadastro" />

        <Link to={"/login"}>
          <button type="submit" className="submit-button-cadastro">
            Cadastrar
          </button>
        </Link>
      </form>
    </div>
  );
}

export default FormCadastro;