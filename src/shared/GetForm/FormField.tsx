import React from "react";
import styles from "./GetForm.module.css";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
  required?: boolean;
  id?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  id,
  value,
  onChange,
  error,
}) => {
  const inputId = id || `form-field-${name}`;

  if (type === "textarea") {
    return (
      <div className={styles.formFieldWrapper}>
        <label htmlFor={inputId} className={styles.fieldLabel}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        <textarea
          id={inputId}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={`${styles.formInput} ${styles.textarea} ${error ? styles.inputError : ""}`}
        />
        {error && <span className={styles.fieldError}>{error}</span>}
      </div>
    );
  }

  return (
    <div className={styles.formFieldWrapper}>
      <label htmlFor={inputId} className={styles.fieldLabel}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={`${styles.formInput} ${error ? styles.inputError : ""}`}
      />
      {error && <span className={styles.fieldError}>{error}</span>}
    </div>
  );
};

export default FormField;
