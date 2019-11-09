import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "pages/Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/post/:name"
          render={({ match }) => (
            <div>
              <p>
                {match.params.name}
                <br />
                <strong>Go back and check scroll restoration</strong>
              </p>
            </div>
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
