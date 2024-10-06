// src/VerifyCode.jsx
import React, { useState } from 'react';

const VerifyCode = () => {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Código verificador enviado: ${code}`);
    // Aqui você pode implementar a lógica para verificar o código
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Verifique seu Código</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite o código verificador"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Verificar Código</button>
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

export default VerifyCode;