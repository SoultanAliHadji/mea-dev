import "./App.css";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={localStorage.getItem("token") !== null ? Main : Login}
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route
            path="/live-monitoring"
            component={localStorage.getItem("token") !== null ? Main : Login}
          />
          <Route
            path="/validasi-deviasi"
            component={localStorage.getItem("token") !== null ? Main : Login}
          />
          <Route
            path="/data-tervalidasi"
            component={localStorage.getItem("token") !== null ? Main : Login}
          />
          <Route path="/404" component={NotFound} />
          <Redirect from="*" to="/404" />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
