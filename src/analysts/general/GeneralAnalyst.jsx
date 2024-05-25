import React, { useState, useEffect } from "react";
import "./GeneralAnalyst.css";
import ReqGeneral from "../../forms/ReqGeneral";

export function Convocatory({ req }) {
    const [convocatoryInfo, setConvocatoryInfo] = useState("");

    const handleTextareaChange = (event) => {
      setConvocatoryInfo(event.target.value);
    };
  
    const sendConvocatory = () => {
      console.log(convocatoryInfo, req);
    };
  
    return (
      <div className="convocatory">
        <h1>Convocatoria</h1>
        <textarea
        className="convocatory-text"
          name="convocatory"
          id="convocatory"
          value={convocatoryInfo}
          onChange={handleTextareaChange}
        />
        <button onClick={sendConvocatory}>Enviar Convocatoria</button>
      </div>
    );
  }

export default function GeneralAnalyst({ reqs, data }) {
    const disciplines = [
        { id: 1, name: "Desarrollo de Software" },
        { id: 2, name: "Diseño Gráfico" },
        { id: 3, name: "Ingeniería Civil" },
        { id: 4, name: "Marketing Digital" },
      ];
      
      const profiles = [
        { id: 1, name: "Desarrollador Frontend" },
        { id: 2, name: "Diseñador UX/UI" },
        { id: 3, name: "Ingeniero Estructural" },
        { id: 4, name: "Especialista en Redes Sociales" },
      ];
  const [currentDate, setCurrentDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [isDataVisible, setIsDataVisible] = useState(false);
  const [reqSelected, setReqSelected] = useState(null);

  

  const displayReq = (req) => {
    setIsDataVisible(true);
    setReqSelected(req);
  };

  useEffect(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    setCurrentDate({ day, month, year });
  }, []);

  return (
    <div className="generalAnalyst-form-container">
      <div className="generalAnalyst-info">
        <h1>
          Analista: {data.firstName} {data.lastName}
        </h1>
        <div>
        <h1><p>Día: {currentDate.day}/ </p>
          <p>Mes: {currentDate.month}/ </p>
          <p>Año: {currentDate.year}</p></h1>
          
        </div>
      </div>
      <div className="reqInfo">
      <div className="reqsBar">
        
        {reqs.map((req, index) => (
          <button key={index} onClick={() => displayReq(req)}>
            {index+1}
          </button>
        ))}
      </div><button>Mandar Invitación</button></div>
      {isDataVisible && reqSelected && (
        <div className="selectedReqInfo">
          <ReqGeneral req={reqSelected} disciplines={disciplines} profiles={profiles}/> <Convocatory req={reqSelected}/>
        </div>
      )}
    </div>
  );
}
