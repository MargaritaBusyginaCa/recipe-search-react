import React from "react"
import { useParams } from "react-router-dom"
import App from "./App"

function RecipeDetails({recipes}){
  const {recipeId} = useParams()
  console.log(recipeId )
  return(
    <div>Hi there</div>
  )
}
export default RecipeDetails