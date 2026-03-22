import React from "react";
import styles from "./LatestNews.module.css";

type NewsItem = {
  id: number;
  category: string;
  icon: string;
  headline: string;
  date: string;
  summary: string;
  url: string;
  badge: string;
};

const LATEST_NEWS: NewsItem[] = [
  {
    id: 1,
    category: "AI Strategy",
    icon: "🤖",
    headline: "Enterprise AI adoption accelerates with multi-cloud toolchains",
    date: "Mar 2026",
    summary:
      "Top organizations are now combining generative AI, MLOps, and observability for production-grade intelligence in digital transformation journeys.",
    url: "https://www.example.com/ai-adoption-multicloud",
    badge: "Trending",
  },
  {
    id: 2,
    category: "InfoTech Growth",
    icon: "🌐",
    headline: "Hybrid workforce hiring spikes in AI, DevOps, and cloud roles",
    date: "Mar 2026",
    summary:
      "Fast-scaling firms are prioritizing high-impact engineers with dual domain skills in AI engineering and security-first cloud operations.",
    url: "https://www.example.com/hiring-ai-devops",
    badge: "Upcoming",
  },
  {
    id: 3,
    category: "Engineering",
    icon: "🏗️",
    headline: "Next-gen software architecture for resilient digital platforms",
    date: "Mar 2026",
    summary:
      "Design patterns shifting toward event-driven microservices, observable pipelines, and AI-assisted release automation to improve uptime and velocity.",
    url: "https://www.example.com/resilient-architecture",
    badge: "Insight",
  },
  {
    id: 4,
    category: "AI Hiring",
    icon: "📈",
    headline: "Top 10 technical skills recruiters seek in 2026",
    date: "Mar 2026",
    summary:
      "Machine learning Ops, LLM integration, ethical AI, and full-stack productivity engineering are leading hiring requirements worldwide.",
    url: "https://www.example.com/top-skills-2026",
    badge: "Essential",
  },
];

const LatestNews: React.FC = () => {
  return (
    <section className={styles.newsSection} id="latest-news" data-reveal>
      <div className={styles.newsInner}>
        <div className={styles.newsHeader}>
          <p className={styles.eyebrow}>
            Latest insights from global tech trends
          </p>
          <h2 className={styles.title}>Latest News in AI, IT, and Talent</h2>
          <p className={styles.description}>
            Stay ahead with curated updates on information technology,
            generative AI, top hiring, and modern application architecture for
            enterprise-grade products.
          </p>
        </div>

        <div className={styles.cardGrid}>
          {LATEST_NEWS.map((item) => (
            <article key={item.id} className={styles.newsCard}>
              <div className={styles.cardMeta}>
                <span className={styles.icon}>{item.icon}</span>
                <div>
                  <span className={styles.category}>{item.category}</span>
                  <span className={styles.date}>{item.date}</span>
                </div>
              </div>
              <h3 className={styles.cardTitle}>{item.headline}</h3>
              <p className={styles.cardSummary}>{item.summary}</p>
              <div className={styles.cardFooter}>
                <span className={styles.badge}>{item.badge}</span>
                <a
                  href={item.url}
                  className={styles.readMore}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
