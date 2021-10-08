import React, { useState } from 'react';
import './TimerScheduler.css';
import { Timer } from './Timer';

export const TimerScheduler = () => {
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
