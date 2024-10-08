import React from 'react'
import './CardInicialSuperior.css'

const CardInicialSuperior = () => {
  return (
    <div className='CardTopo'>
        <h3>COMECE O DIA BEM:</h3>
        <p className='p-texto'>Volte a ler seus livros, abra o <span className='p-destaque'>Modo Leitura! 📚</span></p>
        <p className='p-texto'>Revise e crie novas anotações no <span className='p-destaque'> Modo Anotações ✏️</span> </p>
        <p className='p-texto'>Verifique sua dieta no <span className='p-destaque'> Modo Fitness 💪</span> </p>
    </div>
  )
}

export default CardInicialSuperior