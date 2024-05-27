import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Phase4.css';
import { Message } from '../../shared/Message';

export default function Phase4({ req }) {
  const [process, setProcess] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [showCand, setShowCand] = useState({});
  const now = new Date();
  const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
  const phaseContainer = useRef(null);
  const message = new Message();
  const [fromdata1, setFormData] = useState({
    IDPERFIL_FK: '',
    IDFASE_FK: '',
    CONSECREQUE_FK: '',
    CONSPROCESO: '',
    INVITACION: ""
  });
  const [fromdata2, setFormData2] = useState({
    IDPERFIL_FK: '',
    IDFASE_FK: '',
    CONSECREQUE_FK: '',
    FECHAPRESENTACION: formattedDate,
    USERS: []
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
    setFormData2((prevFormData) => ({
      ...prevFormData,
      FECHAPRESENTACION: formattedDate,
    }));
  }, []);

  const chooseCand = (cand) => {
    setVisibility(true);
    setShowCand(cand);
  };

  useEffect(() => {
    console.log("SELECCIONADOS", selectedCandidates);
    setFormData2((prevFormData) => ({
        ...prevFormData,
        USERS:selectedCandidates,
      }));
  }, [selectedCandidates]);

  useEffect(() => {
    setProcess(req.PROCESS[3]);
  }, [req]);
  useEffect(() => {
    if (process) {
      const now = new Date();
      const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
  
      setFormData({
        IDPERFIL_FK: process.IDPERFIL_FK || '',
        IDFASE_FK: process.IDFASE_FK || '',
        CONSECREQUE_FK: process.CONSECREQUE_FK || '',
        CONSPROCESO: process.CONSPROCESO || '',
        INVITACION: fromdata1.INVITACION || '' // Keep existing value or set to default
      });
  
      setFormData2({
        IDPERFIL_FK: process.IDPERFIL_FK || '',
        IDFASE_FK: process.IDFASE_FK || '',
        CONSECREQUE_FK: process.CONSECREQUE_FK || '',
        FECHAPRESENTACION: formattedDate,
        USERS: fromdata2.USERS || ''
      });
  
      const fetchCandidates = async () => {
        try {
          const route = `http://localhost:3000/candidates/getByProfile?profileId=${process.IDPERFIL_FK}&reqConsec=${req.CONSECREQUE}`;
          const response = await axios.get(route);
          console.log(response.data)
          setCandidates(response.data);
        } catch (error) {
          console.error('Error fetching candidates:', error);
        }
      };
  
      fetchCandidates();
    }
  }, [process]);
  

  const handleChange = (e) => {
    setFormData({ ...fromdata1, INVITACION: e.target.value });
  };

  const handleCheckboxChange = (e, candidateId) => {
    if (e.target.checked) {
      setSelectedCandidates([...selectedCandidates, candidateId]);
    } else {
      setSelectedCandidates(selectedCandidates.filter(id => id !== candidateId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3000/requirements/updateReqProcess', fromdata1, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      await axios.post('http://localhost:3000/candidates/createCandProcesses', fromdata2, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      message.success('Invitación enviada');
      req.setDisabledPhases([true, true, true, true, false, true, true, true, true, true]);
      req.setPhaseClasses(
        ['disabled', 'disabled', 'disabled', 'disabled', '', 'disabled', 'disabled', 'disabled', 'disabled', 'disabled']
      );
      phaseContainer.current.style.display = 'none';
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Optionally, handle error (e.g., show an error message)
    }
  };

  // ShowHV function component to render historical data
  const ShowHV = ({ hv ,name}) => {
    return (
      <div className='hv'>
        <h3>Historial de Vida de {name}</h3>
        {hv.map((item, index) => (
          <div key={index} className='hvItem'>
            <h1><strong>Tipo de Estudio:</strong> {item.DESCTIPOITEMPERFIL}</h1>
            <p><strong>Institución:</strong> {item.NOMINSTITUCION}</p>
            <p><strong>Actividad:</strong> {item.DESCACTIVIDAD}</p>
            <p><strong>Función:</strong> {item.FUNCIONACTIVIDAD}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div ref={phaseContainer} className='phase4container'>
      <div className='candidatesList'>
        <h3>Candidatos</h3>
        <ul>
          {candidates.map(candidate => (
            <div className='cadidatespace'>
            <li key={candidate.USUARIO}>
                <input
                  type="checkbox"
                  onChange={(e) => handleCheckboxChange(e, candidate.USUARIO)}
                />
                
                <button className='candidateButton' onClick={() => chooseCand(candidate)}>
                    <p>{candidate.NOMBRE}</p>
              </button>
            </li>
            </div>
          ))}
        </ul>
      </div>
      {/* Render ShowHV component when visibility is true */}
      {visibility && <ShowHV hv={showCand.HVS} name={showCand.NOMBRE}/>}

      <form onSubmit={handleSubmit} className='formPhase4'>
        <div>
          <label htmlFor="convocatoria">Invitación:</label>
          <textarea
            id="convocatoria"
            value={fromdata1.INVITACION}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
