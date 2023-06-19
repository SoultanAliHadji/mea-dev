import "../styles/register.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const enterKeyHandle = () => {};

  const handleRegister = () => {
    if (name === "" || username === "" || password === "") {
      setRegisterMessage("nama, username, dan password tidak boleh kosong");
    } else {
      axios
        .post(
          process.env.REACT_APP_API + "sign-up",
          {
            name: name,
            username: username,
            password: password,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setRegisterStatus(res.data.meta.status);
        })
        .catch((err) => {
          setRegisterStatus("failed");
          setRegisterMessage("nama dan username sudah terdaftar");
        });
    }
  };

  useEffect(() => {
    if (registerStatus === "success") {
      if (window.location.href.includes("register")) {
        window.location.href = "/login";
      } else {
        window.location.reload();
      }
    } else if (registerStatus === "failed") {
      window.location.href = "/register/#";
    }
  }, [registerStatus]);

  return (
    <div className="register d-flex justify-content-center align-items-center">
      <div className="form-container rounded-4 d-flex justify-content-center align-items-center">
        <div className="px-5 py-4">
          <img className="mb-5" src={require("../assets/logo.png")} alt="" />
          <h3>Register</h3>
          <p>
            Silahkan isi beberapa detail di bawah ini untuk registrasi akun
            baru.
          </p>
          <form className="my-4 d-grid gap-2">
            <div className="d-grid gap-1">
              <label>Nama User</label>
              <input
                type="text"
                className="form-control"
                placeholder="Masukkan Nama User"
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  e.key === "Enter" ? handleRegister() : enterKeyHandle();
                }}
              />
            </div>
            <div className="d-grid gap-1">
              <label>Username/ SID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Masukkan Username atau SID"
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  e.key === "Enter" ? handleRegister() : enterKeyHandle();
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
                    e.key === "Enter" ? handleRegister() : enterKeyHandle();
                  }}
                />
                <Icon
                  className="password-visibility"
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
              onClick={handleRegister}
            >
              Daftar
            </button>
          </div>
          <label className="register-message mt-2">
            {registerMessage !== "" ? "*" + registerMessage : ""}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Register;
