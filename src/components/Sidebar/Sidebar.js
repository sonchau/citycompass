import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ routes }) => {
  return (
    <div>
      <ul>
        {routes.map((prop, key) => {
          if (prop.redirect) return null;
          if (prop.heading)
            return (
              <React.Fragment>
                <h3>{prop.headingText}</h3>

                {prop.routes.map((route, key) => {
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
