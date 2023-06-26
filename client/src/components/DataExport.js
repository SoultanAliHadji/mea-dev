import "../styles/data_export.scss";
import { Icon } from "@iconify/react";
import csvDownload from "json-to-csv-export";

const DataExport = ({ deviationData }) => {
  const dataToConvert = {
    data: deviationData,
    filename:
      new Date().getDate() +
      "-" +
      new Date().getMonth() +
      "-" +
      new Date().getFullYear(),
    delimiter: ",",
  };

  return (
    <button
      className="export-button border-0 rounded-2 px-3 py-2 d-flex align-items-center gap-1"
      onClick={() => {
        csvDownload(dataToConvert);
      }}
    >
      <Icon className="icon" icon="entypo:export" />
      <label>Export</label>
    </button>
  );
};

export default DataExport;
