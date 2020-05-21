import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import StyledSidebarDropdown from "../../styled/Sidebar/StyledSidebarDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ routes }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <React.Fragment>
      {routes.map((prop, key) => {
        if (prop.redirect) return null;
        if (prop.category)
          return (
            <React.Fragment>
              <h3>{prop.categoryText}</h3>

              {prop.routes.map((route, key) => {
                if (route.nestedRoutes) {
                  return (
                    <React.Fragment>
                      <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                        {route.name} <FontAwesomeIcon icon={faCaretDown} />
                      </button>

                      <StyledSidebarDropdown display={dropdownOpen}>
                        {route.nestedRoutes.map((nestedRoute, key) => {
                          return (
                            <NavLink
                              to={nestedRoute.path}
                              activeClassName="selected"
                            >
                              <p>{nestedRoute.name}</p>
                            </NavLink>
                          );
                        })}
                      </StyledSidebarDropdown>
                    </React.Fragment>
                  );
                }
                return (
                  <NavLink to={route.path} activeClassName="selected">
                    <p>{route.name}</p>
                  </NavLink>
                );
              })}
            </React.Fragment>
          );
        return (
          <NavLink to={prop.path} activeClassName="selected">
            <p>{prop.name}</p>
          </NavLink>
        );
      })}
    </React.Fragment>
  );
};

export default Sidebar;
