import "../styles/validasi_deviasi.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactImageMagnify from "react-magnify-image";

const ValidasiDeviasi = ({ getToken, currentDeviationId }) => {
  const [currentDeviationData, setCurrentDeviationData] = useState([]);
  const [currentDeviationImageRaw, setCurrentDeviationImageRaw] = useState([]);
  const [currentDeviationImageBlob, setCurrentDeviationImageBlob] = useState();

  useEffect(() => {
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
  }, [currentDeviationId]);

  useEffect(() => {
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
        let blob = new Blob([res.data], { type: res.headers["content-type"] });
        var reader = new window.FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function () {
          var imageDataUrl = reader.result;
          setCurrentDeviationImageBlob(imageDataUrl);
          console.log(imageDataUrl);
        };
      })
      .catch((err) => console.log(err));
  }, [currentDeviationImageRaw]);

  const currentDeviationArray = currentDeviationData.map((deviation) => {
    return (
      <div>
        <div className="row align-items-center">
          <div className="col">
            <label
              className={
                "px-2 rounded-2" +
                (deviation.type_validation === "true"
                  ? " status-true"
                  : deviation.type_validation === "false"
                  ? " status-false"
                  : " status-none")
              }
            >
              {deviation.type_validation === "not_yet"
                ? "Perlu Validasi"
                : deviation.type_validation}
            </label>
          </div>
          <div className="col">
            <div className="d-flex justify-content-end">
              <button>Valid</button>
              <button>Tidak Valid</button>
            </div>
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
            <div>{currentDeviationArray}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidasiDeviasi;
