import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [mealsRecipes, setMealsRecipes] = useState();
  const [drinksRecipes, setDrinksRecipes] = useState();
  const [arrayBtns, setArrayBtns] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [arrayIngredientsFoods, setArrayIngredientsFoods] = useState([]);
  const [accessFoods, setAccessFoods] = useState(false);
  const [ingredientFoods, setIngredientFoods] = useState('');
  const [arrayIngredientsDrinks, setArrayIngredientsDrinks] = useState([]);
  const [accessDrinks, setAccessDrinks] = useState(false);
  const [ingredientDrinks, setIngredientDrinks] = useState('');
  const [nationalities, setNationalities] = useState([]);
  const [apiNationality, setApiNationality] = useState({ meals: [] });
  const [recipe, setRecipe] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const contextValue = {
    mealsRecipes,
    setMealsRecipes,
    drinksRecipes,
    setDrinksRecipes,
    arrayBtns,
    setArrayBtns,
    selectedFilter,
    setSelectedFilter,
    arrayIngredientsFoods,
    setArrayIngredientsFoods,
    accessFoods,
    setAccessFoods,
    ingredientFoods,
    setIngredientFoods,
    arrayIngredientsDrinks,
    setArrayIngredientsDrinks,
    accessDrinks,
    setAccessDrinks,
    ingredientDrinks,
    setIngredientDrinks,
    nationalities,
    setNationalities,
    apiNationality,
    setApiNationality,
    recipe,
    setRecipe,
    isDisabled,
    setIsDisabled,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
