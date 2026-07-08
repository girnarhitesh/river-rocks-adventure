import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import HeaderData from "./HeaderData";
import { useBookingModal } from "../BookingModal/BookingModalContext";
import "./Header.css";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
};

const Header = ({ data = HeaderData }) => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const { openBookingModal } = useBookingModal();
  const isMobile = useIsMobile();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > data.scrollThreshold);
  });

  return (
    <motion.header
      className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}
      initial={false}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="site-header__inner MaxWidthContainer MarginAuto"
        animate={{
          paddingTop: scrolled ? (isMobile ? 6 : 8) : isMobile ? 10 : 16,
          paddingBottom: scrolled ? (isMobile ? 6 : 8) : isMobile ? 10 : 16,
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Link to={data.logo.href} className="site-header__logo-link" aria-label={data.logo.alt}>
          <motion.img
            src={data.logo.src}
            alt={data.logo.alt}
            className="site-header__logo"
            animate={{
              height: scrolled ? (isMobile ? 36 : 42) : isMobile ? 46 : 68,
            }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            draggable={false}
          />
        </Link>

        <nav className="site-header__nav" aria-label="Main navigation">
          <ul className="site-header__nav-list">
            {data.navigation.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `site-header__nav-link${isActive ? " site-header__nav-link--active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <motion.button
          type="button"
          className="site-header__cta"
          onClick={() => openBookingModal()}
          animate={{
            paddingBlock: scrolled ? (isMobile ? 7 : 9) : isMobile ? 9 : 12,
            paddingInline: scrolled ? (isMobile ? 12 : 20) : isMobile ? 14 : 26,
            scale: scrolled ? 0.96 : 1,
          }}
          whileHover={{ scale: scrolled ? 1 : 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {data.cta.label}
        </motion.button>
      </motion.div>
    </motion.header>
  );
};

export default Header;
