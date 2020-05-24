import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faShare } from "@fortawesome/free-solid-svg-icons";

const AreaProfiles = () => {
  return (
    <div>
      <h2>City of Casey</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Population Highlights</span>
        <span>
          <span style={{ paddingRight: "4rem" }}>
            <FontAwesomeIcon icon={faFileExport} /> {"  "}Export
          </span>
          <span>
            <FontAwesomeIcon icon={faShare} />
            {"  "}Share
          </span>
        </span>
        <div></div>
      </div>
    </div>
  );
};

export default AreaProfiles;
