import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; // Importações necessárias do Firebase
import './EsqueceuSenha.css';

const EsqueceuSenha = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // Estado para exibir mensagens de erro/sucesso
  const [emailSent, setEmailSent] = useState(false); // Novo estado para controlar se o e-mail foi enviado

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email); // Envia o e-mail de redefinição
      setEmailSent(true); // Define que o e-mail foi enviado com sucesso
      setMessage('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
    } catch (error) {
      console.error('Erro ao enviar e-mail de recuperação: ', error);
      // Define mensagens de erro com base no código do erro
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

        {!emailSent ? ( // Exibe o formulário enquanto o e-mail não for enviado
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
        ) : ( // Exibe uma mensagem de confirmação após o envio
          <p className="success-message">Um e-mail de recuperação foi enviado para: <strong>{email}</strong>. Verifique sua caixa de entrada.</p>
        )}

        <p className="message-EsqueceuSenha">{message}</p>
      </div>
    </div>
  );
};

export default EsqueceuSenha;
