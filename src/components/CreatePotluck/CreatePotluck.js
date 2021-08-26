// Chase builds this

// basically a form that creates a todo list and have a create button
// Create Date, time, and location of event
// Create edit button to adjust time, location, date
// once created via submit button click posts to potluckList.js

// The initial object that the backend expects will have
import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";



// MATERIAL UI STYLES
const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),

	},
}));


export default function CreatePotluckForm() {
	// allows you to use styles from Material UI
	const classes = useStyles();

	// initial potluck state
	const initialPotluckState = {
		title: "",
		date: "",
		time: "",
		location: "",
	};

	//initial food state
	const initialFoodValue = { food_name: "" };

	// initial create potluck errors
	const initialCreatePotluckErrors = {
		title: "",
		date: "",
		time: "",
		location: "",
		organizer: "",
	};

	// state for potluckFormValue ---potluckFormValue === form values
	const [potluckFormValue, setPotluckFormValue] = useState(initialPotluckState);
	const [foodValue, setFoodValue] = useState(initialFoodValue);
	const [foodItemArray, setFoodItemArray] = useState([]);
	const [createPotluckErrors, setCreatePotluckErrors] = useState(
		initialCreatePotluckErrors,
	);

	const [potluckId, setPotluckId] = useState(0);
	//const [potluckData, setPotluckData] = useState({});
	const [addFoodDiv, setAddFoodDiv] = useState("none");
	const [createPotluckDiv, setCreatePotluckDiv] = useState("block");

	// submit handler for Creating potluck
	const submitPotluck = (e) => {
		e.preventDefault();

		// send to database via axios
		Axios.post("https://potluck-planner-04.herokuapp.com/potlucks/create", {
			title: potluckFormValue.title,
			date: potluckFormValue.date,
			time: potluckFormValue.time,
			location: potluckFormValue.location,
			organizer: 1, //this should be state.user_id
		})
			.then((res) => {
				console.log(res.data.potluck_id, "new id from created potluck from submit");
				setPotluckFormValue(res.data);
				setPotluckId(res.data.potluck_id); // this has correct id

			})
			.finally(() => {
				setCreatePotluckDiv("none");
				setAddFoodDiv("block");
				console.log(potluckId, "potluck id") //this does not
			});
	};

	const foodSubmit = (e) => {
		axios
			.post(
				`https://potluck-planner-04.herokuapp.com/potlucks/${potluckId}/foods`,
				{
					food_name: foodValue.food_name,
				},
			)
			.then((res) => {
				setFoodItemArray(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<NavBar />
			<form onSubmit={submitPotluck}>
				<div className="form-inner">
					{/* {(error != "") ? (<div className='error'>{error}</div>) : ''} */}
					<div style={{ display: `${createPotluckDiv}` }}>
						<h2>CreatePotluck</h2>
						<div className="form-group">
							<label htmlFor="title">Potluck Name</label>
							<input
								type="text"
								name="title"
								id="title"
								onChange={(e) =>
									setPotluckFormValue({
										...potluckFormValue,
										title: e.target.value,
									})
								}
								value={potluckFormValue.name}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="date">Date</label>
							<input
								type="date"
								name="date"
								id="date"
								onChange={(e) =>
									setPotluckFormValue({
										...potluckFormValue,
										date: e.target.value,
									})
								}
								value={potluckFormValue.date}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="time">Time</label>
							<input
								type="time"
								name="time"
								id="time"
								onChange={(e) =>
									setPotluckFormValue({
										...potluckFormValue,
										time: e.target.value,
									})
								}
								value={potluckFormValue.time}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="location">Location</label>
							<input
								type="text"
								name="location"
								id="location"
								onChange={(e) =>
									setPotluckFormValue({
										...potluckFormValue,
										location: e.target.value,
									})
								}
								value={potluckFormValue.location}
							/>
						</div>

						<Button
							type="submit"
							value="SUBMIT"
							variant="contained"
							color="primary"
						>
							Create Potluck
						</Button>
					</div>
				</div>
			</form>

			<div className="form-group" style={{ display: `${addFoodDiv}` }}>
				<p> Potluck Event Name: {potluckFormValue.title}</p>
				<p> Date: {potluckFormValue.date}</p>
				<p> Time: {potluckFormValue.time}</p>
				<p> Location: {potluckFormValue.location}</p>

				{/* FIX THIS!!!!!!!!!!!!! */}
				<div>
					<h3> Foods </h3>
					<ul>
						{foodItemArray.map((eachFoodItem) => {
							return (
								<li>
									{eachFoodItem.food_name} <button>Delete</button>
								</li>
							);
						})}
					</ul>
					{/* FIX THIS ABOVE!!!!!! */}
				</div>

				<input
					type="text"
					name="food_name"
					id="food"
					onChange={(e) =>
						setFoodValue({
							...foodValue,
							food_name: e.target.value,
						})
					}
					value={foodValue.food_name}
				/>
				<Button
					type="submit"
					variant="outlined"
					color="primary"
					onClick={foodSubmit}
				>
					Add food
				</Button>

				<Button variant="outlined">DONE</Button>
				{/* onclick should redirect user to profile or potluck list?? */}
			</div>
		</div>
	);
}
