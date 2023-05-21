import "../styles/data_tervalidasi.css";
import "../styles/calendar.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Calendar from "react-calendar";

const DataTervalidasi = ({ cctvData, objectData }) => {
  const [date, setDate] = useState(null);
  const [dateStatus, setDateStatus] = useState("*pilih tanggal (start)");

  const cctvFilter = cctvData.map((cctv) => {
    return <option value={0 + 1}>{cctv.name + " - " + cctv.location}</option>;
  });

  const objectFilter = objectData.map((object) => {
    if (object.id !== 1) {
      return <option value={object.value}>{object.name}</option>;
    }
  });

  useEffect(() => {
    console.log(date);
  }, [date]);

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
                <select className="form-select" id="inputGroupSelect01">
                  <option value="AllCctv" selected>
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
                <select className="form-select" id="inputGroupSelect02">
                  <option value="AllObject" selected>
                    Semua Objek
                  </option>
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
                    {date === null
                      ? "Pilih Periode"
                      : date[0].toDateString() + " - " + date[1].toDateString()}
                  </label>
                </button>
              </div>
              <div
                className="modal fade"
                id="periodModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
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
                          {date !== null || dateStatus === "" ? (
                            <button
                              className="border-0 rounded-2 px-3 py-2"
                              onClick={() => {
                                setDate(null);
                                date !== null
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
        <div className="d-flex justify-content-center">dc,dsnh</div>
      </div>
    </div>
  );
};

export default DataTervalidasi;
