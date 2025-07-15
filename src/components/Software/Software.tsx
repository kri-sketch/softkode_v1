import React, { useEffect, useState } from "react";
import styles from "./Software.module.css";
import {
  BELIEF_TEXT,
  SOFTWARE_TOOLS,
  PROGRESS_LABEL,
} from "../../shared/constants/softwareConstant.ts";

const Software: React.FC = () => {
  const [activeStep, setActiveStep] = useState(-1); // Start with -1 so the bar starts from 0
  // const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let step = 0;

    const interval = setInterval(() => {
      if (step < PROGRESS_LABEL.length) {
        setActiveStep(step);
        step += 1;
      } else {
        clearInterval(interval);
      }
    }, 1000); // Reveal one step every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.aboutContainer}>
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

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{
                width: `${(activeStep / (PROGRESS_LABEL.length - 1)) * 100}%`,
              }}
            ></div>
          </div>

          <div className={styles.progressSteps}>
            {PROGRESS_LABEL.map((label, index) => {
              const isActive = index <= activeStep;
              return (
                <div
                  key={index}
                  className={`${styles.progressStep} ${isActive ? styles.reveal : ""}`}
                >
                  <div
                    className={`${styles.dot} ${isActive ? styles.active : ""}`}
                  ></div>
                  <p className={styles.stepLabel}>{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Software Grid */}
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
