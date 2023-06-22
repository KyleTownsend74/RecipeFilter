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
        const source = curRecipe.recipe.source;

        // "Serious Eats" and "Ruhlman" sources known for not having reliable links, so filter out
        return source !== "Serious Eats" && source !== "Ruhlman";
    }

    async function makeRequest(curRecipesLength, url, params) {
        const lengthLeft = recipeArrayLength - curRecipesLength;
        let response;

        try{
            if(params) {
                response = await axios.get(url, {
                    params: params
                });
            }
            else {
                response = await axios.get(url);
            }
        } catch(error) {
            console.log(error);
            return [];
        }

        let recipes = response.data.hits.filter(filterSource);
        const arrLength = recipes.length;

        // If there are not enough recipes, continue making requests
        if(arrLength < lengthLeft) {
            const nextObj = response.data._links.next;

            // If there is no nextObj, there are no more recipes to return
            if(nextObj) {
                const moreRecipes = await makeRequest(curRecipesLength + arrLength, nextObj.href, null);
                recipes.push(...moreRecipes);
            }
        }

        return recipes;
    }

    async function submit() {
        setLoading(true);
        setRecipes([]);

        const params = new URLSearchParams();

        params.append("type", "public");
        params.append("app_id", import.meta.env.VITE_APP_ID);
        params.append("app_key", import.meta.env.VITE_APP_KEY);
        params.append("calories", `${minCalories}-${maxCalories}`);
        params.append("time", `${minTime}-${maxTime}`);
        params.append("random", true);
        allergyDietFilter.forEach(item => {
            params.append("health", item);
        });

        if(mealType !== "All") {
            params.append("mealType", mealType);
        }

        const recipes = await makeRequest(0, "https://api.edamam.com/api/recipes/v2", params);

        setRecipes(recipes.slice(0, recipeArrayLength));
        setLoading(false);
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