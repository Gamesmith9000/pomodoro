import React, { FC, useState } from 'react';

export const Timer:FC<TimerProps> = (props) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [hasCompleted, setHasCompleted] = useState(false);
    // const [intervalId, setintervalId] = useState(0);

    const remainingSeconds: number = props.duration - currentTime;
    const remainingFullMinutes: number = Math.floor(remainingSeconds / 60);
    const remainingSecondsLessMinutes: number = remainingSeconds - (remainingFullMinutes * 60);
    
    if(hasCompleted === false){
        if(currentTime >= props.duration) {
            props.onCompleteCountdown();
            setHasCompleted(true);
        }
        else {
            setTimeout(() => { setCurrentTime(currentTime + 1); }, 1000);
        }
    }

    return (
        <div>
            <p>remainingSeconds:{remainingSeconds}</p>
            <p>remainingFullMinutes:{remainingFullMinutes}</p>
            <p>remainingSecondsLessMinutes:{remainingSecondsLessMinutes}</p>
        </div>
    );
}

interface TimerProps {
    duration: number;
    initiallyInSittingPosition: boolean;
    onCompleteCountdown(): any,
    positionMatchesInitial: boolean;
}

