import React, { FC, useState } from 'react';
import '../styles/TimerScheduler.css';
import { Timer } from './Timer';
import UserSettings from './UserSettings';

enum SchedulerStatus {
	AwaitingStart = "AwaitingStart",
	Engaged = "Engaged",
	FullyCompleted = "FullyCompleted"
}

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
	finalPeriodEnd: "Final Period Ended",
	title: "Period Ended"
}

export const TimerScheduler: FC<TimerSchedulerProps> = (props) => {
	const [isRunningTimer, setIsRunningTimer] = useState(false);
	const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0);
	const [schedulerStatus, setSchedulerStatus] = useState(SchedulerStatus.AwaitingStart);

	const timerPeriods: TimerPeriod[] = createTimerPeriodsList(props.initialSeatPosition);
	const seatPosition: SeatPosition = timerPeriods[currentPeriodIndex].seatPosition;

	const toggleTimerRunWithButton = (mouseEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		mouseEvent.preventDefault();
		if(schedulerStatus === SchedulerStatus.AwaitingStart) {
			setSchedulerStatus(SchedulerStatus.Engaged);
		}
		setIsRunningTimer(!isRunningTimer);
	}

	const handlePeriodCompleted = () => {
		const finalPeriodCompleted = currentPeriodIndex === timerPeriods.length -1;

		if (Notification?.permission === "granted") {
			let notificationMessage: string = "";
			const newline: string = '\n';

			if(finalPeriodCompleted === false) {
				const endingPeriod: TimerPeriod = timerPeriods[currentPeriodIndex];
				const newPeriod: TimerPeriod = timerPeriods[currentPeriodIndex + 1];

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
			
			notificationMessage +=  newline + `(index ${currentPeriodIndex})`;
			new Notification(notificationStrings.title, { body: notificationMessage });
		}

		if(finalPeriodCompleted === false) {
			setCurrentPeriodIndex(current => current + 1);
		}
		else {
			if(schedulerStatus === SchedulerStatus.Engaged) {
				setSchedulerStatus(SchedulerStatus.FullyCompleted);
			}
			setIsRunningTimer(false);
			setCurrentPeriodIndex(0);
		}
	}
	
	return (
		<div className="TimerScheduler">
			<div>Position: {seatPosition}</div>
			{ schedulerStatus !== SchedulerStatus.Engaged &&
				<UserSettings />
			}
			<button onClick={toggleTimerRunWithButton}>
				{isRunningTimer === true ? '⏸' : '▶️'}
			</button>
			<Timer
				currentPeriodIndex={currentPeriodIndex}
				durationSeconds={timerPeriods[currentPeriodIndex].durationMinutes * 60}
				isRunning={schedulerStatus === SchedulerStatus.Engaged ? isRunningTimer : false}
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
	title: string;
}