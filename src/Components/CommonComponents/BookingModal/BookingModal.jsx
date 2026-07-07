import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BOOKING_URL from "../../../config/bookingLink";
import { useBookingModal } from "./BookingModalContext";
import "./BookingModal.css";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const BookingModal = () => {
  const { isOpen, packageTitle, closeBookingModal } = useBookingModal();
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenChange = (open) => {
    if (!open) {
      closeBookingModal();
      return;
    }
    setIsLoading(true);
  };

  return (
    <AnimatePresence onExitComplete={() => setIsLoading(true)}>
      {isOpen && (
        <motion.div
          key="booking-modal"
          className="booking-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.button
            type="button"
            className="booking-modal__backdrop"
            aria-label="Close booking modal"
            variants={overlayVariants}
            onClick={() => handleOpenChange(false)}
          />

          <motion.div
            className="booking-modal__panel"
            variants={panelVariants}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="booking-modal__header">
              <div className="booking-modal__header-copy">
                <span className="booking-modal__tag">Secure Booking</span>
                <h2 id="booking-modal-title">Book Your Adventure</h2>
                {packageTitle ? (
                  <p className="booking-modal__package">{packageTitle}</p>
                ) : (
                  <p className="booking-modal__package">
                    Complete your rafting reservation with River &amp; Rock Adventure.
                  </p>
                )}
              </div>

              <div className="booking-modal__actions">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="booking-modal__external"
                >
                  Open in new tab
                </a>
                <motion.button
                  type="button"
                  className="booking-modal__close"
                  onClick={() => handleOpenChange(false)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label="Close booking modal"
                >
                  <span aria-hidden="true">×</span>
                </motion.button>
              </div>
            </header>

            <span className="booking-modal__accent" aria-hidden="true" />

            <div className="booking-modal__frame-wrap">
              {isLoading && (
                <div className="booking-modal__loader" aria-live="polite">
                  <div className="booking-modal__loader-dots" aria-hidden="true">
                    <span className="booking-modal__loader-dot" />
                    <span className="booking-modal__loader-dot" />
                    <span className="booking-modal__loader-dot" />
                  </div>
                  <p>Loading booking page...</p>
                </div>
              )}

              <iframe
                key={isOpen ? "booking-open" : "booking-closed"}
                className="booking-modal__iframe"
                src={BOOKING_URL}
                title="River and Rocks booking"
                loading="lazy"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
