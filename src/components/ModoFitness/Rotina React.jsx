import React, { useState } from 'react';
import './Rotina.css';

const CriarRotina = () => {
  const [meals, setMeals] = useState([{ nome: '', descricao: '' }]);
  const [workouts, setWorkouts] = useState([{ nome: '', descricao: '' }]);

  return (
    <div className="rotina-body">
      <div className="rotina-container">
        {/* Conteúdo principal */}
        <div className="rotina-content">
          <h1 className="rotina-h1"><i>Criar Nova Rotina</i></h1>

          <form id="routineForm">
            <div className="rotina-form-section">
              <h2>Adicionar Refeição</h2>
              <div id="mealContainer">
                {meals.map((meal, index) => (
                  <div className="meal-entry" key={index}>
                    <input
                      type="text"
                      className="rotina-input"
                      placeholder="Nome da Refeição"
                      value={meal.nome}
                      
                    />
                    <textarea
                      className="rotina-input"
                      placeholder="Descrição (ex: 1 banana + iogurte)"
                      value={meal.descricao}
                      
                    />
                  </div>
                ))}
              </div>
              <button type="button" id="addMealBtn" className="rotina-button" >
                Adicionar Refeição
              </button>
            </div>

            <div className="rotina-form-section">
              <h2>Adicionar Treino</h2>
              <div id="workoutContainer">
                {workouts.map((workout, index) => (
                  <div className="workout-entry" key={index}>
                    <input
                      type="text"
                      className="rotina-input"
                      placeholder="Nome do Treino"
                      value={workout.nome}
                    
                    />
                    <textarea
                      className="rotina-input"
                      placeholder="Descrição (ex: 3 séries de 10 agachamentos)"
                      value={workout.descricao}
                     
                    />
                  </div>
                ))}
              </div>
              <button type="button" id="addWorkoutBtn" className="rotina-button">
                Adicionar Treino
              </button>
            </div>

            <button type="submit" className="rotina-button">Salvar Rotina</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CriarRotina;
