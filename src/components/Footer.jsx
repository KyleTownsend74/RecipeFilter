import "./Footer.css";

function Footer() {
    return (
        <>
            <p id="disclaimer">
                Disclaimer: All data sourced from Edamam Recipe Search API.
                Due to API restrictions and third party changes, some recipes 
                displayed may not have accompanying preparation instructions
                or may have some inaccuracies.
            </p>
            <div id="edamam-badge" data-color="transparent"></div>
        </>
    )
}

export default Footer