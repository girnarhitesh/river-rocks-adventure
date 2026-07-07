import ActivitiesCardsData from "../ActivitiesCards/ActivitiesCardsData";
import { normalizeRoute, ROUTE_COORDINATES } from "./RaftingRouteCoordinates";

const ROUTE_META = {
  1: { startLabel: "Club House", endLabel: "NIM Beach" },
  2: { startLabel: "Brahmpuri", endLabel: "Ram Jhula" },
  3: { startLabel: "Shivpuri", endLabel: "NIM Beach" },
  4: { startLabel: "Marine Drive", endLabel: "NIM Beach" },
  5: { startLabel: "Kaudiyala", endLabel: "NIM Beach" },
  6: { startLabel: "Devprayag", endLabel: "NIM Beach" },
};

const RaftingRouteData = ActivitiesCardsData.map((activity) => {
  const meta = ROUTE_META[activity.id] || ROUTE_META[1];
  const routePoints = normalizeRoute(ROUTE_COORDINATES[activity.id] || ROUTE_COORDINATES[1]);

  return {
    ...activity,
    route: routePoints,
    routeCoordinates: ROUTE_COORDINATES[activity.id] || ROUTE_COORDINATES[1],
    startLabel: meta.startLabel,
    endLabel: meta.endLabel,
    mapCenter: routePoints[0],
  };
});

export default RaftingRouteData;
