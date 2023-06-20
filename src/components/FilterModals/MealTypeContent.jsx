import { useState } from "react";
import "./MealTypeContent.css"

function MealTypeContent() {
    const [selection, setSelection] = useState("all");

    return (
        <select onChange={(e) => {setSelection(e.target.value)}} id="meal-type-select">
            <option value="all">All</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
        </select>
    )
}

export default MealTypeContent