//Chase builds this

//shows potlucks the users is going to attend ---- attendPotluckList
//shows potluck the user is organizing --- Organizing


//Organizing button/ Attending button 

// whichever user clicks on...shows that information

// organizing button clicked --- shows all users organized potlucks 
// if no event is shown then a button shows that links to createpotluck.js
// if currentUser === organizer than allow edit capabilities

// if attending is clicked --- hides users events/ shows all available potlucks
// if user has not signed up to attend a potluck then button shows 
// and links to potLuckList.js (edit capabilities disabled)
import { Route, Switch, Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar"
import AttendingThesePotLucks from "./AttendingThesePotLucks"
import Organizing from "./Organizing"

export default function Profile() {

    return (
        <div>
            <NavBar />
            <div className="usersProfileButtons">
                <Link to="/profile/organizing">
                    <button>
                        View Your Organized Potlucks
                    </button>
                </Link>
                <Link to="/profile/attending">
                    <button>
                        View Potlucks You are Attending
                    </button>
                </Link>
            </div>
            <Switch>
                <Route path="/profile/organizing" component={Organizing} />
                <Route path="/profile/attending" component={AttendingThesePotLucks} />
            </Switch>
        </div>
    )
}

