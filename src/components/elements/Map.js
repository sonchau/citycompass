import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { Spin } from 'antd';
import { getGeoJSONUrl } from "../../utils/common";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FibWFuIiwiYSI6ImNpb2Z0OWo4cjAwNHl1dWt4YzNhZWZsMWMifQ.WI9VZukT877h0b86ySkXzw";
const [lat, lng, zm] = [145.276908, -38.109904, 10];

const Map = ({ query }) => {
  const [latitude, setLatitude] = useState(lat);
  const [longitude, setLongitude] = useState(lng);
  const [zoom, setZoom] = useState(zm);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const updatedQuery = query.replace("{", "").replace("}", "");
    const map = (window.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [latitude, longitude],
      zoom,
    }));

    map.on("move", () => {
      setLatitude(map.getCenter().lat.toFixed(4));
      setLongitude(map.getCenter().lng.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on("load", () => {
      map.addSource("my-data-source", {
        type: "geojson",
        data: getGeoJSONUrl(updatedQuery),
      });

      setLoading(false);
      addLayerSpinner(map);

      // When a click event occurs on a feature in the states layer, open a popup at the
      // location of the click, with description HTML from its properties.
      map.on("click", "my-data-layer-fill", function (e) {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(e.features[0].properties.ward_label)
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the states layer.
      map.on("mouseenter", "my-data-layer-fill", function () {
        map.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      map.on("mouseleave", "my-data-layer-fill", function () {
        map.getCanvas().style.cursor = "";
      });
    });
  }, [query]);

  function addLayerSpinner(map) {
    setLoading(true)

    map.addLayer({
      id: "my-data-layer-fill",
      type: "fill",
      source: "my-data-source",
      layout: {},
      paint: {
        "fill-color": "rgba(200, 100, 240, 0.4)",
        "fill-outline-color": "rgba(200, 100, 240, 1)",
      },
    });
    map.on('render', (e) => stopSpinner(e));
  }

  function stopSpinner(e) {
    if (e.target && e.target.loaded()) {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="sidebarStyle">
        <div>
          Longitude: {longitude} | Latitude: {latitude} | Zoom: {zoom}
        </div>
      </div>
      <div id='map' className="mapContainer">
        {loading && <div className='loading-background'> <Spin size="large" /></div>}
        </div>
    </div>
  );
};

export default Map;
