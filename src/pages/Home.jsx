import SideBar from '../components/Sidebar/SideBar'
import CardTopo from '../components/Home/CardInicialSuperior'
import CardMusica from '../components/Home/CardRecomendacaoMusica'
import CardLivro from '../components/Home/CardRecomendacaoLivro'
import CardPerfil from '../components/Home/CardMeuPerfil'
import './Home.css'

const Home = () => {
  return (
    <div className='container_home'>
        <SideBar />
        <div className='DivCentral'>
          <h1 className='titleUsuario' style={{marginBottom: '0'}}>Olá Usuário!</h1>
          <CardTopo />
          <div className='DivRecomendacoes'>
              <CardMusica />
              <CardLivro />
              <CardPerfil />
          </div>
        </div>
    </div>
  )
}

export default Home