import React, { useState, useEffect } from 'react'
import './Paginas.css'
import CardPagina from './ListaPaginaCard/CardPagina'
import Axios from 'axios'
import './Filtros.css'
import Tag from './Tags/Tag'

const Paginas = () => {
  const [paginas, setPaginas] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => {
    let getData = async () => {
      let response = await Axios.request({
        method: "GET",
        url: `${import.meta.env.VITE_URL_SERVER}/anotacoes`,
      })
      setPaginas(response.data)
      let tags = []
      response.data.forEach(element => {
        element.tags.forEach(element => {
          tags.push(element)
        })
      });
      let tagsSet = new Set(tags)
      setTags([...tagsSet])
    }
    
    getData()
  }, [])


  return (
    <>
      <div className='containerPaginas'>
        <h3 className='tituloPaginas'>Páginas</h3>
        <div className='ListaPaginas'>
          {paginas.length > 0 ? paginas.map(element => {
            return <CardPagina titulo={element.titulo} dataCriacao={element.criacao} tags={element.tags} />
          }) : <p className='comeceanotacoes'>Comece suas anotações!</p>}
        </div>
      </div>

      <div className='containerFiltros'>
        <div className='boxFiltros'>
          <h3>Filtros</h3>
          <input className='inputFiltrosAnotacoes' placeholder='Pesquisar' />
          <div className='tags'>
            <p>Procurar por tags:</p>
            {tags.length > 0 ? tags.map(element => {
              return <Tag nomeTag={element}/>
            }) : <p style={{fontStyle: "italic", opacity: "0.6"}}>Sem Tags .</p>}
          </div>
          <button id='btnPesquisarFiltros'>Pesquisar filtros</button>
        </div>
      </div>
    </>
  )
}


export default Paginas