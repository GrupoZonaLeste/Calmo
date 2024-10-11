import Ianotacao from '../../assets/icons/anotacao.png'
import Imusica from '../../assets/icons/musica.png'
import Ileitura from '../../assets/icons/leitura.png'
import Ifitness from '../../assets/icons/dieta.png'
import Iagenda from '../../assets/icons/dieta.png'
import Isair from '../../assets/icons/sair.png'
import './SideBar.css'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <nav className='navClass'>
        <ul className='ulClass'>
            <li className='liClass'>
                <img className='imgClass'src={Ianotacao} alt="Icon Anotação" />
                <p className='pClass'>Anotações</p>
            </li>
            <li className='liClass'>
                <img className='imgClass'src={Imusica} alt="Icon Musica" />
                <p className='pClass'>Música</p>
            </li>
            <li className='liClass'>
                <img className='imgClass'src={Ileitura} alt="Icon Leitura" />
                <p className='pClass'>Leitura</p>
            </li>
            <li className='liClass'>
                <img className='imgClass'src={Ifitness} alt="Icon Fitness" />
                <p className='pClass'>Fitness</p>
            </li>
            <li className='liClass'>
                <img className='imgClass'src={Iagenda} alt="Icon Agenda" />
                <p className='pClass'>Agenda</p>
            </li>
            <Link to={"/"} className='btnSair_sidebar'>
                <li className='liClass'>
                    <img className='imgClass'src={Isair} alt="Icon Sair" />
                    <p style={{color : '#F56A6A', margin:'0px'}}>Sair</p>
                </li>
            </Link>
        </ul>
        
    </nav>
  )
}

export default SideBar