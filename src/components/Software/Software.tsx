import React, { useEffect, useState } from "react";
import styles from "./Software.module.css";
import {
  BELIEF_TEXT,
  PROGRESS_LABEL,
} from "../../shared/constants/softwareConstant.ts";

import reactlogo from "../../shared/image/react.png";
import gitlogo from "../../shared/image/git.png";
import awslogo from "../../shared/image/aws.png";
import figmalogo from "../../shared/image/figma.png";
import dockerlogo from "../../shared/image/docker.png";
import vscode from "../../shared/image/vscode.png";
import cloudlogo from "../../shared/image/cloud.png";

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

  const progressPercent = (activeStep / (PROGRESS_LABEL.length - 1)) * 100 || 0;

  return (
    <div className={`container ${styles.aboutContainer}`}>
      {/* Belief Section */}
      <section className={styles.beliefSection}>
        <h2 className={styles.beliefFaded}>We believe</h2>

        <h3 className={styles.beliefText}>
          “
          {BELIEF_TEXT.split(" ").map((word, i) => {
            const needsHighlight =
              word === "efficiency" || word === "productivity";
            return needsHighlight ? (
              <span key={i} className={styles.highlight}>
                {word}&nbsp;
              </span>
            ) : (
              <span key={i}>{word}&nbsp;</span>
            );
          })}
          ”
        </h3>

        {/* Progress Bar with moving dot */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFilled}
            style={{ width: `calc(${progressPercent}%` }}
          />
          <div
            className={styles.progressDot}
            style={{
              left: activeStep <= 0 ? "0%" : `calc(${progressPercent}% - 19px)`,
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
              {label.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </span>
          ))}
        </div>
      </section>

      {/* Software Providers Section */}
      <section className={styles.softwareSection}>
        <h2 className={styles.softwareHeading}>
          Our trusted <span className={styles.highlight}>software</span>{" "}
          providers
        </h2>

        <div className={styles.iconDiamondGrid}>
          <div className={styles.row}>
            <div className={styles.card}>
              <img
                src={reactlogo}
                alt="React Logo"
                className={styles.iconImage}
              />
              <div className={styles.iconText}>React</div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.card}>
              <img src={gitlogo} alt="Git Logo" className={styles.iconImage} />
              <div className={styles.iconText}>Git</div>
            </div>
            <div className={styles.card}>
              <img src={awslogo} alt="AWS Logo" className={styles.iconImage} />
              <div className={styles.iconText}>AWS</div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.card}>
              <img
                src={cloudlogo}
                alt="Cloud Logo"
                className={styles.iconImage}
              />
              <div className={styles.iconText}>Google Cloud</div>
            </div>
            <div className={styles.card}>
              <img
                src={dockerlogo}
                alt="Docker Logo"
                className={styles.iconImage}
              />
              <div className={styles.iconText}>Docker</div>
            </div>
            <div className={styles.card}>
              <img
                src={vscode}
                alt="VSCode Logo"
                className={styles.iconImage}
              />
              <div className={styles.iconText}>Visual Studio Code</div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.card}>
              <img
                src={figmalogo}
                alt="Figma Logo"
                className={styles.iconImage}
              />
              <div className={styles.iconText}>Figma</div>
            </div>
            <div className={styles.card}>
              <img
                src={reactlogo}
                alt="React Logo"
                className={styles.iconImage}
              />
              <div className={styles.iconText}>Visual Studio Code</div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.card}>
              <img
                src={reactlogo}
                alt="React Logo"
                className={styles.iconImage}
              />
              <div className={styles.iconText}>Visual Studio Code</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Software;
