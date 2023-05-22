import "../styles/data_tervalidasi.css";
import "../styles/calendar.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Calendar from "react-calendar";

const DataTervalidasi = ({ getToken, cctvData, objectData }) => {
  const [date, setDate] = useState([new Date(), new Date()]);
  const [dateStatus, setDateStatus] = useState("*pilih tanggal (start)");
  const [deviationData, setDeviationData] = useState([]);
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

  const deviationArray = deviationData.slice(0, 10).map((deviation) => {
    return (
      <tr className="align-middle" key={deviation.id}>
        <th className="text-center" scope="row">
          {deviation.id}
        </th>
        <td className="text-center">
          {deviation.name} - {deviation.location}
        </td>
        <td className="text-center">{deviation.created_at}</td>
        <td className="text-center">{deviation.type_object}</td>
        {/*<td className="text-center">
          <img
            className="deviation-img"
            src={require("../../assets/mining_eyes.jpg")}
            alt=""
          />
        </td>*/}
        <td className="text-center">
          {deviation.comment == null
            ? "-"
            : deviation.comment.length < 20
            ? deviation.comment
            : deviation.comment.substr(0, 19) + "..."}
        </td>
        <td className="d-flex justify-content-center">
          <div
            className={
              "rounded-2 px-2 fw-bolder" +
              (deviation.type_validation == "not_yet"
                ? " status-none"
                : deviation.type_validation == "true"
                ? " status-true"
                : " status-false")
            }
          >
            {deviation.type_validation == "not_yet"
              ? "Perlu Validasi"
              : deviation.type_validation == "true"
              ? "Valid"
              : "Tidak Valid"}
          </div>
        </td>
        <td className="text-center">
          {deviation.user_name == null
            ? "-"
            : deviation.user_name.length < 10
            ? deviation.user_name
            : deviation.user_name.substr(0, 9) + "..."}
        </td>
        <td>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="border-0 rounded-2 px-3 py-1"
              deviation-bs-toggle="modal"
              deviation-bs-target="#viewModal"
              onClick={() => {
                // setImagename(deviation.image);
                // setStatus(deviation.type_validation);
                // setValidator(deviation.user_name);
                // setComment(deviation.comment);
              }}
            >
              <Icon icon="fa-solid:eye" />
            </button>
          </div>
        </td>
        {/* <div
          className="modal fade"
          id="viewModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                {modalloading == false ? (
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "",
                        isFluidWidth: true,
                        src: modalimage,
                      },
                      largeImage: {
                        src: modalimage,
                        width: 800,
                        height: 500,
                      },
                      enlargedImagePosition: "over",
                    }}
                  />
                ) : (
                  <div className="d-flex justify-content-center">
                    <div className="absolute-fixed">
                      <div
                        className="spinner-border text-success"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className={
                    "rounded-2 px-2 fw-bolder mt-2" +
                    (status == "not_yet"
                      ? " text-primary notification-tag"
                      : status == "true"
                      ? " text-success notification-tag-true"
                      : " text-danger notification-tag-false")
                  }
                >
                  {status == "not_yet"
                    ? "Perlu Validasi"
                    : status == "true"
                    ? "Valid"
                    : "Tidak Valid"}
                </div>
                <div className="d-flex gap-1 mt-2 deviation-desc">
                  <label className="fw-bolder">Pengawas:</label>
                  {validator == null ? "-" : <label>{validator}</label>}
                </div>
                <div className="d-flex gap-1 deviation-desc">
                  <label className="fw-bolder">Deskripsi:</label>
                  {comment == null ? "-" : <label>{comment}</label>}
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </tr>
    );
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
        <table className="table">
          <thead>
            <tr className="text-center">
              <th className="table-success" scope="col">
                ID
              </th>
              <th className="table-success" scope="col">
                Lokasi CCTV
              </th>
              <th className="table-success" scope="col">
                Date Time
              </th>
              <th className="table-success" scope="col">
                Objek
              </th>
              {/*<th className="table-success" scope="col">
                Gambar Deviasi
              </th>*/}
              <th className="table-success" scope="col">
                Deskripsi
              </th>
              <th className="table-success" scope="col">
                Status
              </th>
              <th className="table-success" scope="col">
                Pengawas
              </th>
              <th className="table-success" scope="col">
                Action
              </th>
            </tr>
          </thead>
          {deviationData.length > 0 ? (
            <tbody className="table-group-divider">{deviationArray}</tbody>
          ) : (
            ""
          )}
        </table>
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
