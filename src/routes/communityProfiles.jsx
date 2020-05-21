import CommunityProfiles from "../views/CommunityProfiles";
import PopulationHightLights from "../views/PopulationHightLights";

var communityProfileRoutes = [
  {
    path: "/community-profiles",
    name: "Home",
    component: CommunityProfiles,
  },
  {
    path: "/population-highlights",
    name: "Population Highlights",
    component: PopulationHightLights,
  },

  {
    redirect: true,
    path: "/",
    pathTo: "/community-profiles",
    name: "Community Profiles",
  },
];
export default communityProfileRoutes;
