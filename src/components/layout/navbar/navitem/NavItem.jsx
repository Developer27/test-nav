import styles from "./NavItem.module.css";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import FadeText from "../../../Ui/fadeText/FadeText";

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
    iconSize = 24,
    labelGap = 8,
    collapseItemDuration = 0.3,
    expandItemDuration = 0.3,
    activeBackgroundDuration = 0.3,
    fadeDuration = 0.15,
    fadeOutDuration = 0.15,
    hoverDuration = 0.15,
  },
  ref,
) {
  const normalizedCollapseItemDuration = Math.min(
    Math.max(Number(collapseItemDuration) || 0.3, 0.05),
    3,
  );
  const normalizedExpandItemDuration = Math.min(
    Math.max(Number(expandItemDuration) || 0.3, 0.05),
    3,
  );
  const collapseItemDurationScale = normalizedCollapseItemDuration / 0.38;
  const expandItemDurationScale = normalizedExpandItemDuration / 0.38;
  const normalizedFadeDuration = Math.min(
    Math.max(Number(fadeDuration) || 0.15, 0.05),
    3,
  );
  const normalizedFadeOutDuration = Math.min(
    Math.max(Number(fadeOutDuration) || 0.15, 0.05),
    3,
  );
  const normalizedActiveBackgroundDuration = Math.min(
    Math.max(Number(activeBackgroundDuration) || 0.3, 0.05),
    3,
  );
  const normalizedHoverDuration = Math.min(
    Math.max(Number(hoverDuration) || 0.15, 0.05),
    3,
  );
  const isExpanded = hoveredItem === title || isActive || isFirstHovered;
  const isLabelVisible = collapsedShowLabel || isExpanded;
  const shouldAnimateTitle = !isForDisplayOnly;
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
    <div
      ref={ref}
      className={`${styles.navItemContainer} ${isForDisplayOnly ? styles.displayOnlyNavItemContainer : ""} ${positionClass}`}
      role={isForDisplayOnly ? "presentation" : undefined}
      style={{
        "--hover-duration": `${normalizedHoverDuration}s`,
      }}
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
        }}
        transition={{
          opacity: {
            duration: isActive
              ? normalizedActiveBackgroundDuration
              : normalizedActiveBackgroundDuration * 0.8,
            ease: [0.22, 1, 0.36, 1],
          },
          scale: {
            duration: isActive
              ? normalizedActiveBackgroundDuration
              : normalizedActiveBackgroundDuration * 0.8,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        style={{
          willChange: "opacity, transform, filter",
        }}
      />
      <Icon
        className={styles.icon}
        size={iconSize}
        style={{
          color: isActive ? "rgba(211, 248, 90, 1)" : "",
        }}
      />
      <motion.div
        initial={false}
        animate={{
          width: collapseTitle ? 0 : "auto",
          opacity: 1,
          marginLeft: collapseTitle ? 0 : labelGap,
        }}
        transition={{
          width: {
            duration: collapseTitle
              ? 0.33 * collapseItemDurationScale
              : 0.28 * expandItemDurationScale,
            ease: "easeInOut",
            delay: collapseTitle ? 0.08 : 0,
          },
          marginLeft: {
            duration: collapseTitle
              ? 0.2 * collapseItemDurationScale
              : 0.18 * expandItemDurationScale,
            ease: "easeInOut",
            delay: collapseTitle ? 0.2 * collapseItemDurationScale : 0,
          },
        }}
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          minWidth: 0,
          flexShrink: 1,
        }}
      >
        {shouldAnimateTitle ? (
          <FadeText
            text={title}
            show={!collapseTitle}
            enterDuration={normalizedFadeDuration}
            exitDuration={normalizedFadeOutDuration}
            className={`${styles.title} ${isActive ? styles.activeTitle : ""} ${isForDisplayOnly ? styles.displayOnlyTitle : ""}`}
          />
        ) : (
          <p
            className={`${styles.title} ${isActive ? styles.activeTitle : ""} ${isForDisplayOnly ? styles.displayOnlyTitle : ""}`}
          >
            {title}
          </p>
        )}
      </motion.div>
    </div>
  );
});

export default NavItem;
