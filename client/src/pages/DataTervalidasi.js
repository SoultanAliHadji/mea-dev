import "../styles/data_tervalidasi.css";
import "../styles/calendar.css";
import DataTable from "../components/DataTable";
import axios from "axios";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Calendar from "react-calendar";

const DataTervalidasi = ({ getToken, cctvData, objectData }) => {
  const [date, setDate] = useState([new Date(), new Date()]);
  const [dateStatus, setDateStatus] = useState("*pilih tanggal (start)");
  const [deviationData, setDeviationData] = useState([]);
  const [currentDeviationId, setCurrentDeviationId] = useState();
  const [currentDeviationData, setCurrentDeviationData] = useState([]);
  const [currentDeviationImageBlob, setCurrentDeviationImageBlob] = useState();
  const [reactMagnifyImageLoading, setReactMagnifyImageLoading] =
    useState(false);
  const [currentCctv, setCurrentCctv] = useState("All/All");
  const [currentObject, setCurrentObject] = useState("All");

  useEffect(() => {
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
      .catch((err) => console.log(err));
  }, [currentCctv, currentObject, date]);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API + "view/" + currentDeviationId, //viewimage
        {
          headers: {
            Authorization: "Bearer " + getToken,
          },
        }
      )
      .then((res) => {
        setCurrentDeviationData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [currentDeviationId]);

  useEffect(() => {
    setReactMagnifyImageLoading(true);
    axios
      .get(
        process.env.REACT_APP_API +
          "assets/outputFolder/cctvOutput/" +
          "2023-03-17 09:18:38.921260_VIEWPOINT.jpg", //viewimage
        {
          headers: {
            Authorization: "Bearer " + getToken,
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
  }, [currentDeviationData]);

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
        <div className="d-grid gap-1">
          <div className="row align-items-center">
            <div className="col-3">
              <label>CCTV</label>
            </div>
            <div className="col-3">
              <label>Objek</label>
            </div>
            <div className="col-3">
              <label>Periode</label>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-3">
              <div className="input-group">
                <label className="input-group-text" for="inputGroupSelect01">
                  <Icon className="" icon="bi:camera-fill" />
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
            <div className="col-3">
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
            <div className="col-4">
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
                    {date[0].toDateString() + " - " + date[1].toDateString()}
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
                      <h1 className="modal-title fs-5" id="periodModalLabel">
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
            <div className="col d-flex justify-content-end">
              <button className="export-button border-0 rounded-2 px-3 py-2 d-flex align-items-center gap-1">
                <Icon className="fs-5" icon="entypo:export" /> <label></label>
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <DataTable
          deviationData={deviationData}
          setCurrentDeviationId={setCurrentDeviationId}
          currentDeviationData={currentDeviationData}
          reactMagnifyImageLoading={reactMagnifyImageLoading}
          currentDeviationImageBlob={currentDeviationImageBlob}
        />
        <div>
          {deviationData.length > 0 ? (
            ""
          ) : (
            <label className="w-100 text-center my-2">
              Tidak terdapat data yang sesuai dengan filter CCTV, Objek, maupun
              Periode
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTervalidasi;
