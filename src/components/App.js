import React, {useState, useEffect, useRef} from "react"
import {Link, Routes, Route} from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import "../index.css"
import RecipeDetails from "./RecipeDetails"
import Home from "./Home"

function App(){

    return(
        <div>

            <Routes>
                <Route exact path ="/" element={<Home/>}></Route>
                <Route path="/:recipeId" element={<RecipeDetails/>}>
                </Route>
            </Routes>
        </div>
    )
}

export default App