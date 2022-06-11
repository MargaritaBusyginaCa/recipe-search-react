import React, {useState, useEffect, useRef} from "react"
import { useParams } from "react-router-dom"
import App from "./App"

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
        <p className="ingredient-amount">{i.original}</p>
      </div>  
    )
})

var displayIngredients = function (){
    let stepsArr = []
    if(recipeDetails.analyzedInstructions){
        for(let i = 0; i < recipeDetails.analyzedInstructions.length; i++){
            stepsArr =  recipeDetails.analyzedInstructions[i].steps.map(s =>{
                return(
                    <div className="recipe-steps">
                     <p>{s.step}</p>           
                    </div>   
                )
            })
        }
    }
    // for(let i = 0; i < arr.length; i++){
    //     console.log(i)
    // }
}

  return(
    <div className="recipe-details-main">
        <div>
            <img src={recipeDetails.image}/>
        </div>
        <div>
          <h1>{recipeDetails.title}</h1>
          {ingredientsDisplay}
          {displayIngredients}
        </div>
        <div className="instructions">
          <p dangerouslySetInnerHTML={{__html: recipeDetails.instructions}}/>
        </div>
    </div>
  )
}
export default RecipeDetails