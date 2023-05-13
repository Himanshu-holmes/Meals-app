import React, {useState ,useContext, useEffect} from 'react';
import axios from 'axios';


 const AppContext = React.createContext();
 const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
 const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
 

 const getFavouritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites');
    if(favorites){
        return JSON.parse(localStorage.getItem('favorites'));
    }
    else {
        return [];
    }
 }


     const AppProvider = ({children}) => { 
        const [loading, setLoading] = useState(false);
        const [meals, setMeals] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');
        

        const [showModal, setShowModal] = useState(false);
        const [selectedMeal, setSelectedMeal] = useState(null);


        const [favorites, setFavorites] = useState(getFavouritesFromLocalStorage());

       
        const fetchMeals = async (url) => {
            setLoading(true);
           try {
               const {data} = await axios(url);
               if(data.meals){
               setMeals(data.meals);
               }
               else {
                setMeals([]);
               }
              
           }
           catch(error)
           {console.log(error.response )}
           setLoading(false);
       }


       const fetchRandomMeal = () => {
         fetchMeals(randomMealUrl);
       }

       const selectMeal = (idMeal, favoriteMeal) => {
     
        let meal;
        if(favoriteMeal){
          meal = favorites.find((meal) => meal.idMeal === idMeal);
        }else
        {
            meal = meals.find((meal) => meal.idMeal === idMeal);
        }
      
        console.log(meal)
        setSelectedMeal(meal);
        setShowModal(true);
       }

       const closeModal = () => {
        setShowModal(false);
       }

       const addToFavorites = (idMeal) => {
         
          const alreadyFavourites = favorites.find((meal) => meal.idMeal === idMeal);
          if(alreadyFavourites) return ;
          const meal = meals.find((meal) => meal.idMeal === idMeal);
          const updateFavorites = [...favorites, meal];
          setFavorites(updateFavorites);
          localStorage.setItem('favorites', JSON.stringify(updateFavorites));


       }

       const removeFromFavorites = (idMeal) => {
        const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
       }
       
       
       useEffect(()=>{
        fetchMeals(allMealsUrl);
    
       },[])


        useEffect(()=>{
            if(!searchTerm)
            return 
            fetchMeals(`${allMealsUrl}${searchTerm}`);
        
        },[searchTerm])
    return (
        <AppContext.Provider value={{loading,meals,setSearchTerm,fetchRandomMeal,showModal,selectedMeal, selectMeal, closeModal, addToFavorites, removeFromFavorites, favorites}}>
            {children}
        </AppContext.Provider>
    ) 
    }

    export const useGlobalContext = () => {
       
        return useContext(AppContext) 
    }
    
console.log(AppContext)
    

    export {AppContext, AppProvider}