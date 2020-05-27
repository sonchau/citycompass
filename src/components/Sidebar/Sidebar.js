import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <div>
      {props.pageDirectory.map((a) => (
        <div key={a["a_level"]}>
          <h3> {a["a_title"]}</h3>
          {a.b.map((b) => (
            <div>
              <h4>
                <NavLink to={b["page_code"]}>{b["b_title"]}</NavLink>
              </h4>
              {b.c.map((c) => (
                <React.Fragment>
                  <h5>
                    <NavLink to={c["page_code"]}>{c["c_title"]}</NavLink>
                  </h5>
                  {c.d.map((d) => (
                    <h6>
                      <NavLink to={d["page_code"]}>{d["d_title"]}</NavLink>
                    </h6>
                  ))}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  // state.routes.map((r) => console.log("r", r));
  return {
    pageDirectory: state.pageDirectory,
  };
};
export default connect(mapStateToProps, null)(Sidebar);

const buildNav = (navSchema) => {
  return <div key={navSchema["a_level"]}>{navSchema["a_title"]}</div>;
};

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
