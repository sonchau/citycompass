import { createStore, applyMiddleware, compose } from "redux";
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from "../reducers";
import thunk from "redux-thunk";

const configureStore = () => {

  const enhancers = compose(
    applyMiddleware(thunk),
    devToolsEnhancer({})
  );

  const store = createStore(rootReducer, {}, enhancers);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};
export default configureStore;
