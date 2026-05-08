import { motion } from "framer-motion";
import NavItem from "../navitem/NavItem";
import Divider from "../../../Ui/divider/Divider";
import styles from "../Navbar.module.css";

const getNavItemLayoutId = (title) => `navbar-slot-${title}`;

const NavItemSegment = ({
  item,
  collapsedShowLabel = false,
  hasDividerSlot,
  isDividerVisible,
  itemPosition = "single",
  setItemRef,
  activeItem,
  setActiveItem,
  tabsMode,
  hoveredItem,
  setHoveredItem,
  isFirstHovered,
  setIsFirstHovered,
  firstItemTitle,
  duration,
  activeBackgroundDuration,
  fadeDuration,
  fadeOutDuration,
  hoverDuration,
  layoutTransition,
}) => {
  return (
    <motion.div
      key={item.title}
      layout
      layoutId={getNavItemLayoutId(item.title)}
      className={styles.navItemWithDivider}
      transition={layoutTransition}
    >
      <NavItem
        ref={(element) => setItemRef(item.title, element)}
        Icon={item.Icon}
        title={item.title}
        isActive={activeItem === item.title}
        setActiveItem={setActiveItem}
        mode={tabsMode}
        position={itemPosition}
        collapsedShowLabel={collapsedShowLabel}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        isFirstHovered={isFirstHovered}
        setIsFirstHovered={setIsFirstHovered}
        isFirstItem={item.title === firstItemTitle}
        duration={duration}
        activeBackgroundDuration={activeBackgroundDuration}
        fadeDuration={fadeDuration}
        fadeOutDuration={fadeOutDuration}
        hoverDuration={hoverDuration}
      />
      {hasDividerSlot && <Divider hidden={!isDividerVisible} />}
    </motion.div>
  );
};

export default NavItemSegment;
