import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import Titulo from '../../components/ModoAnotacoes/Titulo'
import Paginas from '../../components/ModoAnotacoes/Paginas'
import './Anotacoes.css'
import Filtros from '../../components/ModoAnotacoes/Filtros'

const Anotacoes = () => {
  return (
    <div className='container_modos'>
      <SideBar/>
      <div>
        <Titulo/>
        <div className='mainAnotacoes'>
          <Paginas/>
          <Filtros/>
        </div>
      </div>
    </div>
  )
}

export default Anotacoes