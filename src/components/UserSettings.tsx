import React, { MouseEvent, useState } from 'react';
import { SeatPosition } from './TimerScheduler';
import '../styles/UserSettings.css';

function UserSettings() {
	// positionOptions array used for modularity. Item [0] is the default choice, and only 2 items are to be included.
	const positionOptions = [SeatPosition.Sit, SeatPosition.Stand];
	const [startingPosition, setStartingPosition] = useState(positionOptions[0]);

	const toggleStartingPositionWithButton = (event: MouseEvent) => {
		event.preventDefault();
		const newOption: SeatPosition = startingPosition === positionOptions[0] ? positionOptions[1] : positionOptions[0];
		setStartingPosition(newOption);
	}

	const positionOptionButton = (positionIndex: number) =>
		<button
			className={positionOptions[positionIndex] === startingPosition ? "chosen-option" : undefined}
			disabled={positionOptions[positionIndex] === startingPosition}
			onClick={toggleStartingPositionWithButton}
		>					
			{positionOptions[positionIndex]}
		</button>
	;

	return (
		<div className="UserSettings">
			<h1>Settings</h1>
			<div>
				Initial Position:
				{positionOptionButton(0)}
				{positionOptionButton(1)}
			</div>
		</div>
	);
}

export default UserSettings;
