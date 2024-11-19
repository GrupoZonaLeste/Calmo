import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Calendar from 'react-calendar'
import "./Frequencia.css"

const Frequencia = ({ readingDays }, props) => {
  
  const [value, setValue] = useState(new Date())

  const tileClassName = ({ date, view}) =>{
    if(view === 'month'){
        const day = date.getDate();
        const today = new Date().getDate();

        if(day === today){
            return 'react-calendar__tile--now'
        }

        if(readingDays.includes(day)){
            return 'highlight';
        }
    }
  };

    return (
      <div className='container_Leitura' >
        <div className='container_calendarLeitura'>
          <h3 className='title_frequenciaLeitura' >Frequência de Leitura</h3>
            <Calendar onChange={setValue} value={value} tileClassName={tileClassName}
            calendarType="gregory"/> 
        </div>

      {/* <Link to={"/meus_grifos"}>
        <div className="MeusGrifos">
          <h1 className='title_meusGrifos'>Meus Grifos</h1>
          <p>Visualize suas grifagens de suas leitura</p>
        </div>
        </Link> */}
    </div>
  )
}

export default Frequencia