import React, { useEffect, useState } from "react";
import { Link, useHistory, } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const StyledSection = styled.section`
  ${'' /* background-color: papayawhip; */}
  background-color: whitesmoke; 
  font-size: 1 rem;
	width: 75%;
	margin: 25px auto;
	border: 1.5px solid black;
	border-radius: 5px;
	box-shadow: 0px 5px 5px grey;
  }
`;

const StyledH2 = styled.h2`
  ${'' /* background-color: papayawhip; */}
  background-color: #E7E0C9; 
  align-self:center;
  margin: 0;
  padding: 0;
  }
`;

const StyledHeaderDiv = styled.header`
  ${'' /* background-color: papayawhip; */}
  background-color: #E7E0C9; 
  height: 50px;
  border: 2px solid black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

const StyledDetailsDiv = styled.div`
  ${'' /* background-color: papayawhip; */}
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const StyledSpan = styled.span`
  ${'' /* background-color: papayawhip; */}
  font-weight: 600;
  text-align: center;
  display: block;
`;

const StyledP = styled.p`
  ${'' /* background-color: papayawhip; */}
  text-align: center;
  margin: 2px 0 8px 0;
  padding: 0;
`;

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


export default function PotLuckDetails({ potLuck }) {
  const { title, date, time, location, organizer, } = potLuck;
  const history = useHistory();
  const paramsLocation = history.location.pathname;
  const [guestsComing, setGuestsComing] = useState([]);

  // Toggles buttons depending on page
  function ToggleAttendButton() {
    if (paramsLocation === "/potlucklist") { return { display: "block" } } else { return { display: "none" } }
  }

  function ToggleEditButton() {
    if (paramsLocation === "/profile/organizing") { return { display: "block" } } else { return { display: "none" } }
  }

  function ToggleViewButton() {
    if (paramsLocation === "/profile/attending") { return { display: "block" } } else { return { display: "none" } }
  }

  //[PUT] https://potluck-planner-04.herokuapp.com/potlucks/:id/foods/:potluckFood_id

  // recieve potluck list details
  const attendPotluck = () => {
    axios
      .post('https://potluck-planner-04.herokuapp.com/potlucks/1/guests') // replace 1 with user id
      .then(res => {
        setGuestsComing(res.data);
        console.log(res.data)
      })
      .catch(err => {
        console.error('Server Error', err);
      })
      .finally(
        console.log(guestsComing), "guestsComing"
      )
  }





  // Details could include the list functionality or we add another component
  return (
    <div className="">

      <StyledSection>
        <div>
          <StyledHeaderDiv>
            <StyledH2>{title}</StyledH2>
          </StyledHeaderDiv>
          <StyledDetailsDiv>
            <StyledP><StyledSpan>When:</StyledSpan> {date}, {time}</StyledP>
            <StyledP><StyledSpan>Where:</StyledSpan> {location}</StyledP>
            <StyledP><StyledSpan>Planned By:</StyledSpan> {organizer}</StyledP>
            <Link style={{ textDecoration: "none" }} to={`/potlucklist/${potLuck.potluck_id}`}>
              <StyledButton onClick={attendPotluck()} style={ToggleAttendButton()}>Attend</StyledButton>
              <StyledButton style={ToggleViewButton()}>View</StyledButton>
            </Link>
            <Link style={{ textDecoration: "none" }} to={`/profile/organizing/${potLuck.potluck_id}`}>
              <StyledButton style={ToggleEditButton()}>Edit</StyledButton>
            </Link>
          </StyledDetailsDiv>
        </div>
      </StyledSection>

    </div>
  );
}

