// src/components/CaseStudy/CaseStudy.tsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CASE_STUDIES } from "../../shared/constants/caseStudyConstant";
import styles from "./CaseStudy.module.css";
import BackButton from "../../shared/BackButton/BackButton";
import initReveal from "../../shared/hooks/useReveal";

const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const study = CASE_STUDIES.find((s) => s.id === id);

  useEffect(() => {
    initReveal();
    window.scrollTo(0, 0);
  }, [id]);

  if (!study) {
    return (
      <div className={styles.notFound}>
        <h2>Case Study Not Found</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <BackButton />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBgBlur}></div>
        <div className={styles.container}>
          <div className={styles.heroContent} data-reveal>
            <span className={styles.categoryTag}>{study.category}</span>
            <h1 className={styles.mainTitle}>{study.title}</h1>
            <p className={styles.briefText}>{study.brief}</p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {study.stats.map((stat, index) => (
              <div key={index} className={styles.statCard} data-reveal>
                <h3 className={styles.statValue}>{stat.value}</h3>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className={styles.narrativeSection}>
        <div className={styles.container}>
          <div className={styles.narrativeGrid}>
            <div className={styles.narrativeBlock} data-reveal>
              <h2 className={styles.sectionHeading}>The Challenge</h2>
              <p className={styles.sectionText}>{study.challenge}</p>
            </div>
            <div className={styles.narrativeBlock} data-reveal>
              <h2 className={styles.sectionHeading}>Our Solution</h2>
              <p className={styles.sectionText}>{study.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Excellence */}
      <section className={styles.techSection}>
        <div className={styles.container}>
          <div className={styles.techHub} data-reveal>
            <h2 className={styles.sectionHeadingCenter}>Technical Excellence</h2>
            <div className={styles.techGrid}>
              {study.techStack.map((tech, index) => (
                <div key={index} className={styles.techItem}>
                  <span className={styles.techIcon}>{tech.icon}</span>
                  <span className={styles.techName}>{tech.name}</span>
                </div>
              ))}
            </div>
            <div className={styles.outcomeBox} data-reveal>
               <h3 className={styles.outcomeHeading}>Final Outcome</h3>
               <p className={styles.outcomeText}>{study.outcome}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaBox} data-reveal>
            <h2>Ready to build your next success story?</h2>
            <button className={styles.primaryBtn} onClick={() => navigate("/contact")}>
              Hire Us Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudy;
