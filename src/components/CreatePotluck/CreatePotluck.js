//DELETE IS NOT FULLY FUNCTIONABLE, NEEDS FIXING PLS!!!

// The initial object that the backend expects will have
import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import axios from "axios";
import * as yup from "yup";
import createPotluckFormSchema from "../../validation/createPotluckFormSchema.js";
import "../../index.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import PotLuckDetails from "../PotluckList/PotLuckDetails";
import styled from "styled-components";

// MATERIAL UI STYLES
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

// styled components
const StyledLI = styled.li`
  text-decoration: none;
  list-style-type: none;
  font-size: 1.2rem;
	margin: 0 auto;
  }
`;

const StyledUL = styled.ul`
	margin: 0 auto 70px auto;
	width: 75%;
	height: auto;
	min-height: 200px;

	min-width: 250px;
	background: #f1f5f8;
	background-image: radial-gradient(#bfc0c1 7.2%, transparent 0);
	background-size: 25px 25px;
	border-radius: 10px;
	box-shadow: 4px 3px 7px 2px #00000040;
	padding: 1rem;
	box-sizing: border-box;
`;

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
	const classes = useStyles();

	// state for potluckFormValue ---potluckFormValue === form values
	const [potluckFormValues, setPotluckFormValues] =
		useState(initialPotluckState);
	const [foodValue, setFoodValue] = useState(initialFoodValue);
	const [foodItemArray, setFoodItemArray] = useState([]);
	const [createPotluckErrors, setCreatePotluckErrors] = useState(
		initialCreatePotluckErrors,
	);
	const [createDisabled, setCreateDisabled] = useState(
		initialCreateButtonDisabled,
	); // boolean;

	const [potluckId, setPotluckId] = useState(0);
	//const [potluckData, setPotluckData] = useState({});
	const [addFoodDiv, setAddFoodDiv] = useState("none");
	const [createPotluckDiv, setCreatePotluckDiv] = useState("block");

	//ONCHANGE EVENT HANDLER - For each input
	const onChange = (e) => {
		//pull out the name and value of the event target
		const { name, value } = e.target;

		//check for errors via yup
		yup
			.reach(createPotluckFormSchema, name)
			.validate(value)
			.then(() => {
				setCreatePotluckErrors({ ...createPotluckErrors, [name]: "" });
			})
			.catch((err) => {
				setCreatePotluckErrors({ ...createPotluckErrors, [name]: err.message });
			});
		console.log(createPotluckErrors);

		const newPotluckFormValues = {
			...potluckFormValues,
			[name]: e.target.value,
		};
		setPotluckFormValues(newPotluckFormValues);
	};

	//ENABLE BUTTON WHEN NO ERRORS EXIST
	useEffect(() => {
		// ADJUST THE STATUS OF `dispotluckabled` EVERY TIME `formValues` CHANGES
		createPotluckFormSchema.isValid(potluckFormValues).then((isSchemaValid) => {
			setCreateDisabled(!isSchemaValid); //disable the submt button if not valid
		});
	}, [potluckFormValues]);

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
				setPotluckFormValues(res.data);
				setPotluckId(res.data.potluck_id);
			})
			.finally(() => {
				setCreatePotluckDiv("none");
				setAddFoodDiv("block");
			});
	};

	// food submit for eaach item
	const foodSubmit = (e) => {
		if (foodValue === initialFoodValue) {
			alert("Please type in a food or item first before trying to add.");
		} else {
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
				})
				.finally(() => {
					setFoodValue(initialFoodValue);
				});
		}
	};

	// submit finalized potluck -- Done redirects page to profile
	let history = useHistory();
	console.log(history, "history");
	const DoneAndRouteChange = () => {
		// redirects page to profile
		let path = `/profile`;
		history.push(path);
	};

	return (
		<div>
			<NavBar />
			<form className={classes.form} onSubmit={submitPotluck}>
				<div className="form-inner">
					<Container component="main" maxWidth="xs">
						{/* {(error != "") ? (<div className='error'>{error}</div>) : ''} */}
						<div
							className={classes.paper}
							style={{ display: `${createPotluckDiv}` }}
						>
							<Typography component="h2" variant="h4">
								<h4 style={{ boxShadow: "0px 5px 5px grey" }}>
									Create a Potluck
								</h4>
							</Typography>

							<div className="form-group">
								<TextField
									variant="filled"
									margin="normal"
									fullWidth
									label="Potluck Name"
									type="text"
									name="title"
									id="title"
									onChange={onChange}
									value={potluckFormValues.name}
									className={classes.pageTitle}
								/>
							</div>
							<div className="form-group">
								<TextField
									variant="outlined"
									margin="normal"
									fullWidth
									type="date"
									name="date"
									id="date"
									onChange={onChange}
									value={potluckFormValues.date}
								/>
							</div>
							<div className="form-group">
								<TextField
									variant="outlined"
									margin="normal"
									fullWidth
									type="time"
									name="time"
									id="time"
									onChange={onChange}
									value={potluckFormValues.time}
								/>
							</div>
							<div className="form-group">
								<TextField
									variant="outlined"
									margin="normal"
									fullWidth
									label="Potluck Location"
									type="text"
									name="location"
									id="location"
									onChange={onChange}
									value={potluckFormValues.location}
								/>
							</div>

							<div className="formErrors">
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
								className={classes.submit}
								fullWidth
							>
								Create Potluck
							</Button>
						</div>
					</Container>
				</div>
			</form>

			<div className="form-group" style={{ display: `${addFoodDiv}` }}>
				<PotLuckDetails potLuck={potluckFormValues}></PotLuckDetails>

				{/* foods */}
				<div>
					<StyledUL>
						<header>
							<h2> Foods to bring for {potluckFormValues.title} </h2>
						</header>

						{foodItemArray.map((eachFoodItem, i) => {
							const foodDelete = (e) => {
								axios
									.delete(
										`https://potluck-planner-04.herokuapp.com/potlucks/${potluckId}/foods/${eachFoodItem.potluckFood_id}`,
									)
									.then((res) => {
										setFoodItemArray(res.data);
									})
									.finally(() => {
										setFoodValue(initialFoodValue);
									})
									.catch();
							};

							return (
								<StyledLI key={i}>
									{eachFoodItem.food_name}
									<button type="delete" onClick={foodDelete}>
										Delete
									</button>
								</StyledLI>
							);
						})}
					</StyledUL>
				</div>

				<Container>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						type="text"
						name="food_name"
						id="food"
						label="Type Food Item Here"
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
						variant="contained"
						color="primary"
						onClick={foodSubmit}
						className={classes.submit}
						fullWidth
					>
						Add food
					</Button>

					{/* IM NOT SURE WHICH ONE IS THE FINAL GUYS JUST DELETE OR WHATEVS */}
					<Link href="/profile/organizing" variant="body2">
						<Button
							style={{ margin: "35px 0px 0px 0px" }}
							variant="contained"
							color="secondary"
							fullWidth
						>
							Done
						</Button>
						<label>
							<h5>Click Done When Finished Adding Food:</h5>
						</label>
						{/* onclick should redirect user to profile or potluck list?? */}
					</Link>

					<Button
						type="submit"
						className={classes.submit}
						onClick={DoneAndRouteChange}
						style={{ margin: "35px 0px 0px 0px" }}
						variant="contained"
						color="secondary"
						fullWidth
					>
						Done
					</Button>
					<label>
						<h5>Click Done When Finished Adding Food.</h5>
					</label>
					{/* onclick should redirect user to profile or potluck list?? */}
				</Container>
			</div>
		</div>
	);
}
