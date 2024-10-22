import React, { useState } from 'react'
import './CardPagina.css'
import IsetaBaixo from '../../../assets/images/setaBaixo.png'

const CardPagina = () => {
  const [cardStatus, setCardStatus] = useState(true)
  const [newStyle, setnewStyle] = useState({})

  function abrirCard() {
    console.log(cardStatus)
    setCardStatus(!cardStatus)
    if (cardStatus) {
      setnewStyle({height: "30vh", alignItems: "flex-start"})
    } else {
      setnewStyle({})
    }
  }

  return (
    <div style={newStyle} className='cardPagina'>
        <div>
            <h2 className='remMargin'>teste</h2>
            <p className='remMargin italicFont'>Criado em 00/00/0000</p>
        </div>
        <div className='subpaginas' onClick={abrirCard}>
            <h3>Sub-Páginas</h3>
            <img src={IsetaBaixo} alt='seta para expandir card-página' className='setaBaixo-cardPagina'></img>
            <br></br>
        </div>
    </div>
  )
}

export default CardPagina