"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./NavbarDropdown.module.css";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { useResponsivePosition } from "../../../../hooks/useResponsivePosition";
import DropDownArrowDownIcon from "../../../icons/DropDownArrowDownIcon";

const NavbarDropdown = ({
  dropdownItems,
  activeItem,
  setActiveItem,
  onOpenChange,
  dropdownDuration = 0.25,
  hoverEnterDuration = 0.15,
  hoverExitDuration = 0.4,
}) => {
  const normalizedDropdownDuration = Math.min(
    Math.max(Number(dropdownDuration) || 0.25, 0.05),
    3,
  );
  const normalizedHoverEnterDuration = Math.min(
    Math.max(Number(hoverEnterDuration) || 0.15, 0.05),
    3,
  );
  const normalizedHoverExitDuration = Math.min(
    Math.max(Number(hoverExitDuration) || 0.4, 0.05),
    3,
  );
  const anchorRef = useRef(null);
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { position: menuPosition } = useResponsivePosition({
    open,
    anchorRef,
    responsiveElementWidthRef: menuRef,
    gap: 12,
    horizontalOffset: 0,
    edgePadding: 8,
  });

  const hasActiveItemInDropdown = dropdownItems.some(
    (item) => item.title === activeItem,
  );

  useClickOutside([anchorRef, menuRef], () => {
    setOpen(false);
  });

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const handleScroll = () => {
      setOpen(false);
    };

    // Close menu on scroll
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        ref={anchorRef}
        className={`${styles.dropdownTrigger} ${open ? styles.dropdownTriggerOpen : ""} ${hasActiveItemInDropdown ? styles.dropdownTriggerHasActiveInMenu : ""}`}
        style={{
          "--hover-enter-duration": `${normalizedHoverEnterDuration}s`,
          "--hover-exit-duration": `${normalizedHoverExitDuration}s`,
        }}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="more navigation items"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <span className={styles.dropdownTriggerText}>More</span>
        <motion.span
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          style={{}}
          className={styles.dropdownTriggerIconContainer}
        >
          <DropDownArrowDownIcon
            size={13}
            className={styles.dropdownTriggerIcon}
          />
        </motion.span>
      </button>
      {createPortal(
        <AnimatePresence>
          {open && menuPosition && (
            <motion.ul
              ref={menuRef}
              role="menu"
              className={styles.dropdownMenu}
              style={{
                top: menuPosition.top,
                left: menuPosition.left,
                width: "max-content",
              }}
              initial={{
                opacity: 0,
                scale: 0.96,
                y: -4,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: -4,
              }}
              transition={{
                duration: normalizedDropdownDuration,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {dropdownItems.map((item) => {
                const Icon = item.Icon;
                const isActive = activeItem === item.title;
                return (
                  <li key={item.title}>
                    <div
                      role="menuitem"
                      className={
                        isActive ? styles.menuItemActive : styles.menuItem
                      }
                      onClick={() => {
                        setActiveItem(item.title);
                        setOpen(false);
                      }}
                    >
                      <Icon size={24} />
                      <span className={styles.menuItemText}>{item.title}</span>
                    </div>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
};

export default NavbarDropdown;
