import React from "react";
import { motion } from "framer-motion";
import ActivityCard from "../../CommonComponents/ActivitiesCards/ActivitiesCards";
import ActivitiesCardsData from "./ActivitiesCardsData";
import "./ActivitiesCards.css";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
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
          <h2 className="section-heading-accent">Our Rafting Packages</h2>
          <p>Choose your route — every stretch of the Ganga is crafted for thrill and safety.</p>
        </motion.div>

        <motion.div
          className="activities-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
        >
          {data.map((item, index) => (
            <ActivityCard
              key={item.id}
              index={index}
              title={item.title}
              description={item.description}
              price={item.price}
              priceLabel={item.priceLabel}
              distance={item.distance}
              image={item.image}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ActivitiesCards;
