import React from 'react'
import './Titulo.css'

const Titulo = () => {
  return (
    <div className='containerTituloAnotacaoes'>
    <div>
      <h1 className='titulo-anotacoes'>Modo Música</h1>
      <p className='subtitulo-anotacoes'>Escute, veja e análise seus status e estátisticas sobre suas músicas!</p>
    </div>
    <button className='logoutSpotify'>Fazer logout do Spotify</button>
  </div>
  )
}

export default Titulo