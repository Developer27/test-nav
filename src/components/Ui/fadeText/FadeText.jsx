import styles from "./FadeText.module.css";
import { motion, AnimatePresence } from "framer-motion";

const FadeText = ({
  text,
  show,
  duration = 0.15,
  enterDuration,
  exitDuration,
  className = "",
}) => {
  const fallbackDuration = Math.min(Math.max(Number(duration) || 0.15, 0.05), 3);
  const normalizedEnterDuration = Math.min(
    Math.max(Number(enterDuration) || fallbackDuration, 0.05),
    3,
  );
  const normalizedExitDuration = Math.min(
    Math.max(Number(exitDuration) || fallbackDuration, 0.05),
    3,
  );
  const enterDurationScale = normalizedEnterDuration / 0.38;
  const exitDurationScale = normalizedExitDuration / 0.38;
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.03 * enterDurationScale,
        staggerDirection: 1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.02 * exitDurationScale,
        staggerDirection: -1,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, x: -8, filter: "blur(4px)" },
    show: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.2 * enterDurationScale },
    },
    exit: {
      opacity: 0,
      x: 8,
      filter: "blur(4px)",
      transition: { duration: 0.16 * exitDurationScale },
    },
  };

  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.span
          style={{ display: "inline-flex", whiteSpace: "pre" }}
          variants={container}
          initial="hidden"
          animate="show"
          exit="exit"
          className={`${styles.fadeText} ${className}`}
        >
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={letter}
              className={styles.fadeTextChar}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default FadeText;
