// src/components/EsqueceuSenha/EsqueceuSenha.jsx
import React, { useState } from 'react';
import './EsqueceuSenha.css';

const EsqueceuSenha = ({ onNextStep }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email enviado para: ${email}`);
    onNextStep(); // Chama a função para avançar para o próximo passo
  };

  return (
    <div className="container-EsqueceuSenha">
      <div className="card-EsqueceuSenha">
        <h2 className="title-EsqueceuSenha">Esqueci a Senha</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-EsqueceuSenha"
          />
          <button type="submit" className="button-EsqueceuSenha">Enviar Código</button>
        </form>
        <p>
          Você receberá um código por email.
        </p>
      </div>
    </div>
  );
};

export default EsqueceuSenha;
