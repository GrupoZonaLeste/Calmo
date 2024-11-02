import React, { useState } from 'react';
import './Meu Treino CSS.css';

const MeuTreinoOutubro = () => {
  const [themeColor, setThemeColor] = useState('#292929');
  const [treinos, setTreinos] = useState([
    { dia: 'Segunda-feira', treino1: 'Pernas - Agachamento', treino2: 'Core - Abdominal', treino3: 'Cárdio - Corrida 5km', concluido: false },
    { dia: 'Terça-feira', treino1: 'Peito - Supino', treino2: 'Ombro - Desenvolvimento', treino3: 'Alongamento', concluido: false },
    { dia: 'Quarta-feira', treino1: 'Costas - Remada', treino2: 'Bíceps - Rosca Direta', treino3: 'Cárdio - HIIT 20 min', concluido: false },
    { dia: 'Quinta-feira', treino1: 'Pernas - Leg Press', treino2: 'Core - Prancha', treino3: 'Cárdio - Ciclismo 10km', concluido: false },
    { dia: 'Sexta-feira', treino1: 'Peito - Crucifixo', treino2: 'Tríceps - Testa', treino3: 'Cárdio - Natação 30 min', concluido: false }
  ]);

  const handleThemeChange = () => {
    const newColor = document.getElementById('colorPicker').value;
    setThemeColor(newColor);
  };

  const toggleTreinoConcluido = (index) => {
    const newTreinos = [...treinos];
    newTreinos[index].concluido = !newTreinos[index].concluido;
    setTreinos(newTreinos);
  };

  return (
    <div className="meutreino-container" style={{ backgroundColor: themeColor }}>

      {/* Conteúdo principal */}
      <div className="meutreino-content">
        <h1 className="meutreino-h1"><i>Rotina de Treinos - Outubro</i></h1>

        {/* Tabela de Treino */}
        <div className="meutreino-workout-table" id="treino">
          <table className="meutreino-table">
            <thead className="meutreino-thead">
              <tr>
                <th>Dia da semana</th>
                <th>Treino 1</th>
                <th>Treino 2</th>
                <th>Treino 3</th>
                <th>Concluído</th>
              </tr>
            </thead>
            <tbody className="meutreino-tbody">
              {treinos.map((treino, index) => (
                <tr key={index}>
                  <td>{treino.dia}</td>
                  <td><textarea value={treino.treino1} readOnly /></td>
                  <td><textarea value={treino.treino2} readOnly /></td>
                  <td><textarea value={treino.treino3} readOnly /></td>
                  <td>
                    <input
                      type="checkbox"
                      className="meutreino-input"
                      checked={treino.concluido}
                      onChange={() => toggleTreinoConcluido(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Seção de estatísticas */}
        <div className="meutreino-statistics" id="estatisticas">
          <h2>Estatísticas do Mês</h2>
          <div className="meutreino-progress">
            <p>Dias de treino completados: <strong>12 dias</strong></p>
            <p>Meta de treinos: <strong>20 dias</strong></p>
            <p>Progresso: <progress value="12" max="20"></progress></p>
          </div>
        </div>

        {/* Seção de personalização */}
        <div className="meutreino-customization" id="personalizar">
          <h2>Personalizar Treinos</h2>
          <p>Escolha a cor do seu tema:</p>
          <input type="color" id="colorPicker" value={themeColor} onChange={handleThemeChange} />
          <button className="meutreino-button" onClick={handleThemeChange}>Aplicar Tema</button>
        </div>
      </div>
    </div>
  );
};

export default MeuTreinoOutubro;
