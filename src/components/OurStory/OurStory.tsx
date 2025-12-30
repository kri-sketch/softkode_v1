import React from "react";
import styles from "./OurStory.module.css";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";

const OurStory: React.FC = () => {
  return (
    <section id="our-story">
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.card}>
          <div className={styles.left}>
            <h2 className={styles.heading}>Our story</h2>
          </div>
          <div className={styles.right}>
            <p>
              Founded in 2024 by Krishna Sharma, Softkode Technologies was built
              on a vision to drive digital transformation through innovation and
              excellence. With over five years of experience in the IT sector,
              Krishna recognized the need for high-quality, tailored software
              solutions that empower businesses to scale and thrive in a rapidly
              evolving digital landscape.
            </p>
            <p>
              From the very beginning, Softkode Technologies has been committed
              to delivering cutting-edge digital products and custom software
              solutions across industries. Our multidisciplinary team of expert
              developers, designers, and strategists collaborates seamlessly to
              transform ideas into impactful, scalable, and efficient solutions.
            </p>
            <p>
              At Softkode, we prioritize long-term partnerships, working closely
              with our clients to develop solutions that align with their unique
              business objectives. Whether it’s enterprise software, UI/UX
              design, or full-scale digital transformation, our goal is to drive
              measurable success through technology.
            </p>
            <p>
              Beyond our core services, we are dedicated to knowledge sharing
              and innovation. We provide high-quality resources, industry
              insights, and best practices, ensuring that our clients and the
              broader technology community stay ahead in an ever-evolving
              digital world.
            </p>

            <div className={styles.footer}>
              <div className={styles.icons}>
                <FaFacebook />
                <FaXTwitter />
              </div>
              <span className={styles.year}>2024</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
