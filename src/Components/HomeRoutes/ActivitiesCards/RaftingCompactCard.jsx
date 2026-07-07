import React from "react";
import { motion } from "framer-motion";
import { useBookingModal } from "../../CommonComponents/BookingModal/BookingModalContext";

const ticketVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

const RaftingCompactCard = ({ item }) => {
  const { openBookingModal } = useBookingModal();

  return (
    <motion.article
      className="raft-ticket"
      variants={ticketVariants}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
    >
      <div className="raft-ticket__thumb-wrap">
        {item.image ? (
          <img className="raft-ticket__thumb" src={item.image} alt={item.title} loading="lazy" />
        ) : (
          <div className="raft-ticket__thumb raft-ticket__thumb--placeholder" />
        )}
      </div>

      <div className="raft-ticket__content">
        <div className="raft-ticket__head">
          <h4 className="raft-ticket__title">{item.title}</h4>
          <span className="raft-ticket__distance">{item.meta}</span>
        </div>
        <p className="raft-ticket__desc">{item.description}</p>
      </div>

      <div className="raft-ticket__action">
        <div className="raft-ticket__price-block">
          <span className="raft-ticket__price">{item.price}</span>
          <span className="raft-ticket__price-label">{item.priceLabel}</span>
        </div>
        <button
          type="button"
          className="raft-ticket__book"
          onClick={() => openBookingModal(item.title)}
          aria-label={`Book ${item.title}`}
        >
          Book
        </button>
      </div>
    </motion.article>
  );
};

export default RaftingCompactCard;
