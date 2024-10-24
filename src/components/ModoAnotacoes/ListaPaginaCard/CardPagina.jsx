import React, { useState } from 'react'
import './CardPagina.css'
import IsetaBaixo from '../../../assets/images/setaBaixo.png'
import { Link } from 'react-router-dom'

const CardPagina = () => {
  const [cardStatus, setCardStatus] = useState(true)
  const [newStyle, setnewStyle] = useState({})
  const [newStyleSeta, setnewStyleSeta] = useState({})

  function abrirCard() {
    console.log(cardStatus)
    setCardStatus(!cardStatus)
    if (cardStatus) {
      setnewStyle({ display: "block", alignItems: "flex-start" })
      setnewStyleSeta({ transform: 'rotate( 180deg)' })
    } else {
      setnewStyle({})
      setnewStyleSeta({ transform: 'rotate(0deg)' })
    }
  }

  return (
    <div className='containerCardPagina'>
      <div  className='cardPagina'>
      <Link to={"/pagina_teste"} className='resetLinks'>
        <div>
          <h2 className='remMargin'>teste</h2>
          <p className='remMargin italicFont'>Criado em 00/00/0000</p>
        </div>
      </Link>
        <div className='subpaginas' onClick={abrirCard}>
          <h3>Detalhes</h3>
          <img src={IsetaBaixo} style={newStyleSeta} alt='seta para expandir card-página' className='setaBaixo-cardPagina'></img>
          <br></br>
        </div>
      </div>
      <div style={newStyle} className='dadosCardPaginas'>
        <div>
          <div>
          <h3>Tags</h3>
              <ul>
                <li>Tag1</li>
                <li>Tag2</li>
                <li>Tag3</li>
              </ul>
          </div>
            <div>
              <h3>Sub-Páginas</h3>
              <ul>
                <li>SubPagina1</li>
                <li>SubPagina2</li>
                <li>SubPagina3</li>
              </ul>
            </div>
        </div>
          <button>Excluir Página</button>
      </div>
      </div>
  )
}

export default CardPagina