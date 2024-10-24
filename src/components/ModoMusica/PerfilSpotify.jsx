import React from 'react'
import fotoPerfil from '../../assets/images/imagePerfil.png'
import './PerfilSpotify.css'


const PerfilSpotify = () => {
  return (
    <div className='perfilSpotify'>
        <h2>Seu Perfil Spotify</h2>
        <div className='container_SemanaMusica'>
            <div className='usuarioSpotify'>
                <img src={fotoPerfil}></img>
                <h3>NomeUsuárioSpotify</h3>
            </div>
            <div className='perfilSpotify-Tops'>
                <div className='topArtMus-PerfilSpotify'>
                    <h3>Top Artistas <br></br> (todo o tempo)</h3>
                    <ol>
                        <li>Banda</li>
                        <li>Banda</li>
                        <li>Banda</li>
                        <li>Banda</li>
                        <li>Banda</li>
                        <li>Banda</li>
                        <li>Banda</li>
                        <li>Banda</li>
                    </ol>
                </div>
                <div className='topArtMus-PerfilSpotify'>
                    <h3>Top Músicas <br></br> (todo o tempo)</h3>
                    <ol>
                        <li>Música</li>
                        <li>Música</li>
                        <li>Música</li>
                        <li>Música</li>
                        <li>Música</li>
                        <li>Música</li>
                        <li>Música</li>
                        <li>Música</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PerfilSpotify