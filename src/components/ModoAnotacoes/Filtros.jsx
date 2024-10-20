import React from 'react'
import './Filtros.css'
import Tag from './Tags/Tag'

const Filtros = () => {
  return (
    <div className='containerFiltros'>
      <div className='boxFiltros'>
          <h3>Filtros</h3>
          <input className='inputFiltrosAnotacoes' placeholder='Pesquisar'/>
        <div className='tags'>
          <p>Procurar por tags:</p>
          <Tag nomeTag="Musica"/>
          <Tag nomeTag="Leitura"/>
          <Tag nomeTag="MGMT"/>
          <Tag nomeTag="The Black Keys"/>
        </div>
        <button id='btnPesquisarFiltros'>Pesquisar filtros</button>
      </div>
    </div>
  )
}

export default Filtros