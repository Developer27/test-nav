import { hasLeftRoundedEdge, hasRightRoundedEdge } from "./navbarUtils";

export const getDividerVisibility = ({
  activeItem,
  item,
  itemPosition,
  nextItem,
  nextItemPosition,
}) => {
  const hideDividerOnActiveEdge =
    (activeItem === item.title && !hasRightRoundedEdge(itemPosition)) ||
    (nextItem &&
      activeItem === nextItem.title &&
      !hasLeftRoundedEdge(nextItemPosition));

  return !hideDividerOnActiveEdge;
};
