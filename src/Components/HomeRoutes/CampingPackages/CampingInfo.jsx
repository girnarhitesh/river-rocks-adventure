import React from "react";
import { motion } from "framer-motion";
import { useBookingModal } from "../../CommonComponents/BookingModal/BookingModalContext";
import CampingPackagesData from "./CampingPackagesData";
import "./CampingPackages.css";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

const PolicyCard = ({ title, items }) => (
  <motion.article className="camping-info__card" {...fadeUp}>
    <h3>{title}</h3>
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </motion.article>
);

const CampingInfo = ({ data = CampingPackagesData }) => {
  const { openBookingModal } = useBookingModal();

  return (
    <section className="camping-info" aria-label="Camping package details">
      <div className="MaxWidthContainer MarginAuto">
        <motion.div className="camping-info__includes" {...fadeUp}>
          <span className="camping-info__tag">What’s Included</span>
          <h2 className="section-heading-accent">{data.includes.title}</h2>
          <ul className="camping-info__includes-list">
            {data.includes.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.div>

        <div className="camping-info__policies">
          <PolicyCard title={data.childPolicy.title} items={data.childPolicy.items} />
          <PolicyCard title={data.bookingPolicy.title} items={data.bookingPolicy.items} />
          <PolicyCard
            title={data.cancellationPolicy.title}
            items={data.cancellationPolicy.items}
          />
        </div>

        <motion.aside className="camping-info__note" {...fadeUp}>
          <strong>Note:</strong> {data.note}
        </motion.aside>

        {/* <motion.div className="camping-info__cta" {...fadeUp}>
          <div>
            <span className="camping-info__tag">Need Help / Book Now</span>
            <p className="camping-info__cta-text">{data.tagline}</p>
            <div className="camping-info__phones">
              {data.contactPhones.map((phone) => (
                <a key={phone.href} href={`tel:${phone.href}`}>
                  {phone.display}
                </a>
              ))}
            </div>
          </div>
          <motion.button
            type="button"
            className="camping-info__book"
            onClick={() => openBookingModal("River Side Camps & Cottages")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Camping Stay
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
};

export default CampingInfo;
