import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import './Fitness.css'
import Dieta from '../../components/ModoFitness/Dieta'

const DietaPage = () => {
  return (
    <div className='container_modos'>
        <SideBar/>
        <div>
          <Dieta/>
        </div>
    </div>
  )
}

export default DietaPage