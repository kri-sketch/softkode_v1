import React from "react";
import styles from "./OurStory.module.css";
import { FaLinkedin, FaInstagram } from "react-icons/fa6";

const tags = ["Custom Software", "Talent Delivery", "UI/UX Design", "Enterprise SaaS", "Hiring Solutions", "Digital Products"];

const OurStory: React.FC = () => {
  return (
    <section id="our-story" className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.left}>

          <p className="eyebrow" data-reveal>Our Identity</p>

          <h2 className={styles.heading} data-reveal>
            The Softkode Chronology
          </h2>

          <div className={styles.tagRow} data-reveal>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>

          <div className={styles.contentWrapper} data-reveal>
            <p>
              Founded in 2024 by <strong>Krishna Sharma</strong>, Softkode Technologies
              was built with a developer-first mindset — the belief that great software
              is crafted by engineers who think in systems, ship with precision, and build
              for scale. With deep roots in the IT sector, we set out to solve two
              interlinked problems: building exceptional digital products, and getting
              the right engineering talent to power them.
            </p>
            <p>
              On the software side, we deliver custom platforms, enterprise SaaS
              products, real-time dashboards, and end-to-end digital transformation —
              each engineered with production-grade quality and a clean, modern UX.
              On the talent side, our multi-stage hiring engine has placed 50+ vetted
              professionals across ₹6L–₹50L salary bands, with a 92% retention rate
              and 100+ global enterprise partners trusting our process.
            </p>
            <p>
              At Softkode, every line of code and every hire is backed by a commitment
              to measurable impact — SLA-driven, compliance-verified, and built to
              power the next generation of digital businesses.
            </p>
          </div>

          <div className={styles.footer} data-reveal>
            <div className={styles.icons}>
              <a
                href="https://www.linkedin.com/company/softkode/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://instagram.com/softkode.io/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
            <span className={styles.year}>EST 2024</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurStory;
