// Chase builds this



// basically a form that creates a todo list and have a create button
// Create Date, time, and location of event
// Create edit button to adjust time, location, date
// once created via submit button click posts to potluckList.js

// The initial object that the backend expects will have 
import NavBar from "../NavBar/NavBar"
import React, { useState } from 'react'
import Axios from 'axios'

// const initialPotluckObject = {
//     potLuckOrganizer: "",
//     potLuckTitle: "",
//     location: "",
//     time: "",
//     date: "",
//     whoIsAttending: [],
//     items: [{ plates, personwhosbringingplates }, { pineapple, personwhosbringingpineapple, }, etc.],
// }



export default function CreatePotluckForm() {

    // initial url
    const url = "https://potluck-planner-04.herokuapp.com/potlucks/create"

    // initial potluck state
    const initialPotluckState = {
        title: "",
        date: "",
        time: "",
        location: "",
        organizer: "",
        food: [],
    }

    //initial food state
    // const initialFoodState = []; // { id: "", foodName: "" }

    // initial create potluck errors
    const initialCreatePotluckErrors = {
        title: "",
        date: "",
        time: "",
        location: "",
        organizer: "",
        food: "",
    }

    // state for potluckData
    const [potluckData, setPotluckData] = useState(initialPotluckState)
    const foodItemArray = [];
    const [createPotluckErrors, setCreatePotluckErrors] = useState(initialCreatePotluckErrors)


    // submit handler for Creating potluck 
    const submitHandler = e => {
        e.preventDefault();

        // send to database via axios
        // Axios.post(url, {
        //     title: potluckData.title,
        //     date: potluckData.date,
        //     time: potluckData.time,
        //     location: potluckData.location,
        //     organizer: potluckData.organizer,
        //     foods: potluckData.foods
        // })
        //     .then(res => {
        //         console.log(res.data)
        //     })
    }


    return (<div>
        <NavBar />
        <form onSubmit={submitHandler}>
            <div className='form-inner'>
                <h2>CreatePotluck</h2>
                {/* {(error != "") ? (<div className='error'>{error}</div>) : ''} */}
                <div className='form-group'>
                    <label htmlFor='title'>Potluck Name</label>
                    <input type='text' name='title' id='title' onChange={e => setPotluckData({ ...potluckData, title: e.target.value })} value={potluckData.name} />
                </div>
                <div className='form-group'>
                    <label htmlFor='date'>Date</label>
                    <input type='date' name='date' id='date' onChange={e => setPotluckData({ ...potluckData, date: e.target.value })} value={potluckData.date} />
                </div>
                <div className='form-group'>
                    <label htmlFor='time'>Time</label>
                    <input type='time' name='time' id='time' onChange={e => setPotluckData({ ...potluckData, time: e.target.value })} value={potluckData.time} />
                </div>
                <div className='form-group'>
                    <label htmlFor='location'>Location</label>
                    <input type='text' name='location' id='location' onChange={e => setPotluckData({ ...potluckData, location: e.target.value })} value={potluckData.location} />
                </div>
                <div className='form-group'>
                    <label htmlFor='organizer'>Organizer</label>
                    <input type='text' name='organizer' id='date' onChange={e => setPotluckData({ ...potluckData, organizer: e.target.value })} value={potluckData.organizer} />
                </div>


                <button
                    onClick={() => {
                        /* FIX THIS!!!! */
                        foodItemArray.push(potluckData.food)
                        setPotluckData({ ...potluckData, food: "" })
                        console.log(foodItemArray);
                    }}
                >
                    add new food
                </button>
                <div className='form-group'>
                    <label htmlFor='food'>Foods</label>
                    <input type='text' name='food' id='food' onChange={e => setPotluckData({ ...potluckData, food: e.target.value })} value={potluckData.foods} />
                </div>

                {/* FIX THIS!!!!!!!!!!!!! */}
                <div>
                    <ul>
                        {foodItemArray.map(eachFoodItem => {
                            return (
                                <li>{eachFoodItem} <button>Delete</button></li>
                            )
                        })}
                    </ul>
                    {/* FIX THIS ABOVE!!!!!! */}


                </div>
                <input type="submit" value="SUBMIT" />
            </div>
        </form>
    </div>)
}
