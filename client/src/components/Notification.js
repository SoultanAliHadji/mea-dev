import "../styles/notification.css";
import { Icon } from "@iconify/react";

const Notification = ({
  currentPage,
  setCurrentPage,
  currentCctv,
  setCurrentCctv,
  currentObject,
  setCurrentObject,
  currentDeviation,
  setCurrentDeviation,
}) => {
  const deviation = [
    {
      id: "1",
      object: "LV",
      status: "Valid",
      cctv: "CCTV HO - Indoor Finance",
      time: "Fri, 12 May 2023 12:20:01 GMT",
    },
    {
      id: "2",
      object: "LV",
      status: "Valid",
      cctv: "CCTV HO - Indoor Finance",
      time: "Fri, 12 May 2023 12:20:01 GMT",
    },
    {
      id: "3",
      object: "LV",
      status: "Valid",
      cctv: "CCTV HO - Indoor Finance",
      time: "Fri, 12 May 2023 12:20:01 GMT",
    },
    {
      id: "4",
      object: "LV",
      status: "Valid",
      cctv: "CCTV HO - Indoor Finance",
      time: "Fri, 12 May 2023 12:20:01 GMT",
    },
    {
      id: "5",
      object: "LV",
      status: "Valid",
      cctv: "CCTV HO - Indoor Finance",
      time: "Fri, 12 May 2023 12:20:01 GMT",
    },
    {
      id: "6",
      object: "LV",
      status: "Valid",
      cctv: "CCTV HO - Indoor Finance",
      time: "Fri, 12 May 2023 12:20:01 GMT",
    },
    {
      id: "7",
      object: "LV",
      status: "Valid",
      cctv: "CCTV HO - Indoor Finance",
      time: "Fri, 12 May 2023 12:20:01 GMT",
    },
    {
      id: "8",
      object: "LV",
      status: "Valid",
      cctv: "CCTV HO - Indoor Finance",
      time: "Fri, 12 May 2023 12:20:01 GMT",
    },
    {
      id: "9",
      object: "LV",
      status: "Valid",
      cctv: "CCTV HO - Indoor Finance",
      time: "Fri, 12 May 2023 12:20:01 GMT",
    },
    {
      id: "10",
      object: "LV",
      status: "Valid",
      cctv: "CCTV HO - Indoor Finance",
      time: "Fri, 12 May 2023 12:20:01 GMT",
    },
  ];

  const devArr = deviation.map((data) => {
    return (
      <button
        className={
          "border-0 text-start rounded-2 px-3 py-2 d-grid gap-2" +
          (currentPage !== "live-monitoring" && currentDeviation === data.id
            ? " active"
            : "")
        }
        onClick={() => {
          currentPage !== "validasi-deviasi"
            ? setCurrentPage("validasi-deviasi")
            : setCurrentPage(currentPage);
          setCurrentDeviation(data.id);
        }}
      >
        <div className="row align-items-center">
          <div className="col-6">
            <label>{data.object}</label>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <label className="px-2 rounded-2 status-none">{data.status}</label>
          </div>
        </div>
        <div className="d-flex align-items-end gap-2">
          <label>
            <Icon className="fs-5" icon="bi:camera-fill" />
          </label>
          <label>{data.cctv}</label>
        </div>
        <div className="d-flex align-items-end gap-2">
          <label>
            <Icon className="fs-5" icon="akar-icons:clock" />
          </label>
          <label>{data.time}</label>
        </div>
      </button>
    );
  });

  const object = [
    { id: 1, name: "Semua" },
    { id: 2, name: "Person" },
    { id: 3, name: "LV" },
    { id: 4, name: "HD" },
  ];

  const objectArr = object.map((data) => {
    return (
      <button
        className={
          "border-0 rounded-5 px-3 py-2" +
          (currentObject === data.id ? " active" : "")
        }
        onClick={() => {
          setCurrentObject(data.id);
        }}
      >
        {data.name}
      </button>
    );
  })

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
