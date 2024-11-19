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

const Home = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
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
      } else {
        
      }
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <div className='container_modos'>
      <SideBar />
      <div className='DivCentral'>
        <h1 className='titleUsuario' style={{ marginBottom: '0' }}>
          Olá {userName}!
        </h1>
        <CardTopo />
        <div className='DivRecomendacoes'>
          <CardMusica />
          <CardLivro />
          <CardPerfil />
        </div>
      </div>
    </div>
  );
};

export default Home;
