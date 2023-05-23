import "../styles/main.css";
import LiveMonitoring from "./LiveMonitoring";
import ValidasiDeviasi from "./ValidasiDeviasi";
import Notification from "../components/Notification";
import DataTervalidasi from "./DataTervalidasi";
import axios from "axios";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const Main = () => {
  const [currentPage, setCurrentPage] = useState(
    window.location.pathname === "/validasi-deviasi"
      ? "validasi-deviasi"
      : window.location.pathname === "/data-tervalidasi"
      ? "data-tervalidasi"
      : "live-monitoring"
  );

  //token
  const getToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NywidXNlcm5hbWUiOiJkZXZlbG9wZXIiLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkX2F0IjoiMjAyMi0wNi0yMyAxNDozMToyMSIsInVwZGF0ZWRfYXQiOiIyMDIyLTEwLTI3IDAwOjQxOjQ4IiwibmFtZSI6IkFkbWluIiwiY29tcGFueSI6IlBUIEJlcmF1IENvYWwifQ.84ujW7wKhnX5qIsO44tw8STP9ID4UKxzPPwnVaMuSTc";

  //cctv data
  const [cctvData, setCctvData] = useState([]);
  const [currentCctvId, setCurrentCctvId] = useState(1);
  const [currentCctvData, setCurrentCctvData] = useState([]);
  const [currentCctvName, setCurrentCctvName] = useState();
  const [currentCctvLocation, setCurrentCctvLocation] = useState();
  const [cctvLoading, setCctvLoading] = useState(false);
  const [cctvInfoLoading, setCctvInfoLoading] = useState(false);

  //deviation data
  const [currentDeviationId, setCurrentDeviationId] = useState(0);

  //object data
  const [currentObject, setCurrentObject] = useState("AllObject");
  const objectData = [
    { id: 1, name: "Semua", value: "AllObject" },
    { id: 2, name: "Person", value: "Person" },
    { id: 3, name: "LV", value: "LV" },
    { id: 4, name: "HD", value: "HD" },
  ];

  //validation data
  const [submitData, setSubmitData] = useState(false);

  useEffect(() => {
    setCctvLoading(true);
    axios
      .get(process.env.REACT_APP_API + "cctv", {
        headers: {
          Authorization: "Bearer " + getToken,
        },
      })
      .then((res) => {
        setCctvData(res.data.data);
        setCurrentCctvId(res.data.data[0].id);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setCctvLoading(false);
      });
  }, []);

  useEffect(() => {
    setCctvInfoLoading(true);
    axios
      .get(process.env.REACT_APP_API + "cctv/" + currentCctvId, {
        headers: {
          Authorization: "Bearer " + getToken,
        },
      })
      .then((res) => {
        setCurrentCctvData(res.data.data);
        setCurrentCctvName(res.data.data[0].name);
        setCurrentCctvLocation(res.data.data[0].location);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setCctvInfoLoading(false);
      });
  }, [currentCctvId]);

  return (
    <div className="main">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid container">
          <a
            className="navbar-brand d-flex align-items-center"
            onClick={() => {
              setCurrentPage("live-monitoring");
            }}
          >
            <img src={require("../assets/logo.png")} alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
              <li className="nav-item d-flex align-items-center">
                <a
                  className={
                    "nav-link" +
                    (currentPage === "live-monitoring" ? " active" : "")
                  }
                  onClick={() => {
                    setCurrentPage("live-monitoring");
                    window.history.replaceState(null, null, "/live-monitoring");
                  }}
                >
                  Live Monitoring
                </a>
              </li>
              <li className="nav-item d-flex align-items-center">
                <a
                  className={
                    "nav-link" +
                    (currentPage === "validasi-deviasi" ? " active" : "")
                  }
                  onClick={() => {
                    setCurrentPage("validasi-deviasi");
                    window.history.replaceState(
                      null,
                      null,
                      "/validasi-deviasi"
                    );
                  }}
                >
                  Validasi Deviasi
                </a>
              </li>
              <li className="nav-item d-flex align-items-center">
                <a
                  className={
                    "nav-link" +
                    (currentPage === "data-tervalidasi" ? " active" : "")
                  }
                  onClick={() => {
                    setCurrentPage("data-tervalidasi");
                    window.history.replaceState(
                      null,
                      null,
                      "/data-tervalidasi"
                    );
                  }}
                >
                  Data Tervalidasi
                </a>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle border-0 bg-transparent px-0"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Icon className="fs-4" icon="bi:person-circle" />
                </button>
                <ul className="dropdown-menu dropdown-menu-end mt-2">
                  <li>
                    <label
                      className="dropdown-item disabled text-center"
                      href="#"
                    >
                      Admin
                    </label>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center gap-2"
                      href="/login"
                    >
                      <Icon className="fs-5" icon="ci:log-out" />
                      <label>Log Out</label>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            {currentPage === "live-monitoring" ? (
              <LiveMonitoring
                cctvData={cctvData}
                currentCctvId={currentCctvId}
                setCurrentCctvId={setCurrentCctvId}
                currentCctvData={currentCctvData}
                cctvLoading={cctvLoading}
                cctvInfoLoading={cctvInfoLoading}
              />
            ) : currentPage === "validasi-deviasi" ? (
              <ValidasiDeviasi
                getToken={getToken}
                currentDeviationId={currentDeviationId}
                submitData={submitData}
                setSubmitData={setSubmitData}
              />
            ) : (
              <DataTervalidasi
                getToken={getToken}
                cctvData={cctvData}
                objectData={objectData}
              />
            )}
          </div>
          {currentPage === "live-monitoring" ||
          currentPage === "validasi-deviasi" ? (
            <div className="col-3">
              <div className="title mb-3">
                <div className="row align-items-center">
                  <div className="col-9">
                    <h6>List Deviasi</h6>
                    <label>List deviasi yang terdeteksi</label>
                  </div>
                  <div className="col d-flex justify-content-end">
                    {currentPage === "validasi-deviasi" ? (
                      <div className="dropdown">
                        <button
                          className="bg-transparent rounded px-1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <Icon
                            className="fs-5"
                            icon="material-symbols:filter-list"
                          />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end mt-3">
                          <li>
                            <label
                              className="dropdown-item disabled text-center"
                              href="#"
                            >
                              Admin
                            </label>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <a
                              className="dropdown-item d-flex align-items-center gap-2"
                              href="/login"
                            >
                              <Icon className="fs-5" icon="ci:log-out" />
                              <label>Log Out</label>
                            </a>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="content">
                <Notification
                  currentPage={currentPage}
                  getToken={getToken}
                  setCurrentPage={setCurrentPage}
                  currentCctvName={currentCctvName}
                  currentCctvLocation={currentCctvLocation}
                  currentDeviationId={currentDeviationId}
                  setCurrentDeviationId={setCurrentDeviationId}
                  currentObject={currentObject}
                  setCurrentObject={setCurrentObject}
                  objectData={objectData}
                  submitData={submitData}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
