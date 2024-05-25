import React, { useEffect, useState } from "react";
import {
  Link,
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AnalystForm from "./forms/AnalystForm.jsx";
import AnalystClient from "./analysts/client/ClientAnalyst.jsx";
import GeneralAnalyst from "./analysts/general/GeneralAnalyst.jsx";
import "./App.css";

const ClientAnalystView = ({ analysts, data }) => (
  <AnalystClient analysts={analysts} data={data} />
);

const GeneralAnalystView = ({reqs,data}) => <GeneralAnalyst reqs={reqs} data={data}/>;

const TestsView = () => <p>Estas es añadir pruebas</p>;

function MainApp() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [data, setData] = useState();
  const location = useLocation();
  const analysts = [
    { id: "1", name: "Analista 1" },
    { id: "2", name: "Analista 2" },
    { id: "3", name: "Analista 3" },
  ];
  const reqs = [
    { desc: "Descripción del primer requerimiento" },
    { desc: "Descripción del segundo requerimiento" },
    { desc: "Descripción del tercer requerimiento" },
    { desc: "Descripción del cuarto requerimiento" },
    { desc: "Descripción del quinto requerimiento" },
    { desc: "Descripción del primer requerimiento" },
    { desc: "Descripción del segundo requerimiento" },
    { desc: "Descripción del tercer requerimiento" },
    { desc: "Descripción del cuarto requerimiento" },
    { desc: "Descripción del quinto requerimiento" },
    { desc: "Descripción del primer requerimiento" },
    { desc: "Descripción del segundo requerimiento" },
    { desc: "Descripción del tercer requerimiento" },
    { desc: "Descripción del cuarto requerimiento" },
    { desc: "Descripción del quinto requerimiento" }
  ];
  const changeAuthorization = () => {
    setIsAuthorized((prev) => !prev);
  };

  useEffect(() => {
    console.log(isAuthorized);
  }, [isAuthorized]);

  const renderContent = () => {
    switch (location.pathname) {
      case "/clientAnalyst":
        return <ClientAnalystView analysts={analysts} data={data} />;
      case "/generalAnalyst":
        return <GeneralAnalystView reqs={reqs} data={data} />;
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
            <Link to="/clientAnalyst">
              <button>Login analista Cliente</button>
            </Link>
            <Link to="/generalAnalyst">
              <button>Login analista General</button>
            </Link>
          </header>
          <div className="logins">
            <Routes>
              <Route path="/tests" element={<h1>Estas en pruebas</h1>} />
              <Route
                path="/clientAnalyst"
                element={
                  <AnalystForm
                    changeAuthorization={changeAuthorization}
                    setData={setData}
                  />
                }
              />
              <Route
                path="/generalAnalyst"
                element={
                  <AnalystForm
                    changeAuthorization={changeAuthorization}
                    setData={setData}
                  />
                }
              />
            </Routes>
          </div>
        </>
      ) : (
        <div className="analystContainer">
          <div className="analystBar">
            <h2>Current Location: {location.pathname}</h2>
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
