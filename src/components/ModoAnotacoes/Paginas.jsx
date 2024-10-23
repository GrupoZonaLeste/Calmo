import React from 'react'
import './Paginas.css'
import CardPagina from './ListaPaginaCard/CardPagina'
import { Link } from 'react-router-dom'

const Paginas = () => {
  return (
    <div className='containerPaginas'>
        <h3 className='tituloPaginas'>Páginas</h3>
        <div className='ListaPaginas'>
          <Link to="/pagina_teste">
            <CardPagina/>
          </Link>
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