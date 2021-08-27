// mark makes this

// grab from dummy object and map array of potlucks in card like manner
// link each card to 

import NavBar from "../NavBar/NavBar"
import PotLuckDetails from "../PotluckList/PotLuckDetails"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import "../../index.css";



export default function PotLuckList({ potLuck }) {
    const [potLuckList, setPotLuckList] = useState([]);

    // recieve potluck list details
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
            <h1 style={{ boxShadow: "0px 5px 5px grey", width: "70%", margin: "30px auto 0 auto" }}>
                Join a Potluck
            </h1>

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



