import "../styles/database_deviasi.scss";
import "../styles/calendar.css";
import "../styles/time_picker.css";
import DataTable from "../components/DataTable";
import DataExport from "../components/DataExport";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";

const DatabaseDeviasi = ({ cctvData, objectData, validationTypeData }) => {
  const [date, setDate] = useState([new Date(), new Date()]);
  const [dateStatus, setDateStatus] = useState("*pilih tanggal (start)");
  const [dataLimit, setDataLimit] = useState(25);
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [deviationData, setDeviationData] = useState([]);
  const [deviationDataLoading, setDeviationDataLoading] = useState(false);
  const [currentDeviationDetail, setCurrentDeviationDetail] = useState({});
  const [currentDeviationImageBlob, setCurrentDeviationImageBlob] = useState();
  const [reactMagnifyImageLoading, setReactMagnifyImageLoading] =
    useState(false);
  const [currentCctv, setCurrentCctv] = useState("All");
  const [currentObject, setCurrentObject] = useState("All");
  const [currentValidationType, setCurrentValidationType] =
    useState("Tervalidasi");
  const [advancedFilter, setAdvancedFilter] = useState(false);
  const [time, setTime] = useState(["00:01", "23:59"]);

  useEffect(() => {
    setDeviationDataLoading(true);
    axios
      .get(
        process.env.REACT_APP_API +
          "deviation?" +
          (currentCctv !== "All" ? "cctv_id=" + currentCctv + "&" : "") +
          (currentObject !== "All"
            ? "type_object=" + currentObject + "&"
            : "") +
          (currentValidationType !== "All"
            ? "filter_notification=" + currentValidationType + "&"
            : "") +
          "startDate=" +
          (date[0].getFullYear() +
            "-" +
            (date[0].getMonth() + 1 < 10 ? "0" : "") +
            (date[0].getMonth() + 1) +
            "-" +
            (date[0].getDate() < 10 ? "0" : "") +
            date[0].getDate()) +
          " " +
          (time[0] !== null ? time[0] : "00:01") +
          "&" +
          "endDate=" +
          (date[1].getFullYear() +
            "-" +
            (date[1].getMonth() + 1 < 10 ? "0" : "") +
            (date[1].getMonth() + 1) +
            "-" +
            (date[1].getDate() < 10 ? "0" : "") +
            date[1].getDate()) +
          " " +
          (time[1] !== null ? time[1] : "23:59") +
          "&",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setDeviationData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setDeviationData([]);
      })
      .finally(() => {
        setDeviationDataLoading(false);
      });
  }, [currentCctv, currentObject, currentValidationType, date, time]);

  useEffect(() => {
    setReactMagnifyImageLoading(true);
    axios
      .get(
        process.env.REACT_APP_API +
          currentDeviationDetail.path +
          currentDeviationDetail.image,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          responseType: "arraybuffer",
        }
      )
      .then((res) => {
        let blob = new Blob([res.data], {
          type: res.headers["content-type"],
        });
        var reader = new window.FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function () {
          var imageDataUrl = reader.result;
          setCurrentDeviationImageBlob(imageDataUrl);
        };
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setReactMagnifyImageLoading(false);
      });
  }, [currentDeviationDetail]);

  useEffect(() => {
    setDataLimit(25);
    setCurrentTablePage(1);
  }, [currentCctv, currentObject, currentValidationType, date, time]);

  const timeHandler = (index, value) => {
    if (index === 0) {
      setTime([value, time[1]]);
    } else {
      setTime([time[0], value]);
    }
  };

  const cctvFilter = cctvData.map((cctv) => {
    return (
      <option key={cctv.id} value={cctv.id}>
        {cctv.name + " - " + cctv.location}
      </option>
    );
  });

  const objectFilter = objectData.map((object) => {
    return (
      <option key={object.id} value={object.value}>
        {object.name === "Semua" ? "Semua Objek" : object.name}
      </option>
    );
  });

  const validationTypeFilter = validationTypeData.map((validationType) => {
    return (
      <option key={validationType.id} value={validationType.value}>
        {validationType.name === "Semua" ? "Semua Status" : validationType.name}
      </option>
    );
  });

  return (
    <div className="data-tervalidasi">
      <div className="title d-grid gap-3 mb-3">
        <h6>Database Deviasi</h6>
        <div className="d-xl-flex gap-4">
          <div className="d-grid gap-1 mb-xl-0 mb-3">
            <label>CCTV</label>
            <div className="input-group">
              <label className="input-group-text" for="inputGroupSelect01">
                <Icon className="" icon="mdi:cctv" />
              </label>
              <select
                className="form-select"
                id="inputGroupSelect01"
                defaultValue={currentCctv}
                onChange={(value) => setCurrentCctv(value.target.value)}
              >
                <option value={"All"} selected>
                  Semua CCTV
                </option>
                {cctvFilter}
              </select>
            </div>
          </div>
          <div className="d-grid gap-1 mb-xl-0 mb-3">
            <label>Objek</label>
            <div className="input-group">
              <label className="input-group-text" for="inputGroupSelect02">
                <Icon
                  className="filter-icon"
                  icon="ic:round-filter-center-focus"
                />
              </label>
              <select
                className="form-select"
                id="inputGroupSelect02"
                defaultValue={currentObject}
                onChange={(value) => setCurrentObject(value.target.value)}
              >
                {objectFilter}
              </select>
            </div>
          </div>
          <div className="d-grid gap-1 mb-xl-0 mb-3">
            <label>Periode</label>
            <div className="input-group">
              <label className="input-group-text" for="inputGroupSelect03">
                <Icon className="filter-icon" icon="bi:calendar-week" />
              </label>
              <button
                className="form-select d-flex justify-content-start"
                id="inputGroupSelect03"
                data-bs-toggle="modal"
                data-bs-target="#periodModal"
              >
                <label>
                  {(date[0].getDate() < 10 ? "0" : "") +
                    date[0].getDate() +
                    "/" +
                    (date[0].getMonth() + 1 < 10 ? "0" : "") +
                    (date[0].getMonth() + 1) +
                    "/" +
                    date[0].getFullYear() +
                    " - " +
                    (date[1].getDate() < 10 ? "0" : "") +
                    date[1].getDate() +
                    "/" +
                    (date[1].getMonth() + 1 < 10 ? "0" : "") +
                    (date[1].getMonth() + 1) +
                    "/" +
                    date[1].getFullYear()}
                </label>
              </button>
            </div>
            <div
              className="modal fade"
              id="periodModal"
              tabindex="-1"
              aria-labelledby="periodModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title" id="periodModalLabel">
                      Pilih Periode
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body d-grid justify-content-center gap-3">
                    <Calendar
                      onChange={setDate}
                      onClickDay={() => {
                        dateStatus.includes("start")
                          ? setDateStatus("*pilih tanggal (end)")
                          : dateStatus.includes("end")
                          ? setDateStatus("")
                          : setDateStatus("*pilih tanggal (end)");
                      }}
                      value={date}
                      maxDate={new Date()}
                      selectRange={true}
                    />
                    {advancedFilter === false ? (
                      ""
                    ) : (
                      <div className="row">
                        <div className="col d-grid">
                          <label>Start</label>
                          <TimePicker
                            onChange={(value) => {
                              timeHandler(0, value);
                            }}
                            value={time[0]}
                            disableClock={true}
                          />
                        </div>
                        <div className="col d-grid">
                          <label>End</label>
                          <TimePicker
                            onChange={(value) => {
                              timeHandler(1, value);
                            }}
                            value={time[1]}
                            disableClock={true}
                          />
                        </div>
                      </div>
                    )}
                    <button
                      className="advanced-filter-button border-0"
                      title="filter waktu"
                      onClick={() => {
                        setAdvancedFilter(
                          advancedFilter === false ? true : false
                        );
                      }}
                    >
                      <Icon
                        icon={
                          "codicon:fold-" +
                          (advancedFilter === false ? "down" : "up")
                        }
                      />
                    </button>
                  </div>
                  <div className="modal-footer">
                    <div className="row w-100 d-flex align-items-center">
                      <div className="col p-0">
                        <label>{dateStatus}</label>
                      </div>
                      <div className="col d-flex justify-content-end p-0 gap-3">
                        <button
                          className="reset-button rounded-2 px-3 py-2"
                          onClick={() => {
                            setDate([new Date(), new Date()]);
                            date !== [new Date(), new Date()]
                              ? setDateStatus("*pilih tanggal (start)")
                              : setDateStatus(dateStatus);
                            setTime(["00:01", "23:59"]);
                          }}
                        >
                          Reset
                        </button>

                        <button
                          className="ok-button border-0 rounded-2 px-3 py-2"
                          data-bs-dismiss="modal"
                        >
                          Ok
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-grid gap-1 mb-xl-0 mb-3">
            <label>Status Validasi</label>
            <div className="input-group">
              <label className="input-group-text" for="inputGroupSelect02">
                <Icon className="filter-icon" icon="ci:check" />
              </label>
              <select
                className="form-select"
                id="inputGroupSelect03"
                defaultValue={currentValidationType}
                onChange={(value) =>
                  setCurrentValidationType(value.target.value)
                }
              >
                {validationTypeFilter}
              </select>
            </div>
          </div>
          <div className="col-xl d-xl-flex justify-content-end align-items-end">
            <DataExport deviationData={deviationData} />
          </div>
        </div>
      </div>
      <div className="content">
        <DataTable
          dataLimit={dataLimit}
          setDataLimit={setDataLimit}
          currentTablePage={currentTablePage}
          setCurrentTablePage={setCurrentTablePage}
          deviationData={deviationData}
          deviationDataLoading={deviationDataLoading}
          currentDeviationDetail={currentDeviationDetail}
          setCurrentDeviationDetail={setCurrentDeviationDetail}
          currentDeviationImageBlob={currentDeviationImageBlob}
          reactMagnifyImageLoading={reactMagnifyImageLoading}
        />
        <div>
          {deviationDataLoading === false ? (
            deviationData.length > 0 ? (
              <div className="row align-items-center mt-5">
                <div className="col">
                  <label>
                    {dataLimit <= deviationData.length
                      ? dataLimit
                      : deviationData.length}{" "}
                    dari {deviationData.length} data
                  </label>
                </div>
                <div className="col">
                  <div className="pagination-nav d-flex justify-content-center align-items-center gap-3">
                    <button
                      className={
                        "border-0 rounded-start py-2" +
                        (currentTablePage === 1 ? " disabled" : "")
                      }
                      onClick={() => {
                        setCurrentTablePage(currentTablePage - 1);
                        setDataLimit(dataLimit - 25);
                      }}
                    >
                      Previous
                    </button>
                    <label>{currentTablePage}</label>
                    <button
                      className={
                        "border-0 rounded-end py-2" +
                        (dataLimit >= deviationData.length ? " disabled" : "")
                      }
                      onClick={() => {
                        setCurrentTablePage(currentTablePage + 1);
                        setDataLimit(dataLimit + 25);
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
                <div className="col"></div>
              </div>
            ) : (
              <label className="w-100 text-center my-2">
                Tidak terdapat data yang sesuai dengan filter CCTV, Objek,
                Status Validasi, maupun Periode
              </label>
            )
          ) : (
            <div className="d-flex justify-content-center my-3">
              <div className="spinner-border">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatabaseDeviasi;
