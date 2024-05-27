import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Phase7.css';

export default function Phase7({ req }) {
  const [process, setProcess] = useState({});
  const [results, setResults] = useState([]);
  const [hasFetched, setHasFetched] = useState(false); // Flag to prevent multiple fetches

  useEffect(() => {
    setProcess(req.PROCESS[6]);
  }, [req]);

  const fetchCandidates = async () => {
    try {
      console.log(req);
      console.log("id del proceso", process.IDPERFIL_FK);
      const route = `http://localhost:3000/tests/getWinners?profileId=${process.IDPERFIL_FK}&phaseId=6&reqConsec=${req.CONSECREQUE}&testId=2`;
      console.log(route);
      const response = await axios.get(route);
      console.log("respuestas", response.data);
      setResults(response.data);
      setHasFetched(true); // Set flag to true after fetching
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  useEffect(() => {
    if (!hasFetched && process.IDPERFIL_FK) {
      fetchCandidates();
    }
  }, [process, hasFetched]);

  return (
    <div className='phase7container'>
      <h3>Candidatos con dos o más respuestas bien</h3>
      <div className='listCA'>
        {results.map(test => (
          <div key={test.USUARIO}>
            <p>{test.NOMBRE} {test.APELLIDO}</p>
            <p>{test.USUARIO}</p>
            <p>{test.IDTIPODOC_FK}--{test.NDOC}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
