import "./App.css";
import { Route, Switch } from "react-router-dom";
import Signup from "./components/Signup/Signup";

function App() {
	return (
		<div className="App">
			<Switch>
				<Route path="/signup" component={Signup} />
			</Switch>
		</div>
	);
}

export default App;
