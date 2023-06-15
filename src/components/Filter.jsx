import "./Filter.css"

function Filter() {
    return (
        <div id="filter-box">
            <form>
                <button type="button">Allergy/Diet Filter</button>
                <button type="button">Calories Filter</button>
                <button type="button">Meal Type</button>
                <button type="button">Cook/Prep Time</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Filter