import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export default function PotLuckDetails({ potLuck }) {
	const { title, date, time, location, organizer, potluck_id } = potLuck;

	// Details could include the list functionality or we add another component
	console.log(potLuck, "potluck from mapped Potlucklists");
	return (
		<div className="">
			{/* Material UI Card */}
			<div>
				<h2>{title}</h2>
				<p>{date}</p>
				<p>{time}</p>
				<p>{location}</p>
				<p>{organizer}</p>
			</div>
		</div>
	);
}
