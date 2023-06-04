import "../styles/live_monitoring.css";
import ReactImageMagnify from "react-magnify-image";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    setRealTimeCctvLoading(true);
    var image = new Image();
    image.src = "http://10.10.10.66:5002/api/" + "video_feed/" + currentCctvId;
    image.onload = () => {
      setRealTimeCctvLoading(false);
      setRealTimeCctvError(false);
      setRealTimeCctv(
        "http://10.10.10.66:5002/api/" + "video_feed/" + currentCctvId
      );
    };
    image.onerror = () => {
      setRealTimeCctvLoading(false);
      setRealTimeCctvError(true);
    };
  }, [currentCctvId]);

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
        <label>{"IP " + info.ip}</label>
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
              <button className="border-0 rounded-2 px-3 py-2">
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
          <div className="content d-grid gap-3">
            <div className="live-cctv d-flex justify-content-center align-items-center rounded-2">
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
                <img src={require("../assets/error.png")} alt="" />
              )}
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
    </div>
  );
};

export default LiveMonitoring;
