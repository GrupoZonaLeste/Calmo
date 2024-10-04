import React, { useState, useEffect } from 'react';
import './Header.css'

const Header = () => {

  return (
    <>
        <header>
            <img id="icon-calmo-white"alt='Icone Calmô!' src='src\assets\icons\calmo-logos\Icon-nome-white.png'></img>
            <div id='menuEntrarCadastro'>
                <p>entrar</p>
                <p>|</p>
                <p>cadastrar</p>
            </div>
        </header>
    </>
  )
}

export default Header