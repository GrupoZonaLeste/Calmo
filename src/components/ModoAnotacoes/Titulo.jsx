import React, { useState } from 'react'
import './Titulo.css'
import './ModalNovaAnotacao.css'
import { Link } from 'react-router-dom'

const Titulo = () => {
  const [statusModal, setstatusModal] = useState(true)
  const [displayModal, setdisplayModal] = useState("none")

  function abrirFecharModal(){
    setstatusModal(!statusModal)
    setdisplayModal(statusModal ? "flex" : "none")
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
            <input />
            <h3>Tags</h3>
            <input />
          </div>
          <Link to="/pagina_teste">
          <div className='btnCriarAnotacao'>
            <button>Criar Anotação</button>
          </div>
          </Link>
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