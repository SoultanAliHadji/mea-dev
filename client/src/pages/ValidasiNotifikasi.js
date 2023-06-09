import "../styles/validasi_notifikasi.scss";
import Validation from "../components/Validation";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import ReactImageMagnify from "react-magnify-image";

const ValidasiNotifikasi = ({
  notificationData,
  currentNotificationData,
  setCurrentNotificationData,
  submitData,
  setSubmitData,
}) => {
  const [currentDeviationImageBlob, setCurrentDeviationImageBlob] = useState();
  const [currentDeviationImageLoading, setCurrentDeviationImageLoading] =
    useState(false);

  useEffect(() => {
    if (currentNotificationData.length !== 0) {
      setCurrentDeviationImageLoading(true);
      axios
        .get(
          process.env.REACT_APP_API +
            currentNotificationData[0].path +
            currentNotificationData[0].image,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          let blob = new Blob([res.data], {
            type: res.headers["content-type"],
          });
          var reader = new window.FileReader();
          reader.readAsDataURL(blob);
          reader.onload = function () {
            var imageDataUrl = reader.result;
            setCurrentDeviationImageBlob(imageDataUrl);
          };
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setCurrentDeviationImageLoading(false);
        });
    }
  }, [currentNotificationData]);

  const notificationControllerArray = notificationData.map((notification, index) => {
    if (currentNotificationData[0]?.id === notification.id) {
      return (
        <div className="d-grid gap-2">
          <button
            className={"border-0" + (index === 0 ? " disabled" : "")}
            onClick={() => {
              index !== 0
                ? setCurrentNotificationData([notificationData[index - 1]])
                : setCurrentNotificationData([notificationData[index]]);
            }}
          >
            <Icon className="icon" icon="akar-icons:chevron-up" />
          </button>
          <button
            className={
              "border-0" +
              (index === notificationData.length - 1 ? " disabled" : "")
            }
            onClick={() => {
              index !== notificationData.length - 1
                ? setCurrentNotificationData([notificationData[index + 1]])
                : setCurrentNotificationData([notificationData[index]]);
            }}
          >
            <Icon className="icon" icon="akar-icons:chevron-down" />
          </button>
        </div>
      );
    }
  });

  const currentNotificationArray = currentNotificationData.map((notification) => {
    return (
      <div key={notification.id} className="notification-data">
        <div className="row align-items-center">
          <div className="col">
            <label
              className={
                "px-3 my-1 rounded-2" +
                (notification.type_validation === "true"
                  ? " status-true"
                  : notification.type_validation === "false"
                  ? " status-false"
                  : " status-none")
              }
            >
              {notification.type_validation === "not_yet"
                ? "Belum Divalidasi"
                : notification.type_validation === "true"
                ? "Valid"
                : "Tidak Valid"}
            </label>
          </div>
          <div className="col">
            <Validation
              currentNotificationData={currentNotificationData}
              setCurrentNotificationData={setCurrentNotificationData}
              submitData={submitData}
              setSubmitData={setSubmitData}
            />
          </div>
        </div>
        <div className="my-3">
          <h6>Terdeteksi Deviasi {notification.type_object}</h6>
        </div>
        <div className="row">
          <div className="col-4 d-grid gap-2">
            <div className="d-flex gap-2">
              <Icon className="icon" icon="mdi:cctv" />
              <label>{notification.name + " - " + notification.location}</label>
            </div>
            <div className="d-flex gap-2">
              <Icon className="icon" icon="akar-icons:clock" />
              <label>{notification.created_at}</label>
            </div>
          </div>
          {notification.type_validation !== "not_yet" ? (
            <div className="col-4 d-grid gap-2">
              <div className="d-flex gap-2">
                <Icon className="icon" icon="fa6-solid:helmet-safety" />
                <label>{notification.user_name}</label>
              </div>
              <div className="d-flex gap-2">
                <Icon className="icon" icon="codicon:note" />
                <label>
                  {notification.comment.substring(0, 35) +
                    (notification.comment.length > 36 ? "..." : "")}
                </label>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  });

  return (
    <div className="validasi-notifikasi">
      <div className="title mb-3">
        <h6>Validasi Notifikasi</h6>
        <label>Validasi notifikasi deviasi yang terdeteksi</label>
      </div>
      <div className="content">
        <div>
          {currentNotificationData.length !== 0 ? (
            <div>
              {currentDeviationImageLoading === false ? (
                <div className="row w-100 m-0 p-0">
                  <div className="col-1 m-0 p-0"></div>
                  <div className="col m-0 p-0">
                    <div className="d-flex justify-content-center">
                      <ReactImageMagnify
                        className="deviation-img rounded-2"
                        {...{
                          smallImage: {
                            alt: "",
                            isFluidWidth: true,
                            src: currentDeviationImageBlob,
                          },
                          largeImage: {
                            src: currentDeviationImageBlob,
                            width: 2000,
                            height: 1100,
                          },
                          enlargedImagePosition: "over",
                        }}
                      />
                    </div>
                  </div>
                  <div className="notification-navigation col-1 m-0 p-0">
                    <div className="h-100 d-flex align-items-center">
                      {notificationControllerArray}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              <div className="mt-3">{currentNotificationArray}</div>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <label className="not-yet-notification">
                Pilih notifikasi deviasi pada List Notifikasi
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidasiNotifikasi;
