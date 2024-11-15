import React, { useEffect, useState } from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import './Musica.css'
import Titulo from '../../components/ModoMusica/Titulo'
import SemanaMusica from '../../components/ModoMusica/SemanaMusica'
import EscutarAgora from '../../components/ModoMusica/EscutarAgora'
import { redirectToAuthCodeFlow, getAccessToken } from "../../services/spotify_config";


const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const params = new URLSearchParams(window.location.search)
let code = params.get("code")
let profile =  {}

const Musica = () => {
const [loginSpotify, setLoginSpotify] = useState(false)
const [token, setToken] = useState(false)

function logoutSpotify(){
  code = ""
  localStorage.clear()
  setLoginSpotify(false)
}

useEffect(() => {
  async function LogarSpotify(){
    if (code) {
      const accessToken = await getAccessToken(clientId, code);
      profile = await fetchProfile(accessToken)
      setLoginSpotify(true)
    }
  }
  LogarSpotify()
})

function abrirLoginSpotify(){
  redirectToAuthCodeFlow(clientId);
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
            <Titulo funcOnClick={logoutSpotify}/>
            <div className='mainModoMusica'>
              <SemanaMusica/>
              <EscutarAgora/>
            </div>
        </div> : 
        <div className='loginComSpotifyDiv'>
          <h1>Modo Música</h1>
          <p>Escute e curta suas músicas!</p>
          <button className='loginComSpotifyButton' onClick={abrirLoginSpotify}>Login com Spotify</button>
        </div>
          }
    </div>
  )
}

export default Musica