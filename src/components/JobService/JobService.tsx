import React, { useEffect, useState } from "react";
import styles from "./JobService.module.css";
import initReveal from "../../shared/hooks/useReveal";

interface JobOpening {
  id: string;
  title: string;
  experience: string;
  location: string;
  skills: string[];
  description: string;
}

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTsQ_hm85WvW5_-FTNLtAMpJwAdoHGMQlx55Ce2QL25UmuYnS3PKtxRfWlGquADEZfQ0hrWFdHQmnz2/pub?gid=1796468726&single=true&output=csv";

/**
 * Simple CSV parser to handle quotes and multiple lines in cells.
 */
function parseCSV(csvText: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        cell += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        cell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        row.push(cell.trim());
        cell = "";
      } else if (char === "\n" || (char === "\r" && nextChar === "\n")) {
        if (char === "\r") i++;
        row.push(cell.trim());
        result.push(row);
        row = [];
        cell = "";
      } else {
        cell += char;
      }
    }
  }
  if (row.length > 0 || cell) {
    row.push(cell.trim());
    result.push(row);
  }
  return result;
}

const JobCard: React.FC<{ job: JobOpening }> = ({ job }) => {
  const generateMailTo = (jobTitle: string) => {
    const subject = encodeURIComponent(`Application for ${jobTitle} - Softkode Job Service`);
    const body = encodeURIComponent(`Dear Softkode Team,\n\nI am applying for the ${jobTitle} position.\n\nMy Details:\n- Professional Summary: [Brief description]\n- Current CTC:\n- Expected CTC:\n- Notice Period:\n- Location:\n\nPlease find my resume attached.\n\nBest regards,\n[Your Name]`);
    return `mailto:krishnasharma@softkode.io?subject=${subject}&body=${body}`;
  };

  return (
    <article className={styles.jobCard} data-reveal>
      <div className={styles.cardTop}>
        <h2 className={styles.jobLabel}>{job.title}</h2>
      </div>

      <div className={styles.metaRow}>
        <div className={styles.metaBadge}>👨‍💻 {job.experience}</div>
        <div className={styles.metaBadge}>📍 {job.location}</div>
      </div>

      <div className={styles.skillsWrap}>
        {job.skills.map((skill) => (
          <span key={skill} className={styles.skillChip}>
            {skill}
          </span>
        ))}
      </div>

      <p className={styles.jobSummary}>{job.description}</p>

      <div className={styles.applySection}>
        <div className={styles.applyInstr}>
          <strong>Direct Application</strong>
          Include CTC, Exp CTC, Notice, and Location.
        </div>
        <a href={generateMailTo(job.title)} className={styles.applyBtn}>
          Mail Resume →
        </a>
      </div>
    </article>
  );
};

const JobService: React.FC = () => {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initReveal();
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(CSV_URL);
      if (!response.ok) throw new Error("Failed to sync live job data");
      const text = await response.text();
      const rows = parseCSV(text);

      const parsedJobs = rows
        .slice(1) // Skip the first sample row
        .filter((row) => row.length >= 7 && row[1])
        .map((row) => ({
          id: row[0],
          title: row[1],
          experience: row[2] ? `${row[2]}+ years` : "Open Exp",
          location: row[4] || "Remote / Onsite",
          skills: row[6] ? row[6].split(",").map((s) => s.trim()) : [],
          description: row[7] || "Explore this opportunity to work on cutting-edge technology.",
        }));

      setJobs(parsedJobs);
      setLoading(false);
    } catch (err) {
      console.error("JobService fetch error:", err);
      setError("Unable to sync live jobs at this moment.");
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.loadingContainer}>Synchronizing Live Openings...</div>;
  if (error) return <div className={styles.errorContainer}>{error}</div>;

  return (
    <section className={styles.jobSection} id="job-service">
      <div className={styles.jobInner}>
        <div className={styles.jobHeader} data-reveal>
          <span className={styles.eyebrow}>Live Tech Openings 2026</span>
          <h1 className={styles.title}>Softkode <span className="gradient-text">Job Service</span> Hub</h1>
          <p className={styles.description}>
            Daily job updates directly from our hiring pipeline. Verified tech roles 
            for elite engineering talent.
          </p>
        </div>

        {/* Global Steps Section */}
        <div className={styles.stepsContainer} data-reveal>
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>01</div>
            <div className={styles.stepText}>
              <h4>Explore Roles</h4>
              <p>Find the perfect match from our live synchronized openings.</p>
            </div>
          </div>
          <div className={styles.stepArrow}>→</div>
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>02</div>
            <div className={styles.stepText}>
              <h4>Mail Resume</h4>
              <p>Email <strong>krishnasharma@softkode.io</strong> with your info.</p>
            </div>
          </div>
          <div className={styles.stepArrow}>→</div>
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>03</div>
            <div className={styles.stepText}>
              <h4>Quick Connect</h4>
              <p>Our team will contact you soon for technical evaluation.</p>
            </div>
          </div>
        </div>

        <div className={styles.jobGrid}>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobService;
