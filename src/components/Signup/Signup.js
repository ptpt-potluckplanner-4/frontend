// mark builds this

// form --- email/ username/ password/ firstname/ lastname/ phone number
// Join button ---- links to Profile
/////////////////////////////////////////
import React, { useState, useEffect } from 'react';
//import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as yup from 'yup';
import signUpFormSchema from '../../validation/signUpFormSchema';
import "../../index.css";

//MATERIAL UI COPYRIGHT CODE
function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="/">
				Potluck Planner
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

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


// INITIAL SIGNUP FORM VALUES
const initialSignUpFormValues = {
	firstname: '',
	lastname: '',
	username: '',
	email: '',
	password: '',
}

// INITIAL SIGNUP FORM ERRORS
const initialSignUpFormErrors = {
	firstname: '',
	lastname: '',
	username: '',
	email: '',
	password: '',
}

// DISABLE SUBMIT BUTTON INTIALLY
const initialSignUpButtonDisabled = true;

const Signup = () => {
	const [signUpFormValues, setSignUpFormValues] = useState(initialSignUpFormValues);
	const [signUpformErrors, setSignUpFormErrors] = useState(initialSignUpFormErrors) // object
	const [signUpDisabled, setSignUpDisabled] = useState(initialSignUpButtonDisabled) // boolean
	const classes = useStyles();


	//ONCHANGE EVENT HANDLER - For each input
	const onChange = e => {
		//pull out the name and value of the event target
		const { name, value } = e.target;

		//check with yup, run form errors
		yup.reach(signUpFormSchema, name)
			.validate(value)
			.then(() => {
				setSignUpFormErrors({ ...signUpformErrors, [name]: "" })
			})
			.catch(err => {
				setSignUpFormErrors({ ...signUpformErrors, [name]: err.message })
			})

		// update just that input change
		const newFormValues = { ...signUpFormValues, [name]: value }
		//set newFormValues into state
		setSignUpFormValues(newFormValues);
	}

	//ENABLE BUTTON WHEN NO ERRORS EXIST
	useEffect(() => {
		// ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
		signUpFormSchema.isValid(signUpFormValues)
			.then(isSchemaValid => {
				setSignUpDisabled(!isSchemaValid) //disable the submt button if not valid
			})
	}, [signUpFormValues])

	// HANDLE SIGNUP SUBMIT
	const submitSignUpForm = e => {
		console.log("signUp form submitted");
		e.preventDefault();

		const newUser = {
			firstname: signUpFormValues.firstname.trim(),
			lastname: signUpFormValues.firstname.trim(),
			username: signUpFormValues.username.trim(),
			email: signUpFormValues.email.trim(),
			password: signUpFormValues.password.trim(),
		}
		console.log(newUser);
		//  post newUser to backend
		// useEffect(() => {
		// 	axios
		// 		.post('fakeapi.com', newUser)
		// 		.then(res => {
		// 			const newFriends = [...friends, newFriend];
		// 			setUser(newUser);
		// 		})
		// })

		// clear the form at end of submit
		setSignUpFormValues(initialSignUpFormValues);

	}



	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				{/* <Avatar className={classes.avatar}> */}
				{/* <LockOutlinedIcon /> */}
				{/* </Avatar> */}
				<Typography component="h1" variant="h5">
					Join PotLuck Planner
				</Typography>
				<form onSubmit={submitSignUpForm} className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstname"
								variant="filled"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								value={signUpFormValues.firstName}
								onChange={onChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="filled"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastname"
								autoComplete="lname"
								value={signUpFormValues.lastName}
								onChange={onChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="filled"
								required
								fullWidth
								id="username"
								label="User Name"
								name="username"
								autoComplete="username"
								value={signUpFormValues.username}
								onChange={onChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="filled"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								value={signUpFormValues.email}
								onChange={onChange}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant="filled"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={signUpFormValues.password}
								onChange={onChange}
							/>
						</Grid>

					</Grid>
					<div className='formErrors'>
						{/* RENDER THE VALIDATION ERRORS HERE */}
						<div>{signUpformErrors.firstname}</div>
						<div>{signUpformErrors.lastname}</div>
						<div>{signUpformErrors.username}</div>
						<div>{signUpformErrors.email}</div>
						<div>{signUpformErrors.password}</div>
					</div>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={signUpDisabled}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/" variant="body2">
								Already have an account? Login Here.
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default Signup;



