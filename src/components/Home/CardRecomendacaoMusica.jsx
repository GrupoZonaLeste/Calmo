import React from 'react'
import './CardRecomendacaoMusica.css'

const CardRecomendacaoMusica = (props) => {
  return (
    <div className='CardMusica' style={!props.lightmode ? {backgroundColor: "#f9f9f9", color: "#212121", boxShadow: "10px 10px 41px -26px rgba(33,33,33,1)"}: null}>
        <h3 style={{margin: '0'}}>MÚSICAS FAVORITAS</h3>
        <p style={{margin: '0'}}>1. Banda 01</p>
        <p style={{margin: '0'}}>2. Banda 02</p>
        <p style={{margin: '0'}}>3. Cantor 01</p>
        <p style={{margin: '0'}}>4. Cantor 02</p>
    </div>
  )
}

export default CardRecomendacaoMusica