import { combineReducers } from "redux";
import communityProfiles from "./communityProfiles";
import selectedProfile from "./selectedProfile";
export default combineReducers({
  communityProfiles,
  selectedProfile,
});
