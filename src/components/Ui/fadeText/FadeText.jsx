import styles from "./FadeText.module.css";
import { motion, AnimatePresence } from "framer-motion";

const FadeText = ({
  text,
  show,
  duration = 0.25,
  enterDuration,
  exitDuration,
  className = "",
}) => {
  const fallbackDuration = Math.min(
    Math.max(Number(duration) || 0.25, 0.05),
    3,
  );
  const normalizedEnterDuration = Math.min(
    Math.max(Number(enterDuration) || fallbackDuration, 0.05),
    3,
  );
  const normalizedExitDuration = Math.min(
    Math.max(Number(exitDuration) || fallbackDuration, 0.05),
    3,
  );
  const charCount = Math.max(text.length, 1);
  const enterLetterDuration = normalizedEnterDuration * 0.45;
  const exitLetterDuration = normalizedExitDuration * 0.45;
  const enterStagger =
    charCount > 1
      ? (normalizedEnterDuration - enterLetterDuration) / (charCount - 1)
      : 0;
  const exitStagger =
    charCount > 1
      ? (normalizedExitDuration - exitLetterDuration) / (charCount - 1)
      : 0;
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: enterStagger,
        staggerDirection: 1,
      },
    },
    exit: {
      transition: {
        staggerChildren: exitStagger,
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
      transition: { duration: enterLetterDuration },
    },
    exit: {
      opacity: 0,
      x: 8,
      filter: "blur(4px)",
      transition: { duration: exitLetterDuration },
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
