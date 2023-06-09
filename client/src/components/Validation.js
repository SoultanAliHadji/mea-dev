import "../styles/validation.scss";
import { useState } from "react";
import axios from "axios";

const Validation = ({
  currentNotificationData,
  setCurrentNotificationData,
  submitData,
  setSubmitData,
}) => {
  const [validationStatus, setValidationStatus] = useState();
  const [operatorName, setOperatorName] = useState("");
  const [validationCommentData, setValidationCommentData] = useState([]);
  const [textareaStatus, setTextareaStatus] = useState(true);
  const [textareaValue, setTextareaValue] = useState("");

  const submitHandler = () => {
    axios({
      method: "put",
      url:
        process.env.REACT_APP_API +
        "deviation/" +
        currentNotificationData[0].id,
      data: {
        type_validation: validationStatus,
        comment:
          (operatorName !== ""
            ? "Operator terdeteksi: " + operatorName + ". "
            : "") +
          validationCommentData.join(", ") +
          (validationCommentData.length > 0 && textareaValue.length > 0
            ? ", "
            : "") +
          (textareaValue.length > 0 ? textareaValue : ""),
        user_id: localStorage.getItem("id"),
      },
      headers: {
        "Content-Type": "multipart/form-data",
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

  const trueCommentData = [
    {
      id: 1,
      value: "LV tidak memiliki izin memasuki area tambang",
    },
    { id: 2, value: "HD tidak menjaga jarak aman iring (40m)" },
    { id: 3, value: "Pekerja/orang berada di luar unit" },
  ];

  const falseCommentData = [
    { id: 1, value: "LV memiliki izin memasuki area tambang" },
    { id: 2, value: "HD menjaga jarak aman iring (40m)" },
    { id: 3, value: "Sistem salah mendeteksi manusia" },
  ];

  const trueCommentArray = trueCommentData.map((comment) => {
    return (
      <div key={comment.id} className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={comment.value}
          id={"true" + comment.id}
          onClick={() => {
            validationCommentData.includes(comment.value)
              ? setValidationCommentData((data) =>
                  data.filter((data) => data !== comment.value)
                )
              : setValidationCommentData((data) => [...data, comment.value]);
          }}
        />
        <label className="form-check-label" for={"true" + comment.id}>
          {comment.value}
        </label>
      </div>
    );
  });

  const falseCommentArray = falseCommentData.map((comment) => {
    return (
      <div key={comment.id} className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={comment.value}
          id={"false" + comment.id}
          onClick={() => {
            validationCommentData.includes(comment.value)
              ? setValidationCommentData((data) =>
                  data.filter((data) => data !== comment.value)
                )
              : setValidationCommentData((data) => [...data, comment.value]);
          }}
        />
        <label className="form-check-label" for={"false" + comment.id}>
          {comment.value}
        </label>
      </div>
    );
  });

  return (
    <div className="validation">
      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="button-true border-0 rounded-2 px-3 py-1"
          data-bs-toggle="modal"
          data-bs-target="#validationModal"
          onClick={() => setValidationStatus(true)}
        >
          Valid
        </button>
        <button
          type="button"
          className="button-false rounded-2 px-3 py-1"
          data-bs-toggle="modal"
          data-bs-target="#validationModal"
          onClick={() => setValidationStatus(false)}
        >
          Tidak Valid
        </button>
      </div>
      <div
        className="modal fade"
        id="validationModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="validationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="validationModalLabel">
                Deskripsi Validasi
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setValidationStatus();
                  setOperatorName("");
                  setValidationCommentData([]);
                  setTextareaStatus(true);
                  setTextareaValue("");
                }}
              ></button>
            </div>
            <div className="modal-body d-grid gap-2">
              <input
                className="form-control mb-4"
                type="text"
                value={operatorName}
                placeholder="Tulis nama operator yang terdeteksi (opsional)"
                onChange={(e) => {
                  setOperatorName(e.target.value);
                }}
              />
              {validationStatus === true
                ? trueCommentArray
                : validationStatus === false
                ? falseCommentArray
                : ""}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onClick={() => {
                    setValidationCommentData((data) =>
                      data.filter((data) => data !== textareaValue)
                    );
                    setTextareaStatus(!textareaStatus);
                    setTextareaValue("");
                  }}
                  checked={!textareaStatus}
                />
                <textarea
                  className="form-control w-100"
                  rows={4}
                  value={textareaValue}
                  placeholder={
                    textareaStatus === true && textareaValue.length < 1
                      ? "Centang untuk mengaktifkan deskripsi manual (opsional)"
                      : "Tulis deskripsi"
                  }
                  disabled={textareaStatus}
                  onChange={(e) => {
                    setTextareaValue(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <div className="row w-100 align-items-center">
                <div className="col px-0">
                  <label>
                    {validationCommentData.length < 1 &&
                    textareaValue.length < 1
                      ? "*pilih dan/atau deskripsikan manual"
                      : ""}
                  </label>
                </div>
                <div className="col d-flex justify-content-end gap-2 px-0">
                  <button
                    type="button"
                    className="cancel-button rounded-2 px-3 py-1"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setValidationStatus();
                      setOperatorName("");
                      setValidationCommentData([]);
                      setTextareaStatus(true);
                      setTextareaValue("");
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    className={
                      "submit-button border-0 rounded-2 px-3 py-1" +
                      (validationCommentData.length < 1 &&
                      textareaValue.length < 1
                        ? " disabled"
                        : "")
                    }
                    data-bs-dismiss="modal"
                    onClick={() => {
                      submitHandler();
                      setTimeout(() => {
                        setValidationStatus();
                        setOperatorName("");
                        setValidationCommentData([]);
                        setTextareaStatus(true);
                        setTextareaValue("");
                        setSubmitData(submitData === false ? true : false);
                      }, 2000);
                      setCurrentNotificationData([
                        {
                          cctv_id: currentNotificationData[0].cctv_id,
                          comment:
                            (operatorName !== ""
                              ? "Operator terdeteksi: " + operatorName + ". "
                              : "") +
                            validationCommentData.join(", ") +
                            (validationCommentData.length > 0 ? ", " : "") +
                            (textareaValue.length > 0 ? textareaValue : ""),
                          created_at: currentNotificationData[0].created_at,
                          id: currentNotificationData[0].id,
                          image: currentNotificationData[0].image,
                          ip: currentNotificationData[0].ip,
                          location: currentNotificationData[0].location,
                          name: currentNotificationData[0].name,
                          path: currentNotificationData[0].path,
                          realtime_images_id:
                            currentNotificationData[0].realtime_images_id,
                          type_object: currentNotificationData[0].type_object,
                          type_validation: validationStatus.toString(),
                          updated_at: new Date(),
                          user_id: localStorage.getItem("id"),
                          user_name: localStorage.getItem("name"),
                          username: localStorage.getItem("username"),
                          violate_count:
                            currentNotificationData[0].violate_count,
                        },
                      ]);
                    }}
                  >
                    Validasi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Validation;
