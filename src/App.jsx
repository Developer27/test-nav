import { useState } from "react";
import "./App.css";
import Navbar from "./components/layout/navbar/Navbar";
import Controls from "./components/Ui/controls/Controls";

function App() {
  const [duration, setDuration] = useState(0.25);
  const durationMin = 0.12;
  const durationMax = 1.2;
  const durationStep = 0.01;
  const [fadeDuration, setFadeDuration] = useState(0.25);
  const fadeDurationMin = 0.12;
  const fadeDurationMax = 1.2;
  const fadeDurationStep = 0.01;

  const [show, setShow] = useState(true);
  return (
    <div className="container">
      <Navbar duration={duration} fadeDuration={fadeDuration} />
      {show && (
        <Controls
          duration={duration}
          setDuration={setDuration}
          min={durationMin}
          max={durationMax}
          step={durationStep}
          fadeDuration={fadeDuration}
          setFadeDuration={setFadeDuration}
          fadeMin={fadeDurationMin}
          fadeMax={fadeDurationMax}
          fadeStep={fadeDurationStep}
        />
      )}
      <button className="show-hide-button" onClick={() => setShow(!show)}>
        Show/Hide
      </button>
    </div>
  );
}

export default App;
