import React, {useState, useEffect, useRef} from "react"
import {Link, Routes, Route} from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import "../index.css"
import RecipeDetails from "./RecipeDetails"

function Home(){
    const PER_PAGE = 6
    const [currentPage, setCurrentPage] = useState(0)
    const [formData, setFormData] =useState("")
    const [recipes, setRecipes] = useState([])
    const [queryNum, setQueryNum] = useState(80)
    const [load, setLoad] = useState(false)
    const [filterParam, setFilterParam] = useState("")
    const isMounted = useRef(false)
    let apiKey = "c946f13b6a314b0c99f9ab874a602aa7"
    
    //https://api.spoonacular.com/recipes/654959/information?apiKey=e0a3d83a76cd454fad56b15153d1d5f6"
    
    let url = `https://api.spoonacular.com/recipes/complexSearch?query=${formData}&cuisine=${filterParam}&apiKey=${apiKey}&number=${queryNum}`
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
            <div key={r.id} className="recipe-display-container">
            <Link to={`/${r.id}`} className="recipe-link">
             <span className="card">
                 <h2>{r.title}</h2>
                 <img src={r.image}/>
              </span>
            </Link>
            </div>
        )
      })
    const pageCount = Math.ceil(recipes.length / PER_PAGE)
    return(
        <div>
           <div className="header">
              <p className="logo">FoodGuru</p>

            <div className="search-filter">

            <div className="drop-menu">
            <select onChange={(e) => {setFilterParam(e.target.value)}}
                    className="custom-select"
                    aria-label="Filter By Cuisine">
            <option value="All">All</option>        
            <option value="African">African</option>
            <option value="American">American</option>
            <option value="British">British</option>
            <option value="Cajun">Cajun</option>
            <option value="Caribbean">Caribbean</option>
            <option value="Chinese">Chinese</option>
            <option value="Eastern European">Eastern European</option>
            <option value="European">European</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Greek">Greek</option>
            <option value="Indian">Indian</option>
            <option value="Irish">Irish</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Jewish">Jewish</option>
            <option value="Korean">Korean</option>
            <option value="French">Latin American</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Mexican">Mexican</option>
            <option value="Middle Eastern">Middle Eastern</option>
            <option value="Nordic">Nordic</option>
            <option value="Southern">Southern</option>
            <option value="Spanish">Spanish</option>
            <option value="Thai">Thai</option>
            <option value="Vietnamese">Vietnamese</option>
            </select>
            <span className="focus"></span>
            </div>

              <form className="form-data-container">
                <input type="text"
                       value={formData}
                       autoComplete="off"
                       name="recipe"
                       placeholder="Search for new recipes"
                       onChange={handleOnChange}
                />
                <button type="button" onClick={findRecipes} className="submit-btn">Search</button>
              </form>
            
              </div>

            </div>
            <div className="flex-current-page">
             <div className="current-page-data">
              {currentPageData}
             </div>
             {recipes.length > 0 ? 
            <ReactPaginate 
            previousLabel = {"< Previous"}
            nextLabel="Next >"
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"page-container"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            activeClassName={"page-link--active"}
            disabledClassName={"page-link--disabled"}
         />
         : <div className="welcome--container">
            <div className="welcome-text">
             <h2>Search for amazing recipes for every ocasion</h2>
             <p>Vegeterian and Vegan Safe</p>
             <p>Variety of cusines</p>
             </div>
           </div>
        }
            </div>
            
           
            
        </div>
    )
}
export default Home