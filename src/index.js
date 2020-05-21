import React from "react";
import ReactDOM from "react-dom";
import Root from "./containers/Root";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import indexRoutes from "./routes/index";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route path={prop.path} key={key} component={prop.component} />
          );
        })}
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
