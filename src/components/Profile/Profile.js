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

import NavBar from "../NavBar/NavBar"

export default function Profile() {

    return (
        <div>
            <NavBar />
        </div>
    )
}

