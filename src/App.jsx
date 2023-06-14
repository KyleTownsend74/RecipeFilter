import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
    <h1>Hello World</h1>
  )
}

export default App
