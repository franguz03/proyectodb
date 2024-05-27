import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Phase5.css';

export default function Phase5({ req }) {
  const [process, setProcess] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [showCand, setShowCand] = useState({});
  const now = new Date();
  const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
  const [fromdata2, setFormData2] = useState({
    IDPERFIL_FK: '',
    IDFASE_FK: '6',
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
    setProcess(req.PROCESS[4]);
  }, [req]);

  useEffect(() => {
    if (process) {
      const now = new Date();
      const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
  
      setFormData2({
        IDPERFIL_FK: process.IDPERFIL_FK || '',
        IDFASE_FK:'6',
        CONSECREQUE_FK: process.CONSECREQUE_FK || '',
        FECHAPRESENTACION: formattedDate,
        USERS: fromdata2.USERS || ''
      });
  
      const fetchCandidates = async () => {
        try {
            console.log(req)
            const route=`http://localhost:3000/candidates/summonedCandidates?profileId=${process.IDPERFIL_FK}&reqConsec=${req.CONSECREQUE}`;
          console.log(route)
            const response = await axios.get(route);
          setCandidates(response.data);
        } catch (error) {
          console.error('Error fetching candidates:', error);
        }
      };
  
      fetchCandidates();
    }
  }, [process]);
  
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
          console.log("fase5",fromdata2)
      const response2 = await axios.post('http://localhost:3000/candidates/createCandProcesses', fromdata2, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Form data2 submitted successfully:', response2.data);
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Optionally, handle error (e.g., show an error message)
    }
  };

  // ShowHV function component to render historical data
  const ShowHV = ({ hv ,name}) => {
    return (
      <div className='hv'>
        <h3>Historial de Vida {name}</h3>
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
    <div className='phase4container'>
      <div className='candidatesList'>
        <h3>Candidates</h3>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
