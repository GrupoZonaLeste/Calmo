import React from 'react'
import './Titulo.css'

const Titulo = () => {
  return (
    <div className='containerTituloAnotacaoes'>
        <div>
            <h1 className='titulo-anotacoes'>Modo Anotações</h1>
            <p className='subtitulo-anotacoes'>Faça suas anotações de forma fácil e rápida, em um só lugar!</p>
        </div>
        <button id="btn_novaAnotacao">+</button>
    </div>
  )
}

export default Titulo