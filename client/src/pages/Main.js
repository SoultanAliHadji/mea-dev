import "../styles/main.scss";
import LiveMonitoring from "./LiveMonitoring";
import ValidasiNotifikasi from "./ValidasiNotifikasi";
import Notification from "../components/Notification";
import DatabaseDeviasi from "./DatabaseDeviasi";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import socketIOClient from "socket.io-client";

const Main = () => {
  const [currentPage, setCurrentPage] = useState(
    window.location.href.includes("validasi-notifikasi")
      ? "validasi-notifikasi"
      : window.location.href.includes("database-deviasi") &&
        localStorage.getItem("role") === "admin"
      ? "database-deviasi"
      : "live-monitoring"
  );

  //cctv data
  const [cctvData, setCctvData] = useState([]);
  const [currentCctvId, setCurrentCctvId] = useState(1);
  const [currentCctvData, setCurrentCctvData] = useState([]);
  const [cctvLoading, setCctvLoading] = useState(false);

  //notification data
  const [notificationData, setNotificationData] = useState([]);
  const [notificationDataLoading, setNotificationDataLoading] = useState(false);
  const [currentNotificationData, setCurrentNotificationData] = useState([]);
  const [notificationDataLimit, setNotificationDataLimit] = useState(10);

  //notification sound
  const [notificationSound, setNotificationSound] = useState(true);
  const audio = new Audio(require("../assets/notification.mp3"));

  //object data
  const objectData = [
    { id: 1, name: "Semua", value: "All" },
    { id: 2, name: "Person", value: "Person" },
    { id: 3, name: "LV", value: "LV" },
    { id: 4, name: "HD", value: "HD" },
  ];
  const [currentObject, setCurrentObject] = useState("All");

  //tipe validasi
  const validationTypeData = [
    { id: 1, name: "Semua", value: "All" },
    { id: 2, name: "Belum Divalidasi", value: "Perlu Validasi" },
    { id: 3, name: "Sudah Divalidasi", value: "Tervalidasi" },
    { id: 4, name: "Valid", value: "true" },
    { id: 5, name: "Tidak Valid", value: "false" },
  ];
  const [currentValidationType, setCurrentValidationType] = useState("All");

  //filter waktu
  const [currentTime, setCurrentTime] = useState(null);

  //validation data
  const [submitData, setSubmitData] = useState(false);

  useEffect(() => {
    setCctvLoading(true);
    axios
      .get(process.env.REACT_APP_API + "cctv", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCctvData(res.data.data);
        setCurrentCctvId(res.data.data[0].id);
        setCurrentCctvData([res.data.data[0]]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setCctvLoading(false);
      });
  }, []);

  useEffect(() => {
    setNotificationDataLoading(true);
    axios
      .get(
        process.env.REACT_APP_API +
          "deviation?" +
          "cctv_id=" +
          currentCctvId +
          "&" +
          (currentObject !== "All"
            ? "type_object=" + currentObject + "&"
            : "") +
          (currentValidationType !== "All"
            ? "filter_notification=" + currentValidationType + "&"
            : "") +
          (currentTime !== null
            ? "startDate=" +
              (new Date().getFullYear() +
                "-" +
                (new Date().getMonth() + 1 < 10 ? "0" : "") +
                (new Date().getMonth() + 1) +
                "-" +
                (new Date().getDate() < 10 ? "0" : "") +
                new Date().getDate()) +
              " 00:01&" +
              "endDate=" +
              (new Date().getFullYear() +
                "-" +
                (new Date().getMonth() + 1 < 10 ? "0" : "") +
                (new Date().getMonth() + 1) +
                "-" +
                (new Date().getDate() < 10 ? "0" : "") +
                new Date().getDate()) +
              " " +
              currentTime +
              "&"
            : "") +
          "limit=" +
          (notificationDataLimit + 1),
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setNotificationData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setNotificationData([]);
      })
      .finally(() => {
        setNotificationDataLoading(false);
      });
  }, [
    currentCctvId,
    currentObject,
    currentValidationType,
    currentTime,
    notificationDataLimit,
    submitData,
  ]);

  useEffect(() => {
    setNotificationDataLimit(10);
  }, [currentTime]);

  //socket.io
  const socket = socketIOClient(process.env.REACT_APP_SOCKET, {
    transports: ["polling"],
    cors: {
      origin: "*",
    },
  });

  useEffect(() => {
    socket.on("message_from_server", (data) => newNotifHandler(data));
    console.log(socket);

    return () => {
      socket.off("message_from_server");
    };
  }, [
    currentCctvId,
    currentObject,
    currentValidationType,
    currentTime,
    notificationSound,
  ]);

  const newNotifHandler = (newNotif) => {
    newNotif.map((notification) => {
      if (currentTime === null) {
        if (
          currentValidationType === "All" ||
          currentValidationType === "Butuh Validasi"
        ) {
          if (currentCctvId.toString() === notification.cctv_id) {
            if (currentObject === "All") {
              setNotificationData((data) => [notification, ...data]);
              if (notificationSound === true) {
                audio.play();
              }
            } else {
              if (currentObject === notification.type_object) {
                setNotificationData((data) => [notification, ...data]);
                if (notificationSound === true) {
                  audio.play();
                }
              }
            }
          }
        }
      }
    });
  };

  return (
    <div className="main">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid container">
          <a
            className="navbar-brand d-flex align-items-center"
            onClick={() => {
              setCurrentPage("live-monitoring");
              window.history.replaceState(null, null, "/live-monitoring");
            }}
          >
            <img src={require("../assets/logo.webp")} alt="logo" />
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
                    (currentPage === "validasi-notifikasi" ? " active" : "")
                  }
                  onClick={() => {
                    setCurrentPage("validasi-notifikasi");
                    window.history.replaceState(
                      null,
                      null,
                      "/validasi-notifikasi"
                    );
                  }}
                >
                  Validasi Notifikasi
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
                    (currentPage === "database-deviasi" ? " active" : "")
                  }
                  onClick={() => {
                    setCurrentPage("database-deviasi");
                    window.history.replaceState(
                      null,
                      null,
                      "/database-deviasi"
                    );
                  }}
                >
                  Database Deviasi
                </a>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle border-0 bg-transparent px-0"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Icon className="icon" icon="bi:person-circle" />
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
                  <li className="d-none">
                    <button
                      className="report dropdown-item d-flex align-items-center gap-2"
                      onClick={() => {
                        window.open(
                          "https://docs.google.com/forms/d/e/1FAIpQLSedEw8EqKvhh7P0MU9QsT4SpOHotJIXBtJkc-Iw-axuj4Azsw/viewform"
                        );
                      }}
                    >
                      <Icon className="fs-5" icon="mdi:speak" />
                      <label>Pelaporan Isu</label>
                    </button>
                  </li>
                  <li>
                    <button
                      className="log-out dropdown-item d-flex align-items-center gap-2"
                      onClick={() => {
                        localStorage.clear();
                        window.location.href = "/login";
                        window.location.reload();
                      }}
                    >
                      <Icon className="fs-5" icon="heroicons-outline:logout" />
                      <label>Log Out</label>
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-3">
        <div className="row">
          <div className="col-xl mb-xl-0 mb-5">
            {currentPage === "live-monitoring" ? (
              <LiveMonitoring
                cctvData={cctvData}
                currentCctvId={currentCctvId}
                setCurrentCctvId={setCurrentCctvId}
                currentCctvData={currentCctvData}
                setCurrentCctvData={setCurrentCctvData}
                cctvLoading={cctvLoading}
                setNotificationDataLimit={setNotificationDataLimit}
              />
            ) : currentPage === "validasi-notifikasi" ? (
              <ValidasiNotifikasi
                notificationData={notificationData}
                currentNotificationData={currentNotificationData}
                setCurrentNotificationData={setCurrentNotificationData}
                submitData={submitData}
                setSubmitData={setSubmitData}
              />
            ) : (
              <DatabaseDeviasi
                cctvData={cctvData}
                objectData={objectData}
                validationTypeData={validationTypeData}
              />
            )}
          </div>
          {currentPage === "live-monitoring" ||
          currentPage === "validasi-notifikasi" ? (
            <Notification
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              notificationSound={notificationSound}
              setNotificationSound={setNotificationSound}
              cctvData={cctvData}
              currentCctvId={currentCctvId}
              setCurrentCctvId={setCurrentCctvId}
              currentValidationType={currentValidationType}
              setCurrentValidationType={setCurrentValidationType}
              validationTypeData={validationTypeData}
              notificationData={notificationData}
              notificationDataLoading={notificationDataLoading}
              notificationDataLimit={notificationDataLimit}
              setNotificationDataLimit={setNotificationDataLimit}
              currentNotificationData={currentNotificationData}
              setCurrentNotificationData={setCurrentNotificationData}
              currentObject={currentObject}
              setCurrentObject={setCurrentObject}
              objectData={objectData}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
