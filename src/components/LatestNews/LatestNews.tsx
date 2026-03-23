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
    url: "https://www.theverge.com/ai",
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
    url: "https://www.techrepublic.com/article/hybrid-workforce-hiring-ai-devops-cloud/",
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
    url: "https://martinfowler.com/articles/microservices.html",
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
    url: "https://www.forbes.com/sites/forbestechcouncil/2026/03/01/top-10-technical-skills-for-ai-and-cloud-engineers/",
    badge: "Essential",
  },
];

const LatestNews: React.FC = () => {
  const [news, setNews] = React.useState<NewsItem[]>(LATEST_NEWS);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();
    const NEWS_API_URL = "https://api.first.org/data/v1/news?limit=8";

    fetch(NEWS_API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load news");
        return res.json();
      })
      .then((payload) => {
        if (!payload?.data || !Array.isArray(payload.data)) {
          throw new Error("Invalid news response format");
        }

        const liveNews: NewsItem[] = payload.data
          .slice(0, 4)
          .map((article: any, index: number) => {
            const categoryCandidate =
              (typeof article.tags === "string" &&
                article.tags.split(",")[0]) ||
              article.source ||
              article.type ||
              "News";
            const category = categoryCandidate.toString().trim() || "News";

            const iconMap: { [key: string]: string } = {
              AI: "🤖",
              Tech: "💻",
              Cloud: "☁️",
              Security: "🛡️",
              Business: "📈",
              News: "📰",
            };

            const icon = iconMap[category] || "📰";

            const publishedAt =
              article.published ||
              article.publishedAt ||
              article.date ||
              article.timestamp;

            const formattedDate = publishedAt
              ? new Date(publishedAt).toLocaleDateString()
              : "";

            const headline =
              article.title ||
              article.headline ||
              article.summary ||
              article.story ||
              "Latest tech update";

            const candidateUrl =
              article.url || article.link || article.source || "";
            const normalizedUrl =
              typeof candidateUrl === "string" &&
              candidateUrl.match(/^https?:\/\//i)
                ? candidateUrl
                : "https://www.first.org";

            return {
              id: index + 1,
              category,
              icon,
              headline,
              date: formattedDate || "Now",
              summary:
                (article.summary && article.summary.trim()) ||
                (article.body && article.body.trim()) ||
                "See the full article for details.",
              url: normalizedUrl,
              badge: "Live",
            };
          });

        if (liveNews.length > 0) {
          setNews(liveNews);
          setError(null);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Could not load live news. Showing curated content.");
          console.error("LatestNews fetch error", err);
        }
      });

    return () => controller.abort();
  }, []);

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
          {error && (
            <p style={{ color: "#cc0000", marginTop: "12px", fontWeight: 600 }}>
              {error}
            </p>
          )}
        </div>

        <div className={styles.cardGrid}>
          {news.map((item) => (
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
