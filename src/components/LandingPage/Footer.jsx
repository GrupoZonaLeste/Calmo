import React from 'react'
import './Footer.css'

const Footer = (props) => {
    return (
        <>
            <footer className='footerLandingPage'  style={!props.lightmode ? {color: "#212121", border: "0.1em solid black" }: null}>
                <h1>Equipe de desenvolvedores</h1>
                <div id='equipeNomes'>
                    <p>Breno Ribeiro</p>
                    <p>Daniele Capistrano</p>
                    <p>Diego Bicelli</p>
                    <p>Guilherme Santos</p>
                    <p>Gustavo dos Anjos</p>
                    <p>Lucas Trindade</p>
                </div>
                <div id='direitosFooter'>
                    <p>Todos os direitos Reservados @2024</p>
                </div>
            </footer>
        </>
    )
}

export default Footer