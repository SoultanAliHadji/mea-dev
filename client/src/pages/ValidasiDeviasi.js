import "../styles/validasi_deviasi.css";
import Notification from "../components/Notification";

const ValidasiDeviasi = () => {
  return (
    <div className="validasi-deviasi">
      <div className="row">
        <div className="col">
          <div className="title mb-3">
            <h6>Validasi Deviasi</h6>
            <label>Validasi deviasi yang terdeteksi</label>
          </div>
          <div className="content"></div>
        </div>
      </div>
    </div>
  );
};

export default ValidasiDeviasi;
