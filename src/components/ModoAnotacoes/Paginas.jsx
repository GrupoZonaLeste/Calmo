import React, { useState, useEffect } from 'react'
import './Paginas.css'
import CardPagina from './ListaPaginaCard/CardPagina'
import Axios from 'axios'
import './Filtros.css'
import './Tags/Tag.css'

const Paginas = () => {
  const [paginas, setPaginas] = useState([])
  const [paginasFiltradas, setPaginasFiltradas] = useState([])
  const [filtros, setFiltros] = useState(false)
  const [inputfiltro, setInputFiltro] = useState("")
  const [tags, setTags] = useState([])
  const [tagsCheck, setTagsCheck] = useState([])

  useEffect(() => {
    let getData = async () => {
      let response = await Axios.request({
        method: "GET",
        url: `${import.meta.env.VITE_URL_SERVER}/anotacoes/${sessionStorage.getItem("emailuserid")}`,
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

  let ativarTag = (isChecked, nomeTag) => {
    if (isChecked) {
      setTagsCheck([...tagsCheck, nomeTag]);
    } else {
      setTagsCheck(tagsCheck.filter((tag) => tag !== nomeTag));
    }
  };

  let pesquisarFiltro = () => {
    let novasPaginas = paginas.filter((element) => {
      let tagsBool = tagsCheck.some((tag) => element.tags.includes(tag))
      let nomeBool = tagsBool ? false : inputfiltro.target.value != "" ? element.titulo.includes(inputfiltro.target.value) : false
      return tagsBool || nomeBool
    });
    console.log(novasPaginas)
    setPaginasFiltradas(novasPaginas.length > 0 ? novasPaginas : paginas)
  }

  let pesquisar = () => {
    pesquisarFiltro()
    setFiltros(true)
  }

  return (
    <>
      <div className='containerPaginas'>
        <h3 className='tituloPaginas'>Páginas</h3>
        <div className='ListaPaginas'>
          {paginas.length > 0 && !filtros ? paginas.map(element => {
            return <CardPagina titulo={element.titulo} dataCriacao={element.criacao} tags={element.tags} />
          }) : filtros && paginasFiltradas.length > 0 ? paginasFiltradas.map(element => {
            return <CardPagina titulo={element.titulo} dataCriacao={element.criacao} tags={element.tags} />
          }) : <p className='comeceanotacoes'>Comece suas anotações!</p>}
        </div>
      </div>
      
      <div className='containerFiltros'>
        <div className='boxFiltros'>
          <h3>Filtros</h3>
          <input className='inputFiltrosAnotacoes' placeholder='Pesquisar' onChange={setInputFiltro}/>
          <div className='tags'>
            <p>Procurar por tags:</p>
            {tags.length > 0 ? tags.map(element => {
              return <div className='checkboxTags'>
                        <input type='checkbox' name={element} onChange={(e) => ativarTag(e.target.checked, element)}/>
                        <label for={element}>{element}</label>
                      </div>
            }) : <p style={{fontStyle: "italic", opacity: "0.6"}}>Sem Tags.</p>}
          </div>
          <button id='btnPesquisarFiltros' onClick={pesquisar}>Pesquisar filtros</button>
        </div>
      </div>
    </>
  )
}


export default Paginas