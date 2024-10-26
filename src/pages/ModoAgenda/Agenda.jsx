import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import Calendar from 'react-calendar';
import SideBar from '../../components/Sidebar/SideBar'
import './Agenda.css';

const CLIENT_ID = '573382000184-nuldqho0u8fhc88fliue1ce1othuj244.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAmWfonwqhNjLt1J89-mrv2DjeyfWvPV2Q';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

const Agenda = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({ summary: '', startTime: '', endTime: '' });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        setIsSignedIn(authInstance.isSignedIn.get());
        authInstance.isSignedIn.listen(setIsSignedIn);
        if (authInstance.isSignedIn.get()) {
          listUpcomingEvents();
        }
      });
    };

    gapi.load('client:auth2', start);
  }, []);

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
    setEvents([]);
  };

  const listUpcomingEvents = () => {
    gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime',
    }).then(response => {
      setEvents(response.result.items);
    });
  };

  const addEvent = () => {
    if (!newEvent.summary || !newEvent.startTime || !newEvent.endTime) {
      alert("Por favor, preencha todos os campos do evento.");
      return;
    }

    const event = {
      summary: newEvent.summary,
      start: {
        dateTime: new Date(`${selectedDate.toISOString().split('T')[0]}T${newEvent.startTime}:00`).toISOString(),
      },
      end: {
        dateTime: new Date(`${selectedDate.toISOString().split('T')[0]}T${newEvent.endTime}:00`).toISOString(),
      },
    };

    gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    }).then(() => {
      setNewEvent({ summary: '', startTime: '', endTime: '' });
      listUpcomingEvents();
      setModalVisible(false);
    }).catch(error => {
      console.error("Erro ao adicionar evento: ", error);
      alert("Erro ao adicionar evento. Verifique os dados e tente novamente.");
    });
  };

  const handleDoubleClick = (value) => {
    setSelectedDate(value);
    setModalVisible(true);
  };

  return (
    <div className='container_modos'>
      <SideBar />
      <div className='modoagenda'>
        <h1>Modo Agenda</h1>
        <p>Se organize na sua agenda Google!</p>
        <div className="agenda-container">
          {!isSignedIn ? (
            <div className='mainAgenda'>
              <div>
              <h2 className='agenda-titulos'>Próximos eventos:</h2>
              <ul className="event-list">
                {events.length > 0 ? (
                  events.map((event, index) => (
                    <li key={index}>
                      {event.summary} - {new Date(event.start.dateTime).toLocaleString()}
                    </li>
                  ))
                ) : <p style={{color: "#f9f9f9"}}>Sem eventos</p>}
              </ul>
                </div>
              
              <div>
              <h2 className='agenda-titulos'>Calendário</h2>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="custom-calendar"
                onDoubleClickDay={handleDoubleClick}
                />
                <button className="sign-out-button" onClick={handleSignOutClick}>Fazer Logout do Google</button>
                </div>

              {modalVisible && (
                <div className="modal">
                  <div className="modal-content">
                    <h3 className='agenda-titulos'>Adicionar Evento</h3>
                    <input
                      type="text"
                      placeholder="Título do evento"
                      value={newEvent.summary}
                      onChange={(e) => setNewEvent({ ...newEvent, summary: e.target.value })}
                    />
                    <input
                      type="time"
                      placeholder="Hora de início"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                    />
                    <input
                      type="time"
                      placeholder="Hora de término"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                    />
                    <button className="button-agenda" onClick={addEvent}>Salvar Evento</button>
                    <button className="cancel-button" onClick={() => setModalVisible(false)}>Cancelar</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button className="login-button" onClick={handleAuthClick}>Login com Google</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agenda;