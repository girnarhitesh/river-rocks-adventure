import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FooterData from "./FooterData";
import SocialIcon from "../SocialIcon/SocialIcon";
import { useBookingModal } from "../BookingModal/BookingModalContext";
import "./Footer.css";

const ease = [0.22, 1, 0.36, 1];

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease },
  },
};

const FooterLink = ({ href, children }) =>
  href.startsWith("/") ? <Link to={href}>{children}</Link> : <a href={href}>{children}</a>;

const Footer = ({ data = FooterData }) => {
  const { openBookingModal } = useBookingModal();
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="site-footer">
      <span className="site-footer__accent" aria-hidden="true" />

      <div className="MaxWidthContainer MarginAuto site-footer__inner">
        <motion.div
          className="site-footer__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.div className="site-footer__brand" variants={columnVariants}>
            <a href="/" className="site-footer__logo-link" aria-label={data.brand.alt}>
              <img
                src={data.brand.logo}
                alt={data.brand.alt}
                className="site-footer__logo"
                loading="lazy"
              />
            </a>
            <span className="site-footer__tag">{data.brand.tagline}</span>
            <p className="site-footer__brand-text">{data.brand.description}</p>

            <div className="site-footer__social">
              {data.social.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="site-footer__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${item.label}`}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.18 }}
                >
                  <SocialIcon icon={item.icon} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div className="site-footer__column" variants={columnVariants}>
            <h3 className="site-footer__heading">Quick Links</h3>
            <ul className="site-footer__links">
              {data.quickLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="site-footer__book-link"
                  onClick={() => openBookingModal()}
                >
                  Book Now
                </button>
              </li>
            </ul>
          </motion.div>

          <motion.div className="site-footer__column site-footer__column--activities" variants={columnVariants}>
            <h3 className="site-footer__heading">Rishikesh Rafting</h3>
            <ul className="site-footer__links">
              {data.raftingLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="site-footer__column site-footer__column--activities" variants={columnVariants}>
            <h3 className="site-footer__heading">Bungee Jump</h3>
            <ul className="site-footer__links">
              {data.bungeeLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="site-footer__column site-footer__column--contact" variants={columnVariants}>
            <h3 className="site-footer__heading">Contact</h3>
            <ul className="site-footer__contact">
              <li>
                <span className="site-footer__contact-label">Address</span>
                <span>{data.contact.address}</span>
              </li>
              <li>
                <span className="site-footer__contact-label">Call Us</span>
                <span className="site-footer__contact-phones">
                  {data.contact.phones.map((phone) => (
                    <a key={phone.href} href={`tel:${phone.href}`}>
                      {phone.display}
                    </a>
                  ))}
                </span>
              </li>
              <li>
                <span className="site-footer__contact-label">Mail Us</span>
                <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
              </li>
            </ul>

            <motion.button
              type="button"
              className="site-footer__cta"
              onClick={() => openBookingModal()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Adventure Now
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="site-footer__seo"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease, delay: 0.1 }}
        >
          <p>{data.seoText}</p>
        </motion.div>

        <div className="site-footer__divider" aria-hidden="true" />

        <div className="site-footer__bottom">
          <div className="site-footer__bottom-left">
            <p className="site-footer__copyright">
              © {year} {data.companyName}. All rights reserved.
            </p>
            <nav className="site-footer__legal" aria-label="Legal links">
              {data.legal.map((item) => (
                <Link key={item.label} to={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="site-footer__powered">
            <span className="site-footer__powered-label">{data.poweredBy.label}</span>
            <a
              href={data.poweredBy.href}
              className="site-footer__powered-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${data.poweredBy.label} ${data.poweredBy.alt}`}
            >
              <img
                src={data.poweredBy.logo}
                alt={data.poweredBy.alt}
                className="site-footer__powered-logo"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
