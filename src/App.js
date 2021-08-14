import React, {useEffect, useState } from 'react';
import './App.css';
import Recipe from './components/Recipe';
import { TextField, Button, Container, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function App() {
  const [meal, setMeal] = useState([]);
  const [search, setSearch] = useState('');
  const [getSearch, setGetSearch] = useState('');
  
  useEffect(() => {
    async function getMeal() {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      const data = await res.json();
      if(data.meals === null) {
        data.meals = [];
      }
      setMeal(data.meals)
     
    }
    getMeal()

  }, [getSearch])
  console.log(meal)

  function updateSearch(e) {
    e.preventDefault();
    setSearch(e.target.value)
  }

  function updateGetSearch(e) {
    e.preventDefault();
      setGetSearch(search);  
  }

   // STYLES 
   const useStyles = makeStyles((theme) => ({
    button: {
      background: 'white',
        border: 0,
        borderRadius: 20,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: '#FE6B8B',
        height: 38,
        padding: '0 20px',
        margin: 10,
      '&:hover': {
        boxShadow: '0 5px 7px 5px rgba(255, 105, 135, .3)',
        background: 'white',
     },
    },
  }));
  const classes = useStyles();

  let results;
  if(meal.length === 0) {
      results = <div className='center'>
        <h1>No results! <br></br>
          Try to search something else.</h1>
      </div>
  } else {
    results = (
      meal.map(function (el) {
        let ingredients = [];
        let measure = [];
        let final = [];
        let tags = el.strTags;
        let tags2 = tags;

         for(let k in el) {
           if(k.includes('strIngredient') && el[k] !== '' && el[k] !== null) {
            ingredients = [...ingredients, el[k]];
            // console.log(ingredients)
         }
        }
         
         for(let k2 in el) {
           if(k2.includes('strMeasure') && el[k2] !== '' && el[k2] !== null) {
            measure = [...measure, el[k2]]
            // console.log(measure)
           }
         }
         for(let i = 0; i < ingredients.length; i++) {
          final.push(measure[i]+ ' '+ ingredients[i])
          }

          if(tags !== null && tags.length > 1) {
            tags = tags.split(',');
          } 

        return (
          <Recipe
          title={el.strMeal}
          image={el.strMealThumb}
          category={el.strCategory}
          contry={el.strArea}
          ingredients={final}
          tags={tags}
          instructions={el.strInstructions}
          link={el.strSource}
        />
        )
      }  
    
      )
    )
  }

  return (
    <Container maxWidth="sm">
      <div className="center">
      <FormControl onClick={updateGetSearch}
       className='search-horm'>
        <TextField value={search}
         onChange={updateSearch}
          id="standard-basic" label="Type here" style={{textAlign: 'center'}} />
        <Button 
         className={classes.button}>
          Search
        </Button>
      </FormControl>
      </div>
      {results}
    </Container>
  );
}


export default App;
