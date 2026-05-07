import { useState } from "react";
import "./App.css";
import Navbar from "./components/layout/navbar/Navbar";
import Controls from "./components/Ui/controls/Controls";
import FadeText from "./components/Ui/fadeText/FadeText";

function App() {
  const [duration, setDuration] = useState(0.25);
  const durationMin = 0.12;
  const durationMax = 1.2;
  const durationStep = 0.01;

  const [show, setShow] = useState(true);
  return (
    <div className="container">
      <FadeText text="Hello, world!" show={true} />
      <Navbar duration={duration} />
      {show && (
        <Controls
          duration={duration}
          setDuration={setDuration}
          min={durationMin}
          max={durationMax}
          step={durationStep}
        />
      )}
      <button className="show-hide-button" onClick={() => setShow(!show)}>
        Show/Hide
      </button>
    </div>
  );
}

export default App;
