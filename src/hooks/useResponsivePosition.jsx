import { useCallback, useEffect, useRef, useState } from "react";

export const useResponsivePosition = ({
  open,
  anchorRef,
  responsiveElementWidthRef,
  gap = 12,
  horizontalOffset = 0,
  edgePadding = 8,
}) => {
  const [position, setPosition] = useState(null);
  const frameRef = useRef(null);

  const updatePosition = useCallback(() => {
    if (!anchorRef.current) return;

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const anchorRect = anchorRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const viewportWidth = window.innerWidth;
      const responsiveElementWidth = Number(
        responsiveElementWidthRef?.current?.offsetWidth ?? 0,
      );

      const preferredLeft = anchorRect.left + scrollX - horizontalOffset;
      const minLeft = scrollX + edgePadding;
      const maxLeft =
        scrollX + viewportWidth - responsiveElementWidth - edgePadding;
      const safeLeft = Math.max(minLeft, Math.min(preferredLeft, maxLeft));

      setPosition((previousPosition) => {
        const nextPosition = {
          top: anchorRect.bottom + scrollY + gap,
          left: safeLeft,
          width: anchorRect.width,
        };

        if (
          previousPosition &&
          previousPosition.top === nextPosition.top &&
          previousPosition.left === nextPosition.left &&
          previousPosition.width === nextPosition.width
        ) {
          return previousPosition;
        }

        return nextPosition;
      });
    });
  }, [
    anchorRef,
    edgePadding,
    responsiveElementWidthRef,
    gap,
    horizontalOffset,
  ]);

  useEffect(() => {
    if (!open) return;

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      cancelAnimationFrame(frameRef.current);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open || !position) return;
    updatePosition();
  }, [open, position, updatePosition]);

  return { position, updatePosition };
};
