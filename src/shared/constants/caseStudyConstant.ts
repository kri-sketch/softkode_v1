// src/shared/constants/caseStudyConstant.ts
import { CaseStudy } from "../../types/caseStudy";

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "complieaze",
    title: "Complieaze: Enterprise Governance Platform",
    category: "FinTech & Compliance",
    heroImage: "/complieaze_hero.png",
    brief: "A high-performance compliance management system designed for enterprise-level risk mitigation and regulatory tracking.",
    stats: [
      { label: "Compliance Accuracy", value: "99.9%" },
      { label: "Audit Time Reduced", value: "60%" },
      { label: "Active Users", value: "10k+" },
    ],
    challenge: "The client needed to automate complex legal workflows that were previously handled manually across multiple jurisdictions, leading to high error rates and slow processing.",
    solution: "We built a modular SaaS platform with automated tracking, intelligent reporting, and a robust document management system using modern microservices architecture.",
    outcome: "Reduced manual overhead by 60% and secured 100% regulatory alignment for the client's global operations within the first 6 months of launch.",
    techStack: [
      { name: "React", icon: "⚛️" },
      { name: "Node.js", icon: "🟢" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "AWS", icon: "☁️" },
    ],
  },
  {
    id: "ev-charging",
    title: "ElectroFlow: EV Infrastructure Management",
    category: "Clean Energy & IoT",
    heroImage: "/ev_hero.png",
    brief: "A real-time monitoring and billing platform for a nationwide electric vehicle charging network.",
    stats: [
      { label: "Uptime", value: "99.99%" },
      { label: "Charging Stations", value: "500+" },
      { label: "Live Transactions", value: "24/7" },
    ],
    challenge: "Managing thousands of IoT sensors across a distributed network with low latency for billing and maintenance alerts.",
    solution: "Implemented a real-time IoT dashboard with WebSocket integration and a scalable edge-computing layer to handle high-frequency data spikes.",
    outcome: "Successfully launched across 15 cities, handling over 100,000 charging sessions monthly with zero billing discrepancies.",
    techStack: [
      { name: "TypeScript", icon: "📘" },
      { name: "MQTT", icon: "📡" },
      { name: "Redis", icon: "⚡" },
      { name: "Go", icon: "🐹" },
    ],
  },
  {
    id: "edtech-app",
    title: "SkillUp: AI-Powered Learning Experience",
    category: "EdTech",
    heroImage: "/edtech_hero.png",
    brief: "An adaptive learning platform that uses AI to personalize curricula for corporate training and skill development.",
    stats: [
      { label: "Course Completion", value: "+45%" },
      { label: "User Retention", value: "85%" },
      { label: "AI Recommendations", value: "Adaptive" },
    ],
    challenge: "Traditional learning platforms were static and failed to engage learners or adapt to individual pace, resulting in low completion rates.",
    solution: "Developed an AI-driven recommendation engine and interactive video modules with real-time feedback and progress tracking.",
    outcome: "Increased employee certification rates for the client by 45% and improved overall learner engagement metrics by 3x.",
    techStack: [
      { name: "Next.js", icon: "▲" },
      { name: "Python", icon: "🐍" },
      { name: "TensorFlow", icon: "🧠" },
      { name: "MongoDB", icon: "🍃" },
    ],
  },
  {
    id: "rate-me",
    title: "RateMe: Customer Experience Analytics",
    category: "Retail Tech",
    heroImage: "/rateme_hero.png",
    brief: "A comprehensive feedback and sentiment analysis tool for retail chains to measure customer satisfaction in real-time.",
    stats: [
      { label: "Feedback Loop", value: "-75%" },
      { label: "NPS Improvement", value: "+20" },
      { label: "Data Points", value: "1M+" },
    ],
    challenge: "Retailers struggled to capture and act on customer feedback immediately, often losing customers before issues could be resolved.",
    solution: "Built a lightning-fast QR-based feedback system with instant sentiment analysis and automated alert routing for store managers.",
    outcome: "Closed the feedback loop from days to minutes, leading to a 20-point increase in Net Promoter Score (NPS) for the pilot retailers.",
    techStack: [
      { name: "Vue.js", icon: "🟢" },
      { name: "Firebase", icon: "🔥" },
      { name: "FastAPI", icon: "⚡" },
      { name: "D3.js", icon: "📊" },
    ],
  },
];
