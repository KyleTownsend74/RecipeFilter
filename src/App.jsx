import "./App.css"
import Header from "./components/Header.jsx"
import MainContainer from "./components/MainContainer.jsx";

function App() {
    return (
        <div id="box">
            <Header/>
            <MainContainer/>
            <div id="edamam-badge" data-color="transparent"></div>
        </div>
    )
}

export default App
