import React, { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import './Timer.css';

export const Timer: FC<TimerProps> = (props) => {
	const intervalId: MutableRefObject<number> = useRef(0);
	const priorPeriodIndex: MutableRefObject<number> = useRef(0);
	const [currentTime, setCurrentTime] = useState(0);

	const exactRemainingSeconds: number = props.durationSeconds - currentTime;
	const remainingSeconds: number = exactRemainingSeconds >= 0 ? exactRemainingSeconds : 0;
	const remainingFullMinutes: number = Math.floor(remainingSeconds / 60);
	const remainingSecondsLessMinutes: number = remainingSeconds - (remainingFullMinutes * 60);

	const hasCompletedPeriod: boolean = currentTime > props.durationSeconds;
	const periodHasChanged: boolean = priorPeriodIndex.current !== props.currentPeriodIndex;

	const removeIntervalData = () => {
		window.clearInterval(intervalId.current);
		intervalId.current = 0;
	}

	useEffect(() => {
		if (periodHasChanged === true) {
			priorPeriodIndex.current = props.currentPeriodIndex;
			setCurrentTime(0);
		}
		else {
			if (hasCompletedPeriod === false) {
				if (props.isRunning === true && intervalId.current === 0) {
					intervalId.current = window.setInterval(() => { setCurrentTime(current => current + 1) }, 1000); ////////////////
				}
				else if (props.isRunning === false && intervalId.current !== 0) {
					removeIntervalData();
				}
			}
			else {
				props.onPeriodComplete();
			}
		}
	});

	return (
		<div>
			{addLeadingZero(remainingFullMinutes)}
			{"\u00a0"}:{"\u00a0"}
			{addLeadingZero(remainingSecondsLessMinutes)}
		</div>
	);
}

const addLeadingZero = (num: number) => {
	const numAsString: string = String(num);
	return num < 10 ? '0' + numAsString : numAsString;
}

interface TimerProps {
	currentPeriodIndex: number
	durationSeconds: number;
	isRunning: boolean;
	onPeriodComplete(): void;
}
