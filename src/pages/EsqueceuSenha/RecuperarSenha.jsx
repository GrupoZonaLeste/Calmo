import React, { useState } from 'react';
import AlterarSenha from "../../components/EsqueceuSenha/AlterarSenha"
import Codigo from "../../components/EsqueceuSenha/Codigo"
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