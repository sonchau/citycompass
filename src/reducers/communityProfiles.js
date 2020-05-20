import { GET_COMMUNITY_PROFILES } from "../constants/actionTypes";

export default function communityProfiles(state = {}, action) {
  switch (action.type) {
    case GET_COMMUNITY_PROFILES:
      return state;
    default:
      return state;
  }
}
