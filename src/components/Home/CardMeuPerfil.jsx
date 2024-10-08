import React from 'react'
import ImgPerfil from '../../assets/images/imagePerfil.png'
import './CardMeuPerfil.css'
import { Link } from 'react-router-dom'

const CardMeuPerfil = () => {
  return (
    <Link to={"/editar_perfil"}>
      <div className='CardPerfil'>
          <h3>MEU PERFIL</h3>
          <img className='ImgPerfil' src={ImgPerfil} alt="Img padrão Perfil" />
      </div>
    </Link>
  )
}

export default CardMeuPerfil