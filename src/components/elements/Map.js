import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl';
import { getGeoJSONUrl } from "../../utils/common";
import Tooltip from '../tooltip'
import './index.css'

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FibWFuIiwiYSI6ImNpb2Z0OWo4cjAwNHl1dWt4YzNhZWZsMWMifQ.WI9VZukT877h0b86ySkXzw';
//const [lat, lng, zoom] = [-38.109904, 145.276908, 10];

const Map = ({
  query,
}) => {

  const [latitude, setLatitude] = useState(145.276908)
  const [longitude, setLongitude] = useState(-38.109904)
  const [zoom, setZoom] = useState(10)

  let mapContainer = useRef()
  // Container to put React generated content in.
  const tooltipContainer = document.createElement('div');

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
    });

    const tooltip = new mapboxgl.Marker(tooltipContainer, {
      offset: [-50, 0]
    }).setLngLat([0, 0]).addTo(map);

    map.on('mousemove', (e) => {
      console.log(e)
      if (e.point) {
        const features = {
          list: map.queryRenderedFeatures(e.point), mouseX: e.point.x, mouseY: e.point.y
        }
        console.log(features)
        tooltip.setLngLat(e.lngLat);
        map.getCanvas().style.cursor = features.length ? 'pointer' : '';
        setTooltip(features);
      }
    })
  }, []);

  const setTooltip = (features) => {
    if (features.length) {
      ReactDOM.render(
        React.createElement(
          Tooltip, {
            features
          }
        ),
        tooltipContainer
      );
    } else {
      ReactDOM.unmountComponentAtNode(tooltipContainer);
    }
  }

  return (
    <div>
      <div className='sidebarStyle'>
        <div>Longitude: {longitude} | Latitude: {latitude} | Zoom: {zoom}</div>
      </div>
      <div ref={el => mapContainer = el} className='mapContainer' />
    </div>
  );
}

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


