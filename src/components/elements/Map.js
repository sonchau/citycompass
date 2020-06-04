import React from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import { getGeoJSONUrl } from "../../utils/common";
import "./index.css";

const [lat, lng, zoom] = [-38.109904, 145.276908, 10];

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FibWFuIiwiYSI6ImNpb2Z0OWo4cjAwNHl1dWt4YzNhZWZsMWMifQ.WI9VZukT877h0b86ySkXzw";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng,
      lat,
      zoom,
    };
  }

  componentDidMount() {
    const updatedQuery = this.props.query.replace("{", "").replace("}", "");
    // //console.log('updatedQuery', updatedQuery)
    // const mapData = getGeoJSONData(updatedQuery).then(({ data }) => {
    //   //console.log('data', data.rows)
    //   //setMapData(data)
    //   console.log(data)
    // })
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
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
  }

  render() {
    return (
      <div>
        <div className="sidebarStyle">
          <div>
            Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
            {this.state.zoom}
          </div>
        </div>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

export default Map;

// import React, { useState, useEffect, useRef } from "react";
// import mapboxgl from 'mapbox-gl';
// import { getGeoJSONData } from "../../utils/common";
// import './index.css'

// mapboxgl.accessToken = 'pk.eyJ1Ijoic2FibWFuIiwiYSI6ImNpb2Z0OWo4cjAwNHl1dWt4YzNhZWZsMWMifQ.WI9VZukT877h0b86ySkXzw';

// const Map = ({
//   query,
// }) => {

//   const [mapData, setMapData] = useState(null)
//   const [latitude, setLatitude] = useState(-38.081010)
//   const [longitude, setLongitude] = useState(145.465720)
//   const [zoom, setZoom] = useState(12)

//   let mapContainer = useRef()

//   useEffect(() => {
//     const updatedQuery = query.replace('{', '').replace('}', '')
//     //console.log('updatedQuery', updatedQuery)
//     getGeoJSONData(updatedQuery).then(({ data }) => {
//       //console.log('data', data.rows)
//       setMapData(data)
//       console.log(data)
//     })

//   }, [query]);

//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: mapContainer,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [longitude, latitude],
//       zoom
//     });

//     map.on('move', () => {
//       setLongitude(map.getCenter().lng.toFixed(4))
//       setLatitude(map.getCenter().lat.toFixed(4))
//       setZoom(map.getZoom().toFixed(2))
//     });

//     map.addSource('maine', {
//       'type': 'geojson',
//       'data': mapData
//     });

//     map.addLayer({
//       'id': 'maine',
//       'type': 'fill',
//       'source': 'maine',
//       'layout': {},
//       'paint': {
//         'fill-color': '#088',
//         'fill-opacity': 0.8
//       }
//     });

//   }, [mapData]);

//   return (
//     <div>
//       <div className='sidebarStyle'>
//         <div>Longitude: {longitude} | Latitude: {latitude} | Zoom: {zoom}</div>
//       </div>
//       <div ref={el => mapContainer = el} className='mapContainer' />
//     </div>
//   );
// }

// export default Map;
