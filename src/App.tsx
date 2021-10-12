import './App.css';
import { SeatPosition, TimerScheduler } from './TimerScheduler';

function App() {
	return (
		<div className="App">
			<header>
				Timer App
			</header>
			<TimerScheduler
				initialSeatPosition={SeatPosition.Stand}
			/>
		</div>
	);
}

export default App;
