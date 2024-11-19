import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; 
import './EsqueceuSenha.css';

const EsqueceuSenha = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); 
  const [emailSent, setEmailSent] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email); // função pra enviar o email
      setEmailSent(true); 
      setMessage('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
    } catch (error) {
      console.error('Erro ao enviar e-mail de recuperação: ', error);
   
      switch (error.code) {
        case 'auth/user-not-found':
          setMessage('Usuário não encontrado. Verifique o e-mail digitado.');
          break;
        case 'auth/invalid-email':
          setMessage('E-mail inválido. Digite um endereço válido.');
          break;
        default:
          setMessage('Ocorreu um erro ao enviar o e-mail. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="container-EsqueceuSenha">
      <div className="card-EsqueceuSenha">
        <h2 className="title-EsqueceuSenha">Esqueci a Senha</h2>

        {!emailSent ? ( 
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-EsqueceuSenha"
            />
            <button type="submit" className="button-EsqueceuSenha">
              Enviar Código
            </button>
          </form>
        ) : ( 
          <p className="success-message">Um e-mail de recuperação foi enviado para: <strong>{email}</strong>. Verifique sua caixa de entrada.</p>
        )}

        <p className="message-EsqueceuSenha">{message}</p>
      </div>
    </div>
  );
};

export default EsqueceuSenha;
