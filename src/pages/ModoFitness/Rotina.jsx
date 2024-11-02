import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import './Fitness.css'
import Rotinas from '../../components/ModoFitness/Rotina React'

const RotinaPage = () => {
  return (
    <div className='container_modos'>
        <SideBar/>
        <Rotinas/>
    </div>
  )
}

export default RotinaPage