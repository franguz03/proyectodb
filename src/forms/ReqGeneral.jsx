import React, { useState, useEffect } from "react";
import './ReqGeneral.css'

export default function ReqGeneral({ req, disciplines, profiles }) {
  const [formData, setFormData] = useState({
    description: req.desc || "", 
    discipline: "",
    profile: ""
  });

 
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: req.desc || ""
    }));
  }, [req]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div  className="reqGeneral-container">
      <h2>Editar Requisición</h2>
      <form onSubmit={handleSubmit}>
        <div className="reqGeneral-info">
          <label htmlFor="description">Descripción de Funciones:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
          />
        </div>
        <div className="reqGeneral-info">
          <label htmlFor="discipline">Disciplina:</label>
          <select
            id="discipline"
            name="discipline"
            value={formData.discipline}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar Disciplina</option>
            {disciplines.map((discipline) => (
              <option key={discipline.id} value={discipline.name}>
                {discipline.name}
              </option>
            ))}
          </select>
        </div>
        <div className="reqGeneral-info">
          <label htmlFor="profile">Perfil:</label>
          <select
            id="profile"
            name="profile"
            value={formData.profile}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar Perfil</option>
            {profiles.map((profile) => (
              <option key={profile.id} value={profile.name}>
                {profile.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
