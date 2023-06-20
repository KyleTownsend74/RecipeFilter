import { useState } from "react";
import "./Filter.css"
import axios from "axios"
import AllergyDietContent from "./FilterModals/AllergyDietContent.jsx";
import ModalTemplate from "./FilterModals/ModalTemplate.jsx";
import CaloriesContent from "./FilterModals/CaloriesContent";
import MealTypeContent from "./FilterModals/MealTypeContent";
import CookTimeContent from "./FilterModals/CookTimeContent";

function Filter({ setRecipes }) {
    const [allergyDietFilter, setAllergyDietFilter] = useState([]);
    const [minCalories, setMinCalories] = useState(0);
    const [maxCalories, setMaxCalories] = useState(0);
    const [mealType, setMealType] = useState("All");
    const [minTime, setMinTime] = useState(0);
    const [maxTime, setMaxTime] = useState(0);

    const allergyDietContentId = "allergy-diet-modal";
    const allergyDietTitle = "Allergy/Diet Filter";
    const caloriesContentId = "calories-modal";
    const caloriesTitle = "Calories Filter";
    const mealTypeContentId = "meal-type-modal";
    const mealTypeTitle = "Meal Type";
    const cookTimeContentId = "cook-time-modal";
    const cookTimeTitle = "Cook/Prep Time";

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

    function changeMealType(newMealType) {
        setMealType(newMealType);
    }

    function changeMinTime(minutes) {
        setMinTime(minutes);
    }

    function changeMaxTime(minutes) {
        setMaxTime(minutes);
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
            params.append("calories", `${minCalories}-${maxCalories}`);
            params.append("time", `${minTime}-${maxTime}`);
            allergyDietFilter.forEach(item => {
                params.append("health", item);
            });

            if(mealType !== "All") {
                params.append("mealType", mealType);
            }

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

                <ModalTemplate componentId={caloriesContentId} contentComponent={<CaloriesContent parentId={caloriesContentId}
                        changeMin={changeMinCalories} changeMax={changeMaxCalories} />} title={caloriesTitle}/>
                <button onClick={() => showModal(caloriesContentId)} type="button">{caloriesTitle}</button>

                <ModalTemplate componentId={mealTypeContentId} contentComponent={<MealTypeContent
                        changeSelection={changeMealType}/>} title={mealTypeTitle}/>
                <button onClick={() => showModal(mealTypeContentId)} type="button">{mealTypeTitle}</button>

                <ModalTemplate componentId={cookTimeContentId} contentComponent={<CookTimeContent parentId={cookTimeContentId}
                        changeMin={changeMinTime} changeMax={changeMaxTime}/>} title={cookTimeTitle}/>
                <button onClick={() => showModal(cookTimeContentId)} type="button">{cookTimeTitle}</button>

                <button id="filter-submit" onClick={submit} type="button">Submit</button>
            </form>
        </div>
    )
}

export default Filter