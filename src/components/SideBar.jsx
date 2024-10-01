import React from 'react'
import Ianotacao from '../assets/icons/anotacao.png'
import Imusica from '../assets/icons/musica.png'
import Ileitura from '../assets/icons/leitura.png'
import Ifitness from '../assets/icons/dieta.png'
import Iagenda from '../assets/icons/dieta.png'
import Isair from '../assets/icons/sair.png'
import './SideBar.css'

const SideBar = () => {
  return (
    <nav>
        <ul>
            <li>
                <img src={Ianotacao} alt="Icon Anotação" />
                <p>Anotações</p>
            </li>
            <li>
                <img src={Imusica} alt="Icon Musica" />
                <p>Música</p>
            </li>
            <li>
                <img src={Ileitura} alt="Icon Leitura" />
                <p>Leitura</p>
            </li>
            <li>
                <img src={Ifitness} alt="Icon Fitness" />
                <p>Fitness</p>
            </li>
            <li>
                <img src={Iagenda} alt="Icon Agenda" />
                <p>Agenda</p>
            </li>
            <li>
                <img src={Isair} alt="Icon Sair" />
                <p>Sair</p>
            </li>
        </ul>
        
    </nav>
  )
}

export default SideBar