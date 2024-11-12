import React, { useEffect, useState } from 'react'
import './PaginaAnotacoes.css'
import SideBar from '../../Sidebar/SideBar'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PaginaAnotacoes = () => {
    const [dados, setDados] = useState("")
    const [tags, setTags] = useState([])

    function tituloPagina(){
        const url = window.location.pathname; 
        let titulo = url.split('/').pop();
        titulo = decodeURIComponent(titulo)
        return titulo
    }
    async function addConteudo() {
        await axios.request({
            method: "POST",
            url: `${import.meta.env.VITE_URL_SERVER}/adicionar_anotacoes`,
            data: {
                titulo: tituloPagina(),
                conteudo: dados
            }
        })
    }

    useEffect(() => {
        const pegarDados = async () => {   
            let resposta = await axios.request({
                method: "GET",
                url: `${import.meta.env.VITE_URL_SERVER}/pagina/${tituloPagina()}`
            })
            setDados(resposta.data.conteudo);
            setTags(resposta.data.tags);
        }
        pegarDados()
    }, [])

    return (
        <div className='container_modos'>
            <SideBar />
            <div className='container_Pagina'>
                <div className='containerTituloAnotacaoes' style={{margin: 0}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Link to="/anotacoes">
                            <h1 className='setaVoltar'>←</h1>   
                        </Link>
                        <h1 className='titulo-anotacoes' style={{margin: 0}}>{ tituloPagina() }</h1>
                    </div>
                </div>
                <div className='containerSubPaginas'>
                    <p className='subtitulo-anotacoes' style={{margin: 0, marginLeft: "2vw", textDecoration: "none"}}>Tags:</p>
                    {tags.map((element) => {
                        return <p style={{textDecoration: "underline"}}>{element}</p>
                    })}
                </div>
                <textarea className='textAreaAnotacao' placeholder='Faça suas anotações...' value={dados} onChange={(e) => {setDados(e.target.value), addConteudo()}}></textarea>
            </div>
        </div>
    )
}

export default PaginaAnotacoes