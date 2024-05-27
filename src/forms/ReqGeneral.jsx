import React, { useState, useEffect } from "react";
import axios from 'axios';
import './ReqGeneral.css'
import { Message } from "../shared/Message";

export default function ReqGeneral({ req, profiles, code, newReqs,changeVisibility,changeReq }) {
  const [formData, setFormData] = useState({
    IDPERFIL_FK: null,
    FECHAINICIO: "",
    CONSECREQUE_FK: req.CONSECREQUE
  });
  const message = new Message();

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      CONSECREQUE_FK: req.CONSECREQUE
    }));
  }, [req]);

  useEffect(() => {
    const now = new Date();
    const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
    setFormData((prevFormData) => ({
      ...prevFormData,
      FECHAINICIO: formattedDate,
    }));
  }, []);



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (req.PROCESS && req.PROCESS.length > 0) {
        console.log("Este requerimiento ya está cargado");
      } else {
        console.log(formData);
        await axios.post("http://localhost:3000/requirements/createReqProcesses", formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const processesR = await axios.get(`http://localhost:3000/requirements/getByEmployeeCode/${code}`);
        newReqs(processesR.data);
  
        // Find the requirement with the matching CONSECREQUE
        const foundRequirement = processesR.data.find(item => item.CONSECREQUE === req.CONSECREQUE);
        changeReq(foundRequirement)
        message.success('Información actualizada');
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
    changeVisibility();
  };
  return (
    <div className="reqGeneral-container">
      <h2>Editar Requisito {req.CONSECREQUE}</h2>
      <form onSubmit={handleSubmit}>
        <div className="reqGeneral-info">
          <label htmlFor="IDPERFIL_FK">Perfil:</label>
          <select
            id="IDPERFIL_FK"
            name="IDPERFIL_FK"
            value={formData.IDPERFIL_FK}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar Perfil</option>
            {profiles.map((profile, index) => (
              <option key={index} value={profile.IDPERFIL}>
              {profile.IDPERFIL}--{profile.DESPERFIL}---{profile.DESCDISCIPLINA}
              </option>
            ))}
          </select>
        </div>
        <button className="buttonR" type="submit"> Guardar</button>
      </form>
    </div>
  );
}
