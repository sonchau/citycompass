import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ routes }) => {
  return (
    <div>
      <ul>
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
                        <li key={key}>
                          <NavLink to={route.path}>
                            <p>{route.name}</p>
                          </NavLink>
                        </li>
                        <ul>
                          {route.nestedRoutes.map((nestedRoute, key) => {
                            return (
                              <li key={key}>
                                <NavLink to={nestedRoute.path}>
                                  <p>{nestedRoute.name}</p>
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      </React.Fragment>
                    );
                  }
                  return (
                    <li key={key}>
                      <NavLink to={route.path}>
                        <p>{route.name}</p>
                      </NavLink>
                    </li>
                  );
                })}
              </React.Fragment>
            );
          return (
            <li key={key}>
              <NavLink to={prop.path}>
                <p>{prop.name}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
