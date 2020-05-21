import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import StyledDropdown from "../../styled/StyledDropdown";

const Sidebar = ({ routes }) => {
  const [dropdownCls, setDropdownCls] = useState(false);

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
                      <button onClick={() => setDropdownCls(!dropdownCls)}>
                        {route.name}
                      </button>

                      <StyledDropdown display={dropdownCls}>
                        {route.nestedRoutes.map((nestedRoute, key) => {
                          return (
                            <NavLink to={nestedRoute.path}>
                              <p>{nestedRoute.name}</p>
                            </NavLink>
                          );
                        })}
                      </StyledDropdown>
                    </React.Fragment>
                  );
                }
                return (
                  <NavLink to={route.path}>
                    <p>{route.name}</p>
                  </NavLink>
                );
              })}
            </React.Fragment>
          );
        return (
          <NavLink to={prop.path}>
            <p>{prop.name}</p>
          </NavLink>
        );
      })}
    </React.Fragment>
  );
};

export default Sidebar;
