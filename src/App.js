import "./App.css";
import { Route, Switch } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login"
import Profile from "./components/Profile/Profile"
import PotLuckList from "./components/PotluckList/PotluckList";
import Potluck from './components/PotluckPage/Potluck'
import CreatePotluck from "./components/CreatePotluck/CreatePotluck";
import { useState } from "react";
import "./index.css";


function App() {
	const [User, setUser] = useState('User'); // change this to recieve user in backend
	return (
		<div className="App">
			<Switch>
				<Route path="/signup"> <Signup setUser={setUser} /></Route>
				<Route path="/profile"> <Profile User={User} /> </Route>
				<Route path="/createpotluck"> <CreatePotluck User={User} /></Route>
				<Route exact path="/potlucklist" > <PotLuckList User={User} /></Route>
				<Route path="/potlucklist/:id"> <Potluck User={User} /></Route>
				<Route path="/login" ><Login setUser={setUser} /></Route>
				<Route exact path="/" > <PotLuckList User={User} /></Route>
			</Switch>
		</div>
	);
}

export default App;

