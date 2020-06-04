import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { getGeoJSONData } from "../../utils/common";
import './index.css'

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FibWFuIiwiYSI6ImNpb2Z0OWo4cjAwNHl1dWt4YzNhZWZsMWMifQ.WI9VZukT877h0b86ySkXzw';
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 145.465720,
      lat: -38.081010,
      zoom: 10
    };
  }

  componentDidMount() {
    const updatedQuery = this.props.query.replace('{', '').replace('}', '')
    // //console.log('updatedQuery', updatedQuery)
    // const mapData = getGeoJSONData(updatedQuery).then(({ data }) => {
    //   //console.log('data', data.rows)
    //   //setMapData(data)
    //   console.log(data)
    // })
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    map.addSource('my-data', {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-77.0323, 38.9131]
        },
        "properties": {
          "title": "Mapbox DC",
          "marker-symbol": "monument"
        }
      }
    });

    // map.addSource('casey', {
    //   'type': 'geojson',
    //   'data': getGeoJSONData(updatedQuery)
    // });

  }

  render() {
    return (
      <div>
        <div className='sidebarStyle'>
          <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
        </div>
        <div ref={el => this.mapContainer = el} className='mapContainer' />
      </div>
    )
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