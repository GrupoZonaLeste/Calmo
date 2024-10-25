import React from 'react'
import './Grifos.css'
import SideBar from '../../components/Sidebar/SideBar'
import BtnVoltar from '../../assets/images/btn_voltar.png'
import TdsGrifos from '../../components/ModoLeitura/MeusGrifos/Grifos'
import { Link } from 'react-router-dom'

const Grifos = () => {
  return (
    <div className='container_modos'>
      <SideBar/>

      <Link to={"/leitura"}>
        <button className='BtnVoltar_meusGrifos'>
          <img src={BtnVoltar} alt="botão voltar" className='img_btnVoltar'/>
          VOLTAR
        </button>
      </Link>
      
      <div className="container_grifos">
        <h1 className='title_mdLeitura'>Modo Leitura</h1>
        <h3 className='subtitle_grifos'>Meus Grifos</h3>
        <TdsGrifos/>        
      </div>
    </div>
  )
}

export default Grifos