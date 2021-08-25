//Chase builds this

//shows potlucks the users is going to attend ---- attendPotluckList
//shows potluck the user is organizing --- Organizing


//Organizing button/ Attending button 

// whichever user clicks on...shows that information

// organizing button clicked --- shows all users organized potlucks 
// if no event is shown then a button shows that links to createpotluck.js
// if currentUser === organizer than allow edit capabilities

// if attending is clicked --- hides users events/ shows all available potlucks
// if user has not signed up to attend a potluck then button shows 
// and links to potLuckList.js (edit capabilities disabled)
import { Route, Switch, Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar"
import AttendingThesePotLucks from "./AttendingThesePotLucks"
import Organizing from "./Organizing"
import { Box } from "@material-ui/core";
//import { styled } from '@material-ui/core/styles';
//import { flexbox } from "@material-ui/system";
import styled from "styled-components";

// styled component
const StyledButton = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "#E7E0C9" : "#C1CFC0"};
  
  color: black;
 font-size: 1em;
  margin: 1em;
  padding: 0.75em 1.25em;
  border: 1px solid black;
  border-radius: 3px;
  box-shadow: 0px 5px 5px grey;
  textDecoration: none;
  transition: all .2s ease-in-out;
  &:hover {
    text-decoration: none;
    ${'' /* color: #6B7AA1; */}
    transform: scale(1.1);}
`;

export default function Profile({ User }) {

    console.log(User, "user from profile");

    return (
        <div>
            <NavBar />
            <div className="usersProfileButtons" >
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" >
                    <Link to="/profile/organizing">

                        <StyledButton primary>
                            View Your Organized Potlucks
                        </StyledButton>
                    </Link>
                    <Link to="/profile/attending">
                        <StyledButton  >
                            View Potlucks You are Attending
                        </StyledButton>
                    </Link>
                </Box>
            </div>
            <Switch>
                <Route path="/profile/organizing"> <Organizing User={User} /> </Route>
                <Route path="/profile/attending"> <AttendingThesePotLucks User={User} /></Route>
            </Switch>
        </div>
    )
}

/* // primary: { main: '#6B7AA1' },
// 		secondary: { main: '#C1CFC0' },
       // text: { primary: "#11324D", secondary: "#E7E0C9" } */

