import React, {useState, useEffect, useRef} from "react"
import {Link, Routes, Route} from 'react-router-dom'

function App(){
    const [recipes, setRecipes] = useState([])
    const [formData, setFormData] =useState("")
    const [queryNum, setQueryNum] = useState(10)
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

    function handleOnChange(e){
        e.preventDefault()
        setFormData(e.target.value)
        
    }
    function findRecipes(){
        setLoad(prevLoad => !prevLoad)
        console.log(load)
    }
    let recipesDisplay = recipes.map(r =>{
        return(
            
            <div key={r.id} className="recipe-display-container">
                <h2>{r.title}</h2>
                <img src={r.image}/>
            </div> 
        )
    })
    return(
        <div>
            <div>
              <form>
                <input type="text"
                       value={formData}
                       autoComplete="off"
                       name="recipe"
                       placeholder="Search for new recipes"
                       onChange={handleOnChange}
                />
                <button type="button" onClick={findRecipes} className="submit-btn"></button>
              </form>
              {recipesDisplay}
            </div>

            {/* <Routes>
                <Route path="/:recipeId"></Route>
            </Routes> */}
        </div>
    )
}

export default App