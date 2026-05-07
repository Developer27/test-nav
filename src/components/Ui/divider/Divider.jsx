import styles from "./Divider.module.css";

const Divider = ({ hidden = false }) => (
  <div
    aria-hidden
    className={`${styles.divider} ${hidden ? styles.hiddenDivider : ""}`}
  />
);

export default Divider;
