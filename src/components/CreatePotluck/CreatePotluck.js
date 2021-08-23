// Chase builds this



// basically a form that creates a todo list and have a create button
// Create Date, time, and location of event
// Create edit button to adjust time, location, date
// once created via submit button click posts to potluckList.js

// The initial object that the backend expects will have 
import NavBar from "../NavBar/NavBar"
import React, { useState } from 'react'
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Code from MAterial UI
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

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
    // allows you to use styles from Material UI
    const classes = useStyles();

    // initial potluck state
    const initialPotluckState = {
        title: "",
        date: "",
        time: "",
        location: "",
        food: [],
    }

    //initial food state
    const initialFoodState = []; // { id: "", foodName: "" }

    // initial create potluck errors
    const initialCreatePotluckErrors = {
        title: "",
        date: "",
        time: "",
        location: "",
        organizer: "",
        food: "",
    }

    // state for potluckData ---potluckData === form values
    const [potluckData, setPotluckData] = useState(initialPotluckState)
    const [foodItemArray, setFoodItemArray] = useState(initialFoodState);
    const [createPotluckErrors, setCreatePotluckErrors] = useState(initialCreatePotluckErrors)


    // submit handler for Creating potluck 
    const submitHandler = e => {
        e.preventDefault();

        // send to database via axios
        Axios.post('https://potluck-planner-04.herokuapp.com/potlucks/', {
            title: potluckData.title,
            date: potluckData.date,
            time: potluckData.time,
            location: potluckData.location,
            organizer: 1,
            // food: foodItemArray,
        })
            .then(res => {
                console.log(res.data)
                setPotluckData(res.data);
            })
            .finally(res => {
                setPotluckData(initialPotluckState);
            }
            )
    }


    // food Items sent to Database
    // Axios.post('https://potluck-planner-04.herokuapp.com/potlucks/1/foods', {
    //     food_name: ,
    //     contributor: 1,
    // })
    //     .then(res => {
    //         console.log(res.data)
    //         setPotluckData(res.data);
    //     })
    //     .finally(res => {
    //         setPotluckData(initialPotluckState);
    //     }
    //     )


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
                <Button type="submit" value="SUBMIT" variant="contained" color="primary">
                    Create Potluck
                </Button>
            </div>
        </form>
    </div>)
}
