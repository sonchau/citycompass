import { combineReducers } from "redux";
import isThemeLight from "./isThemeLight";
import data from "./data";
import pageDirectory from "./pageDirectory";

export default combineReducers({ isThemeLight, pageDirectory });
