import "./App.css";
import { Route, Switch } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login"
import Profile from "./components/Profile/Profile"
import PotLuckList from "./components/PotluckList/PotluckList";
import Potluck from './components/PotluckPage/Potluck'
import CreatePotluck from "./components/CreatePotluck/CreatePotluck";


function App() {
	return (
		<div className="App">
			<Switch>
				{/* <Route exact path="/" component={Login}></Route> */}
				<Route path="/signup"> <Signup /></Route>
				<Route path="/profile" component={Profile} />
				<Route path="/createpotluck" component={CreatePotluck} />
				<Route path="/potlucklist" component={PotLuckList} />
				<Route path="/potlucklist/:potluckid"> <Potluck /></Route>
			</Switch>

		</div>
	);
}

export default App;


// had to comment out the link for login 
//because I didn't set up an export on that 
//since Chase did on his branch