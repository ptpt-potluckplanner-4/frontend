import "./App.css";
import { Route, Switch } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login"
import Profile from "./components/Profile/Profile"
import PotLuckList from "./components/PotluckList/PotluckList";
import Potluck from './components/PotluckPage/Potluck'
import CreatePotluck from "./components/CreatePotluck/CreatePotluck";
import { useState } from "react";


function App() {
	const [User, setUser] = useState('Bob');


	return (
		<div className="App">
			<Switch>

				<Route path="/signup"> <Signup setUser={setUser} /></Route>
				<Route path="/profile"> <Profile User={User} /> </Route>
				<Route path="/createpotluck"> <CreatePotluck User={User} /></Route>
				<Route exact path="/potlucklist" > <PotLuckList User={User} /></Route>
				<Route path="/potlucklist/:id"> <Potluck User={User} /></Route>
				<Route exact path="/" ><Login setUser={setUser} /></Route>
			</Switch>

		</div>
	);
}

export default App;


// had to comment out the link for login 
//because I didn't set up an export on that 
//since Chase did on his branch