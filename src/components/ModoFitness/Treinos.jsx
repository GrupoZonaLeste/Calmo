import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Treinos.css';
import { db } from '../../services/firebase_config'; // Configuração do Firebase
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore'; // Adicione 'collection' e 'getDocs'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase_config';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const Treinos = () => {
  const navigate = useNavigate(); 

  const { treinoId } = useParams(); 
  const [nomeTreino, setNomeTreino] = useState('');
  const [diasDeTreino, setDiasDeTreino] = useState([
    { dia: 'Segunda-feira', exercicios: ['', '', '', '', ''] },
    { dia: 'Terça-feira', exercicios: ['', '', '', '', ''] },
    { dia: 'Quarta-feira', exercicios: ['', '', '', '', ''] },
    { dia: 'Quinta-feira', exercicios: ['', '', '', '', ''] },
    { dia: 'Sexta-feira', exercicios: ['', '', '', '', ''] },
    { dia: 'Sábado', exercicios: ['', '', '', '', ''] },
    { dia: 'Domingo', exercicios: ['', '', '', '', ''] },
  ]);
  const [user] = useAuthState(auth); 
  useEffect(() => {
    if (user && dietId) {
      fetchTreinoData();    }
  }, [user, treinoId]);

  // Função para buscar os dados da dieta
    
  const fetchTreinoData = async () => {
    try {
      const docRef = doc(db, 'treino', treinoId); // Referência à dieta específica
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Verifica se o usuário autenticado é o dono da dieta
        const treinoOwnerId = docSnap.data().userId; // Supondo que você armazene o ID do usuário no documento da dieta

        if (treinoOwnerId !== user.uid) {
          // Se a dieta não pertence ao usuário autenticado, redireciona ou exibe erro
          const result = await Swal.fire({
            title: 'Acesso negado',
            text: 'Você não tem permissão para editar esse Treino.',
            icon: 'error',
            confirmButtonText: 'OK',
          });

          if (result.isConfirmed) {
            // Redireciona para a página inicial
            navigate(-1); // Redireciona para a página inicial após o usuário confirmar
          }
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados do treino:', error);
      Swal.fire('Erro', 'Não foi possível carregar os dados do treino.', 'error');
    }
  };



  // Função para salvar os dados da dieta automaticamente após cada alteração
  const saveTreinoData = async () => {
    try {
      const docRef = doc(db, 'treinos', treinoId); // Referência ao treino
      const exerciciosRef = collection(docRef, 'exercicios'); // Subcoleção de exercícios
      const exerciciosSnap = await getDocs(exerciciosRef);


      if (!exerciciosSnap.empty) {
        const exerciciosDoc = exerciciosSnap.docs[0];
        await setDoc(exerciciosDoc.ref, { diasDeTreino }, { merge: true });
      } else {
        await setDoc(doc(exerciciosRef), { diasDeTreino });
      }
    } catch (error) {
      console.error('Erro ao salvar treino:', error);
      Swal.fire('Erro', 'Não foi possível salvar o treino.', 'error');
    }
  };

   // Função para manipular mudanças nos exercícios
   const handleExerciseChange = (diaIndex, exercicioIndex, value) => {
    const updatedDias = [...diasDeTreino];
    updatedDias[diaIndex].exercicios[exercicioIndex] = value;
    setDiasDeTreino(updatedDias);

    saveTreinoData();
  };
  
  return (
    <div className="treinos-body">
    <div className="treinos-container">
      <div className="treinos-content">
      <h1 className="treinos-h1">{nomeTreino || 'Plano Nutricional'}</h1>
        <div className="treinos-table">
          <table className="treinotable">
            <thead>
              <tr>
                <th className="treino-thead-th">Dia da semana</th>
                <th className="treino-thead-th">Refeição 1</th>
                <th className="treino-thead-th">Refeição 2</th>
                <th className="treino-thead-th">Refeição 3</th>
                <th className="treino-thead-th">Refeição 4</th>
                <th className="treino-thead-th">Refeição 5</th>
              </tr>
            </thead>
            <tbody>
              {diasDeTreino.map((dia, diaIndex) => (
                <tr key={diaIndex}>
                  <td className="treinos-tbody-td">{dia.dia}</td>
                  {dia.exercicios.map((exercicio, exercicioIndex) => (
                    <td key={exercicioIndex} className="treinos-tbody-td">
                      <textarea
                        className="textarea-treinos"
                        value={exercicio}
                        onChange={(e) =>
                          handleExerciseChange(diaIndex, exercicioIndex, e.target.value)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Treinos;
