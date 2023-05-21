import "./App.css";
import Main from "./pages/Main";
import Login from "./pages/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Main} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
