import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import Titulo from '../../components/ModoAnotacoes/Titulo'
import Paginas from '../../components/ModoAnotacoes/Paginas'
import './Anotacoes.css'

const Anotacoes = (props) => {
  return (
    <>
    <div className='container_modos' style={!props.lightmode ? {backgroundColor: "#f2f2f2", color: "#212121"}: null}> 
      <SideBar lightmode={props.lightmode}/>
      <div className='DivCentral'>
        <Titulo lightmode={props.lightmode}/>
        <div className='mainAnotacoes'>
          <Paginas lightmode={props.lightmode}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Anotacoes