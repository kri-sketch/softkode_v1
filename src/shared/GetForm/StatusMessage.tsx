import React from "react";
import styles from "./GetForm.module.css";

interface StatusMessageProps {
  type: "success" | "error";
  text: string;
  onClose?: () => void;
}

const StatusMessage: React.FC<StatusMessageProps> = ({
  type,
  text,
  onClose,
}) => {
  const isSuccess = type === "success";

  return (
    <div
      className={`${styles.statusMessage} ${isSuccess ? styles.successMessage : styles.errorMessage}`}
      role="status"
    >
      <span className={styles.statusIcon}>{isSuccess ? "✓" : "⚠"}</span>
      <span className={styles.statusText}>{text}</span>
      {onClose && (
        <button
          className={styles.statusCloseBtn}
          onClick={onClose}
          aria-label="Close message"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default StatusMessage;
