import React, { useState } from 'react';
import './TimerScheduler.css';
import { Timer } from './Timer';

export enum SeatPosition {
	Sitting,
	Standing
}

export interface TimerPeriod {
	changePosition: boolean;
	durationMinutes: number;
	isBreakPeriod: boolean;
}

export const TimerScheduler = () => {
	const [initialSeatPosition, setInitialSeatPosition] = useState(SeatPosition.Sitting);
	const [isRunningTimer, setIsRunningTimer] = useState(false);
	const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0);
	const [seatPosition, setSeatPosition] = useState(initialSeatPosition);

	function toggleTimerRunWithButton(mouseEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		mouseEvent.preventDefault();
		setIsRunningTimer(!isRunningTimer);
	}

	return (
		<div className="TimerScheduler">
			<button onClick={toggleTimerRunWithButton}>
				{isRunningTimer === true ? '⏸' : '▶️'}
			</button>
			<Timer
				duration={5}
				initalSeatPosition={initialSeatPosition}
				isRunning={isRunningTimer}
				timerPeriods={timerPeriods}
				initialPeriodIndex={0}
			/>
		</div>
	);
}

const timerPeriods: TimerPeriod[] = [
	{ changePosition: false, durationMinutes: 25, isBreakPeriod: false },
	{ changePosition: false, durationMinutes: 5,  isBreakPeriod: true },
	{ changePosition: true,  durationMinutes: 25, isBreakPeriod: false },
	{ changePosition: false, durationMinutes: 5,  isBreakPeriod: true },
	{ changePosition: true,  durationMinutes: 25, isBreakPeriod: false },
	{ changePosition: false, durationMinutes: 5,  isBreakPeriod: true },
	{ changePosition: true,  durationMinutes: 25, isBreakPeriod: false },
	{ changePosition: false, durationMinutes: 5,  isBreakPeriod: true },
	{ changePosition: false, durationMinutes: 10, isBreakPeriod: false },
	{ changePosition: true,  durationMinutes: 10, isBreakPeriod: true }
];

