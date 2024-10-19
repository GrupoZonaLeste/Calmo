import React from 'react'
import { Link } from 'react-router-dom'

const BtnSideBar = (props) => {
    return (
        <Link to={props.rotaPagina}  className='resetLink'>
            <li className='liClass'>
                <img className='imgClass' src={props.imgIcone} alt="Icon Anotação" />
                <p className='pClass'>{props.btnTexto}</p>
            </li>
        </Link>
    )
}

export default BtnSideBar