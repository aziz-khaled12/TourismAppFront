import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const MarkerClusterGroup = ({ markers }) => {
  const map = useMap();
  const markerClusterGroupRef = useRef(null);

  useEffect(() => {
    if (!markerClusterGroupRef.current) {
      markerClusterGroupRef.current = L.markerClusterGroup();
      map.addLayer(markerClusterGroupRef.current);
    }

    markers.forEach((marker) => {
      markerClusterGroupRef.current.addLayer(marker);
    });

    return () => {
      if (markerClusterGroupRef.current) {
        markerClusterGroupRef.current.clearLayers();
        map.removeLayer(markerClusterGroupRef.current);
      }
    };
  }, [map, markers]);

  return null;
};

export default MarkerClusterGroup;
