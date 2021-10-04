import React, { useState } from 'react';
import './App.css';
import { Timer } from './Timer';

function App() {
  function onCompleteTimerCountdown () {
    console.log("Timer finished");
  }
  
  const [initiallyInSittingPosition, setInitiallyInSittingPosition] = useState(false);
  const [isRunningTimer, setIsRunningTimer] = useState(false);

  function toggleTimerRunWithButton (mouseEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    mouseEvent.preventDefault();
    setIsRunningTimer(!isRunningTimer);
  }

  return (
    <div className="App">
      <header>
        Timer App
      </header>
      <button onClick={toggleTimerRunWithButton}>
        { isRunningTimer === true ? '⏸' : '▶️' }
      </button>
      <Timer
        duration={5}
        initiallyInSittingPosition={true}
        isRunning={isRunningTimer}
        onCompleteCountdown={onCompleteTimerCountdown}
        positionMatchesInitial={true}
      />
    </div>
  );
}

export default App;
