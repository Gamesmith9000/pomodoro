import React, { useState } from 'react';
import './App.css';
import { Timer } from './Timer';
import { TimerScheduler } from './TimerScheduler';

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
      <TimerScheduler />
    </div>
  );
}

export default App;
