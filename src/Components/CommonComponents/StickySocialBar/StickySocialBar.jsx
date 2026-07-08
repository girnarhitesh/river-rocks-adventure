import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SOCIAL_LINKS } from "../../../config/socialLinks";
import SocialIcon from "../SocialIcon/SocialIcon";
import "./StickySocialBar.css";

const SCROLL_THRESHOLD = 200;
const MOBILE_MAX_WIDTH = 768;

const StickySocialBar = ({ links = SOCIAL_LINKS }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= MOBILE_MAX_WIDTH
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
    const onResize = () => setIsMobile(mq.matches);

    onResize();
    mq.addEventListener("change", onResize);
    return () => mq.removeEventListener("change", onResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onScroll = () => {
      setIsVisible(window.scrollY >= SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="sticky-social"
          aria-label="Social media links"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
        >
          <ul className="sticky-social__list">
            {links.map((item, index) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
              >
                <motion.a
                  href={item.href}
                  className={`sticky-social__btn sticky-social__btn--${item.icon}`}
                  style={
                    item.color !== "instagram"
                      ? { "--social-color": item.color }
                      : undefined
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${item.label}`}
                  title={item.label}
                  whileHover={{ y: -6, scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                >
                  <SocialIcon icon={item.icon} />
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default StickySocialBar;
