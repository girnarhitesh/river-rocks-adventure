import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CompanyContentData from "./CompanyContentData";
import "./CompanyContent.css";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const TextBlock = ({ tag, title, paragraphs }) => (
  <div className="company-content__text">
    {tag && <span className="company-content__tag">{tag}</span>}
    <h2>{title}</h2>
    {paragraphs.map((text) => (
      <p key={text.slice(0, 32)}>{text}</p>
    ))}
  </div>
);

const AboutCombined = ({ data, whoWeAre, whyUs }) => {
  const [activeTab, setActiveTab] = useState("who");

  const tabs = [
    { id: "who", label: whoWeAre.title, tag: whoWeAre.tag, paragraphs: whoWeAre.paragraphs },
    { id: "why", label: whyUs.title, tag: whyUs.tag, paragraphs: whyUs.paragraphs },
  ];

  const activeContent = tabs.find((tab) => tab.id === activeTab);

  return (
    <motion.article
      id={data.id}
      className="about-combined"
      {...fadeUp}
    >
      <span className="about-combined__watermark" aria-hidden="true">
        {data.watermark}
      </span>

      <div className="about-combined__grid">
        <div className="about-combined__visual">
          <motion.div
            className="about-combined__img about-combined__img--main"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={whoWeAre.image} alt={whoWeAre.imageAlt} loading="lazy" />
            <span className="about-combined__img-label">Adventure</span>
          </motion.div>

          <motion.div
            className="about-combined__img about-combined__img--sub"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          >
            <img src={whyUs.image} alt={whyUs.imageAlt} loading="lazy" />
            <span className="about-combined__img-label">India</span>
          </motion.div>

          <div className="about-combined__stats">
            {data.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="about-combined__stat"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="about-combined__content">
          <div className="about-combined__tabs" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`about-combined__tab ${activeTab === tab.id ? "about-combined__tab--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="about-combined__tab-num">
                  {tab.id === "who" ? "01" : "02"}
                </span>
                {tab.label}
              </button>
            ))}
          </div>

          <blockquote className="about-combined__quote">
            <span aria-hidden="true">"</span>
            {data.pullQuote}
          </blockquote>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="about-combined__panel"
              role="tabpanel"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <span className="company-content__tag">{activeContent.tag}</span>
              <h2>{activeContent.label}</h2>
              {activeContent.paragraphs.map((text) => (
                <p key={text.slice(0, 40)}>{text}</p>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
};

const WhyChooseSection = ({ data }) => {
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.article
      id={data.id}
      className="why-choose"
      {...fadeUp}
    >
      <span className="why-choose__watermark" aria-hidden="true">
        {data.watermark}
      </span>
      <div className="why-choose__glow" aria-hidden="true" />

      <div className="why-choose__header">
        <div className="why-choose__header-copy">
          <span className="why-choose__tag">{data.tag}</span>
          <h2>{data.title}</h2>
          <p>{data.subtitle}</p>
        </div>
        <motion.div
          className="why-choose__logo-wrap"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={data.image} alt={data.imageAlt} loading="lazy" />
        </motion.div>
      </div>

      <motion.ul
        className="why-choose__grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {data.highlights.map((item, index) => (
          <motion.li
            key={item.num}
            className={`why-choose__card ${index % 3 === 1 ? "why-choose__card--accent" : ""}`}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <span className="why-choose__card-num">{item.num}</span>
            <p>{item.text}</p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.article>
  );
};

const CompanyContent = ({ data = CompanyContentData }) => {
  return (
    <section id="company-content" className="company-content">
      <div className="MaxWidthContainer MarginAuto company-content__wrap">
        <AboutCombined
          data={data.aboutCombined}
          whoWeAre={data.whoWeAre}
          whyUs={data.whyUs}
        />

        <motion.article
          id={data.trust.id}
          className="company-content__block company-content__block--full"
          {...fadeUp}
        >
          <TextBlock
            tag={data.trust.tag}
            title={data.trust.title}
            paragraphs={data.trust.paragraphs}
          />
        </motion.article>

        <WhyChooseSection data={data.whyChoose} />
      </div>
    </section>
  );
};

export default CompanyContent;
