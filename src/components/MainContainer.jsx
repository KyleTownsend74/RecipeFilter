import { useEffect, useState } from "react"
import Filter from "./Filter"
import "./MainContainer.css"
import RecipeContainer from "./RecipeContainer";

function MainContainer() {
    const [recipes, setRecipes] = useState([]);

    function setDisplayedRecipes(newRecipes) {
        setRecipes(newRecipes);
    }

    useEffect(() => {
        console.log(recipes);
    }, [recipes]);

    return (
        <div id="main-container">
            <Filter setRecipes={setDisplayedRecipes}/>
            <RecipeContainer recipes={recipes}/>
        </div>
    )
}

export default MainContainer