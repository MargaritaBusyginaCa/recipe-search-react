import React, {useState, useEffect, useRef} from "react"
import { useParams } from "react-router-dom"
import App from "./App"
import {Link, Routes, Route} from 'react-router-dom'

function RecipeDetails({recipes}){
  const {recipeId} = useParams()
  const [recipeDetails, setRecipeDetails] = useState([])
   let url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=c946f13b6a314b0c99f9ab874a602aa7`
   useEffect(() =>{
       fetch(url)
       .then(res => res.json())
       .then(data => setRecipeDetails(data))
   }, [recipeId])

const ingredientsDisplay = recipeDetails.extendedIngredients?.map(i =>{
    return(
      <div className="ingredient-container" key={i.id}>
         <ul className="ingredients-list">
          <li>{i.original}</li>
         </ul>
      </div>  
    )
})
  return(
    <div className="recipe-details-main">
        <p className="logo">FoodGuru</p>
        <Link to="/">
          <img src={"https://cdn-icons-png.flaticon.com/512/93/93634.png"} 
               className="back-btn"/>
          </Link>
        <div className="recipe-primary-info">
         <div>
             <img src={recipeDetails.image}/>
         </div>
         <div className="title-ingredients-info">
           <h1>{recipeDetails.title}</h1>
           <h2>Ingredients:</h2>
           {ingredientsDisplay}
         </div>
        </div>  
        <div className="instructions">
          <h3>Instructions</h3>
          <p dangerouslySetInnerHTML={{__html: recipeDetails.instructions}}/>
        </div>
    </div>
  )
}
export default RecipeDetails