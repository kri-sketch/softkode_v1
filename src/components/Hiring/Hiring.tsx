import React, { useEffect, useMemo, useState } from "react";
import styles from "./Hiring.module.css";
import initReveal from "../../shared/hooks/useReveal";
import StepCard from "./StepCard";
import FeatureCard from "./FeatureCard";
import { FaCircle, FaCheckCircle } from "react-icons/fa";

const Hiring: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = useMemo(
    () => ["Sourcing", "Screening", "Matching", "Onboarding"],
    [],
  );

  useEffect(() => {
    initReveal();
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStep((value) => (value + 1) % steps.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [steps.length]);

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
              <h3>Candidate Flow & Screening Animation</h3>
              <p>
                Live process simulation: sourcing ➜ screening ➜ matching ➜
                onboarding. The current step is automatically highlighted.
              </p>
            </div>

            <div className={styles.processingFlow}>
              {steps.map((label, idx) => {
                const isActive = idx === activeStep;
                const isDone = idx < activeStep;

                return (
                  <div
                    key={label}
                    className={`${styles.processingStep} ${
                      isActive ? styles.activeStep : ""
                    } ${isDone ? styles.doneStep : ""}`}
                  >
                    <div className={styles.stepPulse} />
                    <div className={styles.stepLabel}>
                      {isDone ? <FaCheckCircle /> : <FaCircle />}
                      <span>{label}</span>
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

            <div className={styles.processingBarWrap}>
              <div
                className={styles.processingBar}
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
              <div className={styles.processingPulse} />
            </div>
          </div>

          <div className={styles.processCol} aria-hidden={false}>
            <StepCard
              number={1}
              title="Sourcing"
              desc="Targeted outreach and talent pools."
              delay={80}
            />
            <StepCard
              number={2}
              title="Screening"
              desc="Technical tests and live challenges."
              delay={160}
            />
            <StepCard
              number={3}
              title="Matching"
              desc="Culture and skill fit for your team."
              delay={240}
            />
            <StepCard
              number={4}
              title="Onboarding"
              desc="Smooth ramp and periodic check-ins."
              delay={320}
            />
          </div>
          <button
            className="btn cardBtn"
            onClick={() => window.location.assign("/contact")}
          >
            Talk to us
          </button>
        </div>

        <div className={styles.cards}>
          <FeatureCard
            title="Partner with us"
            text={
              "Create strategic hiring partnerships and scale teams rapidly with our vetted talent."
            }
            cta="Partner"
            href="/ourstory"
            delay={140}
          />
          <FeatureCard
            title="Hire vetted resources"
            text={
              "Access screened developers and engineers matched to your technical needs and culture."
            }
            cta="Hire now"
            href="/contact"
            delay={220}
          />
          <FeatureCard
            title="Developer screening"
            text={
              "We perform coding rounds, technical interviews and live challenges to ensure quality and fit."
            }
            cta="Learn more"
            href="/services"
            delay={300}
          />
        </div>
      </div>
    </section>
  );
};

export default Hiring;
