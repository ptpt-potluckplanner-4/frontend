import React, { useState, useEffect } from "react";
import axios from "axios";
import PotLuckDetails from "../PotluckList/PotLuckDetails";

export default function Organizing({ User }) {
    const [potLuckListUserIsAttending, setPotLuckListUserIsAttending] = useState([]);

    // replace Michael Scott with User.name once endpoint for user is built out
    useEffect(() => {
        const getPotluckList = () => {
            axios
                .get('https://potluck-planner-04.herokuapp.com/potlucks') // Endpoint to get all potlucks in Database
                .then(res => {
                    const allPotlucks = res.data;
                    const UserIsOrganizing = allPotlucks.filter(potluck => { return potluck.organizer === "Michael Scott" });
                    setPotLuckListUserIsAttending(UserIsOrganizing);
                })
                .catch(err => {
                    console.error('Server Error', err);
                });
        }
        getPotluckList();
    }, []); // empty array makes this only run once

    return (<div>

        <h1>Potluck's {User} is Organizing</h1>
        <div className="">
            {potLuckListUserIsAttending.map(eachpotLuck => (
                <div>
                    <PotLuckDetails potLuck={eachpotLuck} />
                </div>

            ))}
        </div>


    </div>)
}