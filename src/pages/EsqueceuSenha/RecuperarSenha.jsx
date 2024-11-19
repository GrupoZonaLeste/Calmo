import React, { useState } from 'react';
import EsqueceuSenha from "../../components/EsqueceuSenha/EsqueceuSenha"
import './RecuperarSenha.css'

const RecuperarSenha = () => {
  const [step, setStep] = useState('EsqueceuSenha');

  const handleNextStep = () => {
    setStep('Codigo');
  };
  const handleNextStepFromCodigo = () => {
    setStep('AlterarSenha');
  };
  return (
    <div className='body_esqueceuSenha'>
      {step === 'EsqueceuSenha' && <EsqueceuSenha onNextStep={handleNextStep} />}
      {step === 'Codigo' && <Codigo onNextStep={handleNextStepFromCodigo} />}
      {step === 'AlterarSenha' && <AlterarSenha />}
    </div>
  );
};

export default RecuperarSenha