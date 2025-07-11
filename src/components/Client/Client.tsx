import React from "react";
import styles from "./Client.module.css";

const Client: React.FC = () => {
  return (
    <div className={styles.testimonialsWrapper}>
      <div className={styles.testimonialCard}>
        <div className={styles.leftColumn}>
          <h2>
            What our <span className={styles.highlight}>clients</span> say
          </h2>
        </div>

        <div className={styles.rightColumn}>
          <span className={styles.quoteIcon}>❝</span>
          <p className={styles.feedback}>
            Softkode Technologies has been instrumental in delivering high-quality software solutions for our business.
            Their skilled developers bring innovative ideas to life, ensuring our projects are completed on time and to the highest standard.
          </p>
          <p className={styles.clientName}>Ajit Ratnaparkhi</p>
          <p className={styles.clientRole}>Client</p>
        </div>
      </div>

      {/* Client logos */}
      <div className={styles.logoRow}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Dataeaze_Logo.png" alt="Dataeaze" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/NTT_Data_logo.svg/2560px-NTT_Data_logo.svg.png" alt="NTT Data" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/NTT_Data_logo.svg/2560px-NTT_Data_logo.svg.png" alt="NTT Data" />
        <img src="https://upload.wikimedia.org/wikipedia/en/7/70/TATA_AIG_Life_Logo.png" alt="TATA AIG" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Enerscript_logo.png" alt="Enerscript" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Enerscript_logo.png" alt="Enerscript" />
      </div>
    </div>
  );
};

export default Client;

