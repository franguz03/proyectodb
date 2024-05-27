import React, { useState } from "react";
import axios from 'axios';
import "./formStyles.css";

export default function AnalystForm({ changeAuthorization, setData, setLocation, setAnalysts }) {
  const [formData, setFormData] = useState({
    CODEMPLEADO: "",
    CORREO: "",
  });

  const changeLocation = (title) => {
    let actualRute;
    if (title === "Analista Cliente") {
      actualRute = "/clientAnalyst";
    } else if (title === "Analista General") {
      actualRute = "/generalAnalyst";
    } else {
      actualRute = "/defaultRoute"; // Define a default route or handle the unexpected title
    }
    setLocation(actualRute);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: String(value), // Asegura que el valor sea una cadena
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (formData.CODEMPLEADO && formData.CORREO) {
      try {
        const response = await axios.post('http://localhost:3000/employees/logIn', formData, {
          headers: {
            'Content-Type': 'application/json', // Asegura que el contenido es JSON
          },
        });
        setData(response.data.employee);
        console.log(response.data.employee)
        let title = response.data.employee.DESCTIPOCARGO;

        // Change location based on title
        changeLocation(title);


        if (title === "Analista Cliente") {
          const analystsResponse = await axios.get('http://localhost:3000/employees/getGeneralAnalysts');
          setAnalysts(analystsResponse.data);
        }

        changeAuthorization();
      } catch (error) {
        console.error('There was a problem with the axios operation:', error);
      }
    } else {
      alert("All fields are required");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div>
        <label>
          <p>Code:</p>
          <input
            type="text"
            name="CODEMPLEADO"
            value={formData.CODEMPLEADO}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
      </div>
    
      <div>
        <label>
          <p>Email:</p>
          <input
            type="email"
            name="CORREO"
            value={formData.CORREO}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
      </div>
      <button type="submit" className="form-button">
        Submit
      </button>
    </form>
  );
}
