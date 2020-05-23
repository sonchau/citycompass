import React from "react";
import palace from "../img/bunjil_palace.jpg";

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
              backgroundColor: "purple",
              marginLeft: "1rem",
            }}
          >
            <div
              style={{
                flex: "0 0 30%",
                backgroundColor: "pink",
              }}
            >
              first card
            </div>
            <div
              style={{
                flex: "0 0 30%",
                backgroundColor: "green",
              }}
            >
              second card
            </div>
            <div
              style={{
                flex: "0 0 30%",
                backgroundColor: "orange",
              }}
            >
              third card
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PopulationHighlights;
