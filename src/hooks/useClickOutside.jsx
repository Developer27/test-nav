import { useEffect } from "react";

export const useClickOutside = (refs, callback) => {
  useEffect(() => {
    const handleClick = (event) => {
      const isClickInside = refs.some(
        (ref) => ref.current && ref.current.contains(event.target),
      );

      if (!isClickInside) callback();
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [refs, callback]);
};
