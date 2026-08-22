import React, { lazy, Suspense } from "react";
import { usePrerender } from "../../../context/PrerenderContext";

const RaftingRouteMapCanvas = lazy(() => import("./RaftingRouteMapCanvas"));

const RaftingRouteMapPlaceholder = ({ startLabel, endLabel }) => (
  <div className="route-map-shell route-map-shell--static" aria-hidden="true">
    <div className="route-map route-map--static" />
    <div className="route-map-gradient" aria-hidden="true" />
    <div className="route-map-labels">
      <span>{startLabel}</span>
      <span>{endLabel}</span>
    </div>
  </div>
);

const RaftingRouteMap = (props) => {
  const isPrerender = usePrerender();

  if (isPrerender) {
    return <RaftingRouteMapPlaceholder {...props} />;
  }

  return (
    <Suspense fallback={<RaftingRouteMapPlaceholder {...props} />}>
      <RaftingRouteMapCanvas {...props} />
    </Suspense>
  );
};

export default RaftingRouteMap;
