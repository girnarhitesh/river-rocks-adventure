/**
 * Verified rafting waypoints — { lat, lng }
 * Downstream order along Ganga: Shivpuri → Brahmpuri → Club House → NIM Beach
 */

import { GANGA_ROUTE_COORDINATES } from "./gangaRiverRoutes.generated";

export const WAYPOINTS = {
  nimBeach: { lat: 30.13350981206392, lng: 78.33216961775499 },
  clubHouse: { lat: 30.11815322477571, lng: 78.3699978158699 },
  brahmpuri: { lat: 30.1352710413458, lng: 78.39036634274564 },
  shivpuri: { lat: 30.136545764559607, lng: 78.3942561822744 },
  /** Approximate — update when exact coords available */
  ramJhula: { lat: 30.1298, lng: 78.3348 },
  marineDrive: { lat: 30.1378, lng: 78.3992 },
  kaudiyala: { lat: 30.061, lng: 78.451 },
  devprayag: { lat: 30.1465, lng: 78.598 },
};

/**
 * River-aligned paths derived from OpenStreetMap Ganga geometry.
 * Replaces straight-line interpolation so routes follow the actual channel.
 */
export const ROUTE_COORDINATES = {
  1: GANGA_ROUTE_COORDINATES["1"],
  2: GANGA_ROUTE_COORDINATES["2"],
  3: GANGA_ROUTE_COORDINATES["3"],
  4: GANGA_ROUTE_COORDINATES["4"],
  5: GANGA_ROUTE_COORDINATES["5"],
  6: GANGA_ROUTE_COORDINATES["6"],
};

/** Normalise { lat, lng } or [lat, lng] → [lat, lng] */
export const toLatLngPair = (point) => {
  if (Array.isArray(point)) return point;
  return [point.lat, point.lng];
};

export const normalizeRoute = (points = []) => points.map(toLatLngPair);
