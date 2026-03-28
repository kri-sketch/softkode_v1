import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Hiring.module.css";
import initReveal from "../../shared/hooks/useReveal";

// --- Data Models ---
const STEPS = [
  { title: "Sourcing", desc: "Build a funnel from enterprise-ready channels." },
  { title: "Screening", desc: "Technical & culture fit review on all profiles." },
  { title: "Matching", desc: "Data-driven matching to role & team goals." },
  { title: "Onboarding", desc: "Smooth onboarding with SLA and compliance." },
];

const IMPACT_STATS = [
  { id: 1, icon: "✔️", title: "Top hires", value: "50+", subtitle: "₹6L–₹50L package wins" },
  { id: 2, icon: "🌟", title: "Selected candidates", value: "50+", subtitle: "Vetted elite profiles" },
  { id: 5, icon: "⏱️", title: "Avg time to hire", value: "2 Weeks", subtitle: "Efficient delivery" },
  { id: 3, icon: "🌍", title: "Global clients", value: "100+", subtitle: "Enterprise partner network" },
  { id: 4, icon: "💼", title: "Salary span", value: "₹6L - ₹50L", subtitle: "Early to leadership grades" },
  { id: 6, icon: "🎯", title: "Retention rate", value: "92%", subtitle: "Sustained success" },
  { id: 7, icon: "🤝", title: "Diversity coverage", value: "40%", subtitle: "Inclusive talent pools" },
  { id: 8, icon: "📊", title: "Quality checks", value: "100%", subtitle: "Compliance completed" },
];

// --- Sub-components ---

const HiringHeader = () => (
  <header className={styles.headingWrap}>
    <div className={styles.eyebrow}>We hire &amp; partner</div>
    <h2 className={styles.title}>Hiring for Partners & Vetted Resources</h2>
    <p className={styles.lead}>
      Hand-picked engineering teams for enterprise partners, with 50+ placements.
      Rigorous multi-stage screening and coding validation at every phase.
    </p>

    <div className={styles.principlesContainer}>
      <h3 className={styles.principlesTitle}>Hiring Excellence Principles</h3>
      <ul className={styles.principlesList}>
        <li>Governed sourcing: verified pipelines with diversity and compliance.</li>
        <li>Data-backed evaluation: technical scorecards + culture fit.</li>
        <li>Outcome commitment: SLA-backed delivery and retention guarantees.</li>
        <li>Strategic enablement: reskilling pathways and transition support.</li>
      </ul>
    </div>
  </header>
);

const ProcessFlowPanel = ({ activeStep, steps }: { activeStep: number; steps: typeof STEPS }) => (
  <div className={styles.processingPanelInner}>
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
            className={`${styles.processingStep} ${isActive ? styles.activeStep : ""} ${isDone ? styles.doneStep : ""}`}
          >
            {isActive && <div className={styles.stepPulse} />}
            <div className={`${styles.stepLabel} ${isActive ? styles.activeStepLabel : isDone ? styles.doneStepLabel : styles.waitingStepLabel}`}>
              <span className={styles.stepTail} />
              <span>{step.title}</span>
            </div>
            <div className={styles.stepStatus}>
              {isActive ? "Processing..." : isDone ? "Completed" : "Waiting"}
            </div>
          </div>
        );
      })}
    </div>
    <div className={styles.processingBarWrap} style={{ "--tmp": activeStep } as React.CSSProperties}>
      <div className={styles.processingBar} style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} />
      <div className={styles.processingPulseIndicator} />
    </div>
  </div>
);

const MetricsDetailedPanel = () => (
  <div className={styles.metricDetailedWrap}>
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
      <p>A modern treatment of all major hiring outcomes with real-time insights</p>
      <ul>
        <li>Transparent reporting for every stage of candidate qualification.</li>
        <li>Continuous improvement via quarterly skill-gap analysis.</li>
        <li>Client alignment checks at key milestones for retention outcomes.</li>
      </ul>
    </div>

    <div className={styles.unifiedMetricCard}>
      <div className={styles.metricCardGrid}>
        {IMPACT_STATS.map((item) => (
          <article className={styles.unifiedImpactCard} key={item.id}>
            <div className={styles.unifiedCardHeader}>
              <div className={styles.unifiedIcon}>{item.icon}</div>
              <div className={styles.unifiedStar}>⭐⭐⭐</div>
            </div>
            <div className={styles.unifiedCardBody}>
              <h3 className={styles.unifiedCardTitle}>{item.title}</h3>
              <p className={styles.unifiedCardValue}>{item.value}</p>
              <p className={styles.unifiedCardSub}>{item.subtitle}</p>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.compactContentSection}>
        <div className={styles.compensationColumn}>
          <h5 className={styles.compactSectionTitle}>💰 Compensation</h5>
          <div className={styles.compactChipGroup}>
            <div className={styles.compactChip}>
              <span className={styles.compactChipLabel}>Top Performers</span>
              <span className={styles.compactChipBadge}>50+</span>
            </div>
            <div className={styles.compactChip}>
              <span className={styles.compactChipLabel}>Early-Career</span>
              <span className={styles.compactChipValue}>6L-12L</span>
            </div>
            <div className={styles.compactChip}>
              <span className={styles.compactChipLabel}>Mid-Senior</span>
              <span className={styles.compactChipValue}>12L-30L</span>
            </div>
            <div className={styles.compactChip}>
              <span className={styles.compactChipLabel}>Leadership</span>
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
);

// --- Main Container ---
const Hiring: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    initReveal();
  }, []);

  useEffect(() => {
    const stepInterval = 1200;
    const timer = window.setTimeout(() => {
      setActiveStep((prev) => {
        const next = prev + direction;
        if (next >= STEPS.length - 1) {
          setDirection(-1);
          return STEPS.length - 1;
        }
        if (next <= 0 && direction === -1) {
          setDirection(1);
          return 1;
        }
        return next;
      });
    }, stepInterval);
    return () => window.clearTimeout(timer);
  }, [activeStep, direction]);

  return (
    <section className={styles.hiringSection} id="hiring" data-reveal>
      <div className={styles.hiringInner}>
        <HiringHeader />

        <div className={styles.processingPanelOuter}>
          <ProcessFlowPanel activeStep={activeStep} steps={STEPS} />

          <div className={styles.metricPanelContainer}>
            <MetricsDetailedPanel />
          </div>
        </div>

        <div className={styles.ctaContainer}>
          <button className={styles.primaryCta} onClick={() => navigate("/contact")}>
            <span className={styles.ctaText}>Start Hiring Today</span>
            <span className={styles.ctaArrow}>→</span>
          </button>
          <p className={styles.ctaSubtext}>
            Connect with our talent experts and simplify your hiring process
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hiring;
