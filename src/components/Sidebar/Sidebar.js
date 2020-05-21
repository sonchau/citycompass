import React from "react";
import communityProfileRoutes from "../../routes/communityProfiles";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <ul>
        {communityProfileRoutes.map((prop, key) => {
          if (prop.redirect) return null;
          return (
            <li key={key}>
              <NavLink to={prop.path} className="nav-link">
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
