import '../styles/App.css';
import { Notifier } from './Notifier';
import { TimerScheduler } from './TimerScheduler';

function App() {
	return (
		<div className="App">
			<header>
				Timer App
			</header>
			<Notifier />
			<TimerScheduler />
		</div>
	);
}

export default App;
