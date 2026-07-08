import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./ActivityPageHero.css";

const ActivityPageHero = ({
  tag,
  title,
  subtitle,
  accent = "red",
  backTo = "/",
  backLabel = "Back to Home",
}) => (
  <section className={`activity-page-hero activity-page-hero--${accent}`}>
    <div className="activity-page-hero__overlay" aria-hidden="true" />
    <div className="MaxWidthContainer MarginAuto activity-page-hero__inner">
      <Link to={backTo} className="activity-page-hero__back">
        ← {backLabel}
      </Link>

      <motion.header
        className="activity-page-hero__content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="activity-page-hero__tag">{tag}</span>
        <h1 className="section-heading-accent">{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </motion.header>
    </div>
  </section>
);

export default ActivityPageHero;
