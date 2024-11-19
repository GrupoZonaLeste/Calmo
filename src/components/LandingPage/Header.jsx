import { Outlet, Link } from "react-router-dom";
import IconNomeWhite from '../../assets/images/Icon-nome-white.png'
import IconNomeBlack from '../../assets/images/Icon-nome-black.png'

import './Header.css'

const Header = (props) => {

  return (
    <>
        <header className="header_Header" style={!props.lightmode ? {backgroundColor: "#f9f9f9", color: "#212121"}: null} >
            <img id="icon-calmo-white"alt='Icone Calmô!' src={!props.lightmode ? IconNomeBlack :  IconNomeWhite}></img>
            <div id='menuEntrarCadastro'>
              <div className="div_p_btnEntrar">
                <Link to="/login" className="btn_Header" style={!props.lightmode ? {backgroundColor: "#f9f9f9", color: "#212121"}: null}>Entrar</Link>
              </div>
                <p>|</p>
                <div className="div_p_btnCadastrar">
                  <Link to={"/cadastro"} className="btn_Header" style={!props.lightmode ? {backgroundColor: "#f9f9f9", color: "#212121"}: null}>Cadastrar</Link>
                </div>
                
            </div>
        </header>
    </>
  )
}

export default Header