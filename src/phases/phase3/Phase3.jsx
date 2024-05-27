import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Phase3.css';

export default function Phase3({ req }) {
  const [process, setProcess] = useState({});

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
      const response = await axios.put('http://localhost:3000/requirements/updateReqProcess', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Form data submitted successfully:', response.data);
      // Optionally, handle success (e.g., show a notification or update the UI)
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Optionally, handle error (e.g., show an error message)
    }
  };

  return (
    <div className='phase3container'>
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
