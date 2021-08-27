import React, { useEffect, useState } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import EditPotLuckDetails from "./EditPotluckDetails";


export default function EditPotluck({ User }) {
    const [potluckInfo, setPotluckInfo] = useState();
    const params = useParams(); // params.id should be potluck_id
    console.log(params);
    // use axios to get potluck info --- so that it can be displayed
    useEffect(() => {
        axios
            .get(`https://potluck-planner-04.herokuapp.com/potlucks/${params.id}`) // Study this endpoint with Postman
            .then((res) => {
                setPotluckInfo(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [params]);


	if (!potluckInfo) {
		return <div>Loading Potluck...</div>;
	}
    // use axios to get potluck food if the other info doesn't have it



    // use axios to delete chosen food



    return (<div>
        <h2 style={{ boxShadow: "0px 5px 5px grey", width: "50%", margin: "50px auto" }}>
            Edit This Potluck
        </h2>
        <div className="">
			{/* <NavBar></NavBar> */}
			<EditPotLuckDetails potLuck={potluckInfo}></EditPotLuckDetails>
		</div>
    </div>)
}

// get array of all the foods to bring in the potluck
//[GET] https://potluck-planner-04.herokuapp.com/potlucks/:id/foods


// get potluck event by id
// [GET] https://potluck-planner-04.herokuapp.com/potlucks/:id

// delete a food in the potluck array of foods
// [DELETE] https://potluck-planner-04.herokuapp.com/potlucks/:id/foods/:potluckFood_id

// returns the list of all the foods to bring in the potluck without the deleted food

// only possible if you're the organizer. non-organizer of the potluck cannot remove the food