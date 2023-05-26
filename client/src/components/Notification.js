import "../styles/notification.css";
import { Icon } from "@iconify/react";

const Notification = ({
  currentPage,
  setCurrentPage,
  deviationData,
  deviationDataLoading,
  deviationDataLimit,
  setDeviationDataLimit,
  currentDeviationData,
  setCurrentDeviationData,
  currentObject,
  setCurrentObject,
  objectData,
}) => {
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
          setDeviationDataLimit(10);
        }}
      >
        {object.name}
      </button>
    );
  });

  const deviationArray = deviationData
    .slice(0, deviationDataLimit)
    .map((deviation, index) => {
      return (
        <button
          key={deviation.id}
          className={
            "border-0 text-start rounded-2 px-3 py-2 d-grid gap-2" +
            (currentPage !== "live-monitoring" &&
            currentDeviationData.length !== 0 &&
            currentDeviationData[0].id === deviation.id
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
            setCurrentDeviationData([deviationData[index]]);
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
              ? { maxHeight: "60.3vh" }
              : { maxHeight: "52.8vh" }
          }
        >
          {deviationArray}
          <div className="d-flex justify-content-center mt-2">
            <a
              className="load-more-button"
              onClick={() => {
                setDeviationDataLimit(deviationDataLimit + 10);
              }}
            >
              Load More
            </a>
          </div>
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
