import React, { useState } from 'react';
import './Modo Fitness CSS.css';
import { Link } from 'react-router-dom';
import MeuTreinoOutubro from  './Meu Treino React'

const ModoFitness = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dietName, setDietName] = useState('');
  const [visualization, setVisualization] = useState('Planilha');
  const scrollAmount = 300; // Valor da rolagem em pixels

  const openModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDietFormSubmit = (event) => {
    event.preventDefault();
    closeModal();
  };

  const scrollLeft = () => {
    document.getElementById('routineCarousel').scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    document.getElementById('routineCarousel').scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="modofitness-body">
      <div className="modofitness-container">
        {/* Conteúdo principal */}
        <div className="modofitness-content">
          <h1 className="modofitness-h1">Modo Fitness</h1>

          {/* Seção de criação de rotina */}
          <div className="modofitness-create-routine">
            <h2 className="modofitness-h2">Criar Rotina:</h2>
            <div className="modofitness-routine-options">
              <a href="#" className="modofitness-routine-option" onClick={openModal}>
                <p>Planilha de Dieta</p>
                <div className="modofitness-plus-container">
                  <div className="modofitness-plus-sign">+</div>
                </div>
              </a>
              <Link to="/treinos" className="modofitness-routine-option">
              
                <p className='texto-link'>Agenda de Treino</p>
              
                <div className="modofitness-plus-container">
                  <div className="modofitness-plus-sign">+</div>
                </div>
                </Link>
              <a href="#" className="modofitness-routine-option">
                <p>Metas Mensais</p>
                <div className="modofitness-plus-container">
                  <div className="modofitness-plus-sign">+</div>
                </div>
              </a>
            </div>
          </div>

          {/* Modal para criar a dieta */}
          {isModalOpen && (
            <div className="modofitness-modal" style={{ display: 'flex' }}>
              <div className="modofitness-modal-content">
                <span className="modofitness-close" onClick={closeModal}>&times;</span>
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
                  /><br /><br />

                  <label htmlFor="visualization">Visualização:</label>
                  <select
                    id="visualization"
                    name="visualization"
                    value={visualization}
                    onChange={(e) => setVisualization(e.target.value)}
                  >
                    <option value="Planilha">Planilha</option>
                    <option value="Calendário">Calendário</option>
                  </select><br /><br />
                  <Link to="/dieta"s>
                  <button type="submit">Criar rotina</button>
                  </Link>
                </form>
              </div>
            </div>
          )}

          {/* Seção de rotinas */}
          <h2 className="modofitness-h2">Suas Rotinas:</h2>
          <div className="modofitness-routine-section">
            <div className="modofitness-arrow-left" onClick={scrollLeft}>◀</div>
            <div className="modofitness-routine-carousel" id="routineCarousel">
              <a href="#" className="modofitness-routine-option">
                <div className="modofitness-routine-card">
                  <p>Meus Treinos</p>
                </div>
              </a>
              <a href="#" className="modofitness-routine-option">
                <div className="modofitness-routine-card">
                  <p>Minhas Dietas</p>
                </div>
              </a>
              <button  className="modofitness-routine-option">
                <div className="modofitness-routine-card">
                <Link to="/rotinas"s>
                <p className='texto-link'>Nova Rotina (+)</p>
                </Link>
                </div>
              </button>
            </div>
            <div className="modofitness-arrow-right" onClick={scrollRight}>▶</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModoFitness;
