/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import {
  cocktailCategoryRequest,
  cocktailRequestForCategoryBtn,
  fetchCocktailApi,
} from '../services/requestsCocktailApi';
import {
  fetchMealApi,
  mealCategoryRequest,
  mealRequestForCategoryBtn,
} from '../services/requestsMealApi';
import './ButtonsFilter.css';

function ButtonsFilter({ title }) {
  const {
    arrayBtns,
    setArrayBtns,
    setMealsRecipes,
    setDrinksRecipes,
    selectedFilter,
    setSelectedFilter,
  } = useContext(AppContext);

  const MAX_BTNS = 5;
  useEffect(() => {
    const apiPicker = async () => {
      if (title === 'Foods') {
        const apiReturn = await mealCategoryRequest();
        setArrayBtns(apiReturn);
      }
      if (title === 'Drinks') {
        const apiReturn = await cocktailCategoryRequest();
        setArrayBtns(apiReturn);
      }
    };
    apiPicker();
  }, [setArrayBtns, title]);

  const targetValueBtnCategory = async ({ target }) => {
    if (title === 'Foods') {
      const btnCategory = await mealRequestForCategoryBtn(target.value);
      setMealsRecipes(btnCategory);
      if (target.value === selectedFilter) {
        const apiInicial = await fetchMealApi();
        setMealsRecipes(apiInicial);
        setSelectedFilter('');
      } else {
        setSelectedFilter(target.value);
      }
    }

    if (title === 'Drinks') {
      const btnCategory = await cocktailRequestForCategoryBtn(target.value);
      setDrinksRecipes(btnCategory);
      if (target.value === selectedFilter) {
        const apiInicial = await fetchCocktailApi();
        setDrinksRecipes(apiInicial);
        setSelectedFilter('');
      } else {
        setSelectedFilter(target.value);
      }
    }
  };

  const clickBtnAll = async () => {
    if (title === 'Foods') {
      const apiInicial = await fetchMealApi();
      setMealsRecipes(apiInicial);
    }

    if (title === 'Drinks') {
      const apiInicial = await fetchCocktailApi();
      setDrinksRecipes(apiInicial);
    }
  };

  return (
    <div className="buttons-div">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ clickBtnAll }
        className="btn-filter btn btn-danger"
      >
        All
      </button>
      {
        arrayBtns.map((el, index) => (
          index < MAX_BTNS
            && (
              <button
                key={ index }
                type="button"
                className="btn-filter btn btn-danger"
                data-testid={ `${el.strCategory}-category-filter` }
                onClick={ targetValueBtnCategory }
                value={ el.strCategory }
              >
                { el.strCategory }
              </button>
            )
        ))
      }
    </div>
  );
}

ButtonsFilter.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ButtonsFilter;
