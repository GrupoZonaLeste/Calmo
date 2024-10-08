import React from 'react';
import './Cadastro.css';
import { Link } from 'react-router-dom';

function Cadastro() {
  return (
    <div className="containerCadastro">
      <Link to={"/"}>
        <button className="back-button">
          &#8592;
        </button>
      </Link>
      <h1 className="title">Cadastro</h1>
      <form className="form">
        <label htmlFor="nome" className="input-label">Nome</label>
        <input type="text" id="nome" placeholder="Nome" className="input-field" />

        <label htmlFor="sobrenome" className="input-label">Sobrenome</label>
        <input type="text" id="sobrenome" placeholder="Sobrenome" className="input-field" />

        <label htmlFor="email" className="input-label">Email</label>
        <input type="email" id="email" placeholder="Email" className="input-field" />

        <label htmlFor="telefone" className="input-label">Telefone</label>
        <input type="tel" id="telefone" placeholder="Telefone" className="input-field" />

        <label htmlFor="senha" className="input-label">Senha</label>
        <input type="password" id="senha" placeholder="Senha" className="input-field" />

        <label htmlFor="confirmarSenha" className="input-label">Confirmar Senha</label>
        <input type="password" id="confirmarSenha" placeholder="Confirmar Senha" className="input-field" />

        <Link to={"/home"}>
          <button type="submit" className="submit-button">
            Cadastrar
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Cadastro;