import React, { FC, useState } from 'react';
import '../styles/Notifier.css';

export const Notifier: FC<NotifierProps> = (props) => {
	const [currentPermission, setCurrentPermission] = useState(Notification.permission);

	const requestNotificationPermission = () => {
		const updatePermissionInfo = (result: React.SetStateAction<"default" | "denied" | "granted">) => {
			setCurrentPermission(result);
		}

		try {
			Notification.requestPermission().then(updatePermissionInfo);
		} catch (e) {
			Notification.requestPermission(updatePermissionInfo);
			return;
		}
		return;
	}

	if (currentPermission !== "granted") {
		if (currentPermission === "default") {
			requestNotificationPermission();
		}
		else if (currentPermission === "denied") {
			console.warn("Notification permission denied");
		}
	}

	return (
		<div className="Notifier">
		</div>
	);
}

interface NotifierProps {

}
