import "./RecipeContainer.css";
import RecipeItem from "./RecipeItem";

function RecipeContainer({ recipes }) {
    return (
        <div id="recipe-container">
            {recipes.length <= 0 ? <p id="recipe-message">No recipes to display.</p> : null}
            {recipes.map(recipe => 
                <RecipeItem key={recipe.recipe.uri} recipe={recipe.recipe}/>    
            )}
        </div>
    )
}

export default RecipeContainer