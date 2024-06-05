import React, { useEffect, useState } from 'react';
import './App.css'; 
import Recipe from './Recipe'; 

const App = () => { 
    const APP_ID = '49fb8442'; 
    const APP_KEY = 'bcfb04025001aa39469ad5adc10a24c3'; 
    const [recipes, setRecipes] = useState([]); 
    const [search, setSearch] = useState(""); 
    const [query, setQuery] = useState("chicken"); 
    
    useEffect(() => { 
        getRecipes(); 
    }, [query]); 
    
    const getRecipes = async () => { 
        try {
            const response = await fetch(
                `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
            ); 
            const data = await response.json(); 
            setRecipes(data.hits); 
        } catch (error) {
            console.error("Error fetching the recipes:", error);
        }
    }; 
    
    const updateSearch = e => { 
        setSearch(e.target.value); 
    }; 
    
    const getSearch = e => { 
        e.preventDefault(); 
        setQuery(search); 
        setSearch(""); 
    }; 

    return ( 
        <div className="App"> 
            <form className="search-form" onSubmit={getSearch}> 
                <input 
                    className="search-bar" 
                    type="text" 
                    value={search} 
                    onChange={updateSearch} 
                /> 
                <button className="search-button" type="submit"> 
                    Search 
                </button> 
            </form> 
            <div className="recipes"> 
                {recipes.map(recipe => ( 
                    <Recipe 
                        key={recipe.recipe.uri} // Assuming uri is unique
                        title={recipe.recipe.label} 
                        calories={recipe.recipe.calories} 
                        image={recipe.recipe.image} 
                        ingredients={recipe.recipe.ingredients} 
                    /> 
                ))} 
            </div> 
        </div> 
    ); 
}; 

export default App;
