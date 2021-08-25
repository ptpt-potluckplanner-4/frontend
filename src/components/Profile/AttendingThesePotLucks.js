import React, { useState, useEffect } from "react"
import axios from "axios";

export default function AttendingThesePotlucks({ User }) {
    const [attendingThesePotlucks, setAttendingThesePotlucks] = useState([]);


    let id = 1;

    // axios get request to set attendingThesePotlucks state
    useEffect(() => {
        const getGuestListForThisPotluck = () => {
            axios
                .get(`https://potluck-planner-04.herokuapp.com/users/${id}/joined-potlucks`) // Endpoint to get all guests coming to a certain potluck
                .then(res => {
                    setAttendingThesePotlucks(res.data);
                })
                .catch(err => {
                    console.error('Server Error', err);
                });
        }
        getGuestListForThisPotluck();

    }, [id]); // empty array makes this only run once


    // change Michael Scott to User once endpoints are built out for the User
    return (
        <div>
            <h1>Potluck's {User} is Attending</h1>
            <div>
                {attendingThesePotlucks.map(eachPreAttendedPotluck => {
                    return (
                        <h2>{eachPreAttendedPotluck.title}</h2>
                    )
                })}
            </div>
        </div>
    )
}


// get all potlucks joined by user
// [GET] https://potluck-planner-04.herokuapp.com/users/:id/joined-potlucks
// where :id is the user_id
// get all potlucks organized by user
// [GET] https://potluck-planner-04.herokuapp.com/users/:id/hosted-potlucks
// where :id is the user_id