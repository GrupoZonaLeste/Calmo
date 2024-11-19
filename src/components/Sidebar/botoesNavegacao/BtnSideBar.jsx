import React from 'react'
import { Link } from 'react-router-dom'

const BtnSideBar = (props) => {
    return (
        <Link to={props.rotaPagina}  className='resetLink'>
            <li className='liClass'>
                <img className='imgClass' src={props.imgIcone} alt="Icon Anotação" style={!props.lightmode ? {filter: props.imgBlack ? "none" : "invert(1)"}  : null} />
                <p className='pClass' style={!props.lightmode ? {color: "#212121"}:null}>{props.btnTexto}</p>
            </li>
        </Link>
    )
}

export default BtnSideBar