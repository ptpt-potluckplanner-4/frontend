// Chase builds this



// basically a form that creates a todo list and have a create button
// Create Date, time, and location of event
// Create edit button to adjust time, location, date
// once created via submit button click posts to potluckList.js

// The initial object that the backend expects will have 
import NavBar from "../NavBar/NavBar"


// const initialPotluckObject = {
//     potLuckOrganizer: "",
//     potLuckTitle: "",
//     location: "",
//     time: "",
//     date: "",
//     whoIsAttending: [],
//     items: [{ plates, personwhosbringingplates }, { pineapple, personwhosbringingpineapple, }, etc.],
// }

export default function CreatePotluck() {

    return (<div>
        <NavBar />

        <h1>Create a Potluck!</h1>
    </div>)
}