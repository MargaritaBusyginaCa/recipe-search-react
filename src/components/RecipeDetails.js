import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import {Link} from 'react-router-dom'

function RecipeDetails({recipes}){
  const {recipeId} = useParams()
  const [recipeDetails, setRecipeDetails] = useState([])
   let url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=d5e511051f14404bb8c1647c9505e18f`
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
        <Link to="/"><p className="logo">FoodGuru</p></Link>
        <div className="recipe-primary-info">
         <div>
             <img src={recipeDetails.image}/>
           <div className="tags">
             {recipeDetails.glutenFree && <p>gluten free</p>}
             {recipeDetails.veryHealthy && <p>very healthy</p>}
             {recipeDetails.vegan && <p>vegan</p>}
             {recipeDetails.vegetarian && <p>vegetarian</p>}
            </div>   
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