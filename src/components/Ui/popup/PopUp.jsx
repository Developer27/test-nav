"use client";
import { useEffect, useRef } from "react";
import styles from "./PopUp.module.css";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { RadioBtn } from "../radiobtn/RadioBtn";
import { DEFAULT_NAV_ITEMS, TAB_MODES } from "../../../constants";
import PopUpTabs from "../popupTabs/PopUpTabs";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useResponsivePosition } from "../../../hooks/useResponsivePosition";

const PopUp = ({ anchorRef, open, setIsPopUpOpen, tabsMode, setTabsMode }) => {
  const popUpRef = useRef(null);
  const { position } = useResponsivePosition({
    open,
    anchorRef,
    responsiveElementWidthRef: popUpRef,
    gap: 12,
    horizontalOffset: 100,
    edgePadding: 8,
  });

  useClickOutside([anchorRef, popUpRef], () => {
    setIsPopUpOpen(false);
  });

  useEffect(() => {
    if (!open) return;

    const handleScroll = () => {
      setIsPopUpOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open, setIsPopUpOpen]);

  if (!position) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={popUpRef}
          className={styles.popUp}
          style={{
            top: position?.top,
            left: position?.left,
            width: position?.width,
          }}
          initial={{
            opacity: 0,
            scale: 0.85,
            y: -8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: -5,
          }}
          transition={{
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className={styles.popUpContent}>
            {TAB_MODES.map((mode) => (
              <div key={mode.id} className={styles.popUpRadioContainer}>
                <label className={styles.popUpRadioLabel}>
                  <RadioBtn
                    id={mode.id}
                    name="tabsVariations"
                    value={mode.id}
                    isActive={tabsMode === mode.id}
                    onChange={() => {
                      setTabsMode(mode.id);
                      setIsPopUpOpen(false);
                    }}
                  />
                  <p>{mode.label}</p>
                </label>

                <div className={styles.popUpTabsContainer}>
                  <PopUpTabs
                    navLinks={DEFAULT_NAV_ITEMS}
                    activeItem={DEFAULT_NAV_ITEMS[0].title}
                    mode={mode.id}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default PopUp;
