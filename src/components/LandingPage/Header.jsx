import { Outlet, Link } from "react-router-dom";

import './Header.css'

const Header = () => {

  return (
    <>
        <header className="header_Header">
            <img id="icon-calmo-white"alt='Icone Calmô!' src='src\assets\images\Icon-nome-white.png'></img>
            <div id='menuEntrarCadastro'>
              <div className="div_p_btnEntrar">
                <Link to="/login" className="btn_Header">Entrar</Link>
              </div>
                <p>|</p>
                <div className="div_p_btnCadastrar">
                  <Link to={"/cadastro"} className="btn_Header">Cadastrar</Link>
                </div>
                
            </div>
        </header>
    </>
  )
}

export default Header