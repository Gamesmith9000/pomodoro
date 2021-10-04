import React, { FC, MutableRefObject, useRef, useState } from 'react';

export const Timer:FC<TimerProps> = (props) => {
    const intervalId: MutableRefObject<number> = useRef(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [hasCompleted, setHasCompleted] = useState(false);

    const remainingSeconds: number = props.duration - currentTime;
    const remainingFullMinutes: number = Math.floor(remainingSeconds / 60);
    const remainingSecondsLessMinutes: number = remainingSeconds - (remainingFullMinutes * 60);

    const removeIntervalData = () => {
        window.clearInterval(intervalId.current);
        intervalId.current = 0;
    }

    if(hasCompleted === false) {
        if(currentTime >= props.duration) {
            props.onCompleteCountdown();
            removeIntervalData();
            setHasCompleted(true);
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

interface RemaingTimes {
    fullMinutes: number;
    seconds: number;
    secondsLessMinutes: number;
}

interface TimerProps {
    duration: number;
    initiallyInSittingPosition: boolean;
    isRunning: boolean;
    onCompleteCountdown(): any,
    positionMatchesInitial: boolean;
}
