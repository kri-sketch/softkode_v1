import React, { useEffect, useMemo, useState } from "react";
import styles from "./Hiring.module.css";
import initReveal from "../../shared/hooks/useReveal";
import StepCard from "./StepCard";
import { FaCircle, FaCheckCircle } from "react-icons/fa";

const Hiring: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = useMemo(
    () => [
      {
        title: "Sourcing",
        desc: "Build a funnel from enterprise-ready sourcing channels.",
      },
      {
        title: "Screening",
        desc: "Technical and culture fit review on all short-listed profiles.",
      },
      {
        title: "Matching",
        desc: "Data-driven matching to role, team, and project goals.",
      },
      {
        title: "Onboarding",
        desc: "Smooth client-vendor onboarding with SLA and compliance.",
      },
    ],
    [],
  );

  useEffect(() => {
    initReveal();
  }, []);

  useEffect(() => {
  const delay = activeStep === steps.length - 1 ? 2000 : 4200;
    const timer = window.setTimeout(() => {
      setActiveStep((value) => (value + 1) % steps.length);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [activeStep, steps.length]);

  return (
    <section className={styles.hiringSection} id="hiring" data-reveal>
      <div className={styles.hiringInner}>
        <div className={styles.headingWrap}>
          <div className={styles.eyebrow}>We hire &amp; partner</div>
          <h2 className={styles.title}>
            Hiring for Partners & Vetted Resources
          </h2>
          <p className={styles.lead}>
            We provide hand-picked engineers and teams to enterprise partners —
            over 50+ resources delivered to leading firms. Our multi-stage
            screening and coding rounds ensure every talent performs at the
            highest standards.
          </p>

          <div className={styles.processingPanel}>
            <div className={styles.processingHeader}>
              <h3>Candidate Flow & Screening Process</h3>
            </div>

            <div className={styles.processingFlow}>
              {steps.map((step, idx) => {
                const isActive = idx === activeStep;
                const isDone = idx < activeStep;

                return (
                  <div
                    key={step.title}
                    className={`${styles.processingStep} ${
                      isActive ? styles.activeStep : ""
                    } ${isDone ? styles.doneStep : ""}`}
                  >
                    <div className={styles.stepPulse} />
                    <div className={styles.stepLabel}>
                      {isDone ? <FaCheckCircle /> : <FaCircle />}
                      <span>{step.title}</span>
                    </div>
                    <div className={styles.stepStatus}>
                      {isActive
                        ? "Processing..."
                        : isDone
                          ? "Completed"
                          : "Waiting"}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className={styles.processingBarWrap}
              style={{ "--tmp": activeStep } as React.CSSProperties}
            >
              <div
                className={styles.processingBar}
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
              <div className={styles.processingPulse} />
            </div>

            <div className={styles.cards}>
              {steps.map((step, idx) => (
                <StepCard
                  key={`${step.title}-${idx}`}
                  number={idx + 1}
                  title={step.title}
                  desc={step.desc}
                  delay={idx * 80}
                />
              ))}
            </div>
          </div>

          <div className={styles.primaryCtaGroup}>
            <button
              className="btn cardBtn"
              onClick={() => window.location.assign("/contact")}
            >
              Hire Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hiring;
