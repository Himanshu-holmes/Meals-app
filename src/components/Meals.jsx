import { useGlobalContext } from "../context";
import {BsHandThumbsUp} from 'react-icons/bs';
import Lottie from "lottie-react";
import loadingAnime from './loadingAnime.json'

const Meals = () => {
    const {loading,meals} = useGlobalContext();
   
     if(loading){
      return <section className="section-load">
        <Lottie animationData={loadingAnime}  height={200}
        width={200}  />;
      </section>
     }
     if(meals.length < 1){
      return <section className="section">
        <h4>No meals mmatched your searched term. Please try again.</h4>
      </section>
     }

  return (
    <section className="section-center">
      {meals.map((singleMeal)=>{
        const {idMeal, strMeal:title, strMealThumb:image} = singleMeal;

        return <article key={idMeal} className="single-meal">
          <img src={image} alt={title} className="img" />
          <footer>
            <h5>{title}</h5>
            <button className="like-btn"><BsHandThumbsUp/></button>
          </footer>
        </article>
      })}
    </section>
    
  )
}
export default Meals