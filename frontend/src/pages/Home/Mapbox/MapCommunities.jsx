import { useState, memo, useMemo, useEffect, useRef, useCallback } from "react";
import Map, {
  GeolocateControl,
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  Source,
  Layer,
} from "react-map-gl";
import axios from "axios";

import Geocoder from "./Geocoder";
import Icon from "./icon.svg";
import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import * as parkDate from "./data.json";
import Pin from "./pin.png";

function CommunityMap({
  showDataList = true,
  style,
  width = "50vw",
  height = "60vh",
}) {
  const [popupInfo, setPopupInfo] = useState(null);
  const [communities, setCommunities] = useState();
  const [viewPort, setViewPort] = useState({
    latitude: 56,
    longitude: 23,

    zoom: 10,
  });

  useEffect(() => {
    const loadContents = async () => {
      try {
        const getArray = await axios.get(
          "http://localhost:8080/community/communities",
          { withCredentials: true }
        );

        setCommunities(getArray.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    loadContents();
  }, []);

  if (!viewPort) return null;

  return (
    <div className="relative">
      <Map
        mapboxAccessToken={import.meta.env.VITE_APP_GEOCODER_ACCESS_TOKEN}
        initialViewState={viewPort}
        onViewportChange={(viewPort) => {
          setViewPort(viewPort);
        }}
        style={{
          width: width,
          height: height,
        }}
        mapStyle={"mapbox://styles/mapbox/dark-v9"}
      >
        <Geocoder />

        <GeolocateControl position="top-right" />
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        <ScaleControl />

        {communities?.map((location, index) => (
          <Marker
            className="cursor-pointer"
            key={index}
            longitude={location.location.latitude}
            latitude={location.location.longitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(location);
            }}
          >
            <button className="marker-btn">
              <img src={Pin} width={30} alt="Skate Park Icon" />
            </button>
          </Marker>
        ))}
        {popupInfo && (
          <Popup
            longitude={popupInfo.location.latitude}
            latitude={popupInfo.location.longitude}
            anchor="right"
            onClose={() => setPopupInfo(null)}
          >
            <div className="text-lg">
              <img src={popupInfo.image} width="100px" />
              <h2>{popupInfo.communityName}</h2>
              <p>{popupInfo.description}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default CommunityMap;
