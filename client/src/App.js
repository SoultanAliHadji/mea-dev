import "./App.css";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              localStorage.getItem("token") !== null ? <Main /> : <Login />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/live-monitoring"
            element={
              localStorage.getItem("token") !== null ? <Main /> : <Login />
            }
          />
          <Route
            path="/validasi-deviasi"
            element={
              localStorage.getItem("token") !== null ? <Main /> : <Login />
            }
          />
          <Route
            path="/data-tervalidasi"
            element={
              localStorage.getItem("token") !== null ? <Main /> : <Login />
            }
          />
          <Route path="/" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
