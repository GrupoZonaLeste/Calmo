import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import Titulo from '../../components/ModoAnotacoes/Titulo'
import Paginas from '../../components/ModoAnotacoes/Paginas'
import './Anotacoes.css'

const Anotacoes = () => {
  return (
    <>
    <div className='container_modos'>
      <SideBar/>
      <div className='DivCentral'>
        <Titulo/>
        <div className='mainAnotacoes'>
          <Paginas/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Anotacoes