import React, { useState, useEffect } from "react";
import "./AnalystClient.css";

export function ShowReq({ reqData }) {
  return (
    <div >
      <h1>Datos del Requerimiento</h1>
      <p>Responsable: {reqData.responsable}</p>
      <p>Fecha: {reqData.FechReque}</p>
      <p>Funciones: {reqData.desFuncion}</p>
      <p>Carreras: {reqData.desCarreras}</p>
      <p>Vacantes: {reqData.numVacantes}</p>
      <p>Analista general: {reqData.selectedAnalyst}</p>
    </div>
  );
}

export default function AnalystClient({ analysts, data }) {
  const [showData, setShowData] = useState(false);
  const [dataSended, setDataSended] = useState({});
  const [formData, setFormData] = useState({
    responsable: data.code,
    FechReque: "",
    desFuncion: "",
    desCarreras: "",
    numVacantes: "",
    selectedAnalyst: "",
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString(); // Formato ISO para incluir fecha y hora
    setFormData((prevFormData) => ({
      ...prevFormData,
      FechReque: formattedDate,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
 
    console.log(formData);
    setDataSended(formData);
    setShowData(true);
  };

  return (
    <div className="analystClient-form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="analystClient-info">
          <label htmlFor="desFuncion" className="analystClient-label">
            Descripción de Funciones
          </label>
          <textarea
            id="desFuncion"
            name="desFuncion"
            value={formData.desFuncion}
            onChange={handleChange}
            className="analystClient-input-field"
          />
        </div>
        <div className="analystClient-info">
          <label htmlFor="desCarreras" className="analystClient-label">
            Descripción de Carreras
          </label>
          <textarea
            id="desCarreras"
            name="desCarreras"
            value={formData.desCarreras}
            onChange={handleChange}
            className="analystClient-input-field"
          />
        </div>
        <div className="analystClient-info">
          <label htmlFor="numVacantes" className="analystClient-label">
            Número de Vacantes
          </label>
          <input
            type="number"
            id="numVacantes"
            name="numVacantes"
            value={formData.numVacantes}
            onChange={handleChange}
            className="analystClient-input-field"
          />
        </div>
        <div className="analystClient-info">
          <label htmlFor="selectedAnalyst" className="analystClient-label">
            Seleccionar Analista
          </label>
          <select
            id="selectedAnalyst"
            name="selectedAnalyst"
            value={formData.selectedAnalyst}
            onChange={handleChange}
            className="analystClient-select-field"
          >
            <option value="" disabled>
              Seleccionar...
            </option>
            {analysts.map((analyst) => (
              <option key={analyst.id} value={analyst.id}>
                {analyst.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="analystClient-button">
          Enviar
        </button>
      </form>

      {showData === true ?<div className="showReq">  <ShowReq reqData={dataSended} /> <button style={{height:"40px",width:"70px", border:"2px solid black", display:"flex",alignItems:"center",justifyContent:"center"}}
            onClick={() => {
              setShowData(false);
            }}
          ><p>cerrar</p></button></div>  : null}
    </div>
  );
}
