//POTLUCK DATA DOES NOT ALWAYS FORMAT CORRECTLY INTO INPUTS. AND IT DOES NOT UPDATE WHEN SUBMITTED
//STILL NEED TO FIGURE OUT HOW TO EDIT FOOD DATA.


import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import axios from "axios";
import * as yup from 'yup';
import createPotluckFormSchema from '../../validation/createPotluckFormSchema.js';
import "../../index.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import PotLuckDetails from "../PotluckList/PotLuckDetails";
import Link from '@material-ui/core/Link';


// MATERIAL UI STYLES
const useStyles = makeStyles((theme) => ({
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



export default function EditPotLuckDetails({potLuck}) {
  const classes = useStyles();

	// state for potluckFormValue ---potluckFormValue === form values


// initial editPotluck state
const initialPotluckState = {
	title: potLuck.title,
	date: potLuck.date,
	time: potLuck.time,
	location: potLuck.location,
};




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

		const newPotluckFormValues = {
			...potluckFormValues,
			[name]: e.target.value,
		}
		setPotluckFormValues(newPotluckFormValues);

	}


useEffect(() => {
		axios
			.get(
				`https://potluck-planner-04.herokuapp.com/potlucks/${potluckId}/foods/`,
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
});


	//ENABLE BUTTON WHEN NO ERRORS EXIST
	useEffect(() => {

		// ADJUST THE STATUS OF `dispotluckabled` EVERY TIME `formValues` CHANGES
		createPotluckFormSchema.isValid(potluckFormValues)
			.then(isSchemaValid => {
				setCreateDisabled(!isSchemaValid) //disable the submt button if not valid

			})
	}, [potluckFormValues])

	// submit handler for updating potluck
	const handleSubmit = (e) => {
		e.preventDefault();
		// send to database via axios
		Axios.put(`https://potluck-planner-04.herokuapp.com/potlucks/${potluckId} `, {
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
    console.log(potluckId)
		axios
			.post(
				`https://potluck-planner-04.herokuapp.com/potlucks/${potluckId}/foods/`,
				{
					food_name: foodValue.food_name,
				},
			)
			.then((res) => {
				setFoodItemArray(res.data);
        console.log(potluckId)

			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setFoodValue(initialFoodValue);
			});
	};

  // Details could include the list functionality or we add another component
  return (
    <div className="">
	<div>
			<form className={classes.form} onSubmit={handleSubmit}>
				<div className="form-inner">
					<Container component="main" maxWidth="xs">
						{/* {(error != "") ? (<div className='error'>{error}</div>) : ''} */}
						<div className={classes.paper} style={{ display: `${createPotluckDiv}` }}>

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
									value={potluckFormValues.title}
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

							<div className='formErrors'>
								{/* RENDER THE VALIDATION ERRORS HERE */}
								<div>{createPotluckErrors.title}</div>
								<div>{createPotluckErrors.date}</div>
								<div>{createPotluckErrors.time}</div>
								<div>{createPotluckErrors.location}</div>
							</div>

							<Button
								value="EDIT"
								variant="contained"
								color="primary"
								disabled={createDisabled}
								className={classes.submit}
								fullWidth
                onClick={handleSubmit}
							>
								Edit Potluck
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

						{foodItemArray.map((eachFoodItem) => {
							const foodDelete = (e) => {
								axios
									.delete(
										`https://potluck-planner-04.herokuapp.com/potlucks/${potluckId}/foods/${eachFoodItem.potluckFood_id}`,
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
							};

							return (
								<StyledLI>
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

<Link href="/profile/organizing" variant="body2">
					<Button style={{ margin: "35px 0px 0px 0px" }} variant="contained" color="secondary" fullWidth>Done</Button>
					<label><h5>Click Done When Finished Adding Food:</h5></label>
					{/* onclick should redirect user to profile or potluck list?? */}                            </Link>


				</Container>

			</div>
		</div>
    </div>
  );
}

// add delete endpoint
