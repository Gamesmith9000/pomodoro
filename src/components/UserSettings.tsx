import React, { FC, MouseEvent, useState } from 'react';
import { SeatPosition } from './TimerScheduler';
import '../styles/UserSettings.css';

interface UserSettingsProps {
	savedSettings: SettingsData;
	onCancelAndExit (event: MouseEvent): void;
	onSaveChanges (event: MouseEvent, newSettings: SettingsData): void;
}

export interface SettingsData {
	startingPosition: SeatPosition;
}

export const UserSettings: FC<UserSettingsProps> = (props) => {
	// positionOptions array used for modularity. Item [0] is the default choice, and only 2 items are to be included.
	const positionOptions = [
		props.savedSettings.startingPosition, 
		props.savedSettings.startingPosition === SeatPosition.Stand ? SeatPosition.Sit : SeatPosition.Stand
	];

	const [startingPosition, setStartingPosition] = useState(positionOptions[0]);

	const toggleStartingPositionWithButton = (event: MouseEvent) => {
		event.preventDefault();
		const isFirstPosition = startingPosition === positionOptions[0];
		const newOption: SeatPosition = isFirstPosition ? positionOptions[1] : positionOptions[0];
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

	const modifiedSettings: SettingsData = {
		startingPosition: startingPosition
	}

	return (
		<div className="UserSettings">
			<h1>Settings</h1>
			<div>
				Initial Position:
				{positionOptionButton(0)}
				{positionOptionButton(1)}
			</div>
			<div>
				<button 
					onClick={(event) => props.onSaveChanges(event, modifiedSettings)}
					disabled={JSON.stringify(modifiedSettings) === JSON.stringify(props.savedSettings)}
				>
					Save &#38; Exit
				</button>
				<button onClick={props.onCancelAndExit}>
					Cancel
				</button>
			</div>
		</div>
	);
}

export default UserSettings;
