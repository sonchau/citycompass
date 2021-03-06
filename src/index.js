import React from "react";
import ReactDOM from "react-dom";
import "./utils/object_extensions.exec.js";
import * as serviceWorker from "./serviceWorker";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import RootComponent from "./containers/Root";
import "antd/dist/antd.css";

const defaultClientName = "casey";

ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Switch>
          {/* <Route exact path="/" component={IndexPage} /> */}
          {/* TODO: later we can have an indexPage where other cities are listed for now lets redirect to casey */}
          <Route
            exact
            path="/"
            render={() => <Redirect to={`/${defaultClientName}/`}></Redirect>}
          ></Route>
          <Route
            path={`/:clientName/`}
            component={({
              match: {
                params: { clientName },
              },
            }) => <RootComponent clientName={clientName} />}
          />
        </Switch>
      </HashRouter>
    </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
