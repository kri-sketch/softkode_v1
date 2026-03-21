import React, { useEffect, useRef, useState } from "react";
import styles from "./Software.module.css";
import {
  BELIEF_TEXT,
  PROGRESS_LABEL,
} from "../../shared/constants/softwareConstant.ts";

import reactlogo from "../../shared/image/react.png";
import computerVision from "../../shared/image/computervision.jpg";
import angularlogo from "../../shared/image/Angular.png";
import awslogo from "../../shared/image/aws.png";
import figmalogo from "../../shared/image/figma.png";
import dockerlogo from "../../shared/image/docker.png";
import vscode from "../../shared/image/vscode.png";
import cloudlogo from "../../shared/image/cloud.png";
import gitlogo from "../../shared/image/git.png";
import pythonlogo from "../../shared/image/python_icon.png";
import sqllogo from "../../shared/image/sql.jpg";
import aimlIcon from "../../shared/image/AIMl icon.png";
import nlpIcon from "../../shared/image/Nlp icon.png";
import devopsIcon from "../../shared/image/devops.webp";
import kubeIcon from "../../shared/image/kube.png";

type NodeItem = {
  key: string;
  logo: string;
  name: string;
  sub: string;
  position:
    | "nodeTopLeft"
    | "nodeLeft"
    | "nodeBottomLeft"
    | "nodeTopRight"
    | "nodeRight"
    | "nodeBottomRight";
  lineColor: string;
};

