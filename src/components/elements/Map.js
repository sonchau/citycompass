import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"
import { getGeoJSONUrl } from "../../utils/common";
import "./index.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FibWFuIiwiYSI6ImNpb2Z0OWo4cjAwNHl1dWt4YzNhZWZsMWMifQ.WI9VZukT877h0b86ySkXzw";
//const [lat, lng, zoom] = [-38.109904, 145.276908, 10];

const Map = ({ query }) => {
  const [latitude, setLatitude] = useState(145.276908);
  const [longitude, setLongitude] = useState(-38.109904);
  const [zoom, setZoom] = useState(10);

  let mapContainer = useRef();
  // Container to put React generated content in.
  const tooltipContainer = document.createElement("div");

  useEffect(() => {
    const updatedQuery = query.replace("{", "").replace("}", "");
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [latitude, longitude],
      zoom,
    });

    map.on("move", () => {
      setLatitude(map.getCenter().lat.toFixed(4));
      setLongitude(map.getCenter().lng.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on("load", () => {
      map.addSource("my-data", {
        type: "geojson",
        data: getGeoJSONUrl(updatedQuery),
      });

      map.addLayer({
        id: "my-data",
        type: "line",
        source: "my-data",
        layout: {},
        paint: {
          "line-color": "rgba(0, 0, 255, 1)",
          "line-width": 2,
        },
      });

      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on("mousemove", function (e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = "pointer";

        // const features = {
        //       list: map.queryRenderedFeatures(e.point), mouseX: e.point.x, mouseY: e.point.y
        //     }
        const coordinates = [e.lngLat.lng, e.lngLat.lat];
        const description = `x: ${e.lngLat.lng}, y: ${e.lngLat.lat}`;
        console.log(coordinates, e);

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        // }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .setHTML(description)
          .addTo(map);
      });

      map.on("mouseleave", function () {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });
    });
  }, []);

  return (
    <div>
      <div className="sidebarStyle">
        <div>
          Longitude: {longitude} | Latitude: {latitude} | Zoom: {zoom}
        </div>
      </div>
      <div ref={(el) => (mapContainer = el)} className="mapContainer" />
    </div>
  );
};

export default Map;

// import React from "react";
// import ReactDOM from "react-dom";
// import mapboxgl from "mapbox-gl";
// import { getGeoJSONUrl } from "../../utils/common";
// import "./index.css";

// const [lat, lng, zoom] = [-38.109904, 145.276908, 10];

// mapboxgl.accessToken =
//   "pk.eyJ1Ijoic2FibWFuIiwiYSI6ImNpb2Z0OWo4cjAwNHl1dWt4YzNhZWZsMWMifQ.WI9VZukT877h0b86ySkXzw";

// class Map extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       lng,
//       lat,
//       zoom,
//     };
//   }

//   componentDidMount() {
//     const updatedQuery = this.props.query.replace("{", "").replace("}", "");
//     // //console.log('updatedQuery', updatedQuery)
//     // const mapData = getGeoJSONData(updatedQuery).then(({ data }) => {
//     //   //console.log('data', data.rows)
//     //   //setMapData(data)
//     //   console.log(data)
//     // })
//     const map = new mapboxgl.Map({
//       container: this.mapContainer,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [this.state.lng, this.state.lat],
//       zoom: this.state.zoom,
//     });

//     map.on("move", () => {
//       this.setState({
//         lng: map.getCenter().lng.toFixed(4),
//         lat: map.getCenter().lat.toFixed(4),
//         zoom: map.getZoom().toFixed(2),
//       });
//     });

//     map.on("load", () => {
//       map.addSource("my-data", {
//         type: "geojson",
//         data: getGeoJSONUrl(updatedQuery),
//       });

//       map.addLayer({
//         id: "my-data",
//         type: "line",
//         source: "my-data",
//         layout: {},
//         paint: {
//           "line-color": "rgba(0, 0, 255, 1)",
//           "line-width": 2,
//         },
//       });
//     });
//   }

//   render() {
//     return (
//       <div>
//         <div className="sidebarStyle">
//           <div>
//             Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
//             {this.state.zoom}
//           </div>
//         </div>
//         <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
//       </div>
//     );
//   }
// }

// export default Map;
