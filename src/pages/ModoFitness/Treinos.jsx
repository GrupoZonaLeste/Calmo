import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import './Fitness.css'
import Treinos from '../../components/ModoFitness/Treinos React'

const TreinosPage = () => {
  return (
    <div className='container_modos'>
        <SideBar/>
        <Treinos/>
    </div>
  )
}

export default TreinosPage