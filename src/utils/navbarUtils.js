const getItemPosition = (index, totalItems) => {
  if (totalItems <= 1) return "single";
  if (index === 0) return "first";
  if (index === totalItems - 1) return "last";
  return "middle";
};

const hasRightRoundedEdge = (position) =>
  position === "last" || position === "single";

const hasLeftRoundedEdge = (position) =>
  position === "first" || position === "single";

const getStripItemPosition = (index, totalItems, hasOverflow) => {
  const basePosition = getItemPosition(index, totalItems);
  if (hasOverflow && index === totalItems - 1) {
    return "middle";
  }
  return basePosition;
};

export {
  getItemPosition,
  hasRightRoundedEdge,
  hasLeftRoundedEdge,
  getStripItemPosition,
};
