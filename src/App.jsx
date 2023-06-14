import { useState } from 'react'
import axios from 'axios'
import Header from './components/Header.jsx'
import './App.css'

function App() {
    async function testReq() {
        try {
            const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
                params: {
                    type: "public",
                    q: "chicken",
                    app_id: import.meta.env.VITE_APP_ID,
                    app_key: import.meta.env.VITE_APP_KEY
                }
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    // testReq();

    return (
        <Header/>
    )
}

export default App
