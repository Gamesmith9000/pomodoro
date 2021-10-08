import React, { useState } from 'react';
import './App.css';
import { Timer } from './Timer';
import { TimerScheduler } from './TimerScheduler';

function App() {
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
