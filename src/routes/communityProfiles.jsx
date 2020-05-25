import CommunityProfiles from "../views/CommunityProfiles";
import PopulationHightLights from "../views/PopulationHightLights";
import PopulationSummary from "../views/AreaProfiles/population/PopulationSummary";
import PopulationEstimates from "../views/AreaProfiles/population/PopulationEstimates";
import AreaProfiles from "../views/AreaProfiles/AreaProfiles";

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
    category: true,
    categoryText: "Area Profiles",

    routes: [
      {
        path: "/area-profiles",
        name: "About the Profile Areas",
        component: AreaProfiles,
      },
      {
        name: "Population",
        nestedRoutes: [
          {
            path: "/population-summary",
            name: "Population Summary",
            component: PopulationSummary,
          },
          {
            path: "/population-estimates",
            name: "Population Estimates",
            component: PopulationEstimates,
          },
        ],
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
