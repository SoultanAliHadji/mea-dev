import "../styles/login.css";

const Login = () => {
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
                />
              </div>
              <div className="d-grid gap-1">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Masukkan Password"
                />
              </div>
            </form>
            <a className="d-grid" href="/live-monitoring">
              <button className="border-0 rounded-2 px-3 py-2">Masuk</button>
            </a>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center">
            <div
              id="carouselExampleDark"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to="0"
                  class="active"
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
              <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="3000">
                  <img
                    src={require("../assets/login-slider-png/slider_live_monitoring.png")}
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item" data-bs-interval="3000">
                  <img
                    src={require("../assets/login-slider-png/slider_validasi_deviasi.png")}
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item" data-bs-interval="3000">
                  <img
                    src={require("../assets/login-slider-png/slider_data_tervalidasi.png")}
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
