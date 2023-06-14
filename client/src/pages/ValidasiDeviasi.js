import "../styles/validasi_deviasi.css";
import Validation from "../components/Validation";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import ReactImageMagnify from "react-magnify-image";

const ValidasiDeviasi = ({
  deviationData,
  currentDeviationData,
  setCurrentDeviationData,
  submitData,
  setSubmitData,
}) => {
  const [currentDeviationImageBlob, setCurrentDeviationImageBlob] = useState();
  const [currentDeviationImageLoading, setCurrentDeviationImageLoading] =
    useState(false);

  useEffect(() => {
    if (currentDeviationData.length !== 0) {
      setCurrentDeviationImageLoading(true);
      axios
        .get(
          process.env.REACT_APP_API +
            currentDeviationData[0].path +
            currentDeviationData[0].image,
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
          setCurrentDeviationImageLoading(false);
        });
    }
  }, [currentDeviationData]);

  const deviationControllerArray = deviationData.map((deviation, index) => {
    if (currentDeviationData[0]?.id === deviation.id) {
      return (
        <div className="d-grid gap-2">
          <button
            className={"border-0" + (index === 0 ? " disabled" : "")}
            onClick={() => {
              index !== 0
                ? setCurrentDeviationData([deviationData[index - 1]])
                : setCurrentDeviationData([deviationData[index]]);
            }}
          >
            <Icon className="icon" icon="akar-icons:chevron-up" />
          </button>
          <button
            className={
              "border-0" +
              (index === deviationData.length - 1 ? " disabled" : "")
            }
            onClick={() => {
              index !== deviationData.length - 1
                ? setCurrentDeviationData([deviationData[index + 1]])
                : setCurrentDeviationData([deviationData[index]]);
            }}
          >
            <Icon className="icon" icon="akar-icons:chevron-down" />
          </button>
        </div>
      );
    }
  });

  const currentDeviationArray = currentDeviationData.map((deviation) => {
    return (
      <div key={deviation.id} className="deviation-data">
        <div className="row align-items-center">
          <div className="col">
            <label
              className={
                "px-3 my-1 rounded-2" +
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
          <div className="col">
            <Validation
              currentDeviationData={currentDeviationData}
              setCurrentDeviationData={setCurrentDeviationData}
              submitData={submitData}
              setSubmitData={setSubmitData}
            />
          </div>
        </div>
        <div className="my-3">
          <h6>Terdeteksi Deviasi {deviation.type_object}</h6>
        </div>
        <div className="row">
          <div className="col-4 d-grid gap-2">
            <div className="d-flex gap-2">
              <Icon className="icon" icon="mdi:cctv" />
              <label>{deviation.name + " - " + deviation.location}</label>
            </div>
            <div className="d-flex gap-2">
              <Icon className="icon" icon="akar-icons:clock" />
              <label>{deviation.created_at}</label>
            </div>
          </div>
          {deviation.type_validation !== "not_yet" ? (
            <div className="col-4 d-grid gap-2">
              <div className="d-flex gap-2">
                <Icon className="icon" icon="fa6-solid:helmet-safety" />
                <label>{deviation.user_name}</label>
              </div>
              <div className="d-flex gap-2">
                <Icon className="icon" icon="codicon:note" />
                <label>
                  {deviation.comment.substring(0, 35) +
                    (deviation.comment.length > 36 ? "..." : "")}
                </label>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  });

  return (
    <div className="validasi-deviasi">
      <div className="title mb-3">
        <h6>Validasi Deviasi</h6>
        <label>Validasi deviasi yang terdeteksi</label>
      </div>
      <div className="content">
        <div>
          {currentDeviationData.length !== 0 ? (
            <div>
              {currentDeviationImageLoading === false ? (
                <div className="row w-100 m-0 p-0">
                  <div className="col-1 m-0 p-0"></div>
                  <div className="col m-0 p-0">
                    <div className="d-flex justify-content-center">
                      <ReactImageMagnify
                        className="deviation-img rounded-2"
                        {...{
                          smallImage: {
                            alt: "",
                            isFluidWidth: true,
                            src: currentDeviationImageBlob,
                          },
                          largeImage: {
                            src: currentDeviationImageBlob,
                            width: 2000,
                            height: 1100,
                          },
                          enlargedImagePosition: "over",
                        }}
                      />
                    </div>
                  </div>
                  <div className="notification-navigation col-1 m-0 p-0">
                    <div className="h-100 d-flex align-items-center">
                      {deviationControllerArray}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              <div className="mt-3">{currentDeviationArray}</div>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <label className="not-yet-deviation">
                Pilih deviasi pada List Deviasi
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidasiDeviasi;
