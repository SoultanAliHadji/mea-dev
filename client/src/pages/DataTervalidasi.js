import "../styles/data_tervalidasi.css";
import "../styles/calendar.css";
import DataTable from "../components/DataTable";
import DataExport from "../components/DataExport";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import Calendar from "react-calendar";

const DataTervalidasi = ({ cctvData, objectData }) => {
  const [date, setDate] = useState([new Date(), new Date()]);
  const [dateStatus, setDateStatus] = useState("*pilih tanggal (start)");
  const [dataLimit, setDataLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [deviationData, setDeviationData] = useState([]);
  const [deviationDataLoading, setDeviationDataLoading] = useState(false);
  const [currentDeviationImageRaw, setCurrentDeviationImageRaw] = useState();
  const [currentDeviationImageBlob, setCurrentDeviationImageBlob] = useState();
  const [reactMagnifyImageLoading, setReactMagnifyImageLoading] =
    useState(false);
  const [currentCctv, setCurrentCctv] = useState("All/All");
  const [currentObject, setCurrentObject] = useState("All");

  useEffect(() => {
    setDeviationDataLoading(true);
    axios
      .get(
        process.env.REACT_APP_API +
          "viewtable/" +
          currentCctv +
          "/" +
          currentObject +
          "/" +
          (date[0].getFullYear() +
            "-" +
            (date[0].getMonth() + 1 < 10 ? "0" : "") +
            (date[0].getMonth() + 1) +
            "-" +
            (date[0].getDate() < 10 ? "0" : "") +
            date[0].getDate()) +
          "/Allvalidation/" +
          dataLimit +
          1,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setDeviationData(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setDeviationDataLoading(false);
      });
  }, [currentCctv, currentObject, date, dataLimit]);

  useEffect(() => {
    setReactMagnifyImageLoading(true);
    axios
      .get(
        process.env.REACT_APP_API +
          "assets/outputFolder/cctvOutput/" +
          "2023-03-17 09:18:38.921260_VIEWPOINT.jpg", //currentDeviationImageRaw,
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
  }, [currentDeviationImageRaw]);

  useEffect(() => {
    setDataLimit(10);
    setCurrentPage(1);
  }, [currentCctv, currentObject, date]);

  const cctvFilter = cctvData.map((cctv) => {
    return (
      <option key={cctv.id} value={cctv.name + "/" + cctv.location}>
        {cctv.name + " - " + cctv.location}
      </option>
    );
  });

  const objectFilter = objectData.map((object) => {
    if (object.id === 1) {
      return (
        <option key={object.id} value={"All"} selected>
          Semua Objek
        </option>
      );
    } else {
      return (
        <option key={object.id} value={object.value}>
          {object.name}
        </option>
      );
    }
  });

  return (
    <div className="data-tervalidasi">
      <div className="title d-grid gap-3 mb-3">
        <h6>Validasi Deviasi Tervalidasi</h6>
        <div className="row">
          <div className="col-xl-3 d-grid gap-1 mb-xl-0 mb-3">
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
                <option value="All/All" selected>
                  Semua CCTV
                </option>
                {cctvFilter}
              </select>
            </div>
          </div>
          <div className="col-xl-3 d-grid gap-1 mb-xl-0 mb-3">
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
          <div className="col-xl-4 d-grid gap-1 mb-xl-0 mb-3">
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
                  <div className="modal-body d-flex justify-content-center">
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
                  </div>
                  <div className="modal-footer">
                    <div className="row w-100 d-flex align-items-center">
                      <div className="col p-0">
                        <label>{dateStatus}</label>
                      </div>
                      <div className="col d-flex justify-content-end p-0">
                        {date !== [new Date(), new Date()] &&
                        dateStatus === "" ? (
                          <button
                            className="border-0 rounded-2 px-3 py-2"
                            onClick={() => {
                              setDate([new Date(), new Date()]);
                              date !== [new Date(), new Date()]
                                ? setDateStatus("*pilih tanggal (start)")
                                : setDateStatus(dateStatus);
                            }}
                          >
                            Reset Periode
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl d-xl-flex justify-content-end align-items-end">
            <DataExport date={date} deviationData={deviationData} />
          </div>
        </div>
      </div>
      <div className="content">
        <DataTable
          dataLimit={dataLimit}
          deviationData={deviationData}
          deviationDataLoading={deviationDataLoading}
          setCurrentDeviationImageRaw={setCurrentDeviationImageRaw}
          currentDeviationImageBlob={currentDeviationImageBlob}
          reactMagnifyImageLoading={reactMagnifyImageLoading}
        />
        <div>
          {deviationDataLoading === false ? (
            deviationData.length > 0 ? (
              <div className="pagination-nav d-flex justify-content-center align-items-center gap-3 mt-5">
                <button
                  className={
                    "border-0 rounded-start py-2" +
                    (currentPage === 1 ? " disabled" : "")
                  }
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                    setDataLimit(dataLimit - 10);
                  }}
                >
                  Previous
                </button>
                <label>{currentPage}</label>
                <button
                  className={
                    "border-0 rounded-end py-2" +
                    (dataLimit >= deviationData.length ? " disabled" : "")
                  }
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                    setDataLimit(dataLimit + 10);
                  }}
                >
                  Next
                </button>
              </div>
            ) : (
              <label className="w-100 text-center my-2">
                Tidak terdapat data yang sesuai dengan filter CCTV, Objek,
                maupun Periode
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

export default DataTervalidasi;
