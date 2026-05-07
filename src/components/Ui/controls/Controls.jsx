import styles from "./Controls.module.css";

const Controls = ({
  duration,
  setDuration,
  min = 0.12,
  max = 1.2,
  step = 0.01,
}) => {
  const normalizedDuration = Math.min(
    Math.max(Number(duration) || min, min),
    max,
  );

  return (
    <div className={styles.controlsContainer}>
      <label className={styles.controlLabel}>
        <span>Duration</span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={normalizedDuration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        <p>{normalizedDuration.toFixed(2)}s</p>
      </label>
    </div>
  );
};

export default Controls;
