import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
const Budget = () => {
    const { budget, expenses, dispatch } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const [newAcceptedBudget, setAcceptedBudget] = useState(budget);

    //Handles the input value change
    const handleBudgetChange = (event) => {
        //if the value in input is a partial exponential notation number or an empty string
        //this prevents the 'Number()' below from converting that
        //to a 0, this way I can enter a number from nothing and not have an 0
        //as the first character
        if (event.target.value === "") {
            setNewBudget(event.target.value);
            return;
        }

        const number = Number(event.target.value);
        setNewBudget(number);
    };

    //handles the button to change the current budget display value
    const handleNewBudget = () => {
        //If the value is "" it means it's either an empty input or
        //a partial exponential notation number and should not accept it as valid
        if (newBudget === "") {
            alert("Please add a valid input for the budget");
            setNewBudget("");
            return;
        }

        //Check if value is greater than 20.000
        if (newBudget > 20000) {
            alert("The budget cannot exceed 20.000");
            setNewBudget(20000);
            return;
        }

        const totalExpenses = expenses.reduce((total, item) => {
            return (total = total + item.cost);
        }, 0);

        if (newBudget < totalExpenses) {
            alert(
                "The budget cannot be an amount lower than the amount spent so far"
            );

            //Set the input value to the lowest possible
            setNewBudget(totalExpenses);
            return;
        }

        //else, set the new budget
        //tambien deberia llamar al reducer para cambiar el estado global
        dispatch({
            type: "SET_BUDGET",
            payload: newBudget,
        });

        setAcceptedBudget(newBudget);
    };

    return (
        <div className="alert alert-secondary">
            <span>Budget: £{newAcceptedBudget}</span>
            <input
                type="number"
                step="10"
                value={newBudget}
                onChange={handleBudgetChange}
            ></input>
            <button onClick={handleNewBudget}>Set New Budget</button>
        </div>
    );
};
export default Budget;
