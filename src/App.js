import React, { useState } from "react";
import { Link, BrowserRouter, Route, useLocation } from "react-router-dom";
import AnalystForm from "./forms/AnalystForm.jsx";
import AnalystClient from "./analysts/client/ClientAnalyst.jsx";
import GeneralAnalyst from "./analysts/general/GeneralAnalyst.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer />
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
