import { combineReducers } from "redux";
import isThemeLight from "./isThemeLight";
import pageDirectory from "./pageDirectory";

export default combineReducers({ isThemeLight, pageDirectory });
