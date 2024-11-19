import React from 'react'
import './CardInicialSuperior.css'

const CardInicialSuperior = (props) => {
  return (
    <div className='CardTopo' style={!props.lightmode ? {backgroundColor: "#f9f9f9", color: "#212121", boxShadow: "10px 10px 41px -26px rgba(33,33,33,1)"}: null} >
      <h3 style={{marginTop: '0'}}>COMECE O DIA BEM:</h3>
      <p className='p-texto'>Volte a ler seus livros, abra o <span className='p-destaque'><a href='/leitura' className='resetLinks' style={!props.lightmode ? {color: "#212121"}: null}>Modo Leitura! 📚</a></span></p>
      <p className='p-texto'>Revise e crie novas anotações no <span className='p-destaque'><a href='/anotacoes' className='resetLinks' style={!props.lightmode ? {color: "#212121"}: null}>Modo Anotações ✏️</a></span> </p>
      <p className='p-texto'>Verifique sua dieta no <span className='p-destaque'><a href='/fitness' className='resetLinks' style={!props.lightmode ? {color: "#212121"}: null}>Modo Fitness 💪</a></span> </p>
    </div>
  )
}

export default CardInicialSuperior