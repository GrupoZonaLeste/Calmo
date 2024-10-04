import ImgPerfil from '../../assets/images/imagePerfil.png'
import './CardMeuPerfil.css'

const CardMeuPerfil = () => {
  return (
    <div className='CardPerfil'>
        <h3>MEU PERFIL</h3>
        <img className='ImgPerfil' src={ImgPerfil} alt="Img padrão Perfil" />
    </div>
  )
}

export default CardMeuPerfil