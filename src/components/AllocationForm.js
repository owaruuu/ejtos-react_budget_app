import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const AllocationForm = (props) => {
    const { dispatch, remaining } = useContext(AppContext);

    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [action, setAction] = useState("");

    const submitEvent = () => {
        // inputs of type "value" can receive one 'e' or 'E' on it to make exponential numbers
        // since it's very hard to deal with this case
        // checking for an empty string it's easier
        // as long as the exponential notation is not complete in the input
        // the 'value' of it will be ""
        if (cost === "") {
            alert("Please add a value to add.");
            setCost("");
            return;
        }

        if (cost > remaining) {
            alert("The value cannot exceed remaining funds  £" + remaining);
            setCost("");
            return;
        }

        // BUG FIX when you parse the string "20e1" instead of giving the number 200
        // it gives the number 20, I assume parsing a string removes everything after a letter
        // to fix convert to number first
        const numberCost = Number(cost);
        const expense = {
            name: name,
            cost: parseInt(numberCost),
        };

        if (action === "Reduce") {
            dispatch({
                type: "RED_EXPENSE",
                payload: expense,
            });
        } else {
            dispatch({
                type: "ADD_EXPENSE",
                payload: expense,
            });
        }
    };

    return (
        <div>
            <div className="row">
                <div
                    className="input-group mb-3"
                    style={{ marginLeft: "2rem" }}
                >
                    <div className="input-group-prepend">
                        <label
                            className="input-group-text"
                            htmlFor="inputGroupSelect01"
                        >
                            Department
                        </label>
                    </div>
                    <select
                        className="custom-select"
                        id="inputGroupSelect01"
                        onChange={(event) => setName(event.target.value)}
                    >
                        <option defaultValue>Choose...</option>
                        <option value="Marketing" name="marketing">
                            {" "}
                            Marketing
                        </option>
                        <option value="Sales" name="sales">
                            Sales
                        </option>
                        <option value="Finance" name="finance">
                            Finance
                        </option>
                        <option value="HR" name="hr">
                            HR
                        </option>
                        <option value="IT" name="it">
                            IT
                        </option>
                        <option value="Admin" name="admin">
                            Admin
                        </option>
                    </select>

                    <div
                        className="input-group-prepend"
                        style={{ marginLeft: "2rem" }}
                    >
                        <label
                            className="input-group-text"
                            htmlFor="inputGroupSelect02"
                        >
                            Allocation
                        </label>
                    </div>
                    <select
                        className="custom-select"
                        id="inputGroupSelect02"
                        onChange={(event) => setAction(event.target.value)}
                    >
                        <option defaultValue value="Add" name="Add">
                            Add
                        </option>
                        <option value="Reduce" name="Reduce">
                            Reduce
                        </option>
                    </select>

                    <input
                        required="required"
                        type="number"
                        id="cost"
                        value={cost}
                        style={{ marginLeft: "2rem", size: 10 }}
                        onChange={(event) => setCost(event.target.value)}
                    ></input>

                    <button
                        className="btn btn-primary"
                        onClick={submitEvent}
                        style={{ marginLeft: "2rem" }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllocationForm;