const Software: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [connections, setConnections] = useState<
    { id: string; d: string; color: string }[]
  >([]);

  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    let timer = 0;

    const nextStep = () => {
      if (activeStep < 0) {
        setActiveStep(0);
        return;
      }

      if (activeStep < PROGRESS_LABEL.length - 1) {
        setActiveStep((prev) => prev + 1);
      } else {
        setActiveStep(0);
      }
    };

    const delay = activeStep === PROGRESS_LABEL.length - 1 ? 2000 : 1000;
    timer = window.setTimeout(nextStep, delay);

    return () => window.clearTimeout(timer);
  }, [activeStep]);

  const progressPercent = (activeStep / (PROGRESS_LABEL.length - 1)) * 100 || 0;

  const [activeSection, setActiveSection] = useState<
    "providers" | "technologies"
  >("providers");
  const [techSlide, setTechSlide] = useState(0);

  const providerNodes = React.useMemo<NodeItem[]>(
    () => [
      {
        key: "git",
        logo: gitlogo,
        name: "Git",
        sub: "Version Control",
        position: "nodeTopLeft",
        lineColor: "#ff4e58",
      },
      {
        key: "aws",
        logo: awslogo,
        name: "AWS",
        sub: "Cloud Platform",
        position: "nodeLeft",
        lineColor: "#ffa500",
      },
      {
        key: "docker",
        logo: dockerlogo,
        name: "Docker",
        sub: "Containerization",
        position: "nodeBottomLeft",
        lineColor: "#1a7df4",
      },
      {
        key: "cloud",
        logo: cloudlogo,
        name: "Google Cloud",
        sub: "Infrastructure",
        position: "nodeTopRight",
        lineColor: "#ff4c35",
      },
      {
        key: "figma",
        logo: figmalogo,
        name: "Figma",
        sub: "Design & Prototyping",
        position: "nodeRight",
        lineColor: "#aa33ff",
      },
      {
        key: "vscode",
        logo: vscode,
        name: "Visual Studio Code",
        sub: "Code Editor",
        position: "nodeBottomRight",
        lineColor: "#1ac298",
      },
    ],
    [],
  );

  const technologySets = React.useMemo<NodeItem[][]>(
    () => [
      [
        {
          key: "python",
          logo: pythonlogo,
          name: "Python",
          sub: "Scripting",
          position: "nodeTopLeft",
          lineColor: "#0077b6",
        },
        {
          key: "sql",
          logo: sqllogo,
          name: "SQL",
          sub: "Database",
          position: "nodeTopRight",
          lineColor: "#56cfe1",
        },
        {
          key: "aiml",
          logo: aimlIcon,
          name: "AI/ML",
          sub: "Intelligent Platforms",
          position: "nodeLeft",
          lineColor: "#ff4c65",
        },
        {
          key: "nlp",
          logo: nlpIcon,
          name: "NLP",
          sub: "Language Automation",
          position: "nodeBottomLeft",
          lineColor: "#9b5de5",
        },
        {
          key: "devops",
          logo: devopsIcon,
          name: "DevOps",
          sub: "CI/CD",
          position: "nodeRight",
          lineColor: "#ffb703",
        },
        {
          key: "kubernetes",
          logo: kubeIcon,
          name: "Kubernetes",
          sub: "Container Orchestration",
          position: "nodeBottomRight",
          lineColor: "#438cff",
        },
      ],
      [
        {
          key: "ml",
          logo: aimlIcon,
          name: "Machine Learning",
          sub: "Modeling",
          position: "nodeTopLeft",
          lineColor: "#ff4c65",
        },
        {
          key: "nlp",
          logo: nlpIcon,
          name: "NLP",
          sub: "Language",
          position: "nodeLeft",
          lineColor: "#9b5de5",
        },
        {
          key: "cv",
          logo: computerVision,
          name: "Computer Vision",
          sub: "Imaging",
          position: "nodeBottomLeft",
          lineColor: "#3f37c9",
        },
        {
          key: "aiplatform",
          logo: aimlIcon,
          name: "AI Platform",
          sub: "Intelligence",
          position: "nodeTopRight",
          lineColor: "#66d9e8",
        },
        {
          key: "devops2",
          logo: devopsIcon,
          name: "DevOps",
          sub: "Automation",
          position: "nodeRight",
          lineColor: "#ffb703",
        },
        {
          key: "db",
          logo: sqllogo,
          name: "SQL Data",
          sub: "Storage",
          position: "nodeBottomRight",
          lineColor: "#2b9348",
        },
      ],
    ],
    [],
  );

  const techNodes = technologySets[techSlide];
  const activeNodes = activeSection === "providers" ? providerNodes : techNodes;

  const centerIcon = activeSection === "providers" ? reactlogo : angularlogo;
  const centerTitle = activeSection === "providers" ? "React" : "Angular";
  const centerTag = activeSection === "providers" ? "Frontend" : "Framework";

  const updateConnections = React.useCallback(() => {
    const centerEl = centerRef.current;
    const containerEl = containerRef.current;
    if (!centerEl || !containerEl) return;

    const containerRect = containerEl.getBoundingClientRect();
    const centerRect = centerEl.getBoundingClientRect();
    const cX = centerRect.left + centerRect.width / 2 - containerRect.left;
    const cY = centerRect.top + centerRect.height / 2 - containerRect.top;

    const newConnections = activeNodes
      .map((partner: NodeItem) => {
        const node = nodeRefs.current[partner.key];
        if (!node) return null;
        const nodeRect = node.getBoundingClientRect();
        const nX = nodeRect.left + nodeRect.width / 2 - containerRect.left;
        const nY = nodeRect.top + nodeRect.height / 2 - containerRect.top;

        const x1 = cX;
        const y1 = cY;
        const x2 = nX;
        const y2 = nY;
        const c1x = x1 + (x2 - x1) * 0.35;
        const c1y = y1;
        const c2x = x1 + (x2 - x1) * 0.65;
        const c2y = y2;

        const d = `M ${x1} ${y1} C ${c1x} ${c1y} ${c2x} ${c2y} ${x2} ${y2}`;

        return { id: partner.key, d, color: partner.lineColor };
      })
      .filter((v): v is { id: string; d: string; color: string } => v !== null);

    setConnections(newConnections);
  }, [activeNodes]);

  useEffect(() => {
    updateConnections();
    const handleResize = () => updateConnections();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateConnections, activeNodes]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSection((prev) => {
        if (prev === "providers") {
          return "technologies";
        }

        // when switching back from technologies to providers,
        // advance the technology page so next time it's a new set.
        setTechSlide((prevTech) => (prevTech + 1) % technologySets.length);
        return "providers";
      });
    }, 2500); // 2.5 seconds on each section

    return () => window.clearInterval(timer);
  }, [technologySets.length]);

  return (
    <div className={styles.aboutContainer}>
      {/* Belief Section */}
      <section className={styles.beliefSection} data-reveal>
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
            style={{ width: `calc(${progressPercent}% )` }}
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

      {/* Software/Partners Hub Section */}
      <section className={styles.softwareSection} data-reveal>
        <h2 className={styles.softwareHeading}>
          Our trusted <span className={styles.highlight}>software</span>{" "}
          providers
        </h2>
        <p className={styles.softwareSubheading}>
          Powering our products with industry-leading tools & technologies
        </p>
        <div className={styles.sectionTabs}>
          <button
            type="button"
            className={`${styles.tabButton} ${
              activeSection === "providers" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveSection("providers")}
          >
            Providers
          </button>
          <button
            type="button"
            className={`${styles.tabButton} ${
              activeSection === "technologies" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveSection("technologies")}
          >
            Technologies
          </button>
        </div>
        {/* <div className={styles.softwareBars}>
          <span className={styles.barPrimary} />
          <span className={styles.barAccent} />
        </div> */}

        <div ref={containerRef} className={styles.hubContainer}>
          <svg
            className={styles.connections}
            width="100%"
            height="100%"
            preserveAspectRatio="none"
          >
            {connections.map((line) => (
              <path
                key={line.id}
                d={line.d}
                stroke={line.color}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.95"
              />
            ))}
          </svg>

          <div className={styles.orbitCircle} />
          <div className={styles.orbitCircleInner} />
          <div className={styles.orbitCenterGlow} />

          <div ref={centerRef} className={styles.centerHub}>
            <img
              src={centerIcon}
              alt={centerTitle}
              className={styles.centerIcon}
            />
            <div className={styles.centerTitle}>{centerTitle}</div>
            <div className={styles.centerTag}>{centerTag}</div>
          </div>

          {activeNodes.map((partner: NodeItem) => (
            <div
              key={partner.key}
              ref={(el) => {
                nodeRefs.current[partner.key] = el;
              }}
              className={`${styles.partnerNode} ${styles[partner.position]}`}
              style={
                { "--line-color": partner.lineColor } as React.CSSProperties
              }
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className={styles.partnerIcon}
              />
              <div className={styles.partnerTextWrapper}>
                <div className={styles.partnerName}>{partner.name}</div>
                <div className={styles.partnerTag}>{partner.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.bottomFeatures}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h4>Modern</h4>
            <p>Tech Stack</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🚀</div>
            <h4>Fast</h4>
            <p>Development</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💜</div>
            <h4>Scalable</h4>
            <p>Solutions</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🛡️</div>
            <h4>Enterprise</h4>
            <p>Grade</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Software;
