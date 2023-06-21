import "./RecipeItem.css";

function RecipeItem({ recipe }) {
    return (
        <div className="recipe-item">
            <a className="recipe-link" href={recipe.shareAs} target="_blank">
                <img src={recipe.images.SMALL.url} width="150" height="150"/>
                <h3>{recipe.label}</h3>
            </a>
        </div>
    )
}

export default RecipeItem