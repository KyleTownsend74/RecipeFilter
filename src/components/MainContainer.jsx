import { useEffect, useState } from "react"
import Filter from "./Filter"
import "./MainContainer.css"
import RecipeContainer from "./RecipeContainer";

function MainContainer() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function setDisplayedRecipes(newRecipes) {
        setRecipes(newRecipes);
    }

    function setLoading(loading) {
        setIsLoading(loading);
    }

    useEffect(() => {
        console.log(recipes);
    }, [recipes]);

    return (
        <div id="main-container">
            <Filter setRecipes={setDisplayedRecipes} setLoading={setLoading}/>
            <RecipeContainer recipes={recipes} isLoading={isLoading}/>
        </div>
    )
}

export default MainContainer