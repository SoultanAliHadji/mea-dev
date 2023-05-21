import "../styles/live_monitoring.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactImageMagnify from "react-magnify-image";

const LiveMonitoring = ({
  cctvData,
  currentCctvId,
  setCurrentCctvId,
  currentCctvData,
}) => {

  const cctvArray = cctvData.map((cctv) => {
    return (
      <button
        className={
          "border-0 text-start rounded-2 px-3 py-2" +
          (currentCctvId === cctv.id ? " active" : "")
        }
        onClick={() => {
          setCurrentCctvId(cctv.id);
        }}
      >
        {cctv.name + " - " + cctv.location}
      </button>
    );
  });

  const cctvInfoArray = currentCctvData.map((info) => {
    return (
      <div className="cctv-info">
        <h6>{info.name + " - " + info.location}</h6>
        <label>IP {info.ip}</label>
      </div>
    );
  });

  return (
    <div className="live-monitoring">
      <div className="row">
        <div className="col-4">
          <div className="title mb-3">
            <h6>List CCTV</h6>
            <label>Pilih CCTV untuk melihat Live Monitoring</label>
          </div>
          <div className="content">
            <div className="cctv-list d-grid gap-2">{cctvArray}</div>
            <div className="view-all-cctv d-grid mt-4">
              <button className="border-0 rounded-2 px-3 py-2">
                Lihat Semua CCTV
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="title mb-3">
            <h6>Real-Time Monitoring</h6>
            <label>
              Monitoring deviasi yang terdeteksi secara real-time melalui CCTV
              Mining Eyes
            </label>
          </div>
          <div className="content d-grid gap-3">
            <ReactImageMagnify
              className="live-cctv mw-100 rounded-2"
              {...{
                smallImage: {
                  alt: "",
                  isFluidWidth: true,
                  src:
                    process.env.REACT_APP_API + "video_feed/" + currentCctvId,
                },
                largeImage: {
                  src:
                    process.env.REACT_APP_API + "video_feed/" + currentCctvId,
                  width: 2000,
                  height: 1100,
                },
                enlargedImagePosition: "over",
              }}
            />
            {cctvInfoArray}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMonitoring;
