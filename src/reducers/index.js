import { combineReducers } from "redux";
import isThemeLight from "./isThemeLight";
import data from "./data";
import routes from "./routes";

export default combineReducers({ isThemeLight, routes });
