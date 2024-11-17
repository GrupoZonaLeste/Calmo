import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import './Fitness.css'
import ModoFitness from "../../components/ModoFitness/ModoFitness"

const Fitness = () => {
  return (
    <div className='container_modos'>
        <SideBar/>
        <div>
          <ModoFitness/>
        </div>
    </div>
  )
}

export default Fitness