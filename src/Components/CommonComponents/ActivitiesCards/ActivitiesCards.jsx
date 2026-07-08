import React from "react";
import { motion } from "framer-motion";
import { useBookingModal } from "../BookingModal/BookingModalContext";
import ActivityHighlights from "./ActivityHighlights";
import "./ActivitiesCards.css";

const cardEase = [0.22, 1, 0.36, 1];

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: cardEase },
  },
};

const ActivityCard = ({
  title = "Activity",
  highlights = [],
  jumpStyle,
  price = "Rs. 0 /-",
  priceLabel = "Per Person",
  distance = "",
  image = "",
  imageAlt = "",
  accent = "red",
  index = 0,
}) => {
  const { openBookingModal } = useBookingModal();

  return (
    <motion.article
      className={`activity-card activity-card--${accent}`}
      variants={itemVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="activity-card__media">
        {image ? (
          <motion.img
            className="activity-card__image"
            src={image}
            alt={imageAlt || title}
            loading="lazy"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          />
        ) : (
          <div className="activity-card__image activity-card__image--placeholder" />
        )}
        <motion.span
          className="activity-card__accent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.38, delay: index * 0.05 + 0.12, ease: cardEase }}
          aria-hidden="true"
        />
        {distance && (
          <span className="activity-card__distance">{distance}</span>
        )}
      </div>

      <div className="activity-card__body">
        <div className="activity-card__head">
          <h3 className="activity-card__title">{title}</h3>
          <div className="activity-card__price-block">
            <span className="activity-card__price">{price}</span>
            <span className="activity-card__price-label">{priceLabel}</span>
          </div>
        </div>

        {highlights.length > 0 && (
          <ActivityHighlights highlights={highlights} jumpStyle={jumpStyle} />
        )}

        <motion.button
          type="button"
          className="activity-card__book-btn"
          onClick={() => openBookingModal(title)}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18 }}
          aria-label={`Book ${title}`}
        >
          <span>Book Now</span>
          <motion.span
            className="activity-card__book-arrow"
            aria-hidden="true"
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </motion.article>
  );
};

export default ActivityCard;
