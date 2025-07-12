import React from "react";
import styles from "./Software.module.css";
import { BELIEF_TEXT, SOFTWARE_TOOLS, PROGRESS_LABEL } from "../../shared/constants/softwareConstant.ts";

const Software: React.FC = () => {
  return (
    <div className={styles.aboutContainer}>
      {/* Belief Section */}
      <section className={styles.beliefSection}>
        <h2 className={styles.beliefFaded}>We believe</h2>
        <h3 className={styles.beliefText}>
          “{BELIEF_TEXT.split(" ").map((word, i) =>
            word === "efficiency" || word === "productivity" ? (
              <span key={i} className={styles.highlight}>{word} </span>
            ) : (
              `${word} `
            )
          )}”
        </h3>

        <div className={styles.progressBar}>
          <div className={styles.progressFilled}></div>
        </div>
        <p className={styles.progressLabel}>
          {PROGRESS_LABEL.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </section>

      {/* Software Providers Section */}
      <section className={styles.softwareSection}>
        <h2 className={styles.softwareHeading}>
          Our trusted <span className={styles.highlight}>software</span> providers
        </h2>

        <div className={styles.grid}>
          {SOFTWARE_TOOLS.map((tool, index) => (
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
