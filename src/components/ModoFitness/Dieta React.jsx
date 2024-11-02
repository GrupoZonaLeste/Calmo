import React from 'react';
import "./Dieta.css";

const DietaSetembro = () => {
  const diasDaSemana = [
    {
      dia: 'Domingo',
      refeicoes: [
        '1 banana + 1 copo de iogurte',
        '2 ovos cozidos',
        'Salada de frutas',
        'Peito de frango grelhado',
        '1 maçã',
      ],
    },
    {
      dia: 'Segunda',
      refeicoes: [
        '1 fatia de queijo branco',
        'Batata doce + ovos',
        'Peixe grelhado',
        'Salada de folhas',
        '1 banana',
      ],
    },
    {
      dia: 'Terça',
      refeicoes: [
        '10 gramas de castanha-do-pará',
        'Sopa de legumes',
        'Frango desfiado',
        'Salada verde',
        '1 iogurte natural',
      ],
    },
    {
      dia: 'Quarta',
      refeicoes: [
        '1 laranja',
        'Omelete de queijo',
        'Carne moída com batata',
        'Salada de pepino',
        '1 barra de cereal',
      ],
    },
    {
      dia: 'Quinta',
      refeicoes: [
        'Vitamina de frutas',
        'Salada de atum',
        'Filé de peixe',
        'Arroz integral',
        'Suco verde',
      ],
    },
    {
      dia: 'Sexta',
      refeicoes: [
        'Panqueca de aveia',
        'Sopa de abóbora',
        'Frango grelhado',
        'Legumes no vapor',
        'Iogurte com chia',
      ],
    },
    {
      dia: 'Sábado',
      refeicoes: [
        'Granola com iogurte',
        'Salada de frutas',
        'Frango desfiado',
        'Salada de grão-de-bico',
        '1 torrada integral',
      ],
    },
  ];

  return (
    <div className="dieta-container">
      {/* Conteúdo principal */}
      <div className="dieta-content">
        <h1 className="dieta-h1">Plano Nutricional:</h1>
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
              {diasDaSemana.map((dia, index) => (
                <tr key={index}>
                  <td className="dieta-tbody-td">{dia.dia}</td>
                  {dia.refeicoes.map((refeicao, i) => (
                    <td key={i} className="dieta-tbody-td">
                      <textarea className='textarea-dieta' defaultValue={refeicao}></textarea>
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

export default DietaSetembro;
