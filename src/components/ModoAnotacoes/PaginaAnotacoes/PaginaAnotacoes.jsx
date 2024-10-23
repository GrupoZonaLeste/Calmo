import React from 'react'
import './PaginaAnotacoes.css'
import SideBar from '../../Sidebar/SideBar'
import { Link } from 'react-router-dom'

const PaginaAnotacoes = () => {
    return (
        <div className='container_modos'>
            <SideBar />
            <div className='container_Pagina'>
                <div className='containerTituloAnotacaoes' style={{margin: 0}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Link to="/anotacoes">
                            <h1 className='setaVoltar'>←</h1>   
                        </Link>
                        <h1 className='titulo-anotacoes' style={{margin: 0}}>Teste</h1>
                        <p className='subtitulo-anotacoes' style={{margin: 0, marginLeft: "2vw", textDecoration: "underline"}}>Tags ↓</p>
                    </div>
                    <button id="btn_novaAnotacao">+</button>
                </div>
                <div className='containerSubPaginas'>
                    <p>SubPagina1</p>
                    <p>SubPagina2</p>
                    <p>SubPagina3</p>
                </div>
                <textarea className='textAreaAnotacao'></textarea>
            </div>
        </div>
    )
}

export default PaginaAnotacoes