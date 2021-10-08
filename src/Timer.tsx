import React, { FC, MutableRefObject, useRef, useState } from 'react';
import { SeatPosition, TimerPeriod } from './TimerScheduler';

export const Timer:FC<TimerProps> = (props) => {
    const intervalId: MutableRefObject<number> = useRef(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [periodIndex, setPeriodIndex] = useState(props.initialPeriodIndex);

    const remainingSeconds: number = props.duration - currentTime;
    const remainingFullMinutes: number = Math.floor(remainingSeconds / 60);
    const remainingSecondsLessMinutes: number = remainingSeconds - (remainingFullMinutes * 60);

    const removeIntervalData = () => {
        window.clearInterval(intervalId.current);
        intervalId.current = 0;
    }

    const hasCompletedPeriod: boolean = currentTime >= props.duration;

    // OLD LOGIC BELOW:
	// NOTE: replaced 'hasCompleted' on line below with 'hasCompletedPeriod', which makes logic outdated
	if (hasCompletedPeriod === false) {
        if(currentTime >= props.duration) {
            removeIntervalData();
        }
        else {
            if(props.isRunning === true && intervalId.current === 0) {
                intervalId.current = window.setInterval(() => { setCurrentTime(current => current + 1) }, 1000);
            }
            else if(props.isRunning === false && intervalId.current !== 0) {
                removeIntervalData();
            }
        }
    }

    return (
        <div>
            {addLeadingZero(remainingFullMinutes)}
            {"\u00a0"}:{"\u00a0"}
            {addLeadingZero(remainingSecondsLessMinutes)} 
        </div>
    );
}

const addLeadingZero = (num: number) => {
    const numAsString = String(num);
    return num < 10 ? '0' + numAsString : numAsString;
}

interface TimerProps {
    duration: number;
    initalSeatPosition: SeatPosition;
    initialPeriodIndex: number;
    isRunning: boolean;
    timerPeriods: TimerPeriod[]
}
