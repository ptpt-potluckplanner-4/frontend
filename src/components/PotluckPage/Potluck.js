import NavBar from "../NavBar/NavBar";
import PotLuckDetails from "../PotluckList/PotLuckDetails";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PotLuckFoods from "./PotluckFoods";

export default function PotLuck({ User }) {
	const [potLuck, setPotluck] = useState();
	const params = useParams();

	useEffect(() => {
		axios
			.get(`https://potluck-planner-04.herokuapp.com/potlucks/${params.id}/`)
			.then((res) => {
				setPotluck(res.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [params]);

	if (!potLuck) {
		return <div>Loading Potlucks...</div>;
	}
	console.log(User, "potluck.js");
	return (
		<div className="">
			<NavBar></NavBar>
			<PotLuckDetails potLuck={potLuck} User={User}></PotLuckDetails>
			<PotLuckFoods pl={potLuck} User={User} />
		</div>
	);
}
