import "../styles/not_found.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="d-grid gap-5">
          <div className="d-flex justify-content-center">
            <img src={require("../assets/error.png")} alt="" />
          </div>
          <h1>Halaman tidak tersedia!</h1>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
