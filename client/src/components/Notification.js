import "../styles/notification.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

const Notification = ({
  currentPage,
  setCurrentPage,
  getToken,
  currentCctvName,
  currentCctvLocation,
  currentDeviationId,
  setCurrentDeviationId,
  currentObject,
  setCurrentObject,
  objectData,
  submitData,
  notificationSound,
  audio,
}) => {
  const [deviationData, setDeviationData] = useState([]);
  const [deviationDataLoading, setDeviationDataLoading] = useState(false);

  useEffect(() => {
    setDeviationDataLoading(true);
    axios
      .get(
        "http://10.10.10.66:5002/api/" +
          "viewtable/" +
          currentCctvName +
          "/" +
          currentCctvLocation +
          "/" +
          currentObject +
          "/All/Allvalidation/" +
          10,
        {
          headers: {
            Authorization: "Bearer " + getToken,
          },
        }
      )
      .then((res) => {
        setDeviationData(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setDeviationDataLoading(false);
        if (notificationSound === true) {
          audio.play();
        }
      });
  }, [currentCctvName, currentCctvLocation, currentObject, submitData]);

  const objectArr = objectData.map((object) => {
    return (
      <button
        key={object.id}
        className={
          "border-0 rounded-5 px-3 py-2" +
          (currentObject === object.value ? " active" : "")
        }
        onClick={() => {
          setCurrentObject(object.value);
        }}
      >
        {object.name}
      </button>
    );
  });

  const deviationArray = deviationData.slice(0, 10).map((deviation) => {
    return (
      <button
        key={deviation.id}
        className={
          "border-0 text-start rounded-2 px-3 py-2 d-grid gap-2" +
          (currentPage !== "live-monitoring" &&
          currentDeviationId === deviation.id
            ? " active"
            : "")
        }
        onClick={() => {
          currentPage !== "validasi-deviasi"
            ? setCurrentPage("validasi-deviasi")
            : setCurrentPage(currentPage);
          window.history.replaceState(
            null,
            null,
            "/mea-dev/#/validasi-deviasi"
          );
          setCurrentDeviationId(deviation.id);
        }}
      >
        <div className="row align-items-center">
          <div className="col-5">
            <label>{"Deviasi " + deviation.type_object}</label>
          </div>
          <div className="col-7 d-flex justify-content-end">
            <label
              className={
                "px-2 rounded-2" +
                (deviation.type_validation === "true"
                  ? " status-true"
                  : deviation.type_validation === "false"
                  ? " status-false"
                  : " status-none")
              }
            >
              {deviation.type_validation === "not_yet"
                ? "Perlu Validasi"
                : deviation.type_validation === "true"
                ? "Valid"
                : "Tidak Valid"}
            </label>
          </div>
        </div>
        <div className="d-flex align-items-end gap-2">
          <Icon className="fs-5" icon="bi:camera-fill" />
          <label>{deviation.name + " - " + deviation.location}</label>
        </div>
        <div className="d-flex align-items-end gap-2">
          <Icon className="fs-5" icon="akar-icons:clock" />
          <label>{deviation.created_at}</label>
        </div>
      </button>
    );
  });

  return (
    <div className="notification">
      <div className="notification-filter d-flex justify-content-center align-items-center gap-1">
        {objectArr}
      </div>
      <hr />
      {deviationDataLoading === false ? (
        <div
          className="deviation-list d-grid gap-2 overflow-auto"
          style={
            currentPage !== "live-monitoring"
              ? { maxHeight: "65.5vh" }
              : { maxHeight: "58vh" }
          }
        >
          {deviationArray}
        </div>
      ) : (
        <div className="d-flex justify-content-center my-3">
          <div className="spinner-border">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {currentPage !== "live-monitoring" ? (
        ""
      ) : (
        <div className="validation-button d-grid mt-4">
          <button
            className="border-0 rounded-2 px-3 py-2"
            onClick={() => {
              setCurrentPage("validasi-deviasi");
              window.history.replaceState(
                null,
                null,
                "/mea-dev/#/validasi-deviasi"
              );
            }}
          >
            Validasi
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;
