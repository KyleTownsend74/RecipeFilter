import "./AllergyDietContent.css";

function AllergyDietContent({ addItem, removeItem }) {
    const allergyDietList = [
        {
            id: "alcohol-free",
            displayName: "Alcohol Free"
        },
        {
            id: "celery-free",
            displayName: "Celery Free"
        },
        {
            id: "crustacean-free",
            displayName: "Crustacean Free"
        },
        {
            id: "dairy-free",
            displayName: "Dairy Free"
        },
        {
            id: "DASH",
            displayName: "DASH"
        },
        {
            id: "egg-free",
            displayName: "Egg Free"
        },
        {
            id: "fish-free",
            displayName: "Fish Free"
        },
        {
            id: "fodmap-free",
            displayName: "Fodmap Free"
        },
        {
            id: "gluten-free",
            displayName: "Gluten Free"
        },
        {
            id: "immuno-supportive",
            displayName: "Immuno-Supportive"
        },
        {
            id: "keto-friendly",
            displayName: "Keto Friendly"
        },
        {
            id: "kidney-friendly",
            displayName: "Kidney Friendly"
        },
        {
            id: "kosher",
            displayName: "Kosher"
        },
        {
            id: "low-fat-abs",
            displayName: "Low Fat"
        },
        {
            id: "low-potassium",
            displayName: "Low Potassium"
        },
        {
            id: "low-sugar",
            displayName: "Low Sugar"
        },
        {
            id: "lupine-free",
            displayName: "Lupine Free"
        },
        {
            id: "mollusk-free",
            displayName: "Mollusk Free"
        },
        {
            id: "mustard-free",
            displayName: "Mustard Free"
        },
        {
            id: "no-oil-added",
            displayName: "No Oil Added"
        },
        {
            id: "paleo",
            displayName: "Paleo"
        },
        {
            id: "peanut-free",
            displayName: "Peanut Free"
        },
        {
            id: "pescatarian",
            displayName: "Pescatarian"
        },
        {
            id: "pork-free",
            displayName: "Pork Free"
        },
        {
            id: "red-meat-free",
            displayName: "Red Meat Free"
        },
        {
            id: "sesame-free",
            displayName: "Sesame Free"
        },
        {
            id: "shellfish-free",
            displayName: "Shellfish Free"
        },
        {
            id: "soy-free",
            displayName: "Soy Free"
        },
        {
            id: "sugar-conscious",
            displayName: "Sugar Conscious"
        },
        {
            id: "sulfite-free",
            displayName: "Sulfite Free"
        },
        {
            id: "tree-nut-free",
            displayName: "Tree Nut Free"
        },
        {
            id: "vegan",
            displayName: "Vegan"
        },
        {
            id: "vegetarian",
            displayName: "Vegetarian"
        },
        {
            id: "wheat-free",
            displayName: "Wheat Free"
        },
    ];
    const elements = allergyDietList.map(item => 
        <div key={item.id} className="input-container">
            <input onClick={(e) => updateFilter(e)} name={item.id} id={item.id} type="checkbox"/>
            <label htmlFor={item.id}>{item.displayName}</label>
        </div>
    );

    function updateFilter(e) {
        if(e.target.checked) {
            addItem(e.target.id);
        }
        else {
            removeItem(e.target.id);
        }
    }

    return (
        <>
            {elements}
        </>
    )
}

export default AllergyDietContent