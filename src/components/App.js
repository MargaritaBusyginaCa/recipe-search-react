import React, {useState, useEffect} from "react"
import {Link, Routes, Route} from 'react-router-dom'
function App(){
    const [recipes, setRecipes] = useState([])
    const [randomRecipes, setRandomRecipes] = useState([])
    const [load, setLoad] = useState(false)
    //6b0b1262b4284a6bb7255205dff10a83
    useEffect(() =>{
      fetch('https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=6b0b1262b4284a6bb7255205dff10a83&number=1')
      .then(res => res.json())
      .then(data => setRecipes(data.results))
       
    }, load)
    console.log(recipes)
    return(
        <div>
            <div>
              <form>
                
              </form>
            </div>

            <Routes>
                <Route path="/:recipeId"></Route>
            </Routes>
        </div>
    )
}

export default App