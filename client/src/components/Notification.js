import "../styles/notification.scss";
import "../styles/time_picker.css";
import { Icon } from "@iconify/react";
import TimePicker from "react-time-picker";

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
  notificationData,
  notificationDataLoading,
  setNotificationDataReload,
  notificationDataLimit,
  setNotificationDataLimit,
  currentNotificationData,
  setCurrentNotificationData,
  currentObject,
  setCurrentObject,
  objectData,
  currentTime,
  setCurrentTime,
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
            setNotificationDataLimit(10);
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
            setNotificationDataLimit(10);
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
          setNotificationDataLimit(10);
        }}
      >
        {object.name}
      </button>
    );
  });

  const notificationArray = notificationData
    .slice(0, notificationDataLimit)
    .map((notification, index) => {
      return (
        <button
          key={notification.id}
          className={
            "border-0 text-start rounded-2 px-3 py-2 d-grid gap-2" +
            (currentPage !== "live-monitoring" &&
            currentNotificationData.length !== 0 &&
            currentNotificationData[0].id === notification.id
              ? " active"
              : "")
          }
          onClick={() => {
            currentPage !== "validasi-notifikasi"
              ? setCurrentPage("validasi-notifikasi")
              : setCurrentPage(currentPage);
            window.history.replaceState(null, null, "/validasi-notifikasi");
            setCurrentNotificationData([notificationData[index]]);
          }}
        >
          <div className="row align-items-center">
            <div className="col-5">
              <label>{"Deviasi " + notification.type_object}</label>
            </div>
            <div className="col-7 d-flex justify-content-end">
              <label
                className={
                  "px-2 rounded-2" +
                  (notification.type_validation === "true"
                    ? " status-true"
                    : notification.type_validation === "false"
                    ? " status-false"
                    : " status-none")
                }
              >
                {notification.type_validation === "not_yet"
                  ? "Validasi"
                  : notification.type_validation === "true"
                  ? "Valid"
                  : "Tidak Valid"}
              </label>
            </div>
          </div>
          <div className="d-flex align-items-end gap-2">
            <Icon className="icon" icon="mdi:cctv" />
            <label>{notification.name + " - " + notification.location}</label>
          </div>
          <div className="d-flex align-items-end gap-2">
            <Icon className="icon" icon="akar-icons:clock" />
            <label>{(notification.created_at).substring(4,25)}</label>
          </div>
        </button>
      );
    });

  return (
    <div className="notification col-xl-3">
      <div className="title mb-3">
        <div className="row align-items-center">
          <div className="col-8">
            <h6>List Notifikasi</h6>
            <label>List notifikasi deviasi</label>
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
                {currentPage === "validasi-notifikasi" ? (
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
                <div>
                  <li>
                    <hr className="dropdown-title dropdown-divider" />
                  </li>
                  <li className="my-1">
                    <h6 className="dropdown-title text-center">Filter Waktu</h6>
                  </li>
                  <li className="mt-2 mb-1 d-flex justify-content-center">
                    <TimePicker
                      onChange={setCurrentTime}
                      value={currentTime}
                      disableClock={true}
                    />
                  </li>
                </div>
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
        {notificationDataLoading === false ? (
          <div className="notification-list d-grid gap-2 overflow-auto">
            {notificationData.length !== 0 ? (
              notificationArray
            ) : (
              <div className="d-flex justify-content-center">
                <label className="data-not-found">Data tidak ditemukan</label>
              </div>
            )}
            {notificationData.length >= notificationDataLimit ? (
              <div className="d-flex justify-content-center mt-2">
                <a
                  className="load-more-button"
                  onClick={() => {
                    setNotificationDataReload(true);
                    setNotificationDataLimit(notificationDataLimit + 10);
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
      </div>
    </div>
  );
};

export default Notification;
