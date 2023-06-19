import { useState } from "react";
import "./Filter.css"
import axios from "axios"
import AllergyDietContent from "./FilterModals/AllergyDietContent.jsx";
import ModalTemplate from "./FilterModals/ModalTemplate.jsx";
import CaloriesContent from "./FilterModals/CaloriesContent";

function Filter({ setRecipes }) {
    const [allergyDietFilter, setAllergyDietFilter] = useState([]);
    const [minCalories, setMinCalories] = useState(0);
    const [maxCalories, setMaxCalories] = useState(0);

    const allergyDietContentId = "allergy-diet-modal";
    const allergyDietTitle = "Allergy/Diet Filter";
    const caloriesContentId = "calories-modal";
    const caloriesTitle = "Calories Filter";

    function addAllergyDietFilter(item) {
        if(allergyDietFilter.indexOf(item) === -1) {
            setAllergyDietFilter([...allergyDietFilter, item]);
        }
    }

    function removeAllergyDietFilter(item) {
        setAllergyDietFilter(allergyDietFilter.filter(curItem => curItem !== item));
    }

    function changeMinCalories(calories) {
        setMinCalories(calories);
    }

    function changeMaxCalories(calories) {
        setMaxCalories(calories);
    }

    function showModal(id) {
        document.querySelector("#" + id).classList.remove("hidden");
    }

    async function submit() {
        try {
            const params = new URLSearchParams();
            params.append("type", "public");
            params.append("app_id", import.meta.env.VITE_APP_ID);
            params.append("app_key", import.meta.env.VITE_APP_KEY);
            params.append("calories", `${minCalories}-${maxCalories}`)
            allergyDietFilter.forEach(item => {
                params.append("health", item);
            });
            const response = await axios.get("https://api.edamam.com/api/recipes/v2", {
                params: params
            });

            setRecipes(response.data.hits);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div id="filter-box">
            <form>
                <ModalTemplate componentId={allergyDietContentId} contentComponent={<AllergyDietContent 
                        addItem={addAllergyDietFilter} removeItem={removeAllergyDietFilter}/>} title={allergyDietTitle}/>
                <button onClick={() => showModal(allergyDietContentId)} type="button">{allergyDietTitle}</button>
                <ModalTemplate componentId={caloriesContentId} contentComponent={<CaloriesContent
                        changeMin={changeMinCalories} changeMax={changeMaxCalories} />} title={caloriesTitle}/>
                <button onClick={() => showModal(caloriesContentId)} type="button">{caloriesTitle}</button>
                <button type="button">Meal Type</button>
                <button type="button">Cook/Prep Time</button>
                <button id="filter-submit" onClick={submit} type="button">Submit</button>
            </form>
        </div>
    )
}

export default Filter