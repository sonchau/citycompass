import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faVectorSquare,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

const PopulationHighlights = () => {
  return (
    <React.Fragment>
      <div style={{ padding: "5rem 5rem 5rem 10rem" }}>
        <h2>City of Casey</h2>
        <h4>A story of diversity and rapid growth in Melbourne’s South East</h4>
        <div style={{ display: "flex" }}>
          <div
            style={{ flex: "0 0 70%", backgroundColor: "red", height: "50rem" }}
          >
            {/* <img src={palace} /> */}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flexGrow: 1,
              marginLeft: "1rem",
              color: "rgb(255, 255, 255)",
              fontSize: "2.5rem",
            }}
          >
            <div
              style={{
                flex: "0 0 31%",
                backgroundColor: "rgb(133, 20, 72)",
                padding: "2rem",
              }}
            >
              <p>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Population
              </p>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "6rem",
                  paddingTop: "0.5rem",
                }}
              >
                353,872
              </p>
            </div>
            <div
              style={{
                flex: "0 0 31%",
                backgroundColor: "rgb(241, 66, 29)",
                padding: "2rem",
              }}
            >
              <p>
                <FontAwesomeIcon icon={faVectorSquare} /> Area
              </p>

              <p
                style={{
                  textAlign: "center",
                  fontSize: "6rem",
                  paddingTop: "0.5rem",
                }}
              >
                409 km 2
              </p>
            </div>
            <div
              style={{
                flex: "0 0 31%",
                backgroundColor: "rgb(211, 24, 59)",
                padding: "2rem",
              }}
            >
              <p>
                <FontAwesomeIcon icon={faBuilding} /> Density
              </p>

              <p
                style={{
                  textAlign: "center",
                  fontSize: "4rem",
                  paddingTop: "0.8rem",
                }}
              >
                862 people/km2
              </p>
            </div>
          </div>
        </div>
        <p>
          The City of Casey is located in Melbourne's south-eastern suburbs,
          between 28 and 60 kilometres south-east of the Melbourne CBD. The City
          of Casey is bounded by the City of Knox and the Yarra Ranges Council
          area in the north, Cardinia Shire in the east.
        </p>
        <div
          style={{ width: "100%", height: "100rem", backgroundColor: "black" }}
        ></div>
      </div>
    </React.Fragment>
  );
};

export default PopulationHighlights;
