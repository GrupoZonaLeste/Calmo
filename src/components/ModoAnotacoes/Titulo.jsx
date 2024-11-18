import React, { useState } from 'react'
import './Titulo.css'
import './ModalNovaAnotacao.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Titulo = () => {
  const [statusModal, setstatusModal] = useState(true)
  const [displayModal, setdisplayModal] = useState("none")
  const [dataNovaPagina, setDataNovaPagina] = useState ({titulo: "", tags: [], criacao: ""})
  const [pagCriada, setPagCriada] = useState(false)
  function abrirFecharModal(){
    setstatusModal(!statusModal)
    let hoje = new Date()
    setDataNovaPagina(previousState => {
      return { ...previousState, criacao: hoje.toLocaleDateString()}
    });
    setdisplayModal(statusModal ? "flex" : "none")
  }
  
  
  function updateNome(){
    setDataNovaPagina(previousState => {
      return { ...previousState, titulo: event.target.value }
    });
  }
  function updateTags(){
    setDataNovaPagina(previousState => {
      return { ...previousState, tags: event.target.value.split(" ").filter(item => item !== "")}
    });
  }

   async function criarPagina(){
     setPagCriada(true)
     if (dataNovaPagina.titulo == ""){
       alert("Preencha os campos")
       setPagCriada(false)
       return
      }
      await axios.request({
        method: "POST",
        url: `${import.meta.env.VITE_URL_SERVER}/criar_pagina/${sessionStorage.getItem("emailuserid")}`,
        data: dataNovaPagina,
      })
  }

  return (
    <>
      <div className='bg-modalNovaAnotacao' style={{ display: displayModal }}>
        <div className='formNovaAnotacao'>
          <div className='primeiraLinha-NovaAnotacao'>
            <h2>Nova Anotação</h2>
            <button onClick={abrirFecharModal}>X</button>
          </div>
          <div className='camposNovaAnotacao'>
            <h3>Título</h3>
            <input onChange={updateNome} maxlength="30"/>
            <h3>Tags<span>(separadas por espaço)</span></h3>
            <input onChange={updateTags}/>
          </div>
          <div className='btnCriarAnotacao'>
          <Link to={pagCriada ? `/pagina/${dataNovaPagina.titulo}`: ""} className='resetLinks'>
            <button onClick={pagCriada ? () => {} : criarPagina}>Criar Anotação</button>
          </Link>
          </div>
        </div>
      </div>

      <div className='containerTituloAnotacaoes'>
        <div>
          <h1 className='titulo-anotacoes'>Modo Anotações</h1>
          <p className='subtitulo-anotacoes'>Faça suas anotações de forma fácil e rápida, em um só lugar!</p>
        </div>
        <button onClick={abrirFecharModal} id="btn_novaAnotacao">+</button>
      </div>
    </>
  )
}

export default Titulo