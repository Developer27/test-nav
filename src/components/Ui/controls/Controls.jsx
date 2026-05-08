import styles from "./Controls.module.css";

const Controls = ({
  collapseItemDuration,
  setCollapseItemDuration,
  collapseItemMin = 0.12,
  collapseItemMax = 1.2,
  collapseItemStep = 0.01,
  expandItemDuration,
  setExpandItemDuration,
  expandItemMin = 0.12,
  expandItemMax = 1.2,
  expandItemStep = 0.01,
  activeBackgroundDuration,
  setActiveBackgroundDuration,
  activeBackgroundMin = 0.05,
  activeBackgroundMax = 2,
  activeBackgroundStep = 0.01,
  fadeDuration,
  setFadeDuration,
  fadeMin = 0.12,
  fadeMax = 1.2,
  fadeStep = 0.01,
  fadeOutDuration,
  setFadeOutDuration,
  fadeOutMin = 0.12,
  fadeOutMax = 1.2,
  fadeOutStep = 0.01,
  hoverEnterDuration,
  setHoverEnterDuration,
  hoverEnterMin = 0.05,
  hoverEnterMax = 1.2,
  hoverEnterStep = 0.01,
  hoverExitDuration,
  setHoverExitDuration,
  hoverExitMin = 0.05,
  hoverExitMax = 1.2,
  hoverExitStep = 0.01,
  modalDuration,
  setModalDuration,
  modalMin = 0.05,
  modalMax = 1.2,
  modalStep = 0.01,
  dropdownDuration,
  setDropdownDuration,
  dropdownMin = 0.05,
  dropdownMax = 1.2,
  dropdownStep = 0.01,
  popupBorderDuration,
  setPopupBorderDuration,
  popupBorderMin = 0.05,
  popupBorderMax = 1.2,
  popupBorderStep = 0.01,
}) => {
  const normalizedActiveBackgroundDuration = Math.min(
    Math.max(
      Number(activeBackgroundDuration) || activeBackgroundMin,
      activeBackgroundMin,
    ),
    activeBackgroundMax,
  );
  const normalizedCollapseItemDuration = Math.min(
    Math.max(Number(collapseItemDuration) || collapseItemMin, collapseItemMin),
    collapseItemMax,
  );
  const normalizedExpandItemDuration = Math.min(
    Math.max(Number(expandItemDuration) || expandItemMin, expandItemMin),
    expandItemMax,
  );
  const normalizedFadeDuration = Math.min(
    Math.max(Number(fadeDuration) || fadeMin, fadeMin),
    fadeMax,
  );
  const normalizedFadeOutDuration = Math.min(
    Math.max(Number(fadeOutDuration) || fadeOutMin, fadeOutMin),
    fadeOutMax,
  );
  const normalizedHoverEnterDuration = Math.min(
    Math.max(Number(hoverEnterDuration) || hoverEnterMin, hoverEnterMin),
    hoverEnterMax,
  );
  const normalizedHoverExitDuration = Math.min(
    Math.max(Number(hoverExitDuration) || hoverExitMin, hoverExitMin),
    hoverExitMax,
  );
  const normalizedModalDuration = Math.min(
    Math.max(Number(modalDuration) || modalMin, modalMin),
    modalMax,
  );
  const normalizedDropdownDuration = Math.min(
    Math.max(Number(dropdownDuration) || dropdownMin, dropdownMin),
    dropdownMax,
  );
  const normalizedPopupBorderDuration = Math.min(
    Math.max(Number(popupBorderDuration) || popupBorderMin, popupBorderMin),
    popupBorderMax,
  );

  return (
    <div className={styles.controlsContainer}>
      <label className={styles.controlLabel}>
        <span>Collapse item duration</span>
        <input
          type="range"
          min={collapseItemMin}
          max={collapseItemMax}
          step={collapseItemStep}
          value={normalizedCollapseItemDuration}
          onChange={(e) => setCollapseItemDuration(Number(e.target.value))}
        />
        <p>{normalizedCollapseItemDuration.toFixed(2)}s</p>
      </label>
      <label className={styles.controlLabel}>
        <span>Expand item duration</span>
        <input
          type="range"
          min={expandItemMin}
          max={expandItemMax}
          step={expandItemStep}
          value={normalizedExpandItemDuration}
          onChange={(e) => setExpandItemDuration(Number(e.target.value))}
        />
        <p>{normalizedExpandItemDuration.toFixed(2)}s</p>
      </label>
      <label className={styles.controlLabel}>
        <span>Fade text out duration</span>
        <input
          type="range"
          min={fadeOutMin}
          max={fadeOutMax}
          step={fadeOutStep}
          value={normalizedFadeOutDuration}
          onChange={(e) => setFadeOutDuration(Number(e.target.value))}
        />
        <p>{normalizedFadeOutDuration.toFixed(2)}s</p>
      </label>
      <label className={styles.controlLabel}>
        <span>Fade text in duration</span>
        <input
          type="range"
          min={fadeMin}
          max={fadeMax}
          step={fadeStep}
          value={normalizedFadeDuration}
          onChange={(e) => setFadeDuration(Number(e.target.value))}
        />
        <p>{normalizedFadeDuration.toFixed(2)}s</p>
      </label>
      <label className={styles.controlLabel}>
        <span>Nav item hover exit duration</span>
        <input
          type="range"
          min={hoverExitMin}
          max={hoverExitMax}
          step={hoverExitStep}
          value={normalizedHoverExitDuration}
          onChange={(e) => setHoverExitDuration(Number(e.target.value))}
        />
        <p>{normalizedHoverExitDuration.toFixed(2)}s</p>
      </label>

      <label className={styles.controlLabel}>
        <span>Nav item hover enter duration</span>
        <input
          type="range"
          min={hoverEnterMin}
          max={hoverEnterMax}
          step={hoverEnterStep}
          value={normalizedHoverEnterDuration}
          onChange={(e) => setHoverEnterDuration(Number(e.target.value))}
        />
        <p>{normalizedHoverEnterDuration.toFixed(2)}s</p>
      </label>
      <label className={styles.controlLabel}>
        <span>Active nav item background duration</span>
        <input
          type="range"
          min={activeBackgroundMin}
          max={activeBackgroundMax}
          step={activeBackgroundStep}
          value={normalizedActiveBackgroundDuration}
          onChange={(e) => setActiveBackgroundDuration(Number(e.target.value))}
        />
        <p>{normalizedActiveBackgroundDuration.toFixed(2)}s</p>
      </label>

      <label className={styles.controlLabel}>
        <span>Modal open/close duration</span>
        <input
          type="range"
          min={modalMin}
          max={modalMax}
          step={modalStep}
          value={normalizedModalDuration}
          onChange={(e) => setModalDuration(Number(e.target.value))}
        />
        <p>{normalizedModalDuration.toFixed(2)}s</p>
      </label>
      <label className={styles.controlLabel}>
        <span>Dropdown open/close duration</span>
        <input
          type="range"
          min={dropdownMin}
          max={dropdownMax}
          step={dropdownStep}
          value={normalizedDropdownDuration}
          onChange={(e) => setDropdownDuration(Number(e.target.value))}
        />
        <p>{normalizedDropdownDuration.toFixed(2)}s</p>
      </label>
      <label className={styles.controlLabel}>
        <span>Modal active border duration</span>
        <input
          type="range"
          min={popupBorderMin}
          max={popupBorderMax}
          step={popupBorderStep}
          value={normalizedPopupBorderDuration}
          onChange={(e) => setPopupBorderDuration(Number(e.target.value))}
        />
        <p>{normalizedPopupBorderDuration.toFixed(2)}s</p>
      </label>
    </div>
  );
};

export default Controls;
