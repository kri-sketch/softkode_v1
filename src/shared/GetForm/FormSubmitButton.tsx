import React from "react";
import styles from "./GetForm.module.css";

interface FormSubmitButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  submitText?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  isLoading = false,
  loadingText = "Sending...",
  submitText = "Send Message",
  disabled = false,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className={styles.submitBtn}
      aria-busy={isLoading}
    >
      <span className={styles.btnText}>
        {isLoading && <span className={styles.loadingSpinner}>⚡</span>}
        {isLoading ? loadingText : submitText}
      </span>
    </button>
  );
};

export default FormSubmitButton;
