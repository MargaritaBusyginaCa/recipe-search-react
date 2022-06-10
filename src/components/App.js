import React, {useState, useEffect, useRef} from "react"
import {Link, Routes, Route} from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import "../index.css"
import RecipeDetails from "./RecipeDetails"
import Home from "./Home"

function App(){
    const [recipes, setRecipes] = useState([])
    const [formData, setFormData] =useState("")
    const [queryNum, setQueryNum] = useState(60)
    const [load, setLoad] = useState(false)
    const isMounted = useRef(false)
    let apiKey = "e0a3d83a76cd454fad56b15153d1d5f6"
    
    //https://api.spoonacular.com/recipes/654959/information?apiKey=6b0b1262b4284a6bb7255205dff10a83"
    
    let url = `https://api.spoonacular.com/recipes/complexSearch?query=${formData}&apiKey=${apiKey}&number=${queryNum}`
    useEffect(() =>{
      if(isMounted.current){
        fetch(url)
        .then(res => res.json())
        .then(data => setRecipes(data.results))
        console.log("Api loaded")
      }else{
        isMounted.current = true
      }
      
    }, [load])
    
    
    return(
        <div>

            <Routes>
                <Route exact path ="/" element={<Home recipes={recipes} setRecipes={setRecipes} load={load} setLoad={setLoad}/>}></Route>
                <Route path="/:recipeId" element={<RecipeDetails recipes={recipes} setRecipes={setRecipes} load={load} setLoad={setLoad}/>}>
                </Route>
            </Routes>
        </div>
    )
}

export default App