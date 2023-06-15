import "./Filter.css"
import AllergyDietContent from "./FilterModals/AllergyDietContent.jsx";
import ModalTemplate from "./FilterModals/ModalTemplate.jsx";

function Filter() {
    const allergyDietContentId = "allergy-diet-modal";
    const allergyDietTitle = "Allergy/Diet Filter";

    function showModal(id) {
        document.querySelector("#" + id).classList.remove("hidden");
    }

    return (
        <div id="filter-box">
            <form>
                <ModalTemplate componentId={allergyDietContentId} contentComponent={<AllergyDietContent/>} title={allergyDietTitle}/>
                <button onClick={() => showModal(allergyDietContentId)} type="button">{allergyDietTitle}</button>
                <button type="button">Calories Filter</button>
                <button type="button">Meal Type</button>
                <button type="button">Cook/Prep Time</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Filter