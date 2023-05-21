import "../styles/main.css";
import LiveMonitoring from "./LiveMonitoring";
import ValidasiDeviasi from "./ValidasiDeviasi";
import Notification from "../components/Notification";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useState, useEffect } from "react";

const Main = () => {
  const [currentPage, setCurrentPage] = useState("live-monitoring");

  //token
  const getToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NywidXNlcm5hbWUiOiJkZXZlbG9wZXIiLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkX2F0IjoiMjAyMi0wNi0yMyAxNDozMToyMSIsInVwZGF0ZWRfYXQiOiIyMDIyLTEwLTI3IDAwOjQxOjQ4IiwibmFtZSI6IkFkbWluIiwiY29tcGFueSI6IlBUIEJlcmF1IENvYWwifQ.84ujW7wKhnX5qIsO44tw8STP9ID4UKxzPPwnVaMuSTc";

  //cctv data
  const [cctvData, setCctvData] = useState([]);
  const [currentCctvId, setCurrentCctvId] = useState();

  const [currentObject, setCurrentObject] = useState(1);
  const [currentDeviation, setCurrentDeviation] = useState();

  useEffect(() => {
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
      .catch((err) => console.log(err));
  }, []);

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
                getToken={getToken}
                cctvData={cctvData}
                currentCctvId={currentCctvId}
                setCurrentCctvId={setCurrentCctvId}
              />
            ) : currentPage === "validasi-deviasi" ? (
              <ValidasiDeviasi />
            ) : (
              <h1>Data Tervalidasi</h1>
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
                  setCurrentPage={setCurrentPage}
                  currentCctvId={currentCctvId}
                  setCurrentCctvId={setCurrentCctvId}
                  currentObject={currentObject}
                  setCurrentObject={setCurrentObject}
                  currentDeviation={currentDeviation}
                  setCurrentDeviation={setCurrentDeviation}
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
