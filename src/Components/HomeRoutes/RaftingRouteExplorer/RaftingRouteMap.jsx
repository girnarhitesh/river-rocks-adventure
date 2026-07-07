import React, { useEffect, useMemo, useRef, useState } from "react";
import Map, { Layer, Marker, Source } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import { animate, motion } from "framer-motion";
import "maplibre-gl/dist/maplibre-gl.css";

/** Inline raster style — reliable, no external style.json dependency */
const MAP_STYLE = {
  version: 8,
  sources: {
    carto: {
      type: "raster",
      tiles: [
        "https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap © CARTO",
    },
  },
  layers: [
    {
      id: "carto-tiles",
      type: "raster",
      source: "carto",
      minzoom: 0,
      maxzoom: 20,
    },
  ],
};

const toLngLat = ([lat, lng]) => [lng, lat];

const toGeoJSON = (coords) => ({
  type: "Feature",
  properties: {},
  geometry: {
    type: "LineString",
    coordinates: coords.map(toLngLat),
  },
});

const interpolateRoute = (coords, t) => {
  if (!coords?.length) return null;
  if (coords.length === 1) return coords[0];

  const total = coords.length - 1;
  const exact = Math.min(Math.max(t, 0), 1) * total;
  const idx = Math.floor(exact);
  const frac = exact - idx;
  const a = coords[idx];
  const b = coords[Math.min(idx + 1, total)];

  return [a[0] + (b[0] - a[0]) * frac, a[1] + (b[1] - a[1]) * frac];
};

const RouteMarker = ({ label, variant = "start", delay = 0 }) => (
  <motion.div
    className={`route-marker route-marker--${variant}`}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: "spring", stiffness: 220, damping: 18, delay }}
  >
    <motion.span
      className="route-marker__ring"
      animate={{ scale: [1, 2.2], opacity: [0.45, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
    />
    <span className="route-marker__dot" />
    <span className="route-marker__label">{label}</span>
  </motion.div>
);

const RaftingRouteMap = ({ route, routeKey, startLabel, endLabel }) => {
  const mapRef = useRef(null);
  const [trimEnd, setTrimEnd] = useState(1);
  const [raftPos, setRaftPos] = useState(route?.[0] || null);

  const positions = route || [];
  const start = positions[0];
  const end = positions[positions.length - 1];

  const routeGeoJSON = useMemo(() => toGeoJSON(positions), [positions]);

  const fitRouteBounds = (duration = 1200) => {
    const map = mapRef.current?.getMap();
    if (!map || positions.length < 2) return;

    const bounds = positions.reduce(
      (b, coord) => b.extend(toLngLat(coord)),
      new maplibregl.LngLatBounds(toLngLat(positions[0]), toLngLat(positions[0])),
    );

    map.fitBounds(bounds, {
      padding: { top: 70, bottom: 50, left: 50, right: 50 },
      duration,
      pitch: 50,
      bearing: -16,
      essential: true,
    });
  };

  const handleZoomIn = () => {
    mapRef.current?.getMap()?.zoomIn({ duration: 280 });
  };

  const handleZoomOut = () => {
    mapRef.current?.getMap()?.zoomOut({ duration: 280 });
  };

  const handleResetView = () => {
    fitRouteBounds(900);
  };

  useEffect(() => {
    if (!positions.length) return;

    setTrimEnd(1);
    setRaftPos(positions[0]);

    const trimControls = animate(1, 0, {
      duration: 2.6,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (v) => setTrimEnd(v),
    });

    const raftControls = animate(0, 1, {
      duration: 2.6,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (v) => setRaftPos(interpolateRoute(positions, v)),
    });

    return () => {
      trimControls.stop();
      raftControls.stop();
    };
  }, [positions, routeKey]);

  const handleMapLoad = () => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    map.resize();
    fitRouteBounds(1400);
  };

  useEffect(() => {
    fitRouteBounds(1200);
  }, [positions, routeKey]);

  const initialView = useMemo(() => {
    const [lat, lng] = positions[0] || [30.11, 78.32];
    return { longitude: lng, latitude: lat, zoom: 11, pitch: 45, bearing: -14 };
  }, [positions]);

  return (
    <motion.div
      className="route-map-shell"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Map
        key={`map-${routeKey}`}
        ref={mapRef}
        mapLib={maplibregl}
        initialViewState={initialView}
        mapStyle={MAP_STYLE}
        scrollZoom={false}
        dragRotate={false}
        touchZoomRotate={false}
        attributionControl={false}
        className="route-map"
        onLoad={handleMapLoad}
      >
        <Source id={`route-glow-${routeKey}`} type="geojson" data={routeGeoJSON}>
          <Layer
            id={`route-glow-${routeKey}`}
            type="line"
            paint={{
              "line-color": "#ff0000",
              "line-width": 18,
              "line-opacity": 0.2,
              "line-blur": 4,
            }}
            layout={{ "line-cap": "round", "line-join": "round" }}
          />
        </Source>

        <Source id={`route-bg-${routeKey}`} type="geojson" data={routeGeoJSON}>
          <Layer
            id={`route-bg-${routeKey}`}
            type="line"
            paint={{
              "line-color": "#94a3b8",
              "line-width": 4,
              "line-opacity": 0.6,
              "line-dasharray": [2, 2],
            }}
            layout={{ "line-cap": "round", "line-join": "round" }}
          />
        </Source>

        <Source
          id={`route-active-${routeKey}`}
          type="geojson"
          data={routeGeoJSON}
          lineMetrics
        >
          <Layer
            id={`route-active-layer-${routeKey}`}
            type="line"
            paint={{
              "line-width": 5,
              "line-color": "#ff0000",
              "line-trim-offset": [0, trimEnd],
            }}
            layout={{ "line-cap": "round", "line-join": "round" }}
          />
        </Source>

        {start && (
          <Marker longitude={start[1]} latitude={start[0]} anchor="center">
            <RouteMarker label="Start" variant="start" delay={0.15} />
          </Marker>
        )}

        {end && (
          <Marker longitude={end[1]} latitude={end[0]} anchor="center">
            <RouteMarker label="Finish" variant="end" delay={0.25} />
          </Marker>
        )}

        {raftPos && trimEnd > 0.05 && (
          <Marker longitude={raftPos[1]} latitude={raftPos[0]} anchor="center">
            <motion.div
              className="route-raft-marker"
              animate={{ y: [0, -4, 0], rotate: [-4, 4, -4] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span
                className="route-raft-marker__trail"
                animate={{ scale: [1, 1.6], opacity: [0.35, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="route-raft-marker__icon">🚣</span>
            </motion.div>
          </Marker>
        )}
      </Map>

      <div className="route-map-gradient" aria-hidden="true" />

      <div className="route-map-labels">
        <motion.span
          key={`from-${routeKey}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {startLabel}
        </motion.span>
        <motion.span
          key={`to-${routeKey}`}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {endLabel}
        </motion.span>
      </div>

      <div className="route-map-controls">
        <motion.button
          type="button"
          className="route-map-controls__btn"
          onClick={handleZoomIn}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Zoom in"
        >
          +
        </motion.button>
        <motion.button
          type="button"
          className="route-map-controls__btn"
          onClick={handleZoomOut}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Zoom out"
        >
          −
        </motion.button>
        <motion.button
          type="button"
          className="route-map-controls__btn route-map-controls__btn--fit"
          onClick={handleResetView}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Fit route to map"
          title="Fit route"
        >
          ⊙
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RaftingRouteMap;
