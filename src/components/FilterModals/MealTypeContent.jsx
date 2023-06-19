import "./MealTypeContent.css"

function MealTypeContent() {
    return (
        <select id="meal-type-select">
            <option value="all">All</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
        </select>
    )
}

export default MealTypeContent