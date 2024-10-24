import React from 'react'
import './SemanaMusica.css'

const SemanaMusica = () => {
  return (
    <div className='semanamusica'>
        <h2>Sua Semana</h2>
        <div className='container_SemanaMusica'>
            <div className='row1Semanamusica'>
                <div className='topArtistasSemana'>
                    <h3>Top Artistas</h3>
                    <ol>
                        <li>Artista1</li>
                        <li>Artista2</li>
                        <li>Artista3</li>
                    </ol>
                </div>
                <div className='topMusicasSemana'>
                    <h3>Top Músicas</h3>
                    <ol>
                        <li>Música1</li>
                        <li>Música2</li>
                        <li>Música3</li>
                    </ol>
                </div>
            </div>
            <div className='rowsSemanaMusica'>
                <p><span>000</span> Minutos escutados</p>
            </div>
            <div className='rowsSemanaMusica'>
                <p>Gênero favorito: <span>Rock</span></p>
            </div>
            <h2>Recomendações</h2>
            <div className='recomendacoesMusicas'>
                <p>Recomendações baseadas no seus <span>Top Artistas</span> da semana</p>
                <ul>
                    <li>Banda1</li>
                    <li>Artista1</li>
                    <li>Banda2</li>
                    <li>Artista2</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default SemanaMusica