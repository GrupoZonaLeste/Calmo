import React, { useState } from 'react';
import './Rotina.css';

const CriarRotina = () => {


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
                  <div className="meal-entry">
                    <div className="label-rotina-div">
                    <label htmlFor="nome_refeicao" className="rotina-label"> Nome da refeição</label>
                    </div>
                    <input
                      id = "nome_refeicao"
                      type="text"
                      className="rotina-input"
                      placeholder="Nome da Refeição"

                    />
                    <div className="label-rotina-div">
                    <label htmlFor="descricao_refeicao" className="rotina-label"> Descrição</label>
                    </div>
                    <textarea
                      id = "descricao_refeicao"
                      className="rotina-input"
                      placeholder="Descrição (ex: 1 banana + iogurte)"
                    />
                  </div>
              </div>
              <button type="button" id="addMealBtn" className="rotina-button" >
                Adicionar Refeição
              </button>
            </div>

            <div className="rotina-form-section">
              <h2>Adicionar Treino</h2>
              <div id="workoutContainer">
                  <div className="workout-entry">
                    <div className="label-rotina-div">
                    <label htmlFor="nome_treino" className="rotina-label"> Nome do treino</label>
                    </div>
                    <input
                      id = "nome_treino"
                      type="text"
                      className="rotina-input"
                      placeholder="Nome do Treino"
                    
                    />
                    <div className="label-rotina-div">
                    <label htmlFor="descricao_treino" className="rotina-label"> Descrição</label>
                    </div>
                    <textarea
                      id = "descricao_treino"
                      className="rotina-input"
                      placeholder="Descrição (ex: 3 séries de 10 agachamentos)"
                    />
                  </div>
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
