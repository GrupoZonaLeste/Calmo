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
    <div className='containerCardPagina' style={!props.lightmode ? {backgroundColor: "#f9f9f9", color: "#212121", boxShadow: "10px 10px 41px -26px rgba(33,33,33,1)"}: null}>
      <div  className='cardPagina'>
      <Link to={`/pagina/${props.titulo}`} className='resetLinks'>
        <div>
          <h2 className='remMargin' style={!props.lightmode ? {color: "#212121"}: null}>{props.titulo}</h2>
          <p className='remMargin italicFont' style={!props.lightmode ? {color: "#212121"}: null}>Criado em {props.dataCriacao}</p>
        </div>
      </Link>
        <div className='subpaginas' onClick={abrirCard}>
          <h3 style={!props.lightmode ? {color: "#212121"}: null}>Detalhes</h3>
          <img src={IsetaBaixo} style={newStyleSeta} alt='seta para expandir card-página' className='setaBaixo-cardPagina'></img>
          <br></br>
        </div>
      </div>
      <div style={newStyle} className='dadosCardPaginas'>
        <div>
          <div>
          <h3 style={!props.lightmode ? {color: "#212121"}: null}>Tags</h3>
              <ul>
                {props.tags.length > 0 ? props.tags.map(element => {
                  return <li style={!props.lightmode ? {color: "#212121"}: null}>{element}</li>
                }) : <li style={!props.lightmode ? {color: "#212121"}: null}>Nenhuma tag inserida.</li>}
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