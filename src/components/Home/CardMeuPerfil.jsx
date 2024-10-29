import React from 'react'
import ImgPerfil from '../../assets/images/imagePerfil.png'
import './CardMeuPerfil.css'
import { Link } from 'react-router-dom'

const CardMeuPerfil = () => {
  return (
    <Link to={"/editar_perfil"} className='CardPerfil' >
      <div className='Div_CardPerfil'>
          <h3 style={{margin: '0'}}>MEU PERFIL</h3>
          <img className='ImgPerfil' src={ImgPerfil} alt="Img padrão Perfil" />
      </div>
    </Link>
  )
}

export default CardMeuPerfil