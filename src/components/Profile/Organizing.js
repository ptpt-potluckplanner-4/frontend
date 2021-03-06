import React, { useState, useEffect } from "react";
import axios from "axios";
import PotLuckDetails from "../PotluckList/PotLuckDetails";

export default function Organizing({ User }) {
	const [potLuckListUserIsOrganizing, setPotLuckListUserIsOrganizing] =
		useState([]);

	// get all potlucks organized by user
	// [GET] https://potluck-planner-04.herokuapp.com/users/:id/hosted-potlucks
	// where :id is the user_id

	// replace Michael Scott with User.name once endpoint for user is built out
	useEffect(() => {
		const getPotluckList = () => {
			axios
				.get("https://potluck-planner-04.herokuapp.com/potlucks") // Endpoint to get all potlucks in Database
				.then((res) => {
					const allPotlucks = res.data;
					const UserIsOrganizing = allPotlucks.filter((potluck) => {
						return potluck.organizer === "Michael Scott";
					});
					setPotLuckListUserIsOrganizing(UserIsOrganizing);
				})
				.catch((err) => {
					console.error("Server Error", err);
				});
		};
		getPotluckList();
	}, []); // empty array makes this only run once

	return (
		<div>
			<h2
				style={{
					boxShadow: "0px 5px 5px grey",
					width: "50%",
					margin: "50px auto",
				}}
			>
				Potluck {User} Is Organizing
			</h2>
			<div className="">
				{potLuckListUserIsOrganizing.map((eachpotLuck, i) => (
					<div>
						<PotLuckDetails key={i} potLuck={eachpotLuck} />
					</div>
				))}
			</div>
		</div>
	);
}
