import { getStripItemPosition } from "./navbarUtils";
import { getDividerVisibility } from "./getDividerVisibility";

const PRIMARY_COLLAPSED_COUNT = 4;

export const buildPrioritizedLayoutSegments = ({
  navLinks,
  activeItem,
  tabsMode,
  dropdownLinks,
  showCollapsedOverflowSlot,
  renderNavSegment,
}) => {
  const shownTabItems = navLinks.slice(0, PRIMARY_COLLAPSED_COUNT);
  const activeDropdownItem = showCollapsedOverflowSlot
    ? navLinks.find((link) => link.title === activeItem)
    : null;
  const visibleStripItems = activeDropdownItem
    ? [...shownTabItems, activeDropdownItem]
    : shownTabItems;
  const navItemsCount = visibleStripItems.length;
  const hasOverflow = dropdownLinks.length > 0;
  const segments = [];

  visibleStripItems.forEach((item, index) => {
    const itemPosition = getStripItemPosition(
      index,
      navItemsCount,
      hasOverflow,
    );
    const nextItem = visibleStripItems[index + 1];
    const nextItemPosition = nextItem
      ? getStripItemPosition(index + 1, navItemsCount, hasOverflow)
      : "single";
    const hasMore = index < visibleStripItems.length - 1;
    const hasDividerSlot = hasMore || hasOverflow;

    const isDividerVisible = getDividerVisibility({
      activeItem,
      item,
      itemPosition,
      nextItem,
      nextItemPosition,
    });

    const collapsedShowLabelForFirstTabItems =
      tabsMode === "priorityTabs" ||
      (!showCollapsedOverflowSlot && activeItem === item.title);

    segments.push(
      renderNavSegment(
        item,
        collapsedShowLabelForFirstTabItems,
        hasDividerSlot,
        isDividerVisible,
        itemPosition,
      ),
    );
  });

  return segments;
};
