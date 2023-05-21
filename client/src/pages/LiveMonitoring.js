import "../styles/live_monitoring.css";
import { useState } from "react";
import ReactImageMagnify from "react-magnify-image";

const LiveMonitoring = ({
  currentCctv,
  setCurrentCctv,
}) => {
  const [cctvName, setCctvName] = useState("CCTV HO - Indoor Finance");

  const cctv = [
    { id: 1, cctv: "CCTV HO - Indoor Finance" },
    { id: 2, cctv: "CCTV GMO - VIEWPOINT 2" },
    { id: 6, cctv: "CCTV GMO - VIEWPOINT" },
    { id: 10, cctv: "CCTV GMO - POST DUMPLING" },
  ];

  const cctvArray = cctv.map((data) => {
    return (
      <button
        className={
          "border-0 text-start rounded-2 px-3 py-2" +
          (currentCctv === data.id ? " active" : "")
        }
        onClick={() => {
          setCurrentCctv(data.id);
          setCctvName(data.cctv)
        }}
      >
        {data.cctv}
      </button>
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
                  src: process.env.REACT_APP_API + "video_feed/" + currentCctv,
                },
                largeImage: {
                  src: process.env.REACT_APP_API + "video_feed/" + currentCctv,
                  width: 2000,
                  height: 1100,
                },
                enlargedImagePosition: "over",
              }}
            />
            <h6>{cctvName}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMonitoring;
