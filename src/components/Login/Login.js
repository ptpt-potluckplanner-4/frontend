// Chase builds this

// form --- username password
// Submit button --- link directly to Profile.js
// add small link that routes to signup.js underneath

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// copyright component from Material UI
function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="/profile">
				Potluck Planner
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

// Styles from Material UI
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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

// Initial log in form values
const initialLogInFormValues = { email: "", password: "" };

export default function SignIn() {
	const [logInFormValues, setLogInFormValues] = useState(
		initialLogInFormValues,
	); // object

	// allows you to use styles from Material UI
	const classes = useStyles();

	//ONCHANGE EVENT HANDLER - For each input
	const onChange = (e) => {
		//pull out the name and value of the event target
		const { name, value } = e.target;

		// update just that input change
		const newFormValues = { ...logInFormValues, [name]: value };
		//set newFormValues into state
		setLogInFormValues(newFormValues);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				{/* <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar> */}
				<Typography component="h1" variant="h4">
					LogIn
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={onChange}
						value={logInFormValues.email}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={onChange}
						value={logInFormValues.password}
					/>
					{/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						LogIn
					</Button>
					<Grid container>
						{/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
						<Grid item>
							<Link href="/signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
