import "./RecipeItem.css";

function RecipeItem({ recipe }) {
    return (
        <div className="recipe-item">
            <img src={recipe.images.SMALL.url} width="150" height="150"/>
            <h3>{recipe.label}</h3>
        </div>
    )
}

export default RecipeItem