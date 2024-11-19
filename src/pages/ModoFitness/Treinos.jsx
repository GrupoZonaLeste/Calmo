import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import './Fitness.css'
import Treinos from "../../components/ModoFitness/Treinos"

const TreinosPage = (props) => {
  return (
    <div className='container_modos' style={!props.lightmode ? {backgroundColor: "#f2f2f2",color: "#212121"}: null}>
        <SideBar lightmode={props.lightmode}/>
        <Treinos lightmode={props.lightmode}/>
    </div>
  )
}

export default TreinosPage