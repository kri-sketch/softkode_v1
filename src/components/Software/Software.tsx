import React from "react";
import styles from "./Software.module.css";

const Software: React.FC = () => {
  return (
    <div className={styles.aboutContainer}>
      {/* Belief Section */}
      <section className={styles.beliefSection}>
        <h2 className={styles.beliefFaded}>We believe</h2>
        <h3 className={styles.beliefText}>
          “Streamlined processes boost <span className={styles.highlight}>efficiency</span> and <span className={styles.highlight}>productivity</span>.”
        </h3>

        <div className={styles.progressBar}>
          <div className={styles.progressFilled}></div>
        </div>
        <p className={styles.progressLabel}>Discovery <br /> and <br /> planning</p>
      </section>

      {/* Software Providers Section */}
      <section className={styles.softwareSection}>
        <h2 className={styles.softwareHeading}>
          Our trusted <span className={styles.highlight}>software</span> providers
        </h2>

        <div className={styles.grid}>
          {[
            "React",
            "Git",
            "Google Cloud",
            "Figma",
            "AWS",
            "Docker",
            "Visual Studio Code",
          ].map((tool, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.iconPlaceholder}></div>
              <p>{tool}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Software;
