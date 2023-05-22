import "../styles/validasi_deviasi.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import ReactImageMagnify from "react-magnify-image";

const ValidasiDeviasi = ({ getToken, currentDeviationId }) => {
  const [currentDeviationData, setCurrentDeviationData] = useState([]);
  const [currentDeviationImageRaw, setCurrentDeviationImageRaw] = useState([]);
  const [currentDeviationImageBlob, setCurrentDeviationImageBlob] = useState();

  useEffect(() => {
    if (currentDeviationId != 0) {
      axios
        .get(process.env.REACT_APP_API + "view/" + currentDeviationId, {
          headers: {
            Authorization: "Bearer " + getToken,
          },
        })
        .then((res) => {
          setCurrentDeviationData(res.data.data);
          setCurrentDeviationImageRaw(res.data.data[0].image);
        })
        .catch((err) => console.log(err));
    }
  }, [currentDeviationId]);

  useEffect(() => {
    if (currentDeviationId != 0) {
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
        .catch((err) => console.log(err));
    }
  }, [currentDeviationImageRaw]);

  const currentDeviationArray = currentDeviationData.map((deviation) => {
    return (
      <div key={deviation.id} className="deviation-data">
        <div className="row align-items-center">
          <div className="col">
            <label
              className={
                "px-3 rounded-2" +
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
            <div className="d-flex justify-content-end gap-2">
              <button className="button-true border-0 rounded-2 px-3 py-1">
                Valid
              </button>
              <button className="button-false rounded-2 px-3 py-1">
                Tidak Valid
              </button>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <h6>Terdeteksi Deviasi {deviation.type_object}</h6>
        </div>
        <div className="d-grid-2">
          <div className="d-flex gap-2">
            <Icon className="fs-5" icon="bi:camera-fill" />
            <label>{deviation.name + " - " + deviation.location}</label>
          </div>
          <div className="d-flex gap-2">
            <Icon className="fs-5" icon="akar-icons:clock" />
            <label>{deviation.created_at}</label>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="validasi-deviasi">
      <div className="row">
        <div className="col">
          <div className="title mb-3">
            <h6>Validasi Deviasi</h6>
            <label>Validasi deviasi yang terdeteksi</label>
          </div>
          <div className="content">
            {currentDeviationId !== 0 ? (
              <div>
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
                <div className="mt-3">{currentDeviationArray}</div>
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <label>Pilih deviasi pada List Deviasi</label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidasiDeviasi;
