import "../styles/data_tervalidasi.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const DataTervalidasi = ({ cctvData, objectData }) => {
  const cctvFilter = cctvData.map((cctv) => {
    return <option value={0 + 1}>{cctv.name + " - " + cctv.location}</option>;
  });

  const objectFilter = objectData.map((object) => {
    if (object.id !== 1) {
      return <option value={object.value}>{object.name}</option>;
    }
  });

  return (
    <div className="data-tervalidasi">
      <div className="title d-grid gap-3 mb-3">
        <h6>Validasi Deviasi Tervalidasi</h6>
        <div className="d-grid gap-1">
          <div className="row align-items-center">
            <div className="col-3">
              <label>CCTV</label>
            </div>
            <div className="col-3">
              <label>Objek</label>
            </div>
            <div className="col-3">
              <label>Periode</label>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-3">
              <div class="input-group">
                <label class="input-group-text" for="inputGroupSelect01">
                  <Icon className="" icon="bi:camera-fill" />
                </label>
                <select class="form-select" id="inputGroupSelect01">
                  <option value="AllCctv" selected>
                    Semua CCTV
                  </option>
                  {cctvFilter}
                </select>
              </div>
            </div>
            <div className="col-3">
              <div class="input-group">
                <label class="input-group-text" for="inputGroupSelect02">
                  <Icon
                    className="filter-icon"
                    icon="ic:round-filter-center-focus"
                  />
                </label>
                <select class="form-select" id="inputGroupSelect02">
                  <option value="AllObject" selected>
                    Semua Objek
                  </option>
                  {objectFilter}
                </select>
              </div>
            </div>
            <div className="col-3">
              <label>CCTV</label>
            </div>
            <div className="col-3 d-flex justify-content-end">
              <button className="border-0 rounded-2 px-3 py-2 d-flex align-items-center gap-1">
                <Icon className="fs-5" icon="entypo:export" />{" "}
                <label></label>Export
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="d-flex justify-content-center">dc,dsnh</div>
      </div>
    </div>
  );
};

export default DataTervalidasi;
