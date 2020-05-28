import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ cityName = "casey", pageDirectory }) => {
  return (
    <div>
      {pageDirectory.map((a) => (
        <div key={a["a_level"]}>
          <h3> {a["a_title"]}</h3>
          {a.b.map((b) => (
            <div>
              <h4>
                <NavLink to={`${cityName}/${b["page_code"]}`}>{b["b_title"]}</NavLink>
              </h4>
              {b.c.map((c) => (
                <React.Fragment>
                  <h5>
                    <NavLink to={`${cityName}/${c["page_code"]}`}>{c["c_title"]}</NavLink>
                  </h5>
                  {c.d.map((d) => (
                    <h6>
                      <NavLink to={`${cityName}/${d["page_code"]}`}>{d["d_title"]}</NavLink>
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

const buildNav = (navSchema) => {
  return <div key={navSchema["a_level"]}>{navSchema["a_title"]}</div>;
};

export default Sidebar;
