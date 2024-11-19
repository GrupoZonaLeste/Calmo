import React from 'react'
import './CardRecomendacaoLivro.css'

const CardRecomendacaoLivro = (props) => {
  return (
    <div className='CardLeitura' style={!props.lightmode ? {backgroundColor: "#f9f9f9", color: "#212121", boxShadow: "10px 10px 41px -26px rgba(33,33,33,1)"}: null}>
        <h3 style={{margin: '0'}}>CONTINUA A SUA LEITURA</h3>
        <p style={{margin: '0'}}>Código Da Vinci</p>
        <p style={{margin: '0'}}>Página Lidas: 30</p>
        <p style={{margin: '0'}}>Porcentagem: 2%</p>
    </div>
  )
}

export default CardRecomendacaoLivro;