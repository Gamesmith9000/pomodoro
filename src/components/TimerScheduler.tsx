import React, { FC, Fragment, MouseEvent, useState } from 'react';
import '../styles/TimerScheduler.css';
import { Timer } from './Timer';
import { SettingsData, UserSettings } from './UserSettings';

enum SchedulerStatus {
	AwaitingStart = "AwaitingStart",
	Engaged = "Engaged",
	FullyCompleted = "FullyCompleted"
}

export enum SeatPosition {
	Sit = "Sit",
	Stand = "Stand"
}

interface NotificationStrings {
	breakEnd: string;
	breakStart: string;
	changeToSit: string;
	changeToStand: string;
	finalPeriodEnd: string;
	title: string;
}

export interface TimerPeriod {
	durationMinutes: number;
	isBreakPeriod: boolean;
	seatPosition: SeatPosition;
}

interface NotificationStrings {
	breakEnd: string;
	breakStart: string;
	changeToSit: string;
	changeToStand: string;
	finalPeriodEnd: string;
	title: string;
}

const defaultUserSettings: SettingsData = {
	startingPosition: SeatPosition.Stand
};

const notificationStrings: NotificationStrings = {
	breakEnd: "Resume Work",
	breakStart: "Break Time",
	changeToSit: "Change Position: Sit Down",
	changeToStand: "Change Position: Stand Up",
	finalPeriodEnd: "Final Period Ended",
	title: "Period Ended"
}

export function TimerScheduler () {
	const [isRunningTimer, setIsRunningTimer] = useState(false);
	const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0);
	const [schedulerStatus, setSchedulerStatus] = useState(SchedulerStatus.AwaitingStart);
	const [settingsMenuIsOpen, setSettingsMenuIsOpen] = useState(false);
	const [userSettings, setUserSettings] = useState(defaultUserSettings);

	const timerPeriods: TimerPeriod[] = createTimerPeriodsList(userSettings.startingPosition);
	const currentTimerPeriod = timerPeriods[currentPeriodIndex];

	const toggleTimerRunWithButton = (event: MouseEvent) => {
		event.preventDefault();
		if(schedulerStatus === SchedulerStatus.AwaitingStart) {
			setSchedulerStatus(SchedulerStatus.Engaged);
		}
		setIsRunningTimer(!isRunningTimer);
	}

	const handlePeriodCompleted = () => {
		const finalPeriodCompleted = currentPeriodIndex === timerPeriods.length -1;

		if (Notification?.permission === 'granted') {
			let notificationMessage: string = '';
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
	
	const handleSaveNewSettingsButton = (event: MouseEvent, newSettings: SettingsData) => {
		event.preventDefault();
		setUserSettings(newSettings);
		setSettingsMenuIsOpen(false);
	}

	const handleSettingsOpenCloseButton = (event: MouseEvent): void => {
		event.preventDefault();
		setSettingsMenuIsOpen(current => !current);
	}

	return (
		<div className="TimerScheduler">
			{ schedulerStatus !== SchedulerStatus.Engaged && settingsMenuIsOpen === true
			?
				<UserSettings
					savedSettings={userSettings}
					onCancelAndExit={handleSettingsOpenCloseButton}
					onSaveChanges={handleSaveNewSettingsButton}
				/>
			:
				<Fragment>
					{ schedulerStatus !== SchedulerStatus.Engaged &&
						<Fragment>
						<button onClick={handleSettingsOpenCloseButton}>
								Open Settings
						</button>
						</Fragment>
					}
					<div>{currentTimerPeriod.isBreakPeriod === false ? 'Work' : 'Break'}</div>
					<div>Position: {currentTimerPeriod.seatPosition}</div>
					<button onClick={toggleTimerRunWithButton}>
						{isRunningTimer === true ? '⏸' : '▶️'}
					</button>
					<Timer
						currentPeriodIndex={currentPeriodIndex}
						durationSeconds={currentTimerPeriod.durationMinutes * 60}
						isRunning={schedulerStatus === SchedulerStatus.Engaged ? isRunningTimer : false}
						onPeriodComplete={handlePeriodCompleted}
					/>
				</Fragment>
			}
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
