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

const notificationStrings: NotificationStrings = {
	breakEnd: "Continue Working",
	breakStart: "Break Time",
	changeToSit: "Change Position: Sit Down",
	changeToStand: "Change Position: Stand Up",
	finalPeriodEnd: "Final Period Ended.",
	periodEnd: "Period Ended."
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
		const finalPeriodCompleted = currentPeriodIndex === timerPeriods.length -1;

		if (Notification.permission === "granted") {
			let notificationMessage: string;
			const newline: string = '\n';

			if(finalPeriodCompleted === false) {
				const endingPeriod: TimerPeriod = timerPeriods[currentPeriodIndex];
				const newPeriod: TimerPeriod = timerPeriods[currentPeriodIndex + 1];

				notificationMessage = notificationStrings.periodEnd + `(index ${currentPeriodIndex})`; // alt. Period names: Section/Timer/Pomodoro/Cycle

				if(endingPeriod.seatPosition !== newPeriod.seatPosition) {
					notificationMessage += newline;
					notificationMessage += newPeriod.seatPosition === SeatPosition.Sit ? notificationStrings.changeToSit : notificationStrings.changeToStand;
				}
				if (endingPeriod.isBreakPeriod !== newPeriod.isBreakPeriod) {
					notificationMessage += newline;
					notificationMessage += newPeriod.isBreakPeriod === true ? notificationStrings.breakStart : notificationStrings.breakEnd;
				}
			}
			else {
				notificationMessage = notificationStrings.finalPeriodEnd;
			}
			
			const notification = new Notification(notificationMessage);
		}

		if(finalPeriodCompleted === false) {
			setCurrentPeriodIndex(current => current + 1);
		}
		else {
			setIsRunningTimer(false);
			setCurrentPeriodIndex(0);
		}
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

interface NotificationStrings {
	breakEnd: string;
	breakStart: string;
	changeToSit: string;
	changeToStand: string;
	finalPeriodEnd: string;
	periodEnd: string;
}