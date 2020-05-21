// import Dashboard from "views/Dashboard/Dashboard.jsx";
// import Notifications from "views/Notifications/Notifications.jsx";
// import Icons from "views/Icons/Icons.jsx";
// import Typography from "views/Typography/Typography.jsx";
// import TableList from "views/TableList/TableList.jsx";
// import Maps from "views/Maps/Maps.jsx";
// import UserPage from "views/UserPage/UserPage.jsx";
import CommunityProfiles from "../views/CommunityProfiles";
import Page1 from "../views/Page1";

var communityProfileRoutes = [
  {
    path: "/communityprofiles",
    name: "Community Profiles",
    component: CommunityProfiles,
  },
  {
    path: "/page1",
    name: "page 1",
    component: Page1,
  },

  {
    redirect: true,
    path: "/",
    pathTo: "/communityprofiles",
    name: "Community Profiles",
  },
];
export default communityProfileRoutes;
