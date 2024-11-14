import React, { useState } from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import './Musica.css'
import Titulo from '../../components/ModoMusica/Titulo'
import SemanaMusica from '../../components/ModoMusica/SemanaMusica'
import EscutarAgora from '../../components/ModoMusica/EscutarAgora'
import { redirectToAuthCodeFlow, getAccessToken } from "../../services/spotify_config";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const params = new URLSearchParams(window.location.search)
const code = params.get("code")
let profile =  {}

const Musica = () => {
const [loginSpotify, setLoginSpotify] = useState(false)

async function AbrirloginSpotify(){
  if (!code) {
    setLoginSpotify(false)
    redirectToAuthCodeFlow(clientId);
  } else {
    const accessToken = await getAccessToken(clientId, code);
    profile = await fetchProfile(accessToken)
    setLoginSpotify(true)
  }
}

async function fetchProfile(code){
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${code}` }
    });

    return await result.json();
}

    return (
    <div className='container_modos'>
        <SideBar/>
          {loginSpotify ?
        <div className='DivCentral'>
            <Titulo/>
            <h1>{profile.id}</h1>
            <div className='mainModoMusica'>
              <SemanaMusica/>
              <EscutarAgora/>
            </div>
        </div> : 
        <div className='loginComSpotifyDiv'>
          <h1>Modo Música</h1>
          <p>Escute e curta suas músicas!</p>
          <button className='loginComSpotifyButton' onClick={AbrirloginSpotify}>Login com Spotify</button>
        </div>
          }
    </div>
  )
}

export default Musica