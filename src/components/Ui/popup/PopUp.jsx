"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./PopUp.module.css";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { DEFAULT_NAV_ITEMS, TAB_MODES } from "../../../constants";
import PopUpTabs from "../popupTabs/PopUpTabs";
import { useClickOutside } from "../../../hooks/useClickOutside";
import CloseIcon from "../../icons/CloseIcon";
import SettingsIcon from "../../icons/SettingsIcon";

const PopUp = ({
  anchorRef,
  open,
  setIsPopUpOpen,
  setTabsMode,
  tabsMode,
  modalDuration = 0.2,
  popupBorderDuration = 0.2,
}) => {
  const popUpRef = useRef(null);
  const [selectedMode, setSelectedMode] = useState(tabsMode);
  const normalizedModalDuration = Math.min(
    Math.max(Number(modalDuration) || 0.2, 0.05),
    3,
  );
  const normalizedPopupBorderDuration = Math.min(
    Math.max(Number(popupBorderDuration) || 0.2, 0.05),
    3,
  );
  const closeWithoutSave = useCallback(() => {
    setSelectedMode(tabsMode);
    setIsPopUpOpen(false);
  }, [tabsMode, setIsPopUpOpen]);

  useClickOutside([anchorRef, popUpRef], () => {
    closeWithoutSave();
  });

  useEffect(() => {
    if (!open) return;

    const handleScroll = () => {
      closeWithoutSave();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open, closeWithoutSave]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: normalizedModalDuration }}
        >
          <motion.div
            ref={popUpRef}
            className={styles.popUp}
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
              duration: normalizedModalDuration,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className={styles.popUpContent}>
              <div className={styles.toolbarLayoutHeader}>
                <div className={styles.toolbarLayoutTitleContainer}>
                  <h2 className={styles.toolbarLayoutTitle}>Toolbar Layout</h2>
                  <p className={styles.toolbarLayoutDescription}>
                    Choose how creation modes appear in your toolbar
                  </p>
                </div>

                <motion.button
                  className={styles.toolbarLayoutButton}
                  onClick={closeWithoutSave}
                  aria-label="Close popup"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 12px rgba(255,255,255,0.12)",
                  }}
                  whileTap={{
                    scale: 0.9,
                    boxShadow: "0 0 8px rgba(255,255,255,0.08)",
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <CloseIcon
                    size={24}
                    className={styles.toolbarLayoutButtonIcon}
                  />
                </motion.button>
              </div>
              {TAB_MODES.map((mode) => {
                const isSelected = selectedMode === mode.id;
                return (
                  <motion.div
                    key={mode.id}
                    className={`${styles.popUpRadioContainer} ${isSelected ? styles.popUpRadioContainerActive : ""}`}
                    onClick={() => {
                      setSelectedMode(mode.id);
                    }}
                    whileHover={{
                      background: !isSelected
                        ? "rgba(58, 252, 234, 0.04)"
                        : "transparent",
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="active-popup-border"
                        className={styles.activeOutline}
                        transition={{
                          type: "tween",
                          duration: normalizedPopupBorderDuration,
                        }}
                        // transition={{
                        //   type: "spring",
                        //   stiffness: 350,
                        //   damping: 30,
                        // }}
                      />
                    )}
                    <div className={styles.popUpTextContainer}>
                      <p className={styles.popUpTextTitle}>{mode.label}</p>
                      <p className={styles.popUpTextSubtitle}>
                        {mode.subtitle}
                      </p>
                    </div>
                    <div className={styles.popUpTabsContainer}>
                      <PopUpTabs
                        navLinks={DEFAULT_NAV_ITEMS}
                        activeItem={DEFAULT_NAV_ITEMS[0].title}
                        mode={mode.id}
                      />
                    </div>
                  </motion.div>
                );
              })}
              <div className={styles.popUpFooter}>
                <div className={styles.popUpFooterSettingsButtonContainer}>
                  <SettingsIcon
                    size={12}
                    className={styles.popUpFooterSettingsButtonIcon}
                  />
                  <span className={styles.popUpFooterButtonText}>
                    You can change this anytime
                  </span>
                </div>
                <motion.button
                  className={styles.popUpFooterButton}
                  onClick={() => {
                    setTabsMode(selectedMode);
                    setIsPopUpOpen(false);
                  }}
                  whileHover={{
                    y: -2,
                    boxShadow: "0 0 12px rgba(255,255,255,0.12)",
                  }}
                  whileTap={{
                    scale: 0.98,
                    boxShadow: "0 0 8px rgba(255,255,255,0.08)",
                  }}
                  transition={{
                    duration: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className={styles.popUpFooterButtonText}>Done</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default PopUp;
