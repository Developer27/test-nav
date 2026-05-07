"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./NavbarDropdown.module.css";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import EllipsesIcon from "../../../icons/EllipsesIcon";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { useResponsivePosition } from "../../../../hooks/useResponsivePosition";

const NavbarDropdown = ({ dropdownItems, activeItem, setActiveItem }) => {
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
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="more navigation items"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <EllipsesIcon size={16} />
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
                minWidth: Math.max(menuPosition.width),
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
                duration: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {dropdownItems.map((item) => {
                const Icon = item.Icon;
                const isActive = activeItem === item.title;
                return (
                  <li key={item.title}>
                    <button
                      type="button"
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
                      <span>{item.title}</span>
                    </button>
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
