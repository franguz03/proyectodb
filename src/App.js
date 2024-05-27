import React, { useState } from "react";
import { Link, BrowserRouter, Route, useLocation } from "react-router-dom";
import AnalystForm from "./forms/AnalystForm.jsx";
import AnalystClient from "./analysts/client/ClientAnalyst.jsx";
import GeneralAnalyst from "./analysts/general/GeneralAnalyst.jsx";
import "./App.css";

const ClientAnalystView = ({ analysts, data }) => (
  <AnalystClient analysts={analysts} data={data} />
);

const GeneralAnalystView = ({  data }) => (
  <GeneralAnalyst  data={data} />
);

const TestsView = () => <p>Estas es añadir pruebas</p>;

function MainApp() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [data, setData] = useState();
  const [location, setLocation] = useState("");
  const [analysts, setAnalysts]=useState([])

  const changeAuthorization = () => {
    setIsAuthorized((prev) => !prev);
  };

  const renderContent = () => {
    switch (location) {
      case "/clientAnalyst":
        return <ClientAnalystView analysts={analysts} data={data} />;
      case "/generalAnalyst":
        return <GeneralAnalystView  data={data} />;
      default:
        return <TestsView />;
    }
  };

  return (
    <div className="container">
      {!isAuthorized ? (
        <>
          <header className="navbar">
            <Link to="/tests">
              <button>Añadir prueba</button>
            </Link>
            <Link to="/Analyst">
              <button>Login analista Cliente</button>
            </Link>
          </header>
          <div className="logins">
            <AnalystForm
              changeAuthorization={changeAuthorization}
              setData={setData}
              setLocation={setLocation}
              setAnalysts={setAnalysts}
            />
          </div>
        </>
      ) : (
        <div className="analystContainer">
          <div className="analystBar">
            <h2>Current Location: {location}</h2>
            <button
              style={{ marginRight: "15px" }}
              onClick={changeAuthorization}
            >
              Go Back
            </button>
          </div>
          <div className="analystOperations">{renderContent()}</div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

export default App;
