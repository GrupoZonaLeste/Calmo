import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dieta.css';
import { db } from '../../services/firebase_config'; // Configuração do Firebase
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore'; // Adicione 'collection' e 'getDocs'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase_config';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const Dieta = () => {
  const navigate = useNavigate();
  const { dietId } = useParams(); // Pega o ID da dieta da URL
  const [nomeDieta, setNomeDieta] = useState(''); // Estado para armazenar o nome da dieta
  const [diasDaSemana, setDiasDaSemana] = useState([
    { dia: 'Segunda-feira', refeicoes: ['', '', '', '', ''] },
    { dia: 'Terça-feira', refeicoes: ['', '', '', '', ''] },
    { dia: 'Quarta-feira', refeicoes: ['', '', '', '', ''] },
    { dia: 'Quinta-feira', refeicoes: ['', '', '', '', ''] },
    { dia: 'Sexta-feira', refeicoes: ['', '', '', '', ''] },
    { dia: 'Sábado', refeicoes: ['', '', '', '', ''] },
    { dia: 'Domingo', refeicoes: ['', '', '', '', ''] },
  ]);
  const [user] = useAuthState(auth); // Obtém o usuário autenticado

  // Carregar a dieta do banco de dados
  useEffect(() => {
    if (user && dietId) {
      fetchDietData();
    }
  }, [user, dietId]);

  // Função para buscar os dados da dieta
    
const fetchDietData = async () => {
  try {
    const docRef = doc(db, 'dietas', dietId); // Referência à dieta específica
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Verifica se o usuário autenticado é o dono da dieta
      const dietOwnerId = docSnap.data().userId; // Supondo que você armazene o ID do usuário no documento da dieta

      if (dietOwnerId !== user.uid) {
        // Se a dieta não pertence ao usuário autenticado, redireciona ou exibe erro
        const result = await Swal.fire({
          title: 'Acesso negado',
          text: 'Você não tem permissão para editar essa dieta.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        if (result.isConfirmed) {
          // Redireciona para a página inicial
          navigate(-1); // Redireciona para a página inicial após o usuário confirmar
        }
        // window.location.href = '/'; // Redireciona para a página inicial ou qualquer outra
      } else {
        setNomeDieta(docSnap.data().name); // Pega o nome da dieta

        // Buscar a subcoleção `refeicoes`
        const refeicoesRef = collection(docRef, 'refeicoes');
        const refeicoesSnap = await getDocs(refeicoesRef);

        if (!refeicoesSnap.empty) {
          const refeicoesData = refeicoesSnap.docs[0].data().diasDaSemana;
          setDiasDaSemana(refeicoesData);
        } else {
          Swal.fire('Erro', 'Não foi encontrada a subcoleção de refeições.', 'error');
        }
      }
    } else {
      Swal.fire('Erro', 'Dieta não encontrada.', 'error');
    }
  } catch (error) {
    console.error('Erro ao buscar dieta:', error);
    Swal.fire('Erro', 'Não foi possível carregar a dieta.', 'error');
  }
};



  // Função para salvar os dados da dieta automaticamente após cada alteração
  const saveDietData = async () => {
    try {
      const docRef = doc(db, 'dietas', dietId); // Referência à dieta
      const refeicoesRef = collection(docRef, 'refeicoes'); // Subcoleção de refeições
      const refeicoesSnap = await getDocs(refeicoesRef);

      if (!refeicoesSnap.empty) {
        const refeicoesDoc = refeicoesSnap.docs[0]; // Supomos que haja apenas um documento
        await setDoc(refeicoesDoc.ref, { diasDaSemana }, { merge: true });
      } else {
        // Caso a subcoleção de refeições não exista, cria-a
        await setDoc(doc(refeicoesRef), { diasDaSemana });
      }
      
    } catch (error) {
      console.error('Erro ao salvar dieta:', error);
      Swal.fire('Erro', 'Não foi possível salvar a dieta.', 'error');
    }
  };


  // Função para manipular mudanças nas refeições
  const handleRefeicaoChange = (diaIndex, refeicaoIndex, value) => {
    const updatedDias = [...diasDaSemana];
    updatedDias[diaIndex].refeicoes[refeicaoIndex] = value;
    setDiasDaSemana(updatedDias);

    // Salvar a dieta automaticamente após cada alteração
    saveDietData();
  };
  
  return (
    <div className="dieta-container">
      <div className="dieta-content">
      <h1 className="dieta-h1">{nomeDieta || 'Plano Nutricional'}</h1>
        <div className="dieta-table">
          <table className="dietatable">
            <thead>
              <tr>
                <th className="dieta-thead-th">Dia da semana</th>
                <th className="dieta-thead-th">Refeição 1</th>
                <th className="dieta-thead-th">Refeição 2</th>
                <th className="dieta-thead-th">Refeição 3</th>
                <th className="dieta-thead-th">Refeição 4</th>
                <th className="dieta-thead-th">Refeição 5</th>
              </tr>
            </thead>
            <tbody>
              {diasDaSemana.map((dia, diaIndex) => (
                <tr key={diaIndex}>
                  <td className="dieta-tbody-td">{dia.dia}</td>
                  {dia.refeicoes.map((refeicao, refeicaoIndex) => (
                    <td key={refeicaoIndex} className="dieta-tbody-td">
                      <textarea
                        className="textarea-dieta"
                        value={refeicao}
                        onChange={(e) =>
                          handleRefeicaoChange(diaIndex, refeicaoIndex, e.target.value)
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
  );
};

export default Dieta;