import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./GeneralAnalyst.css";
import ReqGeneral from "../../forms/ReqGeneral";
import Phase3 from "../../phases/phase3/Phase3";
import Phase4 from "../../phases/phase4/phase4";
import Phase5 from "../../phases/phase5/Phase5";
import Phase6 from "../../phases/phase6/Phase6";
import Phase7 from "../../phases/phase7/Phase7";

export default function GeneralAnalyst({ data }) {
  const [currentDate, setCurrentDate] = useState("");
  const [isDataVisible, setIsDataVisible] = useState(false);
  const [reqs, setReqs] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [reqSelected, setReqSelected] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState(null);

  const displayReq = (req) => {
    setIsDataVisible(true);
    setReqSelected(req);
    setSelectedPhase(null)
  };

  const handlePhaseClick = (phase) => {
    setSelectedPhase(phase);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/requirements/getByEmployeeCode/${data.CODEMPLEADO}`);
        setReqs(response.data);
        const profilesR = await axios.get("http://localhost:3000/profiles/getAll");
        setProfiles(profilesR.data);
      } catch (error) {
        console.error("Error al obtener los requerimientos:", error);
      }
    };

    fetchData();

    const now = new Date();
    const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, [data.CODEMPLEADO]);

  useEffect(() => { console.log(reqSelected) }, [reqSelected]);

  const renderPhaseContent = (phase,req) => {
    switch (phase) {
      case 1:
        return <p>Content for Phase 1</p>;
      case 2:
        return <p>Content for Phase 2</p>;
      case 3:
        return <Phase3 req={req}/>;
      case 4:
        return <Phase4 req={req}/>;
      case 5:
        return <Phase5 req={req}/>;
      case 6:
        return  <Phase6 req={req}/>;
      case 7:
        return <Phase7 req={req}/>;
      case 8:
        return <p>Content for Phase 8</p>;
      case 9:
        return <p>Content for Phase 9</p>;
      case 10:
        return <p>Content for Phase 10</p>;
      default:
        return null;
    }
  };

  return (
    <div className="generalAnalyst-form-container">
      <div className="generalAnalyst-info">
        <h1>Analista: {data.NOMEMPLEADO}</h1>
        <div>
          <h1>{currentDate}</h1>
        </div>
      </div>
      <div className="reqInfo">
        <div className="reqsBar">
          {reqs.map((req, index) => (
            <button key={index} onClick={() => displayReq(req)}>
              {req.CONSECREQUE}--{req.CODEMPLEADO_FK2}
            </button>
          ))}
        </div >
        <div className="options">
          {isDataVisible && reqSelected && reqSelected.PROCESS.length === 0 ? (
            <div className="selectedReqInfo">
              <ReqGeneral req={reqSelected} profiles={profiles} code={data.CODEMPLEADO} newReqs={setReqs} changeVisibility={setIsDataVisible} changeReq={setReqSelected}/>
            </div>
          ) : reqSelected != null ? (
            <div className="phases">
              <div className="phaseBar">
                {Array.from({ length: 10 }, (_, i) => i + 1).map(phase => (
                  <button key={phase} onClick={() => handlePhaseClick(phase)}>
                    Phase {phase}
                  </button>
                ))}
              </div>
              {selectedPhase !== null && (
                <div className="selectedPhaseInfo">
                  {renderPhaseContent(selectedPhase,reqSelected)}
                </div>
              )}
            </div>
          ) : <p>selecciona un requerimiento</p>}
        </div>
      </div>
    </div>
  );
}
