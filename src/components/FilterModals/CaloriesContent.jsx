import "./CaloriesContent.css";

function CaloriesContent() {
    return (
        <>
            <input className="calories-input" type="number" min="0" 
                    onInput={(e) => { e.target.validity.valid || (e.target.value=''); }} placeholder="Minimum"/>
            <input className="calories-input" type="number" min="0" 
                    onInput={(e) => { e.target.validity.valid || (e.target.value=''); }} placeholder="Maximum"/>
        </>
    )
}

export default CaloriesContent