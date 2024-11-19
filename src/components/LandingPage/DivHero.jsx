import React from 'react'
import './DivHero.css'
import '../../index.css'
import LogoBlack from '../../assets/images/Logo-black.png'

const DivHero = (props) => {
  return (
    <>
        <div className='divHero'>
          <div id='divBlackBG'>
            <h1>Está Estressado?</h1>
          </div>
            <img alt='Logo Calmô!' src={LogoBlack} className='imgHero'/>
        </div>
        <div id='LinhaDivHero'  style={!props.lightmode ? {backgroundColor: "#212121"}: null}></div>
    </>
  )
}

export default DivHero