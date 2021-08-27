import React, { useState, useEffect } from 'react'
import axios from 'axios';
import EachFoodItem from "./EachFoodItem"
import styled from 'styled-components';

//styled component
const StyledP = styled.p`
    font-size: .8rem;
    padding: 0;
    margin: 5px;
    font-weight: 400;
  `;

export default function PotLuckFoods({ pl, User }) {
  const [foodArray, setFoodArray] = useState([]);

  //recieve food details for that potluck
  useEffect(() => {
    const getPotluckFoods = () => {
      axios
        .get(`https://potluck-planner-04.herokuapp.com/potlucks/${pl.potluck_id}/foods`) // Endpoint to get all potlucks in Database
        .then(res => {
          setFoodArray(res.data);
        })
        .catch(err => {
          console.error('Server Error', err);
        });
    }
    getPotluckFoods();
  }, [pl.potluck_id]); // empty array makes this only run once



  console.log(User, "potluckfoods.js")

  return (
    <div>
      {<h2>Foods & Items for {pl.title}:</h2>}
      <div style={{ marginBottom: "40px", marginTop: "-10px" }}>
        <StyledP>Check the box of the item you would like to bring. </StyledP>
        <StyledP>After Choosing all your contributions hit commit to finalize  </StyledP>
      </div>
      {foodArray.map(eachFoodItem => {
        return (
          <div>
            <EachFoodItem FoodItem={eachFoodItem} User={User}></EachFoodItem>
          </div>
        )
      })}
    </div>
  )
}
