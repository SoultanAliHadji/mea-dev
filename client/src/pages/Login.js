import "../styles/login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const enterKeyHandle = () => {};

  const handleLogin = () => {
    if (username === "" || password === "") {
      setLoginMessage("username atau password tidak boleh kosong");
    } else {
      axios
        .post("http://10.10.10.66:5002/api/" + "login", {
          username: username,
          password: password,
        })
        .then((res) => {
          setLoginStatus(res.data.meta.status);
          console.log(res.data.data);
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("role", res.data.data.role);
          localStorage.setItem("id", res.data.data.id);
          localStorage.setItem("name", res.data.data.name);
          localStorage.setItem("username", res.data.data.username);
        })
        .catch((err) => {
          setLoginStatus(err.response.data.data.errors);
        });
    }
  };

  useEffect(() => {
    if (loginStatus === "success") {
      if (window.location.hash.includes("login")) {
        window.location.href = "/mea-dev/#/live-monitoring";
      }
      window.location.reload();
    } else if (loginStatus === "failed") {
      window.location.href = "/mea-dev/#/login/#";
      if (loginStatus.toLocaleLowerCase() === "username salah") {
        setLoginMessage("username salah");
      } else if (loginStatus.toLocaleLowerCase() === "password salah") {
        setLoginMessage("password salah");
      }
    }
  }, [loginStatus]);

  return (
    <div className="login d-flex justify-content-center align-items-center">
      <div className="form-container rounded-4">
        <div className="row">
          <div className="col px-5 py-4">
            <img className="mb-5" src={require("../assets/logo.png")} alt="" />
            <h3>Log in</h3>
            <p>
              Selamat Datang kembali! Silahkan isi beberapa detail di bawah ini.
            </p>
            <form className="my-4 d-grid gap-2">
              <div className="d-grid gap-1">
                <label>Username/ SID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Username atau SID"
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => {
                    e.key === "Enter" ? handleLogin() : enterKeyHandle();
                  }}
                />
              </div>
              <div className="d-grid gap-1">
                <label>Password</label>
                <div className="d-flex align-items-center">
                  <input
                    type={passwordVisibility === false ? "password" : "text"}
                    className="form-control"
                    placeholder="Masukkan Password"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      e.key === "Enter" ? handleLogin() : enterKeyHandle();
                    }}
                  />
                  <Icon
                    className="password-visibility fs-5"
                    icon={
                      passwordVisibility === false
                        ? "clarity:eye-line"
                        : "clarity:eye-hide-line"
                    }
                    onClick={() => {
                      setPasswordVisibility(!passwordVisibility);
                    }}
                  />
                </div>
              </div>
            </form>
            <div className="d-grid">
              <button
                className="border-0 rounded-2 px-3 py-2"
                onClick={handleLogin}
              >
                Masuk
              </button>
            </div>
            <label className="login-message mt-2">
              {loginMessage !== "" ? "*" + loginMessage : ""}
            </label>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center">
            <div
              id="carouselExampleDark"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="3000">
                  <img
                    src={require("../assets/login-slider-png/slider_live_monitoring.png")}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item" data-bs-interval="3000">
                  <img
                    src={require("../assets/login-slider-png/slider_validasi_deviasi.png")}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item" data-bs-interval="3000">
                  <img
                    src={require("../assets/login-slider-png/slider_data_tervalidasi.png")}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
