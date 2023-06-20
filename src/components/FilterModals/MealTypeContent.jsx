import { useEffect, useState } from "react";
import "./MealTypeContent.css"

function MealTypeContent({ changeSelection }) {
    const [selection, setSelection] = useState("All");

    useEffect(() => {
        changeSelection(selection);
    }, [selection]);

    return (
        <select onChange={(e) => {setSelection(e.target.value)}} id="meal-type-select">
            <option value="All">All</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
        </select>
    )
}

export default MealTypeContent