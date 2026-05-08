import { useState } from "react";
import "./App.css";
import Navbar from "./components/layout/navbar/Navbar";
import Controls from "./components/Ui/controls/Controls";

function App() {
  const [collapseItemDuration, setCollapseItemDuration] = useState(0.2);
  const collapseItemDurationMin = 0.12;
  const collapseItemDurationMax = 1.2;
  const collapseItemDurationStep = 0.01;
  const [expandItemDuration, setExpandItemDuration] = useState(0.3);
  const expandItemDurationMin = 0.12;
  const expandItemDurationMax = 1.2;
  const expandItemDurationStep = 0.01;
  const [activeBackgroundDuration, setActiveBackgroundDuration] = useState(0.3);
  const activeBackgroundDurationMin = 0.05;
  const activeBackgroundDurationMax = 5;
  const activeBackgroundDurationStep = 0.01;
  const [fadeDuration, setFadeDuration] = useState(0.25);
  const fadeDurationMin = 0.12;
  const fadeDurationMax = 1.2;
  const fadeDurationStep = 0.01;
  const [fadeOutDuration, setFadeOutDuration] = useState(0.5);
  const fadeOutDurationMin = 0.12;
  const fadeOutDurationMax = 1.2;
  const fadeOutDurationStep = 0.01;
  const [hoverEnterDuration, setHoverEnterDuration] = useState(0.15);
  const hoverEnterDurationMin = 0.05;
  const hoverEnterDurationMax = 1.2;
  const hoverEnterDurationStep = 0.01;
  const [hoverExitDuration, setHoverExitDuration] = useState(0.5);
  const hoverExitDurationMin = 0.05;
  const hoverExitDurationMax = 1.2;
  const hoverExitDurationStep = 0.01;
  const [modalDuration, setModalDuration] = useState(0.2);
  const modalDurationMin = 0.05;
  const modalDurationMax = 1.2;
  const modalDurationStep = 0.01;
  const [dropdownDuration, setDropdownDuration] = useState(0.25);
  const dropdownDurationMin = 0.05;
  const dropdownDurationMax = 1.2;
  const dropdownDurationStep = 0.01;
  const [popupBorderDuration, setPopupBorderDuration] = useState(0.2);
  const popupBorderDurationMin = 0.05;
  const popupBorderDurationMax = 1.2;
  const popupBorderDurationStep = 0.01;

  const [show, setShow] = useState(true);
  return (
    <div className="container">
      <Navbar
        collapseItemDuration={collapseItemDuration}
        expandItemDuration={expandItemDuration}
        activeBackgroundDuration={activeBackgroundDuration}
        fadeDuration={fadeDuration}
        fadeOutDuration={fadeOutDuration}
        hoverEnterDuration={hoverEnterDuration}
        hoverExitDuration={hoverExitDuration}
        modalDuration={modalDuration}
        dropdownDuration={dropdownDuration}
        popupBorderDuration={popupBorderDuration}
      />
      {show && (
        <Controls
          collapseItemDuration={collapseItemDuration}
          setCollapseItemDuration={setCollapseItemDuration}
          collapseItemMin={collapseItemDurationMin}
          collapseItemMax={collapseItemDurationMax}
          collapseItemStep={collapseItemDurationStep}
          expandItemDuration={expandItemDuration}
          setExpandItemDuration={setExpandItemDuration}
          expandItemMin={expandItemDurationMin}
          expandItemMax={expandItemDurationMax}
          expandItemStep={expandItemDurationStep}
          activeBackgroundDuration={activeBackgroundDuration}
          setActiveBackgroundDuration={setActiveBackgroundDuration}
          activeBackgroundMin={activeBackgroundDurationMin}
          activeBackgroundMax={activeBackgroundDurationMax}
          activeBackgroundStep={activeBackgroundDurationStep}
          fadeDuration={fadeDuration}
          setFadeDuration={setFadeDuration}
          fadeMin={fadeDurationMin}
          fadeMax={fadeDurationMax}
          fadeStep={fadeDurationStep}
          fadeOutDuration={fadeOutDuration}
          setFadeOutDuration={setFadeOutDuration}
          fadeOutMin={fadeOutDurationMin}
          fadeOutMax={fadeOutDurationMax}
          fadeOutStep={fadeOutDurationStep}
          hoverEnterDuration={hoverEnterDuration}
          setHoverEnterDuration={setHoverEnterDuration}
          hoverEnterMin={hoverEnterDurationMin}
          hoverEnterMax={hoverEnterDurationMax}
          hoverEnterStep={hoverEnterDurationStep}
          hoverExitDuration={hoverExitDuration}
          setHoverExitDuration={setHoverExitDuration}
          hoverExitMin={hoverExitDurationMin}
          hoverExitMax={hoverExitDurationMax}
          hoverExitStep={hoverExitDurationStep}
          modalDuration={modalDuration}
          setModalDuration={setModalDuration}
          modalMin={modalDurationMin}
          modalMax={modalDurationMax}
          modalStep={modalDurationStep}
          dropdownDuration={dropdownDuration}
          setDropdownDuration={setDropdownDuration}
          dropdownMin={dropdownDurationMin}
          dropdownMax={dropdownDurationMax}
          dropdownStep={dropdownDurationStep}
          popupBorderDuration={popupBorderDuration}
          setPopupBorderDuration={setPopupBorderDuration}
          popupBorderMin={popupBorderDurationMin}
          popupBorderMax={popupBorderDurationMax}
          popupBorderStep={popupBorderDurationStep}
        />
      )}
      <button className="show-hide-button" onClick={() => setShow(!show)}>
        Show/Hide
      </button>
    </div>
  );
}

export default App;
