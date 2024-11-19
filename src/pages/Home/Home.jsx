import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../services/firebase_config'; 
import { doc, getDoc } from 'firebase/firestore'; 
import SideBar from '../../components/Sidebar/SideBar';
import CardTopo from '../../components/Home/CardInicialSuperior';
import CardMusica from '../../components/Home/CardRecomendacaoMusica';
import CardLivro from '../../components/Home/CardRecomendacaoLivro';
import CardPerfil from '../../components/Home/CardMeuPerfil';
import './Home.css';
import axios from 'axios';

const Home = (props) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user.email)
        try {
          const userDocRef = doc(db, 'users', user.uid); 
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserName(userData.nome || user.displayName || 'teste')
          } else {
            setUserName(user.displayName)
            console.log('Usuário não encontrado no Firestore');
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário: ', error);
        }
        await axios.request({
          method: "POST",
          url: `${import.meta.env.VITE_URL_SERVER}/cadastrar`,
          data: {
            itens: [],
            user: user.email
          }
        })
      } else {
        setUserName('Usuário');
      }
    });
    return () => unsubscribe(); 
  }, []);

  return (
    <div className='container_modos' style={!props.lightmode ? {backgroundColor: "#f2f2f2", color: "#212121"}:null} >
      <SideBar lightmode={props.lightmode}/>
      <div className='DivCentral'>
        <h1 className='titleUsuario' style={!props.lightmode ? {color: "#212121", marginBottom: '0'}: { marginBottom: '0' }}>
          Olá {userName}!
        </h1>
        <CardTopo lightmode={props.lightmode}/>
        <div className='DivRecomendacoes'>
          <CardMusica lightmode={props.lightmode}/>
          <CardLivro  lightmode={props.lightmode}/>
          <CardPerfil lightmode={props.lightmode}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
