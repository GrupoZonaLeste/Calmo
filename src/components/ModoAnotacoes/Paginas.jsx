import React from 'react'
import './Paginas.css'
import CardPagina from './ListaPaginaCard/CardPagina'

const Paginas = () => {
  return (
    <div className='containerPaginas'>
        <h3 className='tituloPaginas'>Páginas</h3>
        <div className='ListaPaginas'>
            <CardPagina/>
            <CardPagina/>
            <CardPagina/>
            <CardPagina/>
            <CardPagina/>
            <CardPagina/>
            <CardPagina/>
            <CardPagina/>
        </div>
    </div>
  )
}

export default Paginas