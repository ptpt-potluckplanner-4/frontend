import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function PotLuckFoods(pl) {
  const [foodArray, setFoodArray] = useState([]);

  console.log(pl)
  //   get array of all the foods to bring in the potluck
  // [GET] https://potluck-planner-04.herokuapp.com/potlucks/:id/foods

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
  }, []); // empty array makes this only run once



  return (
    <div>
      {<p>Foods/ Items to bring for {pl.title}:</p>}
      {foodArray.map(eachFoodItem => {
        return (
          <div>
            <h3>{eachFoodItem}</h3>
            <p>Check to Add Your Name:</p><p>User</p><checkbox></checkbox>
          </div>
        )
      })}
    </div>
  )
}
