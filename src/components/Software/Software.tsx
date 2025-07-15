import React, { useEffect, useState } from "react";
import styles from "./Software.module.css";
import {
  BELIEF_TEXT,
  SOFTWARE_TOOLS,
  PROGRESS_LABEL,
} from "../../shared/constants/softwareConstant.ts";

const Software: React.FC = () => {
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    let step = 0;

    const interval = setInterval(() => {
      if (step < PROGRESS_LABEL.length) {
        setActiveStep(step);
        step += 1;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const progressPercent =
    (activeStep / (PROGRESS_LABEL.length - 1)) * 100 || 0;

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

        {/* Progress Bar with moving dot */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFilled}
            style={{ width: `calc(${progressPercent}% ` }}
          />
          <div
            className={styles.progressDot}
            style={{
  left: activeStep <= 0
    ? "0%"
    : `calc(${progressPercent}% - 7px)`
}}

          />
        </div>

        {/* Labels */}
        <div className={styles.progressLabels}>
          {PROGRESS_LABEL.map((label, index) => (
            <span
              key={index}
              className={`${styles.progressLabel} ${
                index <= activeStep ? styles.labelVisible : ""
              }`}
            >
              {label}
            </span>
          ))}
        </div>
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
