import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./AlterarSenha.css"
const AlterarSenha = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      console.log('Senha redefinida com sucesso!');
    } else {
      alert('As senhas não coincidem!');
    }
  };
  return (
    <div className="container-alterarSenha">
      <div className="card-alterarSenha">
        <h2 className="title-alterarSenha">Redefinir Senha</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nova Senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="input-alterarSenha"
          />
          <input
            type="password"
            placeholder="Confirme a Nova Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-alterarSenha"
          />
          <Link to={"/login"}><button type="submit" className="button-alterarSenha">Redefinir Senha</button></Link>
        </form>
      </div>
    </div>
  );
};

export default AlterarSenha;