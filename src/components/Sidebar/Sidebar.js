import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ routes }) => {
  return (
    <div>
      <ul>
        {routes.map((prop, key) => {
          if (prop.redirect) return null;
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
