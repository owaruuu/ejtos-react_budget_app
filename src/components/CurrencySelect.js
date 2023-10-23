import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Select, { components } from "react-select";

const options = [
    { value: "$ Dollar", label: "$ Dollar" },
    { value: "£ Pound", label: "£ Pound" },
    { value: "€ Euro", label: "€ Euro" },
    { value: "₹ Rupee", label: "₹ Rupee" },
];

const VALUE_PRE = "Currency (";
const VALUE_POST = ")";

const CurrencySelect = () => {
    const { dispatch } = useContext(AppContext);

    const [selectedOption, setSelectedOption] = useState({
        value: "$ Dollar",
        label: "$ Dollar",
    });

    const handleChange = (event) => {
        setSelectedOption(event);
        dispatch({
            type: "CHG_CURRENCY",
            payload: event.value[0],
        });
    };

    return (
        <Select
            options={options}
            value={selectedOption}
            onChange={handleChange}
            components={{
                SingleValue: ({ children, ...props }) => {
                    return (
                        <components.SingleValue {...props}>
                            {VALUE_PRE + children + VALUE_POST}
                        </components.SingleValue>
                    );
                },
                IndicatorSeparator: () => null,
            }}
            styles={{
                control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "#72b567",
                }),
                singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                }),
                option: (baseStyles, { isSelected, isFocused, isActive }) => ({
                    ...baseStyles,
                    backgroundColor: isSelected
                        ? "white"
                        : isFocused
                        ? "#308522"
                        : "#72b567",
                    color: "black",
                    ":active": {
                        ...baseStyles[":active"],
                        backgroundColor: "#98d98d",
                    },
                }),
                menu: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "#72b567",
                    border: "2px solid #308522",
                }),
            }}
        />
    );
};

export default CurrencySelect;
