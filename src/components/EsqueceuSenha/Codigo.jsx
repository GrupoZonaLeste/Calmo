// src/VerifyCode.jsx
import React, { useState } from 'react';
import './Codigo.css'; // Importa o CSS externo

const Codigo = ({ onNextStep }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Código verificador enviado: ${code}`);
    // Aqui você pode implementar a lógica para verificar o código
    // Supondo que a verificação do código seja bem-sucedida, você pode avançar para o próximo passo
    onNextStep(); // Chama a função para avançar para o próximo passo
  };

  return (
    <div className="container-codigo">
      <div className="card-codigo">
        <h2 className="title-codigo">Verifique seu Código</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite o código verificador"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="input-codigo"
          />
          <button type="submit" className="button-codigo">Verificar Código</button>
        </form>
      </div>
    </div>
  );
};

export default Codigo;
