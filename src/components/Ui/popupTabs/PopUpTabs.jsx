import NavItem from "../../layout/navbar/navitem/NavItem";
import styles from "./PopUpTabs.module.css";
import Divider from "../divider/Divider";
import EllipsesIcon from "../../icons/ellipsesIcon";

const PopUpTabs = ({ navLinks, activeItem, mode }) => {
  if (mode === "collapsed" || mode === "priorityTabs") {
    const firstTabItems = navLinks.slice(0, 4);
    const hiddenTabItems = navLinks.slice(4);
    const activeHiddenItem = hiddenTabItems.find(
      (item) => item.title === activeItem,
    );
    const prioritizedNavMode =
      mode === "priorityTabs" ? "priorityTabs" : "collapsed";

    return (
      <div className={styles.popUpTabsContainer}>
        {firstTabItems.map((item, index) => {
          const hasMore =
            index < firstTabItems.length - 1 ||
            !!activeHiddenItem ||
            hiddenTabItems.length > 0;
          const collapsedShowLabelOnPrimary =
            mode === "priorityTabs" ||
            (!activeHiddenItem && activeItem === item.title);
          return (
            <div key={item.title} className={styles.popUpTabItem}>
              <NavItem
                Icon={item.Icon}
                title={item.title}
                isActive={activeItem === item.title}
                mode={prioritizedNavMode}
                collapsedShowLabel={collapsedShowLabelOnPrimary}
                isForDisplayOnly={true}
              />
              {hasMore && <Divider />}
            </div>
          );
        })}
        {activeHiddenItem && (
          <div className={styles.popUpTabItem}>
            <NavItem
              Icon={activeHiddenItem.Icon}
              title={activeHiddenItem.title}
              isActive
              mode={prioritizedNavMode}
              collapsedShowLabel={true}
              isForDisplayOnly={true}
            />
            {hiddenTabItems.length > 0 && <Divider />}
          </div>
        )}
        {hiddenTabItems.length > 0 && (
          <div
            className={styles.popUpOverflowPreview}
            aria-hidden
            title="other items"
          >
            <EllipsesIcon size={10} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.popUpTabsContainer}>
      {navLinks.map((item, index) => {
        return (
          <div key={item.title} className={styles.popUpTabItem}>
            <NavItem
              Icon={item.Icon}
              title={item.title}
              isActive={activeItem === item.title}
              mode={mode}
              isForDisplayOnly={true}
            />
            {index < navLinks.length - 1 && <Divider />}
          </div>
        );
      })}
    </div>
  );
};

export default PopUpTabs;
