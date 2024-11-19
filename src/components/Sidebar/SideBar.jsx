import Imusica from '../../assets/images/musica.png'
import Ileitura from '../../assets/images/leitura.png'
import Ifitness from '../../assets/images/dieta.png'
import Iagenda from '../../assets/images/agenda.png'
import Isair from '../../assets/images/sair.png'
import Ianotacao from '../../assets/images/anotacao.png'
import BtnSideBar from './botoesNavegacao/BtnSideBar'
import IHome from '../../assets/images/icon-logo.png'
import IHomeBlack from '../../assets/images/Icon-logo-black.png'
import './SideBar.css'

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { getAuth, signOut } from "firebase/auth";


const SideBar = (props) => {
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
    <nav className='navClass' style={!props.lightmode ? {backgroundColor: "#f9f9f9", color: "#212121", boxShadow: "10px 10px 41px -26px rgba(33,33,33,1)"}:null}>
        <ul className='ulClass'>
            <BtnSideBar rotaPagina='/home' imgIcone={props.lightmode ? IHome : IHomeBlack} btnTexto="Home" lightmode={props.lightmode} imgBlack={true}/>
            <BtnSideBar rotaPagina='/anotacoes' imgIcone={Ianotacao} btnTexto="Anotações" lightmode={props.lightmode}/>
            <BtnSideBar rotaPagina='/musicas' imgIcone={Imusica} btnTexto="Músicas" lightmode={props.lightmode}/>
            <BtnSideBar rotaPagina='/leitura' imgIcone={Ileitura} btnTexto="Leitura" lightmode={props.lightmode}/>
            <BtnSideBar rotaPagina='/fitness' imgIcone={Ifitness} btnTexto="Fitness" lightmode={props.lightmode}/>
            <BtnSideBar rotaPagina='/agenda' imgIcone={Iagenda} btnTexto="Agenda" lightmode={props.lightmode}/>
            <li className='liClass' onClick={logout}>
                <img className='imgClass'src={Isair} alt="Icon Sair" />
                <p className='pSair'>Sair</p>
            </li>
        </ul>
        
    </nav>
  )
}

export default SideBar