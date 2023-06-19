import { useEffect, useState } from "react";
import "./CaloriesContent.css";

function CaloriesContent({ parentId, changeMin, changeMax }) {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(3000);

    const minId = "cal-min";
    const maxId = "cal-max";

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

        const errorElement = document.querySelector("#calories-error");
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

        const errorElement = document.querySelector("#calories-error");
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
            <label className="calories-label" htmlFor={minId}>Minimum:</label>
            <input className="calories-input" id={minId} type="number" min="0" defaultValue={min}
                    onInput={(e) => { minChange(e); }} placeholder="Minimum"/>
            <label className="calories-label" htmlFor={maxId}>Maximum:</label>
            <input className="calories-input" id={maxId} type="number" min="0" defaultValue={max}
                    onInput={(e) => { maxChange(e); }} placeholder="Maximum"/>
            <p id="calories-error" className="hidden">The maximum must be greater than the minimum.</p>
        </>
    )
}

export default CaloriesContent