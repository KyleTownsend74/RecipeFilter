import { useState } from "react";
import "./Filter.css"
import axios from "axios"
import AllergyDietContent from "./FilterModals/AllergyDietContent.jsx";
import ModalTemplate from "./FilterModals/ModalTemplate.jsx";
import CaloriesContent from "./FilterModals/CaloriesContent";
import MealTypeContent from "./FilterModals/MealTypeContent";
import CookTimeContent from "./FilterModals/CookTimeContent";

function Filter({ setRecipes, setLoading }) {
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
    const recipeArrayLength = 12;

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

    function filterSource(curRecipe) {
        // "Serious Eats" source known for not having reliable links, so filter it out
        return curRecipe.recipe.source !== "Serious Eats";
    }

    // Additional network requests to perform when not enough recipes were initially
    // returned after filtering out some sources
    async function additionalRequests(curLength, nextUrl) {
        const lengthLeft = recipeArrayLength - curLength;
        let response;

        try{
            response = await axios.get(nextUrl);
        } catch(error) {
            console.log(error);
            return [];
        }

        let recipes = response.data.hits.filter(filterSource);
        const arrLength = recipes.length;

        // If there is still not enough recipes, continue making requests
        if(arrLength < lengthLeft) {
            const nextObj = response.data._links.next;

            if(nextObj) {
                const moreRecipes = await additionalRequests(curLength + arrLength, nextObj.href);
                recipes.push(...moreRecipes);
            }
        }

        return recipes;
    }

    // Network request when user presses "Submit"
    async function submit() {
        try {
            setLoading(true);

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
            let recipes = response.data.hits.filter(filterSource);
            const arrLength = recipes.length;

            if(arrLength < recipeArrayLength) {
                const nextObj = response.data._links.next;

                // If there is no nextObj, there are no more recipes to return
                if(nextObj) {
                    const moreRecipes = await additionalRequests(arrLength, nextObj.href);
                    recipes.push(...moreRecipes);
                }
            }

            setRecipes(recipes.slice(0, recipeArrayLength));
            setLoading(false);
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