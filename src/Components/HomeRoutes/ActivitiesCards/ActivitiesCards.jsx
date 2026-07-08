import React from "react";
import { motion } from "framer-motion";
import ActivityCard from "../../CommonComponents/ActivitiesCards/ActivitiesCards";
import RaftingCompactCard from "./RaftingCompactCard";
import ActivitiesCardsData from "./ActivitiesCardsData";
import "./ActivitiesCards.css";

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
};

const RaftingCategory = ({ category }) => (
  <>
    <header className="activity-category__banner activity-category__banner--compact">
      <div className="activity-category__banner-left">
        <span className="activity-category__badge">{category.badge}</span>
        <div>
          <h3 id={`activity-category-${category.id}`}>{category.label}</h3>
          <p>{category.tagline}</p>
        </div>
      </div>
      <div className="raft-route-legend" aria-hidden="true">
        <span>09 km</span>
        <i />
        <span>70 km</span>
      </div>
    </header>

    <motion.div
      className="raft-ticket-grid"
      variants={gridVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
    >
      {category.items.map((item) => (
        <RaftingCompactCard key={item.id} item={item} />
      ))}
    </motion.div>
  </>
);

const ActivityCategory = ({ category, index }) => {
  const isRafting = category.id === "rafting";

  return (
    <motion.section
      className={`activity-category activity-category--${category.accent}${
        isRafting ? " activity-category--rafting-compact" : ""
      }`}
      aria-labelledby={`activity-category-${category.id}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      {isRafting ? (
        <RaftingCategory category={category} />
      ) : (
        <>
          <header className="activity-category__banner">
            <div className="activity-category__banner-left">
              <span className="activity-category__badge">{category.badge}</span>
              <div>
                <h3 id={`activity-category-${category.id}`}>{category.label}</h3>
                <p>{category.tagline}</p>
              </div>
            </div>
            <div className="activity-category__banner-right">
              <span className="activity-category__meta-label">{category.metaLabel}</span>
              <span className="activity-category__count">
                {category.items.length} packages
              </span>
            </div>
          </header>

          <motion.div
            className={`activity-category__grid activity-category__grid--${category.id}`}
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.06 }}
          >
            {category.items.map((item, itemIndex) => (
              <ActivityCard
                key={item.id}
                index={itemIndex}
                title={item.title}
                highlights={item.highlights}
                jumpStyle={item.jumpStyle}
                price={item.price}
                priceLabel={item.priceLabel}
                distance={item.meta}
                image={item.image}
                accent={category.accent}
              />
            ))}
          </motion.div>
        </>
      )}
    </motion.section>
  );
};

const ActivitiesCards = ({ data = ActivitiesCardsData }) => {
  return (
    <section id="ActivitiesCards">
      <div className="MaxWidthContainer MarginAuto SectionTopBottom">
        <motion.div
          className="activities-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="activities-header__tag">Activities & Packages</span>
          <h2 className="section-heading-accent">{data.section.title}</h2>
          <p>{data.section.subtitle}</p>
        </motion.div>

        <div className="activities-categories">
          {data.categories.map((category, index) => (
            <ActivityCategory key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesCards;
