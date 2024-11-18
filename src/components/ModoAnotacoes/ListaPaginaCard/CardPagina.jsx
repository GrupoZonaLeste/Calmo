import React, { useEffect, useState } from 'react'
import './CardPagina.css'
import IsetaBaixo from '../../../assets/images/setaBaixo.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

const CardPagina = (props) => {
  const [cardStatus, setCardStatus] = useState(true)
  const [newStyle, setnewStyle] = useState({})
  const [newStyleSeta, setnewStyleSeta] = useState({})
  const [paginaDeletada, setPaginaDeletada] = useState(false)

  function abrirCard() {
    setCardStatus(!cardStatus)
    if (cardStatus) {
      setnewStyle({ display: "block", alignItems: "flex-start" })
      setnewStyleSeta({ transform: 'rotate( 180deg)' })
    } else {
      setnewStyle({})
      setnewStyleSeta({ transform: 'rotate(0deg)' })
    }
  }

    async function deletarPagina(){
      await axios.request({
        method: "DELETE",
        url: `${import.meta.env.VITE_URL_SERVER}/deletar_pagina/${props.titulo}/${sessionStorage.getItem("emailuserid")}`
      })
      setPaginaDeletada(true)
    }

  return (
    <>
    {paginaDeletada ? <></> :
    <div className='containerCardPagina'>
      <div  className='cardPagina'>
      <Link to={`/pagina/${props.titulo}`} className='resetLinks'>
        <div>
          <h2 className='remMargin'>{props.titulo}</h2>
          <p className='remMargin italicFont'>Criado em {props.dataCriacao}</p>
        </div>
      </Link>
        <div className='subpaginas' onClick={abrirCard}>
          <h3>Detalhes</h3>
          <img src={IsetaBaixo} style={newStyleSeta} alt='seta para expandir card-página' className='setaBaixo-cardPagina'></img>
          <br></br>
        </div>
      </div>
      <div style={newStyle} className='dadosCardPaginas'>
        <div>
          <div>
          <h3>Tags</h3>
              <ul>
                {props.tags.length > 0 ? props.tags.map(element => {
                  return <li>{element}</li>
                }) : <li>Nenhuma tag inserida.</li>}
              </ul>
          </div>
        </div>
          <button onClick={deletarPagina}>Excluir Página</button>
      </div>
      </div>
    }
    </>
  )
}

export default CardPagina