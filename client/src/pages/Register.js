import "../styles/register.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const enterKeyHandle = () => {};

  const handleLogin = () => {
    if (name === "" || username === "" || password === "") {
      setLoginMessage("nama, username, dan password tidak boleh kosong");
    } else {
      axios
        .post(process.env.REACT_APP_API + "login", {
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
      if (window.location.href.includes("login")) {
        window.location.href = "/login";
      }
      window.location.reload();
    } else if (loginStatus === "failed") {
      window.location.href = "/register/#";
      if (loginStatus.toLocaleLowerCase() === "username salah") {
        setLoginMessage("username salah");
      } else if (loginStatus.toLocaleLowerCase() === "password salah") {
        setLoginMessage("password salah");
      }
    }
  }, [loginStatus]);

  return (
    <div className="register d-flex justify-content-center align-items-center">
      <div className="form-container rounded-4">
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
                  e.key === "Enter" ? handleLogin() : enterKeyHandle();
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
              onClick={handleLogin}
            >
              Submit
            </button>
          </div>
          <label className="login-message mt-2">
            {loginMessage !== "" ? "*" + loginMessage : ""}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Register;
