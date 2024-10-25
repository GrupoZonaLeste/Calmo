import React from 'react'
import './EscutarAgora.css'


const PerfilSpotify = () => {
  return (
    <div className='perfilSpotify'>
        <h2>Escutar Agora</h2>
        <div className='container_EscutarAgora'>
            <div className='pesquisarMusicas'>
                <input className='inputPesquisarMusicas' placeholder='Pesquisar Músicas...'/>
            </div>
            <div className='listaMusicas'>
                <p>Musica 1</p>
                <p>Musica 2</p>
                <p>Musica 3</p>
                <p>Musica 4</p>
                <p>Musica 5</p>
                <p>Musica 6</p>
                <p>Musica 7</p>
                <p>Musica 8</p>
                <p>Musica 9</p>
                <p>Musica 10</p>
                <p>Musica 11</p>
            </div>
            <div className='tocandoAgora'>
                <div className='capaAlbumTeste'></div>
                <div className='infoMusicaTocandoAgora'>
                    <h3>Nome música</h3>
                    <button>▷</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PerfilSpotify