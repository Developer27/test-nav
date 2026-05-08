"use client";
import styles from "./Navbar.module.css";
import ExpandIcon from "../../icons/ExpandIcon";
import { useMemo, useRef, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import PopUp from "../../Ui/popup/PopUp";
import { DEFAULT_NAV_ITEMS } from "../../../constants";
import NavbarDropdown from "./navdropdown/NavbarDropdown";
import { getItemPosition } from "../../../utils/navbarUtils";
import { getDividerVisibility } from "../../../utils/getDividerVisibility";
import { buildPrioritizedLayoutSegments } from "../../../utils/buildPrioritizedLayoutSegments";
import NavItemSegment from "./navItemSegment/NavItemSegment";

const PRIMARY_COLLAPSED_COUNT = 4;

const DEFAULT_COLLAPSE_DURATION = 0.3;
const DEFAULT_LAYOUT_DURATION = 0.3;
const DEFAULT_FADE_IN_DURATION = 0.25;
const DEFAULT_FADE_OUT_DURATION = 1.2;
const DEFAULT_HOVER_ENTER_DURATION = 0.15;
const DEFAULT_HOVER_EXIT_DURATION = 0.5;
const getNormalizedDuration = (duration) =>
  Math.min(Math.max(Number(duration) || DEFAULT_LAYOUT_DURATION, 0.05), 3);

// const activeBackgroundTransition = {
//   duration: navbarLayoutTransition.layout.duration,
//   ease: navbarLayoutTransition.layout.ease,
// };

const Navbar = ({
  collapseItemDuration = DEFAULT_COLLAPSE_DURATION,
  expandItemDuration = DEFAULT_LAYOUT_DURATION,
  activeBackgroundDuration = 0.3,
  fadeDuration = DEFAULT_FADE_IN_DURATION,
  fadeOutDuration = DEFAULT_FADE_OUT_DURATION,
  hoverEnterDuration = DEFAULT_HOVER_ENTER_DURATION,
  hoverExitDuration = DEFAULT_HOVER_EXIT_DURATION,
  modalDuration = 0.2,
  dropdownDuration = 0.25,
  popupBorderDuration = 0.2,
}) => {
  const normalizedDuration = getNormalizedDuration(expandItemDuration);
  const navbarLayoutTransition = {
    layout: {
      duration: normalizedDuration,
      ease: [0.22, 1, 0.36, 1],
    },
  };
  const navLinks = DEFAULT_NAV_ITEMS;
  const [activeItem, setActiveItem] = useState(navLinks[0].title);
  const [tabsMode, setTabsMode] = useState("expanded");
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isFirstHovered, setIsFirstHovered] = useState(false);

  const navbarRef = useRef(null);
  const navbarExpandButtonRef = useRef(null);
  const itemRefs = useRef({});

  const dropdownLinks = useMemo(() => {
    return navLinks.slice(PRIMARY_COLLAPSED_COUNT);
  }, [navLinks]);

  const dropdownTitleSet = new Set(dropdownLinks.map((item) => item.title));
  const isPrioritizedModeLayout =
    tabsMode === "collapsed" || tabsMode === "priorityTabs";
  const showCollapsedOverflowSlot =
    isPrioritizedModeLayout && dropdownTitleSet.has(activeItem);
  const setItemRef = (title, element) => {
    itemRefs.current[title] = element;
  };

  const renderNavSegment = (
    item,
    collapsedShowLabel,
    hasDividerSlot,
    isDividerVisible,
    itemPosition = "single",
  ) => (
    <NavItemSegment
      key={item.title}
      item={item}
      collapsedShowLabel={collapsedShowLabel}
      hasDividerSlot={hasDividerSlot}
      isDividerVisible={isDividerVisible}
      itemPosition={itemPosition}
      setItemRef={setItemRef}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
      tabsMode={tabsMode}
      hoveredItem={hoveredItem}
      setHoveredItem={setHoveredItem}
      isFirstHovered={isFirstHovered}
      setIsFirstHovered={setIsFirstHovered}
      firstItemTitle={navLinks[0].title}
      collapseItemDuration={collapseItemDuration}
      expandItemDuration={expandItemDuration}
      activeBackgroundDuration={activeBackgroundDuration}
      fadeDuration={fadeDuration}
      fadeOutDuration={fadeOutDuration}
      hoverEnterDuration={hoverEnterDuration}
      hoverExitDuration={hoverExitDuration}
      layoutTransition={navbarLayoutTransition}
    />
  );

  return (
    <div className={styles.navbarContainer} style={{ marginTop: "50px" }}>
      <motion.nav
        ref={navbarRef}
        layout="position"
        className={styles.navbar}
        transition={navbarLayoutTransition}
      >
        <LayoutGroup>
          {isPrioritizedModeLayout
            ? (() => {
                const segments = buildPrioritizedLayoutSegments({
                  navLinks,
                  activeItem,
                  tabsMode,
                  dropdownLinks,
                  showCollapsedOverflowSlot,
                  hideOverflowDivider:
                    isDropdownOpen || dropdownTitleSet.has(activeItem),
                  renderNavSegment,
                });
                if (dropdownLinks.length > 0) {
                  segments.push(
                    <motion.div
                      key="__overflow"
                      layout="position"
                      className={styles.navItemWithDivider}
                      transition={navbarLayoutTransition}
                    >
                      <NavbarDropdown
                        dropdownItems={dropdownLinks}
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                        onOpenChange={setIsDropdownOpen}
                        dropdownDuration={dropdownDuration}
                        hoverEnterDuration={hoverEnterDuration}
                        hoverExitDuration={hoverExitDuration}
                      />
                    </motion.div>,
                  );
                }

                return segments;
              })()
            : navLinks.map((item, index) => {
                const itemPosition = getItemPosition(index, navLinks.length);
                const nextItem = navLinks[index + 1];
                const nextItemPosition = nextItem
                  ? getItemPosition(index + 1, navLinks.length)
                  : "single";
                const hasTrailingItem = index < navLinks.length - 1;
                const isDividerVisible = getDividerVisibility({
                  activeItem,
                  item,
                  itemPosition,
                  nextItem,
                  nextItemPosition,
                });

                return renderNavSegment(
                  item,
                  false,
                  hasTrailingItem,
                  isDividerVisible,
                  itemPosition,
                );
              })}
        </LayoutGroup>
      </motion.nav>

      <div
        ref={navbarExpandButtonRef}
        className={`${styles.navbarExpandButton} ${isPopUpOpen ? styles.activeNavbarExpandButton : styles.navbarExpandButton}`}
        onClick={() => setIsPopUpOpen(!isPopUpOpen)}
      >
        <ExpandIcon size={16} />
      </div>

      <PopUp
        anchorRef={navbarExpandButtonRef}
        open={isPopUpOpen}
        setIsPopUpOpen={setIsPopUpOpen}
        setTabsMode={setTabsMode}
        tabsMode={tabsMode}
        modalDuration={modalDuration}
        popupBorderDuration={popupBorderDuration}
      />
    </div>
  );
};

export default Navbar;
