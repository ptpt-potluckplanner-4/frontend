// Mark does this

//details about the potluck
//foods
//guests
//etc
// pull all extra details and show page of all details from
// that potluck object
import NavBar from "../NavBar/NavBar";
import PotLuckDetails from "../PotluckList/PotLuckDetails";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PotLuckFoods from "./PotluckFoods";

export default function PotLuck() {
	const [potLuck, setPotluck] = useState();
	const params = useParams();

	useEffect(() => {
		axios
			.get(`https://potluck-planner-04.herokuapp.com/potlucks/${params.id}/`) // Study this endpoint with Postman
			.then((res) => {
				setPotluck(res.data);
				console.log(params.id);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [params]);

	if (!potLuck) {
		return <div>Loading Potlucks...</div>;
	}

	return (
		<div className="">
			<NavBar></NavBar>
			<PotLuckDetails potLuck={potLuck}></PotLuckDetails>
			<PotLuckFoods potLuck={potLuck}/>
		</div>
	);
}
