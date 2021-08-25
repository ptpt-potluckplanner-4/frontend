// mark makes this

// grab from dummy object and map array of potlucks in card like manner
// link each card to 

import NavBar from "../NavBar/NavBar"
import PotLuckDetails from "../PotluckList/PotLuckDetails"
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PotLuckList() {
    const [potLuckList, setPotLuckList] = useState([]);

    useEffect(() => {
        const getPotluckList = () => {
            axios
                .get('https://potluck-planner-04.herokuapp.com/potlucks') // Endpoint to get all potlucks in Database
                .then(res => {
                    setPotLuckList(res.data);
                })
                .catch(err => {
                    console.error('Server Error', err);
                });
        }
        getPotluckList();
    }, []); // empty array makes this only run once


    return (
        <div>
            <NavBar />
            <h1> All Available PotLucks To Join:</h1>
            <div className="">
                {potLuckList.map(potLuck => (
                    <div>
                        <PotLuckDetails potLuck={potLuck} />
                    </div>

                ))}
            </div>
        </div>
    )
}
