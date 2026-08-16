import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
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
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBookingModal } = useBookingModal();
  const isMobile = useIsMobile();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > data.scrollThreshold);
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleBookNow = () => {
    closeMenu();
    openBookingModal();
  };

  return (
    <motion.header
      className={`site-header ${scrolled ? "site-header--scrolled" : ""} ${
        menuOpen ? "site-header--menu-open" : ""
      }`}
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
        <Link
          to={data.logo.href}
          className="site-header__logo-link"
          aria-label={data.logo.alt}
          onClick={closeMenu}
        >
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

        <nav className="site-header__nav site-header__nav--desktop" aria-label="Main navigation">
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
          className="site-header__cta site-header__cta--desktop"
          onClick={() => openBookingModal()}
          animate={{
            paddingBlock: scrolled ? 9 : 12,
            paddingInline: scrolled ? 20 : 26,
            scale: scrolled ? 0.96 : 1,
          }}
          whileHover={{ scale: scrolled ? 1 : 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {data.cta.label}
        </motion.button>

        <button
          type="button"
          className={`site-header__menu-btn${menuOpen ? " site-header__menu-btn--open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="site-header__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={closeMenu}
            />
            <motion.nav
              id="mobile-nav"
              className="site-header__drawer"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="site-header__drawer-list">
                <li>
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      `site-header__drawer-link${isActive ? " site-header__drawer-link--active" : ""}`
                    }
                    onClick={closeMenu}
                  >
                    Home
                  </NavLink>
                </li>
                {data.navigation.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `site-header__drawer-link${isActive ? " site-header__drawer-link--active" : ""}`
                      }
                      onClick={closeMenu}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <button type="button" className="site-header__drawer-cta" onClick={handleBookNow}>
                {data.cta.label}
              </button>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
