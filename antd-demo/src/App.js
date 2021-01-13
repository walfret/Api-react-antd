import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/home";
import Updata from "./components/updata";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/resultado" component={Updata} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
