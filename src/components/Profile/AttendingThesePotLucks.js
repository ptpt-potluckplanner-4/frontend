import React, { useState, useEffect } from "react"
import axios from "axios";

export default function AttendingThesePotlucks({ User }) {
    const [attendingThesePotlucks, setAttendingThesePotlucks] = useState([]); // should probably be an []

    // too complicated......we'd have to get allPotlucks/  take the number of all potlucks/  
    //Loop over the axios endpoint that gets all guests via certain potluck 
    //put  all the potlucks in which the user matches as a guest in an UserMatchesArray/ 
    //Then we'd have to filter the original allPotlucks array via the new
    // UserMatchesArray

    // Instead of this...we could add a property to the --Get All Potluck --endpoint 
    // It will be much simpler to have a property of 
    //{guests: ["michael Scott", "Jim and Pam", "Dwight Schrute"...]}  
    // for this application // 

    let id = 1;

    // axios get request to set attendingThesePotlucks state
    useEffect(() => {
        const getGuestListForThisPotluck = () => {
            axios
                .get(`https://potluck-planner-04.herokuapp.com/potlucks/${id}/guests`) // Endpoint to get all guests coming to a certain potluck
                .then(res => {
                    // const arrayOfGuestsAttendingPotluck = res.data;
                    setAttendingThesePotlucks(res.data);
                    console.log(res.data)
                })
                .catch(err => {
                    console.error('Server Error', err);
                });
        }
        getGuestListForThisPotluck();

    }, []); // empty array makes this only run once


    // change Michael Scott to User once endpoints are built out for the User
    return (
        <div>
            <h1>Potluck's {User} is Attending</h1>
            <div>

                {/* {attendingThesePotlucks.filter(eachPotluckAttending => eachPotluckAttending.name === "Michael Scott")} */}

            </div>
        </div>
    )
}