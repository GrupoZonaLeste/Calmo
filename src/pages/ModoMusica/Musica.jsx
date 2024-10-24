import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import './Musica.css'
import Titulo from '../../components/ModoMusica/Titulo'
import SemanaMusica from '../../components/ModoMusica/SemanaMusica'


const Musica = () => {
    return (
    <div className='container_modos'>
        <SideBar/>
        <div>
          <Titulo/>
          <div className='mainModoMusica'>
            <SemanaMusica/>
          </div>
        </div>
    </div>
  )
}

export default Musica