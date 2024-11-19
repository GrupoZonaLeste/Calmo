import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Treinos.css';
import { db } from '../../services/firebase_config'; // Configuração do Firebase
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore'; // Adicione 'collection' e 'getDocs'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase_config';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const Treinos = (props) => {
  const navigate = useNavigate(); 

  const { treinoId } = useParams(); // Pega o ID do treino da URL
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
  const [user] = useAuthState(auth); // Obtém o usuário autenticado

  // Carregar o treino do banco de dados
  useEffect(() => {
    if (user && treinoId) {
      fetchTreinoData();
    }
  }, [user, treinoId]);

  // Função para buscar os dados do treino
  const fetchTreinoData = async () => {
    try {
      const docRef = doc(db, 'treinos', treinoId); // Referência ao treino específico
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const treinoOwnerId = docSnap.data().userId; // ID do dono do treino

        if (treinoOwnerId !== user.uid) {
          // Se o treino não pertence ao usuário autenticado, exibe erro e redireciona
          const result = await Swal.fire({
            title: 'Acesso negado',
            text: 'Você não tem permissão para editar esse Treino.',
            icon: 'error',
            confirmButtonText: 'OK',
          });

          if (result.isConfirmed) {
            navigate(-1); // Redireciona para a página anterior
          }
        } else {
          // Carrega o nome do treino
          setNomeTreino(docSnap.data().name);

          // Buscar a subcoleção de exercícios
          const exerciciosRef = collection(docRef, 'exercicios');
          const exerciciosSnap = await getDocs(exerciciosRef);

          if (!exerciciosSnap.empty) {
            const exerciciosData = exerciciosSnap.docs[0].data().diasDeTreino;
            setDiasDeTreino(exerciciosData);
          } else {
            // DEBUG: console.log("vazio")
          }
        }
      } else {
        Swal.fire('Erro', 'Treino não encontrado.', 'error');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do treino:', error);
      Swal.fire('Erro', 'Não foi possível carregar os dados do treino.', 'error');
    }
  };

  // Função para salvar os dados do treino automaticamente após cada alteração
  const saveTreinoData = async () => {
    try {
      const docRef = doc(db, 'treinos', treinoId); // Referência ao treino
      const exerciciosRef = collection(docRef, 'exercicios'); // Subcoleção de exercícios
      const exerciciosSnap = await getDocs(exerciciosRef);

      if (!exerciciosSnap.empty) {
        const exerciciosDoc = exerciciosSnap.docs[0]; // Supomos que há apenas um documento
        await setDoc(exerciciosDoc.ref, { diasDeTreino }, { merge: true });
      } else {
        // Caso a subcoleção de exercícios não exista, cria-a
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
    <div className="treinos-body" style={!props.lightmode ? {backgroundColor: "#f2f2f2",color: "#212121"}: null}>
      <div className="treinos-container">
        <div className="treinos-content">
          <h1 className="treinos-h1" style={!props.lightmode ? {color: "#212121"}: null}>{nomeTreino || 'Plano de Treino'}</h1>
          <div className="treinos-table">
            <table className="treinotable">
              <thead>
                <tr>
                  <th className="treino-thead-th">Dia da semana</th>
                  <th className="treino-thead-th">Exercício 1</th>
                  <th className="treino-thead-th">Exercício 2</th>
                  <th className="treino-thead-th">Exercício 3</th>
                  <th className="treino-thead-th">Exercício 4</th>
                  <th className="treino-thead-th">Exercício 5</th>
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
