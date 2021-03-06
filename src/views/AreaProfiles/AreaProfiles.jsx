import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExport,
  faShare,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

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
      </div>

      <div style={{ paddingTop: "4rem", color: "white" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "rgb(23, 23, 33)",
            height: "7rem",
            padding: "2rem",
          }}
        >
          <span>
            <select
              name="cities"
              id="cities"
              style={{
                color: "white",
                backgroundColor: "rgb(23, 23, 33)",
                padding: "0.5rem",
                paddingRight: "3rem",
                borderRadius: "5px",
              }}
            >
              <option value="casey1">City of Casey</option>
              <option value="casey2">City of Casey</option>
              <option value="casey3">City of Casey</option>
              <option value="casey4">City of Casey</option>
            </select>
          </span>
          <span>
            <FontAwesomeIcon icon={faFileExport} color="white" /> {"  "}Export
          </span>
        </div>
        <div
          style={{
            display: "flex",
            backgroundColor: "rgb(34, 45, 63)",
            height: "50rem",
          }}
        >
          <div
            style={{
              flex: "0 0 30%",
              margin: "2rem",
              borderRight: "4px dotted white",
              padding: "2rem",
            }}
          >
            <h4>Population</h4>
            <p style={{ fontSize: "7rem" }}>215,435</p>
            <p>ERP, 2019</p>
          </div>
          <div style={{ flexGrow: 1, padding: "4rem" }}>
            <div style={{ paddingLeft: "14rem" }}>
              <p style={{ fontSize: "4rem" }}>Estimated resident population</p>
              <p style={{ fontSize: "4rem", textAlign: "left" }}>
                City of Casey
              </p>
            </div>
          </div>
        </div>
      </div>
      <p>
        Source: Australian Bureau of Statistics, Regional popoulation Growth
        (12534). Compiled and presented by Geografia
      </p>

      <div style={{ marginTop: "7rem" }}>
        <h2>City of Casey</h2>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "7rem",
            }}
          >
            <div
              style={{
                backgroundColor: "rgb(238, 238, 238)",
                color: "black",
                height: "40rem",
                width: "40rem",
                borderRadius: "4rem 4rem 4rem 0rem",
                padding: "3rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ flex: "0 0 20%" }}>MEDIAN AGE</span>
              <div
                style={{
                  flex: "0 0 40%",
                  position: "relative",
                }}
              >
                <span style={{ fontSize: "10rem" }}>34</span>
                <span style={{ position: "absolute", top: "40%", left: "35%" }}>
                  <FontAwesomeIcon icon={faSortUp} color="green" size="4x" />
                </span>
                <span style={{ position: "absolute", top: "50%", left: "50%" }}>
                  +1
                </span>
              </div>
              <div
                style={{
                  flex: "0 0 40%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ paddingTop: "1rem" }}>
                  <span style={{ marginRight: "0.3rem" }}>36</span>
                  <span style={{ position: "relative" }}>
                    <span style={{ position: "absolute", top: "30%" }}>
                      <FontAwesomeIcon icon={faSortUp} color="green" />
                    </span>
                  </span>
                  <span style={{ marginLeft: "2rem" }}>Greater Melbourne</span>
                </div>
                <div style={{ paddingTop: "1rem" }}>
                  <span style={{ marginRight: "0.3rem" }}>36</span>
                  <span style={{ position: "relative" }}>
                    <span style={{ position: "absolute", top: "30%" }}>
                      <FontAwesomeIcon icon={faSortUp} color="red" />
                    </span>
                  </span>
                  <span style={{ marginLeft: "2rem" }}>Victoria</span>
                </div>
                <div style={{ paddingTop: "1rem" }}>
                  <span style={{ marginRight: "0.3rem" }}>36</span>
                  <span style={{ position: "relative" }}>
                    <span style={{ position: "absolute", top: "30%" }}>
                      <FontAwesomeIcon icon={faSortUp} color="red" />
                    </span>
                  </span>
                  <span style={{ marginLeft: "2rem" }}>Australia</span>
                </div>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "rgb(238, 238, 238)",
                height: "40rem",
                width: "40rem",
              }}
            >
              Card 2
            </div>
            <div
              style={{
                backgroundColor: "rgb(238, 238, 238)",
                height: "40rem",
                width: "40rem",
              }}
            >
              Card 3
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "7rem",
            }}
          >
            <div
              style={{
                backgroundColor: "rgb(238, 238, 238)",
                height: "40rem",
                width: "40rem",
              }}
            >
              Card 4
            </div>
            <div
              style={{
                backgroundColor: "rgb(238, 238, 238)",
                height: "40rem",
                width: "40rem",
              }}
            >
              Card 5
            </div>
            <div
              style={{
                backgroundColor: "rgb(238, 238, 238)",
                height: "40rem",
                width: "40rem",
              }}
            >
              Card 6
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaProfiles;
