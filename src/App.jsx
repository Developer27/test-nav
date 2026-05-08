import { useState } from "react";
import "./App.css";
import Navbar from "./components/layout/navbar/Navbar";
import Controls from "./components/Ui/controls/Controls";

function App() {
  const [duration, setDuration] = useState(0.3);
  const durationMin = 0.12;
  const durationMax = 1.2;
  const durationStep = 0.01;
  const [activeBackgroundDuration, setActiveBackgroundDuration] = useState(0.3);
  const activeBackgroundDurationMin = 0.05;
  const activeBackgroundDurationMax = 5;
  const activeBackgroundDurationStep = 0.01;
  const [fadeDuration, setFadeDuration] = useState(0.15);
  const fadeDurationMin = 0.12;
  const fadeDurationMax = 1.2;
  const fadeDurationStep = 0.01;
  const [hoverDuration, setHoverDuration] = useState(0.15);
  const hoverDurationMin = 0.05;
  const hoverDurationMax = 1.2;
  const hoverDurationStep = 0.01;
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
        duration={duration}
        activeBackgroundDuration={activeBackgroundDuration}
        fadeDuration={fadeDuration}
        hoverDuration={hoverDuration}
        modalDuration={modalDuration}
        dropdownDuration={dropdownDuration}
        popupBorderDuration={popupBorderDuration}
      />
      {show && (
        <Controls
          duration={duration}
          setDuration={setDuration}
          min={durationMin}
          max={durationMax}
          step={durationStep}
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
          hoverDuration={hoverDuration}
          setHoverDuration={setHoverDuration}
          hoverMin={hoverDurationMin}
          hoverMax={hoverDurationMax}
          hoverStep={hoverDurationStep}
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
