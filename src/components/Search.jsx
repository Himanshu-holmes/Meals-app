import {useState} from 'react';
import  {useGlobalContext} from '../context';

function Search() {
  const [text, setText] = useState('');

  const {setSearchTerm,fetchRandomMeal} = useGlobalContext();

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(text){
      setSearchTerm(text)
      
    }

    
  }

  const handleRandomMeal = () => {
    setSearchTerm('')
    setText('')
    fetchRandomMeal()
  }

  return (
    <header className="search-container">
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder="type favourite meal" value={text} onChange={handleChange} className="form-input"  />
        <button type="submit" className="btn">Search</button>
        <button type="button" className="btn btn-hister" onClick={handleRandomMeal}>suprise me!</button>  
        </form>
    </header>
  )
}
export default Search