import React from "react";
import ReactDOM from "react-dom";
import Root from "./containers/Root";
import IndexPage from "./containers/IndexPage";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import indexRoutes from "./routes/index";
import { Provider } from "react-redux";
import store from "./store";
import "./utils/object_extensions.exec.js";

import { PAGE_DIRECTORY_QUERY } from "./sqlQueries";
import { getData } from "./utils/common";
import RootComponent from "./containers/Root";
const [, client, page] = window.location.pathname.split("/");
const clientName = client === "" ? "casey" : client;

getData(PAGE_DIRECTORY_QUERY)
  .then((response) => {
    console.log("response from main", response.data);
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={IndexPage} />
              {response.data.rows.map((prop, key) => {
                const path = `/${clientName}/${prop.page_code}`;
                console.log("path", path);
                return (
                  <Route
                    path={path}
                    key={key}
                    component={() => (
                      <RootComponent pageDirectory={response.data} />
                    )}
                  />
                );
              })}
            </Switch>
          </BrowserRouter>
        </Provider>
      </React.StrictMode>,
      document.getElementById("root")
    );
  })
  .catch(
    ReactDOM.render(
      <p>404 - Page not found</p>,
      document.getElementById("root")
    )
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
