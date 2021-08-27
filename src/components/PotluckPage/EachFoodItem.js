import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

//Component Styles for EachFoodItem
const StyledDiv = styled.div`
	margin: 0 auto 30px auto;
	width: 55%;
	height: auto;
	min-height: 40px;
	min-width: 250px;
	background: #f1f5f8;
	background-image: radial-gradient(#bfc0c1 7.2%, transparent 0);
	background-size: 25px 25px;
	border-radius: 10px;
	box-shadow: 4px 3px 7px 2px #00000040;
	box-sizing: border-box;
	padding: 0;
`;
const StyledHeader = styled.header`
	background-color: #c1cfc0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: row nowrap;
	width: 100%;
	height: 30px;
	border-radius: 10px 10px 0px 0px;
	margin: 0;
	padding: 0;
`;

const StyledLabel = styled.label`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
	width: 100%;
	border-radius: 10px 10px 0px 0px;
`;

const StyledLabel2 = styled.label`
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	margin-right: 20px;
	align-items: center;
	width: 100%;
	border-radius: 10px 10px 0px 0px;
`;

const StyledDiv2 = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
`;

const StyledDiv3 = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	padding: 0 10px;
`;

const StyledP = styled.p`
	font-weight: 700;
	font-size: 1.2rem;
	margin-left: 20px;
`;

const StyledButton = styled.button`
	margin-left: 10px;
	margin-top: 2px;
	font-size: 0.7rem;
	width: 60px;
`;

const EachFoodItem = ({ FoodItem, User }) => {
	const [checked, setChecked] = useState({ boolean: false, contributor: "" });
	const [committed, setCommitted] = useState(false);
	const [contributing, setContributing] = useState();

	//TOGGLE THE CHECKBOX - CONTRIBUTING WHAT TO THE POTLUCK?
	function toggleCheckbox(e) {
		if (e.target.checked === true && committed === false) {
			// set checked to true for person
			console.log(User, "user");
			setChecked({ boolean: true, contributor: User });
		} else {
			// toggle check off to false
			setChecked({ boolean: false, contributor: "" });
			// remove User's Name from Contributor for that food
		}
		console.log(checked, "checked");
	}

	//COMMIT TO BRINGING THE ITEM
	const commitToBringing = () => {
		axios
			.put(
				`https://potluck-planner-04.herokuapp.com/potlucks/1/foods/${FoodItem.potluckFood_id}`,
			) // replace 1 with state.user_id
			.then((res) => {
				setContributing(res.data);
				setCommitted(true);
				setChecked({ boolean: false, contributor: "" });
				toggleCheckbox();
			})
			.catch((err) => {
				console.error("Server Error", err);
			});
	};

	//   set your name as contributor of food from the list
	//   [PUT] https://potluck-planner-04.herokuapp.com/potlucks/:id/foods/:potluckFood_id
	//   the user must be logged in and they can only claim food as theirs to bring, they cant put other people's name
	//   requires object: { contributor: state.user_id }
	//   returns updated object of that item { "potluckFood_id": 7, "food_name": "baked potatoes", "contributor": "Name of user" }

	return (
		<StyledDiv>
			<StyledHeader>
				<h3>{FoodItem.food_name}</h3>
			</StyledHeader>
			<StyledDiv2>
				<StyledLabel>
					<StyledP>Contributor: </StyledP>
					<input
						type="checkbox"
						onChange={toggleCheckbox}
						checked={checked.boolean}
						name={FoodItem.food_name}
						id={FoodItem.potluckFood_id}
						style={{ display: committed === true ? "none" : "inline" }}
					></input>
				</StyledLabel>
				<StyledLabel2>
					<StyledDiv3>
						<StyledP
							style={{ display: checked.boolean === false ? "none" : "inline" }}
						>
							{checked.contributor}
						</StyledP>
						<StyledButton
							style={{ display: checked.boolean === false ? "none" : "inline" }}
							onClick={commitToBringing}
						>
							Commit
						</StyledButton>
					</StyledDiv3>
				</StyledLabel2>
			</StyledDiv2>
		</StyledDiv>
	);
};

export default EachFoodItem;
