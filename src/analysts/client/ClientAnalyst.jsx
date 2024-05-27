import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AnalystClient.css";

export function ShowReq({ reqData }) {
  return (
    <div>
      <h1>Datos del Requerimiento</h1>
      <p>Responsable: {reqData.CODEMPLEADO_FK}</p>
      <p>Fecha: {reqData.FECHAREQUE}</p>
      <p>Funciones: {reqData.DESFUNCION}</p>
      <p>Carreras: {reqData.DESCARRERAS}</p>
      <p>Vacantes: {reqData.NVACANTES}</p>
      <p>Salario Mínimo: {reqData.SALARIOMIN}</p>
      <p>Salario Máximo: {reqData.SALARIOMAX}</p>
      <p>Analista general: {reqData.CODEMPLEADO_FK2}</p>
    </div>
  );
}

export default function AnalystClient({ analysts, data }) {
  const [showData, setShowData] = useState(false);
  const [dataSended, setDataSended] = useState({});
  const [formData, setFormData] = useState({
    CODEMPLEADO_FK: data.CODEMPLEADO,
    FECHAREQUE: "",
    DESFUNCION: "Sin descripción",
    DESCARRERAS: "Sin descripción",
    NVACANTES: 0,
    SALARIOMIN: 0,
    SALARIOMAX: 0,
    CODEMPLEADO_FK2: "",
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
    setFormData((prevFormData) => ({
      ...prevFormData,
      FECHAREQUE: formattedDate,
    }));
  }, []);

  useEffect(() => {
    const sendData = async () => {
      try {
        const response = await axios.post("http://localhost:3000/requirements/create", formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error al enviar el requerimiento:", error);
      }
    };
  
    if (showData) {
      console.log(dataSended)
      sendData();
    }
  }, [dataSended]);
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "SALARIOMIN" || name === "SALARIOMAX" || name === "NVACANTES" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDataSended(formData);
    setShowData(true);
    
    
  };

  return (
    <div className="analystClient-form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="analystClient-info">
          <label htmlFor="DESFUNCION" className="analystClient-label">
            Descripción de Funciones
          </label>
          <textarea
            id="DESFUNCION"
            name="DESFUNCION"
            value={formData.DESFUNCION}
            onChange={handleChange}
            className="textarea"
          />
        </div>
        <div className="analystClient-info">
          <label htmlFor="DESCARRERAS" className="analystClient-label">
            Descripción de Carreras
          </label>
          <textarea
            id="DESCARRERAS"
            name="DESCARRERAS"
            value={formData.DESCARRERAS}
            onChange={handleChange}
            className="textarea"
          />
        </div>
        <div className="analystClient-info">
          <label htmlFor="NVACANTES" className="analystClient-label">
            Número de Vacantes
          </label>
          <input
            type="number"
            id="NVACANTES"
            name="NVACANTES"
            value={formData.NVACANTES}
            onChange={handleChange}
            className="analystClient-input-field"
          />
        </div>
        <div className="analystClient-info">
          <label htmlFor="SALARIOMIN" className="analystClient-label">
            Salario Mínimo
          </label>
          <input
            type="number"
            id="SALARIOMIN"
            name="SALARIOMIN"
            value={formData.SALARIOMIN}
            onChange={handleChange}
            className="analystClient-input-field"
          />
        </div>
        <div className="analystClient-info">
          <label htmlFor="SALARIOMAX" className="analystClient-label">
            Salario Máximo
          </label>
          <input
            type="number"
            id="SALARIOMAX"
            name="SALARIOMAX"
            value={formData.SALARIOMAX}
            onChange={handleChange}
            className="analystClient-input-field"
          />
        </div>
        <div className="analystClient-info">
          <label htmlFor="CODEMPLEADO_FK2" className="analystClient-label">
            Seleccionar Analista
          </label>
          <select
            id="CODEMPLEADO_FK2"
            name="CODEMPLEADO_FK2"
            value={formData.CODEMPLEADO_FK2}
            onChange={handleChange}
            className="analystClient-select-field"
          >
            <option value="" disabled>
              Seleccionar...
            </option>
            {analysts.map((analyst, index) => (
              <option key={index} value={analyst.CODEMPLEADO}>
                {analyst.NOMEMPLEADO}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="analystClient-button">
          Enviar
        </button>
      </form>

      {showData === true ? <div className="showReq"> <ShowReq reqData={dataSended} /> <button style={{height:"40px",width:"70px", border:"2px solid black", display:"flex",alignItems:"center",justifyContent:"center"}}
            onClick={() => {
              setShowData(false);
            }}
          ><p>cerrar</p></button></div>  : null}
    </div>
  );
}
