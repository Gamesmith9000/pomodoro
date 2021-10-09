import React, { MutableRefObject, useRef, useState } from 'react';
import './TimerScheduler.css';
import { Timer } from './Timer';

export enum SeatPosition {
	Sit,
	Stand
}

export interface TimerPeriod {
	durationMinutes: number;
	isBreakPeriod: boolean;
	seatPosition: SeatPosition;
}

export const TimerScheduler = () => {
	const [initialSeatPosition, setInitialSeatPosition] = useState(SeatPosition.Stand);
	const [isRunningTimer, setIsRunningTimer] = useState(false);
	const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0);
	const [seatPosition, setSeatPosition] = useState(initialSeatPosition);

	const toggleTimerRunWithButton = (mouseEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		mouseEvent.preventDefault();
		setIsRunningTimer(!isRunningTimer);
	}

	const timerPeriods: TimerPeriod[] = createTimerPeriodsList(initialSeatPosition);

	return (
		<div className="TimerScheduler">
			<button onClick={toggleTimerRunWithButton}>
				{isRunningTimer === true ? '⏸' : '▶️'}
			</button>
			<Timer
				duration={5}
				initialPeriodIndex={0}
				initalSeatPosition={initialSeatPosition}
				isRunning={isRunningTimer}
				timerPeriods={timerPeriods}
			/>
		</div>
	);
}

const createTimerPeriodsList = (initialPosition: SeatPosition) : TimerPeriod[] => {
	const alternatePosition: SeatPosition = initialPosition === SeatPosition.Sit ? SeatPosition.Stand: SeatPosition.Sit;
	return [
		{ durationMinutes: 25, isBreakPeriod: false, seatPosition: initialPosition },
		{ durationMinutes: 5,  isBreakPeriod: true,  seatPosition: initialPosition },
		{ durationMinutes: 25, isBreakPeriod: false, seatPosition: alternatePosition },
		{ durationMinutes: 5,  isBreakPeriod: true,  seatPosition: alternatePosition },
		{ durationMinutes: 25, isBreakPeriod: false, seatPosition: initialPosition },
		{ durationMinutes: 5,  isBreakPeriod: true,  seatPosition: initialPosition },
		{ durationMinutes: 25, isBreakPeriod: false, seatPosition: alternatePosition },
		{ durationMinutes: 5,  isBreakPeriod: true,  seatPosition: alternatePosition },
		{ durationMinutes: 10, isBreakPeriod: false, seatPosition: initialPosition },
		{ durationMinutes: 10, isBreakPeriod: true,  seatPosition: alternatePosition }
	];
}