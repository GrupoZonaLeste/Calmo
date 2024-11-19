import React, { useState, useEffect } from 'react';
import '../ModoFitness/ModoFitness.css';
import { db, auth } from '../../services/firebase_config'; // Configuração do Firebase
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2'; // Para mensagens de sucesso/erro
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; 

const ModoFitness = (props) => {
  const navigate = useNavigate();
  const [isModal_Dieta_Open, setIsModal_Dieta_Open] = useState(false);
  const [isModal_Treino_Open, setIsModal_Treino_Open] = useState(false);
  const [dietName, setDietName] = useState('');
  const [treinoName, setTreinoName] = useState('');
  const [visualization, setVisualization] = useState('Planilha');
  const [user] = useAuthState(auth); 
  const [diets, setDiets] = useState([]); // Estado para armazenar as dietas do usuário
  const [treino, setTreinos] = useState([]); // Estado para armazenar as dietas do usuário

  useEffect(() => {
    if (user) {
      fetchUserDiets();
      fetchUserTreinos();

    }
  }, [user]);

  const fetchUserDiets = async () => {
    try {
      const dietsRef = collection(db, 'dietas');
      const q = query(dietsRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const userDiets = [];

      for (const doc of querySnapshot.docs) {
        const dietData = doc.data();
        const refeicoesRef = collection(doc.ref, 'refeicoes'); // Referência à subcoleção de refeições
        const refeicoesSnapshot = await getDocs(refeicoesRef);
        const refeicoesData = refeicoesSnapshot.docs.map((doc) => doc.data());

        userDiets.push({
          id: doc.id,
          ...dietData,
          refeicoes: refeicoesData[0]?.diasDaSemana || [], // Pega a primeira (e única) entrada de refeição
        });
      }

      setDiets(userDiets);
    } catch (error) {
      console.error('Erro ao buscar dietas:', error);
      Swal.fire('Erro', 'Não foi possível carregar suas dietas.', 'error');
    }
  };
  const fetchUserTreinos = async () => {
    try {
      const treinosRef = collection(db, 'treinos');
      const q = query(treinosRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
  
      const userTreinos = [];
  
      for (const doc of querySnapshot.docs) {
        const treinoData = doc.data();
        const exerciciosRef = collection(doc.ref, 'exercicios'); // Referência à subcoleção de exercícios
        const exerciciosSnapshot = await getDocs(exerciciosRef);
        const exerciciosData = exerciciosSnapshot.docs.map((doc) => doc.data());
  
        userTreinos.push({
          id: doc.id,
          ...treinoData,
          exercicios: exerciciosData[0]?.diasDaSemana || [], // Pega a primeira (e única) entrada de exercício
        });
      }
  
      setTreinos(userTreinos);
    } catch (error) {
      console.error('Erro ao buscar treinos:', error);
      Swal.fire('Erro', 'Não foi possível carregar seus treinos.', 'error');
    }
  };
  
  // Modal das dietas
  const openModal_Dieta = (event) => {
    event.preventDefault();
    setIsModal_Dieta_Open(true);
  };

  const closeModal_Dieta = () => {
    setIsModal_Dieta_Open(false);
  };

  //Modal dos treinos

  const openModal_Treino = (event) => {
    event.preventDefault();
    setIsModal_Treino_Open(true);
  };

  const closeModal_Treino = () => {
    setIsModal_Treino_Open(false);
  };

  const handleDietFormSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      Swal.fire('Erro', 'Você precisa estar autenticado para criar uma dieta.', 'error');
      return;
    }

    try {
      // Adiciona a dieta no Firestore
      const docRef = await addDoc(collection(db, 'dietas'), {
        userId: user.uid,
        name: dietName,
        visualization: visualization,
        createdAt: new Date().toISOString(), // Timestamp de criação
      });

      // Adiciona a subcoleção de refeições com os dias da semana
      const refeicoesRef = collection(docRef, 'refeicoes'); // Subcoleção
      const semana = [
        { dia: 'Segunda-feira', refeicoes: ['', '', '', '', ''] },
        { dia: 'Terça-feira', refeicoes: ['', '', '', '', ''] },
        { dia: 'Quarta-feira', refeicoes: ['', '', '', '', ''] },
        { dia: 'Quinta-feira', refeicoes: ['', '', '', '', ''] },
        { dia: 'Sexta-feira', refeicoes: ['', '', '', '', ''] },
        { dia: 'Sábado', refeicoes: ['', '', '', '', ''] },
        { dia: 'Domingo', refeicoes: ['', '', '', '', ''] },
      ];

      // Cria o documento `semana` com as refeições
      await addDoc(refeicoesRef, { diasDaSemana: semana });

      // Atualiza o estado local sem buscar novamente
      setDiets((prevDiets) => [
        ...prevDiets,
        { id: docRef.id, userId: user.uid, name: dietName, visualization },
      ]);

      Swal.fire('Sucesso', 'Dieta criada com sucesso!', 'success');
      setDietName(''); // Limpa o formulário
      setVisualization('Planilha');
      closeModal_Dieta();
    } catch (error) {
      console.error('Erro ao criar dieta:', error);
      Swal.fire('Erro', 'Não foi possível criar a dieta.', 'error');
    }
  };
  const handleTreinoFormSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      Swal.fire('Erro', 'Você precisa estar autenticado para criar um treino.', 'error');
      return;
    }

    try {
      // Adiciona a dieta no Firestore
      const docRef = await addDoc(collection(db, 'treinos'), {
        userId: user.uid,
        name: treinoName,
        visualization: visualization,
        createdAt: new Date().toISOString(), // Timestamp de criação
      });

      // Adiciona a subcoleção de refeições com os dias da semana
      const treinosRef = collection(docRef, 'treinos'); // Subcoleção
      const semana = [
        { dia: 'Segunda-feira', exercicios: ['', '', '', '', ''] },
        { dia: 'Terça-feira', exercicios: ['', '', '', '', ''] },
        { dia: 'Quarta-feira', exercicios: ['', '', '', '', ''] },
        { dia: 'Quinta-feira', exercicios: ['', '', '', '', ''] },
        { dia: 'Sexta-feira', exercicios: ['', '', '', '', ''] },
        { dia: 'Sábado', exercicios: ['', '', '', '', ''] },
        { dia: 'Domingo', exercicios: ['', '', '', '', ''] },
      ];

      // Cria o documento `semana` com as refeições
      await addDoc(treinosRef, { diasDaSemana: semana });

      // Atualiza o estado local sem buscar novamente
      setTreinos((prevTreinos) => [
        ...prevTreinos,
        { id: docRef.id, userId: user.uid, name: treinoName, visualization },
      ]);

      Swal.fire('Sucesso', 'Treino criado com sucesso!', 'success');
      setDietName(''); 
      setVisualization('Planilha');
      closeModal_Dieta();
    } catch (error) {
      console.error('Erro ao criar treino:', error);
      Swal.fire('Erro', 'Não foi possível criar a dieta.', 'error');
    }
  };
  const deleteDiet = async (dietId) => {
    try {
      
      // Exibe o alerta de confirmação
      const result = await Swal.fire({
        title: 'Tem certeza?',
        text: 'Você não poderá reverter essa ação!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar',
        reverseButtons: true, // Inverte os botões para uma UI mais intuitiva
      });
  
      // Se o usuário confirmar, exclui a dieta
      if (result.isConfirmed) {
        // Deleta a subcoleção de refeições
        navigate(-1)
        const refeicoesRef = collection(db, 'dietas', dietId, 'refeicoes');
        const refeicoesSnapshot = await getDocs(refeicoesRef);
        for (const doc of refeicoesSnapshot.docs) {
          await deleteDoc(doc.ref);
        }
  
        // Deleta a dieta
        const dietDocRef = doc(db, 'dietas', dietId);
        await deleteDoc(dietDocRef);
  
        // Remove a dieta do estado
        setDiets(diets.filter(diet => diet.id !== dietId));
  
        // Exibe uma mensagem de sucesso
        Swal.fire('Excluído!', 'A dieta foi excluída com sucesso.', 'success');
      } else {
        // Exibe uma mensagem caso o usuário cancele
        Swal.fire('Cancelado', 'A dieta não foi excluída.', 'info');
      }
    } catch (error) {
      console.error('Erro ao excluir dieta:', error);
      Swal.fire('Erro', 'Não foi possível excluir a dieta.', 'error');
    }
  };
  const deleteTreino = async (treinoId) => {
    
    try {
      // Exibe o alerta de confirmação
      const result = await Swal.fire({
        title: 'Tem certeza?',
        text: 'Você não poderá reverter essa ação!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      });
  
      // Se o usuário confirmar, exclui o treino
      if (result.isConfirmed) {
        navigate(-1)
        // Verifica se a subcoleção 'exercicios' existe e deleta os documentos se houver
        const exerciciosRef = collection(db, 'treinos', treinoId, 'exercicios');
        const exerciciosSnapshot = await getDocs(exerciciosRef);
        
        // Exclui os exercícios da subcoleção se existirem
        if (!exerciciosSnapshot.empty) {
          for (const doc of exerciciosSnapshot.docs) {
            await deleteDoc(doc.ref);
          }
        }
  
        // Deleta o treino
        const treinoDocRef = doc(db, 'treinos', treinoId);
        await deleteDoc(treinoDocRef);
  
        // Remove o treino do estado
        setTreinos(treino.filter((treino) => treino.id !== treinoId));
  
        // Exibe uma mensagem de sucesso
        Swal.fire('Excluído!', 'O treino foi excluído com sucesso.', 'success');
      } else {
        // Exibe uma mensagem caso o usuário cancele
        Swal.fire('Cancelado', 'O treino não foi excluído.', 'info');
      }
    } catch (error) {
      console.error('Erro ao excluir treino:', error);
      Swal.fire('Erro', 'Não foi possível excluir o treino.', 'error');
    }
  };
  

  return (
    <div className="modofitness-body" style={!props.lightmode ? {backgroundColor: "#f2f2f2", color: "#212121"}: null}>
      <div className="modofitness-container">
        <div className="modofitness-content">
          <h1 className="modofitness-h1">Modo Fitness</h1>

          <div className="modofitness-create-routine">
            <h2 className="modofitness-h2">Criar Rotina:</h2>
            <div className="modofitness-routine-options" >
              <a href="#" className="modofitness-routine-option" onClick={openModal_Dieta} style={!props.lightmode ? {backgroundColor: "#f9f9f9", color: "#212121", boxShadow: "10px 10px 41px -26px rgba(33,33,33,1)"}: null}>
                <p>Planilha de Dieta</p>
                <div className="modofitness-plus-container">
                  <div className="modofitness-plus-sign">+</div>
                </div>
              </a>
              <a href="#" className="modofitness-routine-option" onClick={openModal_Treino} style={!props.lightmode ? {backgroundColor: "#f9f9f9", color: "#212121", boxShadow: "10px 10px 41px -26px rgba(33,33,33,1)"}: null}>
                <p className="texto-link" style={!props.lightmode ? {color: "#212121"}: null}>Agenda de Treino</p>
                <div className="modofitness-plus-container">
                  <div className="modofitness-plus-sign">+</div>
                </div>
              </a>
            </div>
          </div>

          {isModal_Dieta_Open && (
            <div className="modofitness-modal" style={{ display: 'flex' }}>
              <div className="modofitness-modal-content">
                <span className="modofitness-close" onClick={closeModal_Dieta}>
                  &times;
                </span>
                <h2 className="modofitness-h2">Criar Dieta</h2>
                <form id="dietForm" onSubmit={handleDietFormSubmit}>
                  <label htmlFor="dietName">Nome da dieta:</label>
                  <input
                    type="text"
                    id="dietName"
                    name="dietName"
                    value={dietName}
                    onChange={(e) => setDietName(e.target.value)}
                    required
                  />
                  <br />
                  <br />

                  <label htmlFor="visualization">Visualização:</label>
                  <select
                    id="visualization"
                    name="visualization"
                    value={visualization}
                    onChange={(e) => setVisualization(e.target.value)}
                  >
                    <option value="Planilha">Planilha</option>
                    {/*TODO: <option value="Calendário">Calendário</option>*/}
                  </select>
                  <br />
                  <br />
                  <button type="submit">Criar rotina</button>
                </form>
              </div>
            </div>
          )}

          {isModal_Treino_Open && (
            <div className="modofitness-modal" style={{ display: 'flex' }}>
              <div className="modofitness-modal-content">
                <span className="modofitness-close" onClick={closeModal_Treino}>
                  &times;
                </span>
                <h2 className="modofitness-h2">Criar Treino</h2>
                <form id="TreinoForm" onSubmit={handleTreinoFormSubmit}>
                  <label htmlFor="treinoName">Nome do treino:</label>
                  <input
                    type="text"
                    id="treinoName"
                    name="treinoName"
                    value={treinoName}
                    onChange={(e) => setTreinoName(e.target.value)}
                    required
                  />
                  <br />
                  <br />

                  <label htmlFor="visualization">Visualização:</label>
                  <select
                    id="visualization"
                    name="visualization"
                    value={visualization}
                    onChange={(e) => setVisualization(e.target.value)}
                  >
                    <option value="Planilha">Planilha</option>
                    {/*TODO: <option value="Calendário">Calendário</option>*/}
                    
                  </select>
                  <br />
                  <br />
                  <button type="submit">Criar rotina</button>
                </form>
              </div>
            </div>
          )}

          <h2 className="modofitness-h2">Suas Rotinas:</h2>
          <div className="modofitness-routine-section">
            <div className="modofitness-routine-carousel" id="routineCarousel">
            
            {treino.map((treino) => (
                <Link key={treino.id} to={`/treinos/${treino.id}`} className="modofitness-routine-option" style={!props.lightmode ? {backgroundColor: "#f9f9f9", color: "#212121", boxShadow: "10px 10px 41px -26px rgba(33,33,33,1)"}: null}>
                  <div className="modofitness-routine-card" style={!props.lightmode ? {backgroundColor: "#f2f2f2", color: "#212121"}: null}>
                    <p>{treino.name}</p>
                  
                  <div
                      className="modofitness-delete-container"
                      onClick={() => deleteTreino(treino.id)}
                    >
                      {/* Ícone de lixeira // NAO APAGAR*/}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      </div>
                      </div> 
                </Link>
              ))}
            
              {diets.map((diet) => ( 
                <Link key={diet.id} to={`/dietas/${diet.id}`} className="modofitness-routine-option"  style={!props.lightmode ? {backgroundColor: "#f9f9f9", color: "#212121", boxShadow: "10px 10px 41px -26px rgba(33,33,33,1)"}: null}>
                  <div className="modofitness-routine-card"  style={!props.lightmode ? {backgroundColor: "#f2f2f2", color: "#212121"}: null}>
                    <p>{diet.name}</p>
                    <div
                      className="modofitness-delete-container"
                      onClick={() => deleteDiet(diet.id)}
                    >
                      {/* Ícone de lixeira // NAO APAGAR*/}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default ModoFitness;