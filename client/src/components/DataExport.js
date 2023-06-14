import "../styles/data_export.css"
import { Icon } from "@iconify/react";
import exportFromJSON from "export-from-json";

const DataExport = ({ date, deviationData }) => {
  const exportObjectFields = {
    cctv_id: "CCTV ID",
    comment: "comment",
    created_at: "created_at",
    id: "id",
    image: "image",
    ip: "ip",
    location: "location",
    name: "name",
    realtime_images_id: "realtime_images_id",
    type_object: "type_object",
    type_validation: "type_validation",
    updated_at: "updated_at",
    user_id: "user_id",
    user_name: "user_name",
    username: "username",
    violate_count: "violate_count",
  };

  const exportHandler = () => {
    const data = deviationData;
    const fileName =
      "Data_(" +
      (date[0].getDate() < 10 ? "0" : "") +
      date[0].getDate() +
      "_" +
      (date[0].getMonth() + 1 < 10 ? "0" : "") +
      (date[0].getMonth() + 1) +
      "_" +
      date[0].getFullYear() +
      " - " +
      (date[1].getDate() < 10 ? "0" : "") +
      date[1].getDate() +
      "_" +
      (date[1].getMonth() + 1 < 10 ? "0" : "") +
      (date[1].getMonth() + 1) +
      "_" +
      date[1].getFullYear() +
      ")";
    let fields = []; //empty list means "use all"
    const exportType = "xls";
    exportFromJSON({ data, fileName, fields, exportType });
  };

  return (
    <button
      className="export-button border-0 rounded-2 px-3 py-2 d-flex align-items-center gap-1"
      onClick={exportHandler}
    >
      <Icon className="icon" icon="entypo:export" /> <label></label>
      Export
    </button>
  );
};

export default DataExport;
