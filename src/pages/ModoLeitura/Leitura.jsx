import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import Frequencia from '../../components/ModoLeitura/Frequencia'
import PreviewLivro from '../../components/ModoLeitura/PreviewLivro'
import './Leitura.css'

const Leitura = (props) => {

  // Simulação de dias de leitura, esses valores podem vir do backend
const readingDays = [1, 5, 7, 10, 15, 22];

  return (
    <div className='container_modos' style={!props.lightmode ? {backgroundColor: "#f2f2f2", color: "#212121"}: null}>
        <SideBar lightmode={props.lightmode}/>

        <div className="Div-Central">
            
        <div className='Div_leftLeitura'>
        <h1 className='title_mdLeitura' style={!props.lightmode ? {color: "#212121"}: null}>Modo Leitura</h1>
          <PreviewLivro lightmode={props.lightmode}/>
        </div>
        <div className='Div_rightLeitura'>
          <Frequencia readingDays={readingDays}/>
        </div>

        </div> 
    </div>
  )
}

export default Leitura