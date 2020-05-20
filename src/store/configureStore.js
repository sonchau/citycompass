import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import api from "../middleware/api";

const configureStore = () => {
  const store = createStore(rootReducer, {}, applyMiddleware(api));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};
export default configureStore;
