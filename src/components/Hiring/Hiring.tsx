import React, { useEffect, useMemo, useState } from "react";
import styles from "./Hiring.module.css";
import initReveal from "../../shared/hooks/useReveal";

const Hiring: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

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

  const impactStats = useMemo(
    () => [
      {
        id: 1,
        icon: "✔️",
        title: "Top hires",
        value: "50+",
        subtitle: "₹6L–₹50L package wins",
        tags: [
          "Certified top performer",
          "Structured success process",
          "Shortlist excellence",
        ],
      },
      {
        id: 2,
        icon: "🌟",
        title: "Selected candidates",
        value: "50+",
        subtitle: "Vetted elite profiles",
        tags: [
          "Quality assessment",
          "Coding & behavioral fit",
          "Interview-ready talent",
        ],
      },
      {
        id: 3,
        icon: "🌍",
        title: "Global clients",
        value: "100+",
        subtitle: "Enterprise partner network",
        tags: [
          "International scale",
          "Sector-driven specialization",
          "Global team delivery",
        ],
      },
      {
        id: 4,
        icon: "💼",
        title: "Salary span",
        value: "₹6L - ₹50L",
        subtitle: "Early to leadership grades",
        tags: [
          "6L - 12L Early career",
          "12L - 30L Mid-senior",
          "30L - 50L Chief roles",
        ],
      },
    ],
    [],
  );

  useEffect(() => {
    initReveal();
  }, []);

  useEffect(() => {
    const stepInterval = 1200; // Each step displays for 1.2 seconds
    const timer = window.setTimeout(() => {
      setActiveStep((prev) => {
        const next = prev + direction;

        // If we reach the last step, reverse direction
        if (next >= steps.length - 1) {
          setDirection(-1);
          return steps.length - 1;
        }

        // If we reach the first step going backward, restart cycle and jump to step 1
        if (next <= 0 && direction === -1) {
          setDirection(1); // Change direction to forward
          return 1; // Skip 0, jump to 1 to immediately restart forward motion
        }

        return next;
      });
    }, stepInterval);

    return () => window.clearTimeout(timer);
  }, [activeStep, direction, steps.length]);

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
                    <div
                      className={`${styles.stepLabel} ${isActive ? styles.activeStepLabel : isDone ? styles.doneStepLabel : styles.waitingStepLabel}`}
                    >
                      <span className={styles.stepTail} />
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

            <div className={styles.metricPanel}>
              <div className={styles.metricHead}>
                <div className={styles.metricBadge}>🏆</div>
                <div className={styles.metricHeadContent}>
                  <h3>Top-tier Talent Track Record</h3>
                  <p>
                    50+ high-impact hires delivered with verified quality across
                    global teams, salary ranges, and leadership tracks.
                  </p>
                </div>
              </div>

              <div className={styles.impactIntro}>
                <div className={styles.introBadge}>🚀 Impact Snapshot</div>
                <h4>One view. Real metric-driven confidence.</h4>
                <p>
                  A modern treatment of all major hiring outcomes with real-time
                  insights
                </p>
              </div>

              <div className={styles.unifiedMetricCard}>
                <div className={styles.metricCardGrid}>
                  {impactStats.map((item) => (
                    <article className={styles.unifiedImpactCard} key={item.id}>
                      <div className={styles.unifiedCardHeader}>
                        <div className={styles.unifiedIcon}>{item.icon}</div>
                        <div className={styles.unifiedStar}>⭐⭐⭐</div>
                      </div>
                      <div className={styles.unifiedCardBody}>
                        <h3 className={styles.unifiedCardTitle}>
                          {item.title}
                        </h3>
                        <p className={styles.unifiedCardValue}>{item.value}</p>
                        <p className={styles.unifiedCardSub}>{item.subtitle}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className={styles.compactContentSection}>
                  <div className={styles.compensationColumn}>
                    <h5 className={styles.compactSectionTitle}>
                      💰 Compensation
                    </h5>
                    <div className={styles.compactChipGroup}>
                      <div className={styles.compactChip}>
                        <span className={styles.compactChipLabel}>
                          Top Performers
                        </span>
                        <span className={styles.compactChipBadge}>50+</span>
                      </div>
                      <div className={styles.compactChip}>
                        <span className={styles.compactChipLabel}>
                          Early-Career
                        </span>
                        <span className={styles.compactChipValue}>6L-12L</span>
                      </div>
                      <div className={styles.compactChip}>
                        <span className={styles.compactChipLabel}>
                          Mid-Senior
                        </span>
                        <span className={styles.compactChipValue}>12L-30L</span>
                      </div>
                      <div className={styles.compactChip}>
                        <span className={styles.compactChipLabel}>
                          Leadership
                        </span>
                        <span className={styles.compactChipValue}>30L-50L</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.highlightsColumn}>
                    <h5 className={styles.compactSectionTitle}>✨ Why Us</h5>
                    <div className={styles.compactHighlightGrid}>
                      <div className={styles.compactHighlight}>
                        <span className={styles.highlightEmoji}>✨</span>
                        <div className={styles.highlightContent}>
                          <strong>Quality</strong>
                          <p>Multi-stage screening</p>
                        </div>
                      </div>
                      <div className={styles.compactHighlight}>
                        <span className={styles.highlightEmoji}>🎯</span>
                        <div className={styles.highlightContent}>
                          <strong>Matching</strong>
                          <p>Data-driven alignment</p>
                        </div>
                      </div>
                      <div className={styles.compactHighlight}>
                        <span className={styles.highlightEmoji}>🚀</span>
                        <div className={styles.highlightContent}>
                          <strong>Deployment</strong>
                          <p>Quick onboarding</p>
                        </div>
                      </div>
                      <div className={styles.compactHighlight}>
                        <span className={styles.highlightEmoji}>🌍</span>
                        <div className={styles.highlightContent}>
                          <strong>Network</strong>
                          <p>100+ partners</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.ctaContainer}>
            <button
              className={styles.primaryCta}
              onClick={() => window.location.assign("/contact")}
            >
              <span className={styles.ctaText}>Start Hiring Today</span>
              <span className={styles.ctaArrow}>→</span>
            </button>
            <p className={styles.ctaSubtext}>
              Connect with our talent experts and simplify your hiring process
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hiring;
