import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import StyledSidebarDropdown from "../../styled/Sidebar/StyledSidebarDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ routes }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <React.Fragment>
      {routes.map((prop, key) => {
        if (prop.redirect) return null;
        if (prop.category)
          return (
            <React.Fragment>
              <p
                style={{
                  fontWeight: 600,
                  padding: "3rem 0rem 1rem 0rem",
                  borderBottom: "1px solid gray",
                  fontSize: "1.7rem",
                }}
              >
                {prop.categoryText}
              </p>

              {prop.routes.map((route, key) => {
                if (route.nestedRoutes) {
                  return (
                    <React.Fragment>
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        style={{ width: "100%" }}
                      >
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            borderBottom: "1px solid gray",
                            padding: "0.5rem 1rem 0.5rem 0rem",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "1.7rem",
                            }}
                          >
                            {route.name}{" "}
                          </span>
                          <span>
                            <FontAwesomeIcon
                              icon={
                                dropdownOpen ? faChevronDown : faChevronRight
                              }
                            />
                          </span>
                        </span>
                      </button>

                      <StyledSidebarDropdown display={dropdownOpen}>
                        {route.nestedRoutes.map((nestedRoute, key) => {
                          return (
                            <NavLink
                              to={nestedRoute.path}
                              activeClassName="selected"
                            >
                              <p
                                style={{
                                  fontSize: "1.7rem",
                                  borderBottom: "1px solid gray",
                                  padding: "0.5rem 0rem",
                                }}
                              >
                                {nestedRoute.name}
                              </p>
                            </NavLink>
                          );
                        })}
                      </StyledSidebarDropdown>
                    </React.Fragment>
                  );
                }
                return (
                  <NavLink to={route.path} activeClassName="selected">
                    <p
                      style={{
                        fontSize: "1.7rem",
                        borderBottom: "1px solid gray",
                        padding: "0.5rem 0rem",
                      }}
                    >
                      {route.name}
                    </p>
                  </NavLink>
                );
              })}
            </React.Fragment>
          );
        return (
          <NavLink to={prop.path} activeClassName="selected">
            <p
              style={{
                fontWeight: 600,
                padding: "0.5rem 0rem",
                borderBottom: "1px solid gray",
                fontSize: "1.7rem",
              }}
            >
              {prop.name}
            </p>
          </NavLink>
        );
      })}
    </React.Fragment>
  );
};

export default Sidebar;
