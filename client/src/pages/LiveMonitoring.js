import "../styles/live_monitoring.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import ReactImageMagnify from "react-magnify-image";

const LiveMonitoring = ({
  cctvData,
  currentCctvId,
  setCurrentCctvId,
  currentCctvData,
  cctvLoading,
  cctvInfoLoading,
  setDeviationDataLimit,
}) => {
  const [realTimeCctvLoading, setRealTimeCctvLoading] = useState(false);
  const [realTimeCctv, setRealTimeCctv] = useState();
  const [realTimeCctvError, setRealTimeCctvError] = useState(false);
  const [annotation, setAnnotation] = useState([]);

  const annotationAdder = (e) => {
    if (annotation.length < 4) {
      setAnnotation((arr) => [
        ...arr,
        [ e.nativeEvent.offsetX, e.nativeEvent.offsetY ],
      ]);
    }
  };

  const annotationDotArray = annotation.map((annotation, index) => {
    return (
      <div
        className="annotation-dot position-absolute rounded-5 d-flex justify-content-center align-items-center"
        style={{
          width: "16px",
          height: "16px",
          fontSize: "12px",
          color: "white",
          backgroundColor: "#3B9315",
          left: annotation[0] - 8 + "px",
          top: annotation[1] - 8 + "px",
        }}
      >
        <label>{index + 1}</label>
      </div>
    );
  });

  const handleSetPerimeterArea = () => {
    axios({
      method: "post",
      url: process.env.REACT_APP_API + "polygon/" + currentCctvId,
      data: {
        polygon: annotation,
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setRealTimeCctvLoading(true);
    var image = new Image();
    image.src = process.env.REACT_APP_API + "video_feed/" + currentCctvId;
    image.onload = () => {
      setRealTimeCctvLoading(false);
      setRealTimeCctvError(false);
      setRealTimeCctv(
        process.env.REACT_APP_API + "video_feed/" + currentCctvId
      );
    };
    image.onerror = () => {
      setRealTimeCctvLoading(false);
      setRealTimeCctvError(true);
    };
  }, [currentCctvId]);

  const controlHandler = (act) => {
    axios({
      method: "post",
      url: process.env.REACT_APP_API + "control-cctv/" + currentCctvId,
      data: {
        control: act,
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fullscreenHandler = (event) => {
    if (event === "realtime-cctv") {
      document.getElementById(event)?.requestFullscreen();
    } else {
      document.getElementById(event)?.requestFullscreen();
    }
  };

  const cctvArray = cctvData.map((cctv) => {
    return (
      <button
        key={cctv.id}
        className={
          "border-0 text-start rounded-2 px-3 py-2" +
          (currentCctvId === cctv.id ? " active" : "")
        }
        onClick={() => {
          setCurrentCctvId(cctv.id);
          setDeviationDataLimit(10);
        }}
      >
        {cctv.name + " - " + cctv.location}
      </button>
    );
  });

  const cctvInfoArray = currentCctvData.map((info) => {
    return (
      <div key={info.id} className="cctv-info">
        <h6>{info.name + " - " + info.location}</h6>
      </div>
    );
  });

  const allCctvArray = cctvData.map((cctv) => {
    return (
      <div className="col-6 m-0 p-0" key={cctv.id}>
        <ReactImageMagnify
          className="w-100"
          {...{
            smallImage: {
              alt: "live_monitoring",
              isFluidWidth: true,
              src: process.env.REACT_APP_API + "video_feed/" + cctv.id,
            },
            largeImage: {
              src: process.env.REACT_APP_API + "video_feed/" + cctv.id,
              width: 2000,
              height: 1100,
            },
            enlargedImagePosition: "over",
          }}
        />
      </div>
    );
  });

  return (
    <div className="live-monitoring">
      <div className="row">
        <div className="col-xl-4 mb-xl-0 mb-5">
          <div className="title mb-3">
            <h6>List CCTV</h6>
            <label>Pilih CCTV untuk melihat Live Monitoring</label>
          </div>
          <div className="content">
            {cctvLoading === false ? (
              <div className="cctv-list d-grid gap-2">{cctvArray}</div>
            ) : (
              <div className="d-flex justify-content-center my-3">
                <div className="spinner-border">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <div className="view-all-cctv d-grid mt-4">
              <button
                className="border-0 rounded-2 px-3 py-2"
                onClick={() => {
                  fullscreenHandler("all-cctv");
                }}
              >
                Lihat Semua CCTV
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl">
          <div className="title mb-3">
            <h6>Real-Time Monitoring</h6>
            <label>
              Monitoring deviasi yang terdeteksi secara real-time melalui CCTV
              Mining Eyes
            </label>
          </div>
          <div className="content d-grid">
            <div className="live-cctv d-flex justify-content-center align-items-center rounded-top">
              {realTimeCctvLoading === true ? (
                <div className="d-flex justify-content-center my-3">
                  <div className="spinner-border">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : realTimeCctvError === false ? (
                <ReactImageMagnify
                  className="mw-100"
                  {...{
                    smallImage: {
                      alt: "live_monitoring",
                      isFluidWidth: true,
                      src: realTimeCctv,
                    },
                    largeImage: {
                      src: realTimeCctv,
                      width: 2000,
                      height: 1100,
                    },
                    enlargedImagePosition: "over",
                  }}
                />
              ) : (
                <img
                  className="my-2"
                  src={require("../assets/error.png")}
                  alt=""
                />
              )}
            </div>
            <div className="cam-navigation row mb-3 m-0 p-0 align-items-center">
              <div className="col">
                <button
                  className="border-0 d-flex align-items-center gap-1 d-none"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#perimeterModal"
                >
                  <Icon icon="uil:setting" />
                  <label>Perimeter Area</label>
                </button>
                <div
                  className="modal fade"
                  id="perimeterModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Atur Perimeter Area
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="position-relative">
                          <img
                            src={realTimeCctv}
                            alt=""
                            onClick={annotationAdder}
                          />
                          {annotationDotArray}
                        </div>
                      </div>
                      <div className="modal-footer">
                        <div className="row w-100 d-flex align-items-center">
                          <div className="col p-0">
                            <button
                              className="border-0"
                              onClick={() => {
                                setAnnotation([]);
                              }}
                            >
                              Reset anotasi
                            </button>
                          </div>
                          <div className="col d-flex justify-content-end p-0">
                            <button
                              type="button"
                              className="submit-button border-0 rounded-2 px-3 py-1"
                              data-bs-dismiss="modal"
                              onClick={handleSetPerimeterArea}
                            >
                              Simpan
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col d-flex justify-content-end gap-1">
                <button
                  className="border-0"
                  onClick={() => {
                    controlHandler("reload");
                  }}
                >
                  <Icon icon="charm:refresh" />
                </button>
                {/* <button className="border-0">
                <Icon icon="akar-icons:chevron-left" />
              </button>
              <button className="border-0">
                <Icon icon="akar-icons:chevron-right" />
              </button>
              <button className="border-0">
                <Icon icon="akar-icons:chevron-up" />
              </button>
              <button className="border-0">
                <Icon icon="akar-icons:chevron-down" />
              </button>
              <button className="border-0">
                <Icon icon="bx:zoom-in" />
              </button>
              <button className="border-0">
                <Icon icon="bx:zoom-out" />
              </button> */}
                <button
                  className="border-0"
                  onClick={() => {
                    fullscreenHandler("realtime-cctv");
                  }}
                >
                  <Icon icon="ic:outline-zoom-out-map" />
                </button>
              </div>
            </div>
            {cctvInfoLoading === false ? (
              <div>{cctvInfoArray}</div>
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
      <div className="visually-hidden">
        <div id="realtime-cctv">
          <img className="w-100" src={realTimeCctv} alt="" />
        </div>
      </div>
      <div className="visually-hidden">
        <div className="row overflow-auto" id="all-cctv">
          {allCctvArray}
        </div>
      </div>
    </div>
  );
};

export default LiveMonitoring;
