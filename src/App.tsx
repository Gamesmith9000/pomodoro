import './App.css';
import { Notifier } from './Notifier';
import { SeatPosition, TimerScheduler } from './TimerScheduler';

function App() {
	return (
		<div className="App">
			<header>
				Timer App
			</header>
			<Notifier />
			<TimerScheduler
				initialSeatPosition={SeatPosition.Stand}
			/>
		</div>
	);
}

export default App;
