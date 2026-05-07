import styles from "./Controls.module.css";

const Controls = ({
  duration,
  setDuration,
  min = 0.12,
  max = 1.2,
  step = 0.01,
  fadeDuration,
  setFadeDuration,
  fadeMin = 0.12,
  fadeMax = 1.2,
  fadeStep = 0.01,
}) => {
  const normalizedDuration = Math.min(
    Math.max(Number(duration) || min, min),
    max,
  );
  const normalizedFadeDuration = Math.min(
    Math.max(Number(fadeDuration) || fadeMin, fadeMin),
    fadeMax,
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
      <label className={styles.controlLabel}>
        <span>Fade text duration</span>
        <input
          type="range"
          min={fadeMin}
          max={fadeMax}
          step={fadeStep}
          value={normalizedFadeDuration}
          onChange={(e) => setFadeDuration(Number(e.target.value))}
        />
        <p>{normalizedFadeDuration.toFixed(2)}s</p>
      </label>
    </div>
  );
};

export default Controls;
