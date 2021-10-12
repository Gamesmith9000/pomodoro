import React, { FC, useState } from 'react';
import './TimerScheduler.css';
import { Timer } from './Timer';

export enum SeatPosition {
	Sit = "Sit",
	Stand = "Stand"
}

export interface TimerPeriod {
	durationMinutes: number;
	isBreakPeriod: boolean;
	seatPosition: SeatPosition;
}

export const TimerScheduler: FC<TimerSchedulerProps> = (props) => {
	const [isRunningTimer, setIsRunningTimer] = useState(false);
	const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0);

	const timerPeriods: TimerPeriod[] = createTimerPeriodsList(props.initialSeatPosition);
	const seatPosition: SeatPosition = timerPeriods[currentPeriodIndex].seatPosition;

	const toggleTimerRunWithButton = (mouseEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		mouseEvent.preventDefault();
		setIsRunningTimer(!isRunningTimer);
	}

	const handlePeriodCompleted = () => {
		setCurrentPeriodIndex(current => current + 1);
	}

	return (
		<div className="TimerScheduler">
			<div>Position: {seatPosition}</div>
			<button onClick={toggleTimerRunWithButton}>
				{isRunningTimer === true ? '⏸' : '▶️'}
			</button>
			<Timer
				currentPeriodIndex={currentPeriodIndex}
				durationSeconds={timerPeriods[currentPeriodIndex].durationMinutes * 60}
				isRunning={isRunningTimer}
				onPeriodComplete={handlePeriodCompleted}
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

interface TimerSchedulerProps {
	initialSeatPosition: SeatPosition;
}
