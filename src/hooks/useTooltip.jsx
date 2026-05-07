import { useCallback, useEffect, useRef, useState } from "react";

export const useTooltip = ({ offset = 12, variant = "top", tooltipRef }) => {
  const triggerRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const showTimeoutIdRef = useRef(null);

  //Constants for distance from the edge of the screen to flip the tooltip
  const HORIZONTAL_EDGE_FLIP_MAX_PX = 100;
  const VERTICAL_EDGE_FLIP_MAX_PX = offset + 24;

  const SHOWN_TOOLTIP_DELAY_MS = 500;

  const updatePosition = useCallback(() => {
    const element = triggerRef.current;
    const tooltipEl = tooltipRef?.current;

    if (!element || !tooltipEl) return;
    const rectBoudaries = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipEl?.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let effectiveVariant = variant;
    if (
      variant === "left" &&
      rectBoudaries.left < HORIZONTAL_EDGE_FLIP_MAX_PX
    ) {
      effectiveVariant = "right";
    } else if (
      variant === "right" &&
      viewportWidth - rectBoudaries.right < HORIZONTAL_EDGE_FLIP_MAX_PX
    ) {
      effectiveVariant = "left";
    } else if (
      variant === "top" &&
      rectBoudaries.top < VERTICAL_EDGE_FLIP_MAX_PX
    ) {
      effectiveVariant = "bottom";
    } else if (
      variant === "bottom" &&
      viewportHeight - rectBoudaries.bottom < VERTICAL_EDGE_FLIP_MAX_PX
    ) {
      effectiveVariant = "top";
    }

    switch (effectiveVariant) {
      case "top":
        setPosition({
          top: rectBoudaries.top - (tooltipRect?.height || 0) - offset,
          left:
            rectBoudaries.left +
            rectBoudaries.width / 2 -
            (tooltipRect?.width || 0) / 2,
          variant: effectiveVariant,
        });
        break;

      case "bottom":
        setPosition({
          top: rectBoudaries.bottom + offset,
          left:
            rectBoudaries.left +
            rectBoudaries.width / 2 -
            (tooltipRect?.width || 0) / 2,
          variant: effectiveVariant,
        });
        break;

      case "right":
        setPosition({
          top: rectBoudaries.top + rectBoudaries.height / 2,
          left: rectBoudaries.right + offset,
          variant: effectiveVariant,
        });
        break;

      case "left":
        setPosition({
          top: rectBoudaries.top + rectBoudaries.height / 2,
          left: rectBoudaries.left - (tooltipRect?.width || 0) - offset,
          variant: effectiveVariant,
        });
        break;
    }
  }, [offset, tooltipRef, variant, VERTICAL_EDGE_FLIP_MAX_PX]);

  const clearShowTimeout = useCallback(() => {
    if (showTimeoutIdRef.current === null) return;
    window.clearTimeout(showTimeoutIdRef.current);
    showTimeoutIdRef.current = null;
  }, []);

  const showTooltip = useCallback(() => {
    clearShowTimeout();
    showTimeoutIdRef.current = window.setTimeout(() => {
      showTimeoutIdRef.current = null;
      setIsVisible(true);
    }, SHOWN_TOOLTIP_DELAY_MS);
  }, [clearShowTimeout]);

  const hideTooltip = useCallback(() => {
    clearShowTimeout();
    setIsVisible(false);
    setPosition(null);
  }, [clearShowTimeout]);

  const handleBlur = useCallback(() => hideTooltip(), [hideTooltip]);
  const handleVisibility = useCallback(() => {
    if (document.hidden) hideTooltip();
  }, [hideTooltip]);

  useEffect(() => {
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [handleBlur, handleVisibility]);

  useEffect(() => {
    if (!isVisible) return;

    const frameId = window.requestAnimationFrame(() => {
      updatePosition();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isVisible, updatePosition]);

  return {
    isVisible,
    position,
    setPosition,
    triggerRef,
    updatePosition,
    showTooltip,
    hideTooltip,
  };
};
