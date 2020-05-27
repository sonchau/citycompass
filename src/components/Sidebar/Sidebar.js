import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Styled Component
import StyledDropdown from "../../styled/Sidebar/StyledDropdown";
import StyledDropdownButton from "../../styled/Sidebar/StyledDropdownButton";
import StyledSideNav from "../../styled/Sidebar/StyledSideNav";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ routes }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <React.Fragment>
      
    </React.Fragment>
  );
};

export default Sidebar;

const buildNav = (navSchema) => {
  return <div key={navSchema["a_level"]}>{navSchema["a_title"]}</div>
}

// {routes.map((prop, key) => {
//   if (prop.redirect) return null;
//   if (prop.category)
//     return (
//       <React.Fragment>
//         <StyledSideNav padding="2.5rem 0rem 1rem 0rem" fontWeight="600">
//           {prop.categoryText}
//         </StyledSideNav>

//         {prop.routes.map((route, key) => {
//           if (route.nestedRoutes) {
//             return (
//               <div style={{ position: "relative" }}>
//                 <StyledDropdownButton
//                   onMouseOver={() => setDropdownOpen(true)}
//                   onMouseLeave={() => setDropdownOpen(false)}
//                 >
//                   <span>{route.name} </span>
//                   <span>
//                     <FontAwesomeIcon
//                       icon={dropdownOpen ? faChevronDown : faChevronRight}
//                     />
//                   </span>
//                 </StyledDropdownButton>

//                 <StyledDropdown
//                   display={dropdownOpen}
//                   onMouseOver={() => setDropdownOpen(true)}
//                   onMouseLeave={() => setDropdownOpen(false)}
//                 >
//                   {route.nestedRoutes.map((nestedRoute, key) => {
//                     return (
//                       <NavLink
//                         to={nestedRoute.path}
//                         activeClassName="selected"
//                       >
//                         <StyledSideNav
//                           padding="0.5rem 0rem"
//                           fontWeight="100"
//                         >
//                           {nestedRoute.name}
//                         </StyledSideNav>
//                       </NavLink>
//                     );
//                   })}
//                 </StyledDropdown>
//               </div>
//             );
//           }

//           /* Nav inside Category*/
//           return (
//             <NavLink to={route.path} activeClassName="selected">
//               <StyledSideNav padding="0.5rem 0rem" fontWeight="100">
//                 {route.name}
//               </StyledSideNav>
//             </NavLink>
//           );
//         })}
//       </React.Fragment>
//     );
//   return (
//     /* Home and Population Highlights Nav*/
//     <NavLink to={prop.path} activeClassName="selected">
//       <StyledSideNav padding="0.5rem 0rem" fontWeight="600">
//         {prop.name}
//       </StyledSideNav>
//     </NavLink>
//   );
// })}