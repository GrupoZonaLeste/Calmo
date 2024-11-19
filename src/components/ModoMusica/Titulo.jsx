import React from 'react'
import './Titulo.css'

const Titulo = (props) => {
  return (
    <div className='containerTituloAnotacaoes' >
    <div>
      <h1 className='titulo-anotacoes'style={!props.lightmode ? {color: "#212121"}: null}>Modo Música</h1>
      <p className='subtitulo-anotacoes'style={!props.lightmode ? {color: "#212121"}: null}>Escute, veja e análise seus status e estátisticas sobre suas músicas!</p>
    </div>
    <button className='logoutSpotify' onClick={props.funcOnClick}>Fazer logout do Spotify</button>
  </div>
  )
}

export default Titulo