import React, {useState, useEffect, useRef} from "react"
import {Link} from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import "../index.css"

function Home(){
    const PER_PAGE = 6
    const [currentPage, setCurrentPage] = useState(0)
    const [formData, setFormData] =useState("")
    const [recipes, setRecipes] = useState([])
    const [queryNum, setQueryNum] = useState(80)
    const [load, setLoad] = useState(false)
    const [filterParam, setFilterParam] = useState("")
    const isMounted = useRef(false)
    let apiKey = "d5e511051f14404bb8c1647c9505e18f"
    

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
    function onKeyPress(e){
      if(e.which === 13) {
        handleOnChange(e)
        findRecipes()
      }
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
                       onKeyPress={onKeyPress}  
                />
                <button type="button" onClick={findRecipes}  className="submit-btn">Search</button>
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
               <h1>Search for amazing recipes for every ocasion</h1>
              <div className="safe-info">
               <img src={"https://cdn-icons.flaticon.com/png/512/4436/premium/4436481.png?token=exp=1654997820~hmac=f43fdda87355f8545bff9f5d76ee0c69"}/>
               <h3>Variety of cusines</h3>
              </div>
              <div className="safe-info">
               <img src={"https://cdn-icons.flaticon.com/png/512/4436/premium/4436481.png?token=exp=1654997820~hmac=f43fdda87355f8545bff9f5d76ee0c69"}/>
               <h3>Vegeterian and Vegan Safe</h3>
              </div>
            
             
             </div>
           </div>
        }
            </div>
            
           
            
        </div>
    )
}
export default Home