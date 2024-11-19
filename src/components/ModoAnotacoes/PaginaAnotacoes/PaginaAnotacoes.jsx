import React, { useEffect, useState } from 'react'
import './PaginaAnotacoes.css'
import SideBar from '../../Sidebar/SideBar'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PaginaAnotacoes = (props) => {
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
            url: `${import.meta.env.VITE_URL_SERVER}/adicionar_anotacoes/${sessionStorage.getItem("emailuserid")}`,
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
                url: `${import.meta.env.VITE_URL_SERVER}/pagina/${tituloPagina()}/${sessionStorage.getItem("emailuserid")}`
            })
            setDados(resposta.data.conteudo);
            setTags(resposta.data.tags);
        }
        pegarDados()
    }, [])

    return (
        <div className='container_modos' style={!props.lightmode ? {backgroundColor: "#f9f9f9", color: "#212121"}:null}>
            <SideBar lightmode={props.lightmode} />
            <div className='container_Pagina' >
                <div className='containerTituloAnotacaoes' style={{margin: 0}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Link to="/anotacoes">
                            <h1 className='setaVoltar' style={!props.lightmode ? {color: "#212121"}: null}>←</h1>   
                        </Link>
                        <h1 className='titulo-anotacoes' style={!props.lightmode ? {color: "#212121", margin: 0}: {margin: 0}}>{ tituloPagina() }</h1>
                    </div>
                </div>
                <div className='containerSubPaginas'>
                    <p className='subtitulo-anotacoes' style={{margin: 0, marginLeft: "2vw", textDecoration: "none"}}>Tags:</p>
                    {tags.map((element) => {
                        return <p style={{textDecoration: "underline"}}>{element}</p>
                    })}
                </div>
                <textarea 
                className='textAreaAnotacao' 
                placeholder='Faça suas anotações...' 
                value={dados} 
                onChange={(e) => {setDados(e.target.value), addConteudo()}}
                style={!props.lightmode ? {color: "#212121"}: null}
                ></textarea>
            </div>
        </div>
    )
}

export default PaginaAnotacoes