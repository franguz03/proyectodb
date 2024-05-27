import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Message } from '../../shared/Message';
import './Phase6.css';

export default function Phase6({ req }) {
  const [process, setProcess] = useState({});
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState({});
  const [visibility, setVisibility] = useState(false);
  const phaseContainer = useRef(null);
  const message = new Message();
  const [formData2, setFormData2] = useState({
    IDPERFIL_FK: '',
    IDFASE_FK: '',
    CONSECREQUE_FK: '',
    FECHAPRES: '',
    IDPRUEBA_FK: ''
  });

  const chooseCand = (test) => {
    setVisibility(true);
    setSelectedTest(test);
  };

  useEffect(() => {
    setFormData2((prevFormData) => ({
      ...prevFormData,
      IDPRUEBA_FK: selectedTest.IDPRUEBA,
    }));
  }, [selectedTest]);

  useEffect(() => {
    setProcess(req.PROCESS[5]);
  }, [req]);

  useEffect(() => {
    if (process) {
      setFormData2((prevFormData) => ({
        IDPERFIL_FK: process.IDPERFIL_FK || '',
        IDFASE_FK: process.IDFASE_FK || '',
        CONSECREQUE_FK: process.CONSECREQUE_FK || '',
        FECHAPRES: prevFormData.FECHAPRES || '',
        IDPRUEBA_FK: prevFormData.IDPRUEBA_FK || ''
      }));

      const fetchCandidates = async () => {
        try {
          console.log(req);
          const route = `http://localhost:3000/tests/getByProfile/${process.IDPERFIL_FK}`;
          console.log(route);
          const response = await axios.get(route);
          setTests(response.data);
        } catch (error) {
          console.error('Error fetching tests:', error);
        }
      };

      fetchCandidates();
    }
  }, [process]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData2((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Formatear la fecha a "dd-mm-yyyy"
    const [year, month, day] = formData2.FECHAPRES.split('-');
    const formattedDate = `${day}-${month}-${year}`;

    const formDataWithFormattedDate = {
      ...formData2,
      FECHAPRES: formattedDate
    };

    try {
      await axios.post('http://localhost:3000/tests/createCandTest', formDataWithFormattedDate, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(formDataWithFormattedDate)

      message.success('Prueba lista');
      req.setDisabledPhases([true, true, true, true, true, true, false, true, true, true]);
      req.setPhaseClasses(
        ['disabled', 'disabled', 'disabled', 'disabled', 'disabled', 'disabled', '', 'disabled', 'disabled', 'disabled']
      );
      phaseContainer.current.style.display = 'none';
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Optionally, handle error (e.g., show an error message)
    }
  };

  // ShowHV function component to render historical data
  return (
    <div ref={phaseContainer} className='phase6container'>
      <div className='candidatesList'>
        <h3>Pruebas</h3>
        <ul className='listaT'>
          {tests.map(test => (
            <button key={test.IDPRUEBA} className='candidateButton' onClick={() => chooseCand(test)}>
              <p>{test.IDPRUEBA}</p>
            </button>
          ))}
        </ul>
      </div>

      {visibility?<form onSubmit={handleSubmit} className='formPhase6'>
        <div style={{display:"flex",flexDirection:"column"}}>
          <label htmlFor="fechapres">Fecha de Presentación:</label>
          <input
            type="date"
            id="fechapres"
            name="FECHAPRES"
            value={formData2.FECHAPRES}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className='buttonT'>Submit</button>
      </form>: <></>}

      
    </div>
  );
}
