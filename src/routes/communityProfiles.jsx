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
    heading: true,
    headingText: "Area Profiles",

    routes: [
      {
        path: "/test1",
        name: "About the Profile Areas",
        component: PopulationHightLights,
      },
      {
        path: "/test2",
        name: "Population",
        component: PopulationHightLights,
      },
      {
        path: "/test3",
        name: "How old are we?",
        component: PopulationHightLights,
      },
    ],
  },
  {
    redirect: true,
    path: "/",
    pathTo: "/community-profiles",
    name: "Community Profiles",
  },
];
export default communityProfileRoutes;
