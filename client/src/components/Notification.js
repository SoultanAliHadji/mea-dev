import "../styles/notification.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const Notification = ({
  currentPage,
  setCurrentPage,
  getToken,
  currentCctvName,
  currentCctvLocation,
  currentDeviationId,
  setCurrentDeviationId,
  objectData,
}) => {
  const [deviationData, setDeviationData] = useState([]);
  const [currentObject, setCurrentObject] = useState("AllObject");

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API +
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
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [currentCctvName, currentCctvLocation, currentObject]);

  const objectArr = objectData.map((object) => {
    return (
      <button
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

  const devArr = deviationData.slice(0, 10).map((deviation) => {
    return (
      <button
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
          window.history.replaceState(null, null, "/validasi-deviasi");
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
                : deviation.type_validation}
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
      <div className="notification-filter d-flex justify-content-center gap-1">
        {objectArr}
      </div>
      <hr />
      <div
        className="deviation-list d-grid gap-2 overflow-auto"
        style={
          currentPage !== "live-monitoring"
            ? { "max-height": "65.5vh" }
            : { "max-height": "58vh" }
        }
      >
        {devArr}
      </div>
      {currentPage !== "live-monitoring" ? (
        ""
      ) : (
        <div className="validation-button d-grid mt-4">
          <button
            className="border-0 rounded-2 px-3 py-2"
            onClick={() => {
              setCurrentPage("validasi-deviasi");
              window.history.replaceState(null, null, "/validasi-deviasi");
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
