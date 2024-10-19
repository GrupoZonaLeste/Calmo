import React from 'react'
import './DivHero.css'
import '../../index.css'

const DivHero = () => {
  return (
    <>
        <div className='divHero'>
          <div id='divBlackBG'>
            <h1>Está Estressado?</h1>
          </div>
            <img alt='Logo Calmô!' src='src\assets\images\Logo-black.png' className='imgHero'/>
        </div>
        <div id='LinhaDivHero'></div>
    </>
  )
}

export default DivHero