import "../styles/notification.css";
import { Icon } from "@iconify/react";

const Notification = ({
  currentPage,
  setCurrentPage,
  notificationSound,
  setNotificationSound,
  cctvData,
  currentCctvId,
  setCurrentCctvId,
  currentValidationType,
  setCurrentValidationType,
  validationTypeData,
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
            setDeviationDataLimit(10);
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
            setDeviationDataLimit(10);
          }}
        >
          {validationType.name}
        </button>
      </li>
    );
  });

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
            window.history.replaceState(null, null, "/validasi-deviasi");
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
            <Icon className="icon" icon="mdi:cctv" />
            <label>{deviation.name + " - " + deviation.location}</label>
          </div>
          <div className="d-flex align-items-end gap-2">
            <Icon className="icon" icon="akar-icons:clock" />
            <label>{deviation.created_at}</label>
          </div>
        </button>
      );
    });

  return (
    <div className="notification col-xl-3">
      <div className="title mb-3">
        <div className="row align-items-center">
          <div className="col-8">
            <h6>List Deviasi</h6>
            <label>List deviasi yang terdeteksi</label>
          </div>
          <div className="col d-flex justify-content-end gap-3">
            <div>
              <button
                className="notif-sound bg-transparent border-0 p-0"
                title="hidup/matikan alarm"
                onClick={() => {
                  setNotificationSound(!notificationSound);
                }}
              >
                <Icon
                  icon={
                    notificationSound === true
                      ? "teenyicons:sound-on-solid"
                      : "teenyicons:sound-off-solid"
                  }
                  muted={notificationSound}
                />
              </button>
            </div>
            <div className="dropdown">
              <button
                className="bg-transparent rounded px-1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title="filter lain"
              >
                <Icon icon="material-symbols:filter-list" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end mt-3">
                {currentPage === "validasi-deviasi" ? (
                  <div>
                    <li className="my-1">
                      <h6 className="dropdown-title text-center">
                        Filter CCTV
                      </h6>
                    </li>
                    {cctvFilteArray}
                    <li>
                      <hr className="dropdown-title dropdown-divider" />
                    </li>
                  </div>
                ) : (
                  ""
                )}
                <li className="my-1">
                  <h6 className="dropdown-title text-center">
                    Filter Status Validasi
                  </h6>
                </li>
                {validationTypeFilterArray}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="notification-filter d-flex justify-content-center align-items-center gap-1">
          {objectArr}
        </div>
        <hr />
        {deviationDataLoading === false ? (
          <div
            className={
              "d-grid gap-2 overflow-auto" +
              (currentPage === "live-monitoring"
                ? " live-monitoring-notification-list"
                : " validasi-deviasi-notification-list")
            }
          >
            {deviationData.length !== 0 ? (
              deviationArray
            ) : (
              <div className="d-flex justify-content-center">
                <label className="data-not-found">Data tidak ditemukan</label>
              </div>
            )}
            {deviationData.length >= deviationDataLimit ? (
              <div className="d-flex justify-content-center mt-2">
                <a
                  className="load-more-button"
                  onClick={() => {
                    setDeviationDataLimit(deviationDataLimit + 10);
                  }}
                >
                  Tampilkan Lebih
                </a>
              </div>
            ) : (
              ""
            )}
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
                window.history.replaceState(null, null, "/validasi-deviasi");
              }}
            >
              Detail Deviasi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
