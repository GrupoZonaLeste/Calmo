import React, { useState } from 'react';
import './treinos.css';

const Treinos = () => {
  const initialWorkoutPlan = [
    {
      day: 'Domingo',
      exercises: [
        'Corrida - 30 minutos',
        'Agachamento - 4x12',
        'Leg Press - 3x10',
        'Afundo - 3x12',
        'Alongamento - 10 min',
      ],
    },
    {
      day: 'Segunda',
      exercises: [
        'Rosca Direta - 4x10',
        'Tríceps Testa - 3x12',
        'Rosca Martelo - 3x10',
        'Tríceps Corda - 4x12',
        'Corrida leve - 20 min',
      ],
    },
    {
      day: 'Terça',
      exercises: [
        'Flexão de Braço - 4x15',
        'Supino Reto - 3x12',
        'Pulley Costas - 4x10',
        'Remada Curvada - 3x12',
        'Alongamento - 10 min',
      ],
    },
    {
      day: 'Quarta',
      exercises: [
        'Corrida - 45 min',
        'Burpees - 3x15',
        'Mountain Climbers - 3x20',
        'Polichinelo - 3x30',
        'Abdominal - 4x20',
      ],
    },
    {
      day: 'Quinta',
      exercises: [
        'Agachamento - 4x12',
        'Leg Press - 3x10',
        'Afundo - 3x12',
        'Extensão de Pernas - 4x12',
        'Corrida leve - 20 min',
      ],
    },
    {
      day: 'Sexta',
      exercises: [
        'Rosca Direta - 4x10',
        'Tríceps Testa - 3x12',
        'Rosca Martelo - 3x10',
        'Tríceps Corda - 4x12',
        'Corrida leve - 20 min',
      ],
    },
    {
      day: 'Sábado',
      exercises: [
        'Corrida - 30 minutos',
        'Agachamento - 4x12',
        'Leg Press - 3x10',
        'Afundo - 3x12',
        'Alongamento - 10 min',
      ],
    },
  ];

  const [workoutPlan, setWorkoutPlan] = useState(initialWorkoutPlan);

  return (
    <div className="treinos-body">
      <div className="treinos-container">
        {/* Conteúdo principal */}
        <div className="treinos-content">
          <h1 className="treinos-h1"><i>Plano de Treino:</i></h1>
          <div className="treinos-workout-table">
            <table className="treinos-table">
              <thead className="treinos-thead">
                <tr>
                  <th>Dia da Semana</th>
                  <th>Treino 1</th>
                  <th>Treino 2</th>
                  <th>Treino 3</th>
                  <th>Treino 4</th>
                  <th>Treino 5</th>
                </tr>
              </thead>
              <tbody className="treinos-tbody">
                {workoutPlan.map((day, dayIndex) => (
                  <tr key={dayIndex}>
                    <td>{day.day}</td>
                    {day.exercises.map((exercise, exerciseIndex) => (
                      <td key={exerciseIndex}>
                        <textarea className='textarea-treinos'
                          value={exercise}
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
