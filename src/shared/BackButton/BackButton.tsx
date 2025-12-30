import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";

const BackButton: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show on home
  if (location.pathname === "/") return null;

  return (
    <button
      className={styles.backBtn}
      aria-label="Back to home"
      onClick={() => navigate("/")}
    >
      ✕
    </button>
  );
};

export default BackButton;
