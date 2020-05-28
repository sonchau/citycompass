import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
const Sidebar = (props) => {
  return (
    <React.Fragment>
      {props.routes.map((a) => (
        <React.Fragment key={a["a_level"]}>
          <h2 style={{ padding: "2rem 1.6rem 0rem 3.6rem" }}>
            {" "}
            {a["a_title"]}
          </h2>
          {a.b.map((b) => (
            <ul className="mainMenu">
              <li>
                {!b.c.length ? (
                  <NavLink to={b["page_code"]} activeClassName="selected">
                    {b["b_title"]}
                  </NavLink>
                ) : (
                  <React.Fragment>
                    <NavLink to={b["page_code"]}>
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{b["b_title"]} </span>
                        <span>
                          <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                      </span>
                    </NavLink>{" "}
                  </React.Fragment>
                )}

                <ul>
                  {b.c.map((c) => (
                    <li>
                      {!c.d.length ? (
                        <NavLink to={c["page_code"]}>{c["c_title"]}</NavLink>
                      ) : (
                        // <NavLink to={c["page_code"]}>
                        //   <h3>{c["c_title"]}</h3>
                        // </NavLink>

                        <h3 style={{ padding: "2rem 1.6rem 0rem 3.6rem" }}>
                          {c["c_title"]}
                        </h3>
                      )}

                      {c.d.map((d) => (
                        <li>
                          <NavLink
                            to={d["page_code"]}
                            activeClassName="selected"
                          >
                            {d["d_title"]}
                          </NavLink>
                        </li>
                      ))}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          ))}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  // state.routes.map((r) => console.log("r", r));
  return {
    routes: state.routes,
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
