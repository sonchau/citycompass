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
