import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { fetchCocktailApi } from '../services/requestsCocktailApi';
import { fetchMealApi } from '../services/requestsMealApi';
import './HeaderSearchBar.css';

function HeaderSearchBar({ title }) {
  const [inputName, setInputName] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const { setMealsRecipes, setDrinksRecipes } = useContext(AppContext);

  const history = useHistory();

  const handleChangeRadioBtn = ({ target }) => {
    setSelectedRadio(target.value);
    setIsDisabled(false);
  };

  const validationFirstLetter = () => {
    if (selectedRadio === 'First letter' && inputName.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const getMealsRecipes = async () => {
    const response = await fetchMealApi(selectedRadio, inputName);
    const { meals } = response;

    if (meals) {
      if (meals.length === 1) {
        const recipeId = meals[0].idMeal;
        history.push(`/foods/${recipeId}`);
      } else {
        setMealsRecipes(response);
      }
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const getDrinksRecipes = async () => {
    const response = await fetchCocktailApi(selectedRadio, inputName);
    const { drinks } = response;

    if (drinks) {
      if (drinks.length === 1) {
        const recipeId = drinks[0].idDrink;
        history.push(`/drinks/${recipeId}`);
      } else {
        setDrinksRecipes(response);
      }
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const onSubmit = async () => {
    validationFirstLetter();
    if (title === 'Foods') {
      await getMealsRecipes();
    }
    if (title === 'Drinks') {
      await getDrinksRecipes();
    }
  };

  return (
    <form className="search-bar">
      <input
        type="search"
        data-testid="search-input"
        value={ inputName }
        placeholder="Search"
        onChange={ ({ target }) => setInputName(target.value) }
        className="bar-search form-control"
      />

      <div className="div-search">
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="searchRadio"
            id="ingredient"
            value="Ingredient"
            data-testid="ingredient-search-radio"
            onChange={ handleChangeRadioBtn }
          />
          Ingredient
        </label>

        <label htmlFor="name">
          <input
            type="radio"
            name="searchRadio"
            id="name"
            value="Name"
            data-testid="name-search-radio"
            onChange={ handleChangeRadioBtn }
          />
          Name
        </label>

        <label htmlFor="firstLetter">
          <input
            type="radio"
            name="searchRadio"
            id="firstLetter"
            value="First letter"
            data-testid="first-letter-search-radio"
            onChange={ handleChangeRadioBtn }
          />
          First letter
        </label>

      </div>

      <button
        className="btn-search-bar btn btn-secondary"
        type="button"
        data-testid="exec-search-btn"
        onClick={ onSubmit }
        disabled={ isDisabled }
      >
        Search
      </button>

    </form>
  );
}

HeaderSearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderSearchBar;
