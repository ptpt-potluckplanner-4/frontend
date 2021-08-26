// Chase builds this

// basically a form that creates a todo list and have a create button
// Create Date, time, and location of event
// Create edit button to adjust time, location, date
// once created via submit button click posts to potluckList.js

// The initial object that the backend expects will have
import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import axios from "axios";
import * as yup from 'yup';
import createPotluckFormSchema from '../../validation/createPotluckFormSchema.js';
import "../../index.css";

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


const initialCreateButtonDisabled = true;

export default function CreatePotluckForm() {
	// allows you to use styles from Material UI

	// state for potluckFormValue ---potluckFormValue === form values
	const [potluckFormValues, setPotluckFormValues] = useState(initialPotluckState);
	const [foodValue, setFoodValue] = useState(initialFoodValue);
	const [foodItemArray, setFoodItemArray] = useState([]);
	const [createPotluckErrors, setCreatePotluckErrors] = useState(
		initialCreatePotluckErrors);
	const [createDisabled, setCreateDisabled] = useState(initialCreateButtonDisabled) // boolean;

	const [potluckId, setPotluckId] = useState(0);
	//const [potluckData, setPotluckData] = useState({});
	const [addFoodDiv, setAddFoodDiv] = useState("none");
	const [createPotluckDiv, setCreatePotluckDiv] = useState("block");

		//ONCHANGE EVENT HANDLER - For each input
		const onChange = e => {
			//pull out the name and value of the event target
			const { name, value } = e.target;
	
			//check with yup, run form errors
	//check for errors via yup
	yup.reach(createPotluckFormSchema, name)
	.validate(value)
	.then(() => {
		setCreatePotluckErrors({ ...createPotluckErrors, [name]: "" })
	})
	.catch(err => {
		setCreatePotluckErrors({ ...createPotluckErrors, [name]: err.message })
	})
	console.log(createPotluckErrors)

	const newPotluckFormValues = { ...potluckFormValues,
		[name]: e.target.value,
	}
	setPotluckFormValues(newPotluckFormValues);
	
		}

	//ENABLE BUTTON WHEN NO ERRORS EXIST
	useEffect(() => {

		// ADJUST THE STATUS OF `dispotluckabled` EVERY TIME `formValues` CHANGES
		createPotluckFormSchema.isValid(potluckFormValues)
			.then(isSchemaValid => {
				setCreateDisabled(!isSchemaValid) //disable the submt button if not valid

			})

	}, [potluckFormValues])

	// submit handler for Creating potluck
	const submitPotluck = (e) => {
		e.preventDefault();

		

		// send to database via axios
		Axios.post("https://potluck-planner-04.herokuapp.com/potlucks/create", {
			title: potluckFormValues.title,
			date: potluckFormValues.date,
			time: potluckFormValues.time,
			location: potluckFormValues.location,
			organizer: 1, //this should be state.user_id
		})
			.then((res) => {
				console.log(res.data);
				setPotluckFormValues(res.data);
				setPotluckId(res.data.potluck_id);

			})
			.finally(() => {
				setCreatePotluckDiv("none");
				setAddFoodDiv("block");
				console.log(potluckId)
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
								onChange={onChange}
								value={potluckFormValues.name}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="date">Date</label>
							<input
								type="date"
								name="date"
								id="date"
								onChange={onChange}
								value={potluckFormValues.date}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="time">Time</label>
							<input
								type="time"
								name="time"
								id="time"
								onChange={onChange}
								value={potluckFormValues.time}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="location">Location</label>
							<input
								type="text"
								name="location"
								id="location"
								onChange={onChange}
								value={potluckFormValues.location}
							/>
						</div>

						<div className='formErrors'>
						{/* RENDER THE VALIDATION ERRORS HERE */}
						<div>{createPotluckErrors.title}</div>
						<div>{createPotluckErrors.date}</div>
						<div>{createPotluckErrors.time}</div>
						<div>{createPotluckErrors.location}</div>
					</div>

						<Button
							type="submit"
							value="SUBMIT"
							variant="contained"
							color="primary"
							disabled={createDisabled}

						>
							Create Potluck
						</Button>
					</div>
				</div>
			</form>

			<div className="form-group" style={{ display: `${addFoodDiv}` }}>
				<p> Potluck Event Name: {potluckFormValues.title}</p>
				<p> Date: {potluckFormValues.date}</p>
				<p> Time: {potluckFormValues.time}</p>
				<p> Location: {potluckFormValues.location}</p>
{/* foods */}
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