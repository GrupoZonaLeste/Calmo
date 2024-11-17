import Imusica from '../../assets/images/musica.png'
import Ileitura from '../../assets/images/leitura.png'
import Ifitness from '../../assets/images/dieta.png'
import Iagenda from '../../assets/images/agenda.png'
import Isair from '../../assets/images/sair.png'
import Ianotacao from '../../assets/images/anotacao.png'
import BtnSideBar from './botoesNavegacao/BtnSideBar'
import IHome from '../../assets/images/icon-logo.png'
import './SideBar.css'

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { getAuth, signOut } from "firebase/auth";


const SideBar = () => {
  const navigate = useNavigate();
  let logout = () => {
    const auth = getAuth();
    Swal.fire({
      title: "Deseja fazer Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Fazer Logout",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Fazendo Logout...',
          text: 'Carregando...',
          didOpen: () => {
              Swal.showLoading();
          }
        });
        Swal.close()
        signOut(auth).then(() => {
          sessionStorage.clear()
          navigate("/")

        }).catch((error) => {
        });
      }
    })
  }
    return (
    <nav className='navClass'>
        <ul className='ulClass'>
            <BtnSideBar rotaPagina='/home' imgIcone={IHome} btnTexto="Home"/>
            <BtnSideBar rotaPagina='/anotacoes' imgIcone={Ianotacao} btnTexto="Anotações"/>
            <BtnSideBar rotaPagina='/musicas' imgIcone={Imusica} btnTexto="Músicas"/>
            <BtnSideBar rotaPagina='/leitura' imgIcone={Ileitura} btnTexto="Leitura"/>
            <BtnSideBar rotaPagina='/fitness' imgIcone={Ifitness} btnTexto="Fitness"/>
            <BtnSideBar rotaPagina='/agenda' imgIcone={Iagenda} btnTexto="Agenda"/>
            <li className='liClass' onClick={logout}>
                <img className='imgClass'src={Isair} alt="Icon Sair" />
                <p className='pSair'>Sair</p>
            </li>
        </ul>
        
    </nav>
  )
}

export default SideBar