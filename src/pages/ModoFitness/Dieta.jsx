import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import './Fitness.css'
import Dieta from '../../components/ModoFitness/Dieta'

const DietaPage = (props) => {
  return (
    <div className='container_modos' style={!props.lightmode ? {backgroundColor: "#f2f2f2", color: "#212121"}: null}>
        <SideBar lightmode={props.lightmode}/>
        <div>
          <Dieta lightmode={props.lightmode}/>
        </div>
    </div>
  )
}

export default DietaPage