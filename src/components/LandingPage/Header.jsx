import { Outlet, Link } from "react-router-dom";

import './Header.css'

const Header = () => {

  return (
    <>
        <header>
            <img id="icon-calmo-white"alt='Icone Calmô!' src='src\assets\icons\calmo-logos\Icon-nome-white.png'></img>
            <div id='menuEntrarCadastro'>
                <Link to="/login" className={"btn_Header"}>entrar</Link>
                <p>|</p>
                <Link to={"/cadastro"} className="btn_Header">cadastrar</Link>
            </div>
        </header>
    </>
  )
}

export default Header