import styles from "./RadioBtn.module.css";

export const RadioBtn = ({ id, name, value, isActive, onChange }) => {
  return (
    <div className={styles.radioBtnContainer}>
      <input
        type="radio"
        className={styles.radioBtnInput}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <div
        className={`${styles.radioBtnIndicator} ${isActive ? styles.active : ""}`}
      >
        <div className={styles.radioBtnIndicatorInner}></div>
      </div>
    </div>
  );
};
