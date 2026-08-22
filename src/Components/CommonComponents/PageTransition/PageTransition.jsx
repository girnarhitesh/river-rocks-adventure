import React from "react";
import { motion } from "framer-motion";
import { usePrerender } from "../../../context/PrerenderContext";
import "./PageTransition.css";

const pageTransition = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const PageTransition = ({ children }) => {
  const isPrerender = usePrerender();

  if (isPrerender) {
    return <div className="page-transition">{children}</div>;
  }

  return (
    <motion.div
      className="page-transition"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
