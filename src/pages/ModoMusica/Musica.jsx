import React, { useEffect, useState } from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import './Musica.css'
import Titulo from '../../components/ModoMusica/Titulo'
import SemanaMusica from '../../components/ModoMusica/SemanaMusica'
import EscutarAgora from '../../components/ModoMusica/EscutarAgora'
import { redirectToAuthCodeFlow, getAccessToken } from "../../services/spotify_config";

//import { firestoreDB } from '../../services/firebase_config'
//import { collection, updateDoc, getDocs, doc } from "firebase/firestore"; 

let codeSession = null
let profile = null
let topArtistas = []

const Musica = () => {
  const [loginSpotify, setLoginSpotify] = useState(false)
  const [token, setToken] = useState("")
  function logoutSpotify() {
    codeSession = null
    window.location = "http://localhost:5173/musicas"
    localStorage.clear()
    setLoginSpotify(false)
  }

  // const querySnapshot = await getDocs(collection(firestoreDB, "users"));
  // querySnapshot.forEach(element => {
  //     if(element.data()["email"] == sessionStorage.getItem("emailuserid")){
  //       const userFirestore = doc(firestoreDB, 'users', element.id);
  //       updateDoc(userFirestore, {"tokensapi.tokenspotify": accessToken || null});
  //     }
  // })
  
  async function fetchProfile(code) {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${code}` }
    })
    return result.json();
  }

  useEffect(() => {
    let verificarSession = async () => {
      if(token == ""){
        const accessToken = await getAccessToken(import.meta.env.VITE_SPOTIFY_CLIENT_ID, codeSession);
        setToken(accessToken.access_token)
        console.log("teste: ",[accessToken, profile])
        profile = profile != null ? profile : await fetchProfile(accessToken['access_token']);
        console.log([accessToken, profile])
        setLoginSpotify(true)
      }
    }
    const params = new URLSearchParams(window.location.search);
    codeSession = params.get("code")
    if(codeSession && !loginSpotify && !profile) {
      verificarSession()
    }
  }, [])
  
  async function AbrirloginSpotify() {
    redirectToAuthCodeFlow(import.meta.env.VITE_SPOTIFY_CLIENT_ID);
  }
  
  async function testeArtistas(code) {
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks", {
      headers: { Authorization: `Bearer ${code}` }
    })
    console.log(code)
    console.log(await result.json())
  }
  
  return (
    <div className='container_modos'>
      <SideBar />
      {loginSpotify ?
        <div className='DivCentral'>
          <Titulo funcOnClick={logoutSpotify} />
          <div className='mainModoMusica'>
          <button className='loginComSpotifyButton' onClick={() => testeArtistas(token)}>teste</button>

            <SemanaMusica artistas={topArtistas}/>
            <EscutarAgora />
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