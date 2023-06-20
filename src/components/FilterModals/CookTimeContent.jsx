import { useEffect, useState } from "react";
import "./CookTimeContent.css";

function CookTimeContent({ parentId, changeMin, changeMax }) {
    // Time in minutes
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(1000);

    const minId = "time-min";
    const maxId = "time-max";

    useEffect(() => {
        changeMin(min);
    }, [min]);

    useEffect(() => {
        changeMax(max);
    }, [max]);

    function minChange(e) {
        if(!e.target.validity.valid) {
            e.target.value = min;
            return;
        }

        const errorElement = document.querySelector("#time-error");
        const curValue = Number(e.target.value);
        setMin(curValue);

        if(curValue > max) {
            errorElement.classList.remove("hidden");
            document.querySelector(`#${parentId} button`).disabled = true;
        }
        else {
            errorElement.classList.add("hidden");
            document.querySelector(`#${parentId} button`).disabled = false;
        }
    }

    function maxChange(e) {
        if(!e.target.validity.valid) {
            e.target.value = max;
            return;
        }

        const errorElement = document.querySelector("#time-error");
        const curValue = Number(e.target.value);
        setMax(curValue);
        
        if(curValue < min) {
            errorElement.classList.remove("hidden");
            document.querySelector(`#${parentId} button`).disabled = true;
        }
        else {
            errorElement.classList.add("hidden");
            document.querySelector(`#${parentId} button`).disabled = false;
        }
    }

    return (
        <>
            <label className="time-label" htmlFor={minId}>Minimum Minutes:</label>
            <input className="time-input" id={minId} type="number" min="0" defaultValue={min}
                    onInput={(e) => { minChange(e); }} placeholder="Minimum"/>
            <label className="time-label" htmlFor={maxId}>Maximum Minutes:</label>
            <input className="time-input" id={maxId} type="number" min="0" defaultValue={max}
                    onInput={(e) => { maxChange(e); }} placeholder="Maximum"/>
            <p id="time-error" className="hidden">The maximum must be greater than the minimum.</p>
        </>
    )
}

export default CookTimeContent