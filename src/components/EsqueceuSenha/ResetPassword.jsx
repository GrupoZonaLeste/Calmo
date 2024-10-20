// src/ResetPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
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
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Redefinir Senha</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nova Senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Confirme a Nova Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
          <Link to={"/login"}><button type="submit" style={styles.button}>Redefinir Senha</button></Link>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#000',
    color: '#fff',
  },
  card: {
    backgroundColor: '#222',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    width: '400px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #fff',
    width: '100%',
    backgroundColor: '#444',
    color: '#fff',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#555',
    color: 'white',
    cursor: 'pointer',
  },
};

export default ResetPassword;