import "../styles/data_table.scss";
import { useState } from "react";
import ReactImageMagnify from "react-magnify-image";
import { Icon } from "@iconify/react";

const DataTable = ({
  dataLimit,
  setDataLimit,
  currentTablePage,
  setCurrentTablePage,
  deviationData,
  deviationDataLoading,
  currentDeviationDetail,
  setCurrentDeviationDetail,
  currentDeviationImageBlob,
  reactMagnifyImageLoading,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMovePage = (action) => {
    if (action === "previous" && dataLimit - 25 === currentIndex) {
      setCurrentTablePage(currentTablePage - 1);
      setDataLimit(dataLimit - 25);
    } else if (action === "next" && (currentIndex + 1) % 25 === 0) {
      setCurrentTablePage(currentTablePage + 1);
      setDataLimit(dataLimit + 25);
    }
  };

  const deviationArray = deviationData
    .slice(dataLimit - 25, dataLimit)
    .map((deviation, index) => {
      return (
        <tr
          className={
            "align-middle" +
            (deviation.id === currentDeviationDetail.id ? " active" : "")
          }
          key={deviation.id}
          data-bs-toggle="modal"
          data-bs-target="#deviationModal"
          onClick={() => {
            setCurrentIndex(dataLimit - 25 + index);
            setCurrentDeviationDetail(deviation);
          }}
        >
          <th className="text-center" scope="row">
            {deviation.id}
          </th>
          <td className="text-center">
            {deviation.name} - {deviation.location}
          </td>
          <td className="text-center">{deviation.created_at}</td>
          <td className="text-center">{deviation.type_object}</td>
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
                              (currentIndex === 0 ? " disabled" : "")
                            }
                            onClick={() => {
                              setCurrentIndex(currentIndex - 1);
                              setCurrentDeviationDetail(
                                deviationData[currentIndex - 1]
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
                              (currentIndex === deviationData.length - 1
                                ? " disabled"
                                : "")
                            }
                            onClick={() => {
                              setCurrentIndex(currentIndex + 1);
                              setCurrentDeviationDetail(
                                deviationData[currentIndex + 1]
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
              Validator
            </th>
          </tr>
        </thead>
        {deviationData.length > 0 && deviationDataLoading === false ? (
          <tbody className="table-group-divider">{deviationArray}</tbody>
        ) : (
          ""
        )}
        <div
          className="modal fade"
          id="deviationModal"
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
                        (currentDeviationDetail.type_validation === "not_yet"
                          ? " status-none"
                          : currentDeviationDetail.type_validation === "true"
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
                          "border-0" + (currentIndex === 0 ? " disabled" : "")
                        }
                        onClick={() => {
                          setCurrentIndex(currentIndex - 1);
                          setCurrentDeviationDetail(
                            deviationData[currentIndex - 1]
                          );
                          handleMovePage("previous");
                        }}
                      >
                        <Icon className="icon" icon="akar-icons:chevron-left" />
                      </button>
                      <button
                        className={
                          "border-0" +
                          (currentIndex === deviationData.length - 1
                            ? " disabled"
                            : "")
                        }
                        onClick={() => {
                          setCurrentIndex(currentIndex + 1);
                          setCurrentDeviationDetail(
                            deviationData[currentIndex + 1]
                          );
                          handleMovePage("next");
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
                  <div className="row">
                    <label className="col-2 fw-bolder">CCTV</label>
                    <label className="col-10">
                      {": " +
                        currentDeviationDetail.name +
                        " - " +
                        currentDeviationDetail.location}
                    </label>
                  </div>
                  <div className="row">
                    <label className="col-2 fw-bolder">Pengawas</label>
                    {currentDeviationDetail.user_name === null ? (
                      <label className="col-10">: -</label>
                    ) : (
                      <label className="col-10">
                        {": " + currentDeviationDetail.user_name}
                      </label>
                    )}
                  </div>
                  <div className="row">
                    <label className="col-2 fw-bolder">Deskripsi</label>
                    {currentDeviationDetail.comment === null ? (
                      <label className="col-10">: -</label>
                    ) : (
                      <label className="col-10">
                        {currentDeviationDetail.comment}
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </table>
    </div>
  );
};

export default DataTable;
