import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ScrollChecker, Header } from "components";

import Home from "pages/Home";
import Month from "pages/Month";

const App = () => {
  return (
    <div style={{ width: 860, margin: "auto" }}>
      <Router>
        <Header />
        <Route component={ScrollChecker} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:year/:month" exact component={Month} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
