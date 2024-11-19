import React from 'react'
import ImgPerfil from '../../assets/images/imagePerfil.png'
import './CardMeuPerfil.css'
import { Link } from 'react-router-dom'

const CardMeuPerfil = (props) => {
  return (
    <Link to={"/editar_perfil"} className='CardPerfil'style={!props.lightmode ? {backgroundColor: "#f9f9f9", color: "#212121", boxShadow: "10px 10px 41px -26px rgba(33,33,33,1)"}: null} >
      <div className='Div_CardPerfil' >
          <h3 style={{margin: '0'}}>MEU PERFIL</h3>
          <img className='ImgPerfil' src={ImgPerfil} alt="Img padrão Perfil" />
      </div>
    </Link>
  )
}

export default CardMeuPerfil