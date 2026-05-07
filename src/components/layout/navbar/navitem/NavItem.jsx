import styles from "./NavItem.module.css";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import FadeText from "../../../Ui/fadeText/FadeText";
// import Tooltip from "../../../Ui/tooltip/Tooltip";

const NavItem = forwardRef(function NavItem(
  {
    Icon,
    title,
    isActive,
    position = "single",
    setActiveItem,
    mode,
    isForDisplayOnly = false,
    hoveredItem,
    setHoveredItem,
    isFirstHovered,
    setIsFirstHovered,
    isFirstItem,
    collapsedShowLabel = false,
    duration = 0.38,
  },
  ref,
) {
  const normalizedDuration = Math.min(Math.max(Number(duration) || 0.38, 0.05), 3);
  const durationScale = normalizedDuration / 0.38;
  const isExpanded = hoveredItem === title || isActive || isFirstHovered;
  const isLabelVisible = collapsedShowLabel || isExpanded;
  const collapseTitle =
    mode === "collapsed" || mode === "priorityTabs"
      ? !isLabelVisible
      : mode === "iconFirst" && !isExpanded;
  const positionClass =
    {
      first: styles.activeFirst,
      middle: styles.activeMiddle,
      last: styles.activeLast,
      single: styles.activeSingle,
    }[position] ?? styles.activeSingle;

  return (
    // <Tooltip title={title}>
    <div
      ref={ref}
      className={`${styles.navItemContainer} ${isForDisplayOnly ? styles.displayOnlyNavItemContainer : ""} ${positionClass}`}
      role={isForDisplayOnly ? "presentation" : undefined}
      onClick={
        isForDisplayOnly
          ? undefined
          : () => {
              setActiveItem(title);
            }
      }
      onMouseEnter={() => {
        setHoveredItem?.(title);
        if (isFirstItem) {
          setIsFirstHovered(true);
        }
      }}
      onMouseLeave={() => {
        setHoveredItem?.(null);
        if (isFirstItem) {
          setIsFirstHovered(false);
        }
      }}
    >
      <motion.div
        className={styles.activeBackground}
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.7,
          // filter: isActive ? "blur(0px)" : "blur(6px)",
        }}
        transition={{
          opacity: {
            duration: isActive ? 1 : 0.8,
            ease: [0.22, 1, 0.36, 1],
          },
          scale: {
            duration: isActive ? 1 : 0.8,
            ease: [0.22, 1, 0.36, 1],
          },
          // filter: {
          //   duration: isActive ? 0.8 : 0.8,
          //   ease: "easeOut",
          // },
        }}
        style={{
          willChange: "opacity, transform, filter",
        }}
      />
      <Icon
        className={styles.icon}
        size={isForDisplayOnly ? 16 : 24}
        style={{
          color: isActive ? "rgba(211, 248, 90, 1)" : "",
        }}
      />
      <motion.div
        initial={false}
        animate={{
          width: collapseTitle ? 0 : "auto",
          opacity: 1,
          marginLeft: collapseTitle ? 0 : 8,
        }}
        transition={{
          width: {
            duration: (collapseTitle ? 0.33 : 0.28) * durationScale,
            ease: "easeInOut",
            delay: collapseTitle ? 0.08 : 0,
          },
          marginLeft: {
            duration: (collapseTitle ? 0.2 : 0.18) * durationScale,
            ease: "easeInOut",
          },
        }}
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          minWidth: 0,
          flexShrink: 1,
        }}
      >
        <FadeText
          text={title}
          show={!collapseTitle}
          duration={normalizedDuration}
          className={`${styles.title} ${isActive ? styles.activeTitle : ""} ${isForDisplayOnly ? styles.displayOnlyTitle : ""}`}
        />
        {/* <p
          className={`${styles.title} ${isActive ? styles.activeTitle : ""} ${isForDisplayOnly ? styles.displayOnlyTitle : ""}`}
        >
          {title}
        </p> */}
      </motion.div>
    </div>
    // </Tooltip>
  );
});

export default NavItem;
