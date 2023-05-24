import "../styles/validation.css";
import { useState } from "react";
import axios from "axios";

const Validation = ({
  getToken,
  currentDeviationId,
  submitData,
  setSubmitData,
}) => {
  const [validationStatus, setValidationStatus] = useState();
  const [validationCommentData, setValidationCommentData] = useState([]);
  const [textareaStatus, setTextareaStatus] = useState(true);
  const [textareaValue, setTextareaValue] = useState("");

  const handleSubmit = () => {
    axios({
      method: "put",
      url: "http://10.10.10.66:5002/api/" + "deviation/" + currentDeviationId,
      data: {
        type_validation: validationStatus,
        comment:
          validationCommentData.join(", ") +
          (validationCommentData.length > 0 ? ", " : "") +
          (textareaValue.length > 0 ? textareaValue : ""),
        user_id: localStorage.getItem("id"),
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getToken,
      },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const trueCommentData = [
    {
      id: 1,
      value:
        "Unit hauling road jarak kurang dari 50 meter terhadap unit di depannya.",
    },
    { id: 2, value: "Double trailer, jarak aman unit kurang dari 180 meter" },
    { id: 3, value: "Jarak aman di area pit kurang dari 40 meter" },
    { id: 4, value: "Pekerja/Orang berada di luar unit area pertambangan" },
  ];

  const falseCommentData = [{ id: 1, value: "Deviasi tidak benar" }];

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
              <h1 className="modal-title fs-5" id="validationModalLabel">
                Deskripsi Deviasi
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setValidationStatus();
                  setValidationCommentData([]);
                  setTextareaStatus(true);
                  setTextareaValue("");
                }}
              ></button>
            </div>
            <div className="modal-body d-grid gap-2">
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
                  className="w-100"
                  rows={4}
                  value={textareaValue}
                  placeholder={
                    textareaStatus === true && textareaValue.length < 1
                      ? "Centang checkbox di samping untuk mengaktifkan (opsional))"
                      : "Tulis detail komentar"
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
                      ? "*pilih salah satu opsi atau isi manual"
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
                      handleSubmit();
                      setTimeout(() => {
                        setValidationStatus();
                        setValidationCommentData([]);
                        setTextareaStatus(true);
                        setTextareaValue("");
                        setSubmitData(submitData === false ? true : false);
                      }, 2000);
                    }}
                  >
                    Save changes
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
