import Imusica from '../../assets/images/musica.png'
import Ileitura from '../../assets/images/leitura.png'
import Ifitness from '../../assets/images/dieta.png'
import Iagenda from '../../assets/images/agenda.png'
import Isair from '../../assets/images/sair.png'
import Ianotacao from '../../assets/images/anotacao.png'
import BtnSideBar from './botoesNavegacao/BtnSideBar'
import './SideBar.css'
import { Link } from 'react-router-dom'



const SideBar = () => {
  return (
    <nav className='navClass'>
        <ul className='ulClass'>
            <BtnSideBar rotaPagina='/anotacoes' imgIcone={Ianotacao} btnTexto="Anotações"/>
            <BtnSideBar rotaPagina='/musicas' imgIcone={Imusica} btnTexto="Músicas"/>
            <BtnSideBar rotaPagina='/leitura' imgIcone={Ileitura} btnTexto="Leitura"/>
            <BtnSideBar rotaPagina='/fitness' imgIcone={Ifitness} btnTexto="Fitness"/>
            <BtnSideBar rotaPagina='/agenda' imgIcone={Iagenda} btnTexto="Agenda"/>
            <Link to={"/"} className='btnSair_sidebar'>
                <li className='liClass'>
                    <img className='imgClass'src={Isair} alt="Icon Sair" />
                    <p className='pSair'>Sair</p>
                </li>
            </Link>
        </ul>
        
    </nav>
  )
}

export default SideBar