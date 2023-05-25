import "../styles/main.css";
import LiveMonitoring from "./LiveMonitoring";
import ValidasiDeviasi from "./ValidasiDeviasi";
import Notification from "../components/Notification";
import DataTervalidasi from "./DataTervalidasi";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

const Main = () => {
  const [currentPage, setCurrentPage] = useState(
    window.location.hash.includes("#/validasi-deviasi")
      ? "validasi-deviasi"
      : window.location.hash.includes("#/data-tervalidasi") &&
        localStorage.getItem("role") === "admin"
      ? "data-tervalidasi"
      : "live-monitoring"
  );

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

  //notification sound
  const [notificationSound, setNotificationSound] = useState(true);
  const audio = new Audio(require("../assets/notification.mp3"));

  //object data
  const objectData = [
    { id: 1, name: "Semua", value: "AllObject" },
    { id: 2, name: "Person", value: "Person" },
    { id: 3, name: "LV", value: "LV" },
    { id: 4, name: "HD", value: "HD" },
  ];
  const [currentObject, setCurrentObject] = useState("AllObject");

  //tipe validasi
  const validationTypeData = [
    { id: 1, name: "Semua", value: "Allvalidation" },
    { id: 2, name: "Perlu Validasi", value: "not_yet" },
    { id: 3, name: "Valid", value: "true" },
    { id: 4, name: "Tidak Valid", value: "false" },
  ];
  const [currentValidationType, setCurrentValidationType] =
    useState("Allvalidation");

  //validation data
  const [submitData, setSubmitData] = useState(false);

  useEffect(() => {
    setCctvLoading(true);
    axios
      .get("http://10.10.10.66:5002/api/" + "cctv", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
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
      .get("http://10.10.10.66:5002/api/" + "cctv/" + currentCctvId, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
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

  const cctvFilteArray = cctvData.map((cctv) => {
    return (
      <li key={cctv.id}>
        <button
          className={
            "dropdown-item text-center border-0" +
            (currentCctvId === cctv.id ? " active" : "")
          }
          onClick={() => {
            setCurrentCctvId(cctv.id);
          }}
        >
          {cctv.name + " - " + cctv.location}
        </button>
      </li>
    );
  });

  const validationTypeFilterArray = validationTypeData.map((validationType) => {
    return (
      <li key={validationType.id}>
        <button
          className={
            "dropdown-item text-center border-0" +
            (currentValidationType === validationType.value ? " active" : "")
          }
          onClick={() => {
            setCurrentValidationType(validationType.value);
          }}
        >
          {validationType.name}
        </button>
      </li>
    );
  });

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
                    window.history.replaceState(
                      null,
                      null,
                      "/mea-dev/#/live-monitoring"
                    );
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
                      "/mea-dev/#/validasi-deviasi"
                    );
                  }}
                >
                  Validasi Deviasi
                </a>
              </li>
              <li
                className={
                  localStorage.getItem("role") === "admin"
                    ? "nav-item d-flex align-items-center"
                    : "d-none"
                }
              >
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
                      "/mea-dev/#/data-tervalidasi"
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
                      {localStorage.getItem("name")}
                    </label>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center gap-2"
                      href="/mea-dev/#/login"
                      onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                      }}
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
                currentDeviationId={currentDeviationId}
                submitData={submitData}
                setSubmitData={setSubmitData}
              />
            ) : (
              <DataTervalidasi cctvData={cctvData} objectData={objectData} />
            )}
          </div>
          {currentPage === "live-monitoring" ||
          currentPage === "validasi-deviasi" ? (
            <div className="col-3">
              <div className="title mb-3">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h6>List Deviasi</h6>
                    <label>List deviasi yang terdeteksi</label>
                  </div>
                  <div className="col d-flex justify-content-end gap-3">
                    <div>
                      <Icon
                        className="notif-sound fs-5"
                        icon={
                          notificationSound === true
                            ? "teenyicons:sound-on-solid"
                            : "teenyicons:sound-off-solid"
                        }
                        muted={notificationSound}
                        onClick={() => {
                          setNotificationSound(!notificationSound);
                        }}
                      />
                    </div>
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
                          <li className="my-1">
                            <h6 className="dropdown-title text-center">
                              Filter CCTV
                            </h6>
                          </li>
                          {cctvFilteArray}
                          <li>
                            <hr className="dropdown-title dropdown-divider" />
                          </li>
                          <li className="my-1">
                            <h6 className="dropdown-title text-center">
                              Filter Tipe Validasi
                            </h6>
                          </li>
                          {validationTypeFilterArray}
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
                  currentCctvName={currentCctvName}
                  currentCctvLocation={currentCctvLocation}
                  currentDeviationId={currentDeviationId}
                  setCurrentDeviationId={setCurrentDeviationId}
                  currentObject={currentObject}
                  setCurrentObject={setCurrentObject}
                  objectData={objectData}
                  submitData={submitData}
                  notificationSound={notificationSound}
                  audio={audio}
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
