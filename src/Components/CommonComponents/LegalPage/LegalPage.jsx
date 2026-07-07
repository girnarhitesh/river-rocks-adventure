import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./LegalPage.css";

const LegalPage = ({ content }) => {
  return (
    <main className="legal-page">
      <div className="MaxWidthContainer MarginAuto legal-page__inner">
        <motion.div
          className="legal-page__card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/" className="legal-page__back">
            ← Back to Home
          </Link>

          <header className="legal-page__header">
            <span className="legal-page__tag">Legal</span>
            <h1>{content.title}</h1>
            {content.effectiveDate && (
              <p className="legal-page__date">
                <strong>Effective Date:</strong> {content.effectiveDate}
              </p>
            )}
            {content.intro && <p className="legal-page__intro">{content.intro}</p>}
          </header>

          <span className="legal-page__accent" aria-hidden="true" />

          <div className="legal-page__body">
            {content.sections.map((section) => (
              <section key={section.title} className="legal-page__section">
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default LegalPage;
