import React from 'react'
import './CardPagina.css'
import IsetaBaixo from '../../../assets/images/setaBaixo.png'

const CardPagina = () => {
  return (
    <div className='cardPagina'>
        <div>
            <h2 className='remMargin'>teste</h2>
            <p className='remMargin italicFont'>Criado em 00/00/0000</p>
        </div>
        <div className='subpaginas'>
            <h3>Sub-Páginas</h3>
            <img src={IsetaBaixo} alt='seta para expandir card-página' className='setaBaixo-cardPagina'></img>
        </div>
    </div>
  )
}

export default CardPagina