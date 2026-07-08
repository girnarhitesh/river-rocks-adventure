import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RaftingRouteData from "./RaftingRouteData";
import RaftingRouteMap from "./RaftingRouteMap";
import "./RaftingRouteExplorer.css";

const RaftingRouteExplorer = ({ data = RaftingRouteData }) => {
  const [selectedId, setSelectedId] = useState(data[0]?.id ?? 1);
  const selectedRoute = data.find((item) => item.id === selectedId) || data[0];

  return (
    <section id="rafting-routes">
      <div className="route-explorer-section">
        <motion.div
          className="route-explorer-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="section-heading-accent">Rafting Route Explorer</h2>
          <p>Select a package to preview the Ganga route on the map.</p>
        </motion.div>

        <div className="route-explorer-layout">
          <div className="route-explorer-panel">
            <div className="route-explorer-panel__head">
              <span className="route-explorer-panel__tag">Our Routes</span>
              <h3>Choose Your Adventure</h3>
            </div>

            <ul className="route-activity-list">
              {data.map((item) => {
                const isActive = item.id === selectedId;

                return (
                  <li key={item.id}>
                    <motion.button
                      type="button"
                      className={`route-activity-item ${isActive ? "route-activity-item--active" : ""}`}
                      onClick={() => setSelectedId(item.id)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 320, damping: 26 }}
                    >
                      <div className="route-activity-item__top">
                        <span className="route-activity-item__title">{item.title}</span>
                        <span className="route-activity-item__distance">{item.distance}</span>
                      </div>
                      <div className="route-activity-item__meta">
                        <span className="route-activity-item__price">{item.price}</span>
                        <span className="route-activity-item__label">{item.priceLabel}</span>
                      </div>
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="route-explorer-map-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRoute.id}
                className="route-explorer-map-card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="route-explorer-map-card__head">
                  <div>
                    <span className="route-explorer-map-card__from">From</span>
                    <h4>{selectedRoute.startLabel}</h4>
                  </div>
                  <div className="route-explorer-map-card__arrow" aria-hidden="true">
                    →
                  </div>
                  <div>
                    <span className="route-explorer-map-card__to">To</span>
                    <h4>{selectedRoute.endLabel}</h4>
                  </div>
                </div>

                <RaftingRouteMap
                  route={selectedRoute.route}
                  routeKey={selectedRoute.id}
                  startLabel={selectedRoute.startLabel}
                  endLabel={selectedRoute.endLabel}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RaftingRouteExplorer;
