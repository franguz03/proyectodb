import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Phase3.css';
import { Message } from '../../shared/Message';

export default function Phase3({ req }) {
  const [process, setProcess] = useState({});
  const phaseContainer = useRef(null);
  const message = new Message();

  const [formData, setFormData] = useState({
    IDPERFIL_FK: '',
    IDFASE_FK: '',
    CONSECREQUE_FK: '',
    CONSPROCESO: '',
    CONVOCANTORIA: ''
  });

  useEffect(() => {
    setProcess(req.PROCESS[2]);
  }, [req]);

  useEffect(() => {
    if (process) {
      setFormData({
        IDPERFIL_FK: process.IDPERFIL_FK || '',
        IDFASE_FK: process.IDFASE_FK || '',
        CONSECREQUE_FK: process.CONSECREQUE_FK || '',
        CONSPROCESO: process.CONSPROCESO || '',
        CONVOCANTORIA: formData.CONVOCANTORIA // Keep existing value or set to default
      });
    }
  }, [process]);

  const handleChange = (e) => {
    setFormData({ ...formData, CONVOCANTORIA: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      await axios.put('http://localhost:3000/requirements/updateReqProcess', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      message.success('Convocatoria realizada');
      req.setDisabledPhases([true, true, true, false, true, true, true, true, true, true]);
      req.setPhaseClasses(
        ['disabled', 'disabled', 'disabled', '', 'disabled', 'disabled', 'disabled', 'disabled', 'disabled', 'disabled']
      );
      phaseContainer.current.style.display = 'none';
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Optionally, handle error (e.g., show an error message)
    }
  };

  return (
    <div ref={phaseContainer} className='phase3container'>
      <form onSubmit={handleSubmit} className='formPhase3'>
        <div>
          <label htmlFor="convocatoria">Convocatoria:</label>
          <textarea
            id="convocatoria"
            value={formData.CONVOCANTORIA}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
