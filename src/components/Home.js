import React, {useState, useEffect, useRef} from "react"
import {Link, Routes, Route} from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import "../index.css"
import RecipeDetails from "./RecipeDetails"


function Home(){
    const PER_PAGE = 5
    const [currentPage, setCurrentPage] = useState(0)
    const [formData, setFormData] =useState("")
    const [recipes, setRecipes] = useState([])
    const [queryNum, setQueryNum] = useState(60)
    const [load, setLoad] = useState(false)
    const isMounted = useRef(false)
    let apiKey = "c946f13b6a314b0c99f9ab874a602aa7"
    
    //https://api.spoonacular.com/recipes/654959/information?apiKey=e0a3d83a76cd454fad56b15153d1d5f6"
    
    let url = `https://api.spoonacular.com/recipes/complexSearch?query=${formData}&apiKey=${apiKey}&number=${queryNum}`
    useEffect(() =>{
      if(isMounted.current){
        fetch(url)
        .then(res => res.json())
        .then(data => setRecipes(data.results))
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
    }
    function handlePageClick({selected:selectedPage}){
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE
    const currentPageData = recipes
      .slice(offset, offset + PER_PAGE)
      .map(r =>{
        return(
            <div key={r.id}>
            <Link to={`/${r.id}`}>
             <div key={r.id} className="recipe-display-container">
             <span className="card">
                 <h2>{r.title}</h2>
                 <img src={r.image}/>
              </span>
             </div> 
            </Link>
            </div>
        )
      })
    const pageCount = Math.ceil(recipes.length / PER_PAGE)
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
            </div>
            {currentPageData}
            {recipes.length > 0 ? 
            <ReactPaginate 
            previousLabel = {"< Previous"}
            nextLabel="next >"
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"page-container"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            activeClassName={"page-link--active"}
            disabledClassName={"page-link--disabled"}
         />
         : <div>Hello</div>
        }
            
        </div>
    )
}
export default Home