import "./App.css";
import Main from "./pages/Main";
import Login from "./pages/Login";
import { BrowserRouter as Router, Switch, Route, HashRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Main} />
          <Route path="/live-monitoring" component={Main} />
          <Route path="/validasi-deviasi" component={Main} />
          <Route path="/data-tervalidasi" component={Main} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
