import React from 'react'
import './LandingPage.css'

const LandingPage = () => {
return (
    <>
    <div className='headerLandingPage'>
        <h1>logo</h1>
        <div id='menuEntrarCadastro'>
            <p>entrar</p>
            <p>cadastrar</p>
        </div>
    </div>
    <div className='divHero'>
        <h1>Está Estressado?</h1>
        <h1>Calmô</h1>
    </div>
    <br></br>
    <hr></hr>
    <br></br>
    <div className='divSobre'>
        <div className='divSobreGrid'>
            <div className='SobreCard1'>
            <h2>Sobre o Camô!✋</h2>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, iure beatae. Est unde consectetur nulla rerum maiores repellat omnis commodi earum, praesentium, cum voluptatum! Praesentium asperiores autem voluptate animi repellat.
            </div>
            <div className='SobreCard2'>
            <h2>Pra quem é o Calmô!✋</h2>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi officiis recusandae odio magni nesciunt fugiat possimus impedit placeat cumque, reprehenderit assumenda pariatur, eligendi quo blanditiis reiciendis maiores architecto minus! Doloremque.
            </div>
            <div className='SobreCard3'>
            <h2>Quer Atividades? Calmô!✋</h2>
                <ul>
                    <li>🥗 faça suas dietas!</li><br></br>
                    <li>✏  faça anotações!</li><br></br>
                    <li>🎵 ouça suas músicas!</li><br></br>
                    <li>📆 organize sua agenda!</li><br></br>
                </ul>
            </div>
            <div className='SobreCard4'>
                <h2>Primeira Vez?</h2>
                <p>Clique aqui para criar uma conta</p>
            </div>
        </div>
    </div>
        <footer>
            <h1>Equipe de desenvolvedores</h1>
            <div id='equipeNomes'>
                <p>Breno</p>
                <p>Daniele</p>
                <p>Diego</p>
                <p>Guilherme</p>
                <p>Gustavo</p>
                <p>Lucas</p>
            </div>
        </footer>
    </>
)
}

export default LandingPage