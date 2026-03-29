// src/components/CaseStudy/CaseStudyList.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { CASE_STUDIES } from "../../shared/constants/caseStudyConstant";
import styles from "./CaseStudyList.module.css";

const CaseStudyList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.section} id="casestudies">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow} data-reveal>Our Success Stories</p>
          <h2 className={styles.title} data-reveal>Selected Case Studies</h2>
          <p className={styles.description}>
            Explore how we've helped global brands and startups build innovative digital products that scale.
          </p>
        </div>

        <div className={styles.grid}>
          {CASE_STUDIES.map((study) => (
            <div 
              key={study.id} 
              className={styles.card} 
              onClick={() => navigate(`/casestudy/${study.id}`)}
              data-reveal
            >
              <div className={styles.cardInfo}>
                <span className={styles.category}>{study.category}</span>
                <h3 className={styles.cardTitle}>{study.title}</h3>
                <p className={styles.cardBrief}>{study.brief}</p>
                <div className={styles.viewLink}>
                  View Case Study <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyList;
