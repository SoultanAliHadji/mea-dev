import "../styles/data_table.css";
import { useState } from "react";
import ReactImageMagnify from "react-magnify-image";
import { Icon } from "@iconify/react";

const DataTable = ({
  dataLimit,
  deviationData,
  deviationDataLoading,
  currentDeviationDetail,
  setCurrentDeviationDetail,
  currentDeviationImageBlob,
  reactMagnifyImageLoading,
}) => {
  const [currentindex, setCurrentIndex] = useState(0);

  const deviationArray = deviationData
    .slice(dataLimit - 10, dataLimit)
    .map((deviation, index) => {
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
          {/* <td className="text-center">
              <img src={currentDeviationImageBlob} alt="" />
            </td> */}
          <td className="text-center">
            {deviation.comment === null
              ? "-"
              : deviation.comment.length < 20
              ? deviation.comment
              : deviation.comment.substr(0, 19) + "..."}
          </td>
          <td className="text-center">
            <label
              className={
                "px-2 rounded-2" +
                (deviation.type_validation === "not_yet"
                  ? " status-none"
                  : deviation.type_validation === "true"
                  ? " status-true"
                  : " status-false")
              }
            >
              {deviation.type_validation === "not_yet"
                ? "Perlu Validasi"
                : deviation.type_validation === "true"
                ? "Valid"
                : "Tidak Valid"}
            </label>
          </td>
          <td className="text-center">
            {deviation.user_name === null
              ? "-"
              : deviation.user_name.length < 10
              ? deviation.user_name
              : deviation.user_name.substr(0, 9) + "..."}
          </td>
          <td>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="detail-button border-0 rounded-2 px-3 py-1"
                data-bs-toggle="modal"
                data-bs-target={"#deviationModal" + deviation.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setCurrentDeviationDetail(deviation);
                }}
              >
                <Icon icon="fa-solid:eye" />
              </button>
            </div>
            <div
              className="modal fade"
              id={"deviationModal" + deviation.id}
              tabindex="-1"
              aria-labelledby="deviationModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title" id="periodModalLabel">
                      {"ID: " + currentDeviationDetail.id}
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body d-grid gap-2">
                    {reactMagnifyImageLoading === false ? (
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            alt: "",
                            isFluidWidth: true,
                            src: currentDeviationImageBlob,
                          },
                          largeImage: {
                            src: currentDeviationImageBlob,
                            width: 800,
                            height: 500,
                          },
                          enlargedImagePosition: "over",
                        }}
                      />
                    ) : (
                      <div className="d-flex justify-content-center my-3">
                        <div className="spinner-border">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                    <div className="row">
                      <div className="col">
                        <label
                          className={
                            "px-2 rounded-2 mt-2" +
                            (currentDeviationDetail.type_validation ===
                            "not_yet"
                              ? " status-none"
                              : currentDeviationDetail.type_validation ===
                                "true"
                              ? " status-true"
                              : " status-false")
                          }
                        >
                          {currentDeviationDetail.type_validation === "not_yet"
                            ? "Perlu Validasi"
                            : currentDeviationDetail.type_validation === "true"
                            ? "Valid"
                            : "Tidak Valid"}
                        </label>
                      </div>
                      <div className="col p-0">
                        <div className="deviation-navigation d-flex justify-content-end gap-2">
                          <button
                            className={
                              "border-0" +
                              (currentindex === 0 ? " disabled" : "")
                            }
                            onClick={() => {
                              setCurrentIndex(currentindex - 1);
                              setCurrentDeviationDetail(
                                deviationData[currentindex - 1]
                              );
                            }}
                          >
                            <Icon
                              className="icon"
                              icon="akar-icons:chevron-left"
                            />
                          </button>
                          <button
                            className={
                              "border-0" +
                              (currentindex === deviationData.length - 1
                                ? " disabled"
                                : "")
                            }
                            onClick={() => {
                              setCurrentIndex(currentindex + 1);
                              setCurrentDeviationDetail(
                                deviationData[currentindex + 1]
                              );
                            }}
                          >
                            <Icon
                              className="icon"
                              icon="akar-icons:chevron-right"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex gap-1">
                        <label className="fw-bolder">Pengawas:</label>
                        {currentDeviationDetail.user_name === null ? (
                          "-"
                        ) : (
                          <label>{currentDeviationDetail.user_name}</label>
                        )}
                      </div>
                      <div className="d-flex gap-1">
                        <label className="fw-bolder">Deskripsi:</label>
                        {currentDeviationDetail.comment === null ? (
                          "-"
                        ) : (
                          <label>{currentDeviationDetail.comment}</label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      );
    });

  return (
    <div className="data-table overflow-auto">
      <table className="table">
        <thead>
          <tr className="text-center">
            <th className="table-header" scope="col">
              ID
            </th>
            <th className="table-header" scope="col">
              Lokasi CCTV
            </th>
            <th className="table-header" scope="col">
              Date Time
            </th>
            <th className="table-header" scope="col">
              Objek
            </th>
            {/* <th className="table-header" scope="col">
                Gambar Deviasi
              </th> */}
            <th className="table-header" scope="col">
              Deskripsi
            </th>
            <th className="table-header" scope="col">
              Status
            </th>
            <th className="table-header" scope="col">
              Pengawas
            </th>
            <th className="table-header" scope="col">
              Action
            </th>
          </tr>
        </thead>
        {deviationData.length > 0 && deviationDataLoading === false ? (
          <tbody className="table-group-divider">{deviationArray}</tbody>
        ) : (
          ""
        )}
      </table>
    </div>
  );
};

export default DataTable;
