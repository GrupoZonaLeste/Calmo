import React, { useState } from 'react'
import './ModalNovaAnotacao.css'

const ModalNovaAnotacao = (props) => {

  return (
    <div className='bg-modalNovaAnotacao' style={{display: status}}>
        <div className='formNovaAnotacao'>
            <h2>Nova Anotação</h2>
            <div className='camposNovaAnotacao'>
                <h3>Título</h3>
                <input/>
                <h3>Tags</h3>
                <input/>
            </div>
            <div className='btnCriarAnotacao'>
                <button>Criar Anotação</button>
            </div>
        </div>
    </div>
  )
}

export default ModalNovaAnotacao
