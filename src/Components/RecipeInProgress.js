/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import { removeEqualIngredient,
  checkStepsCheckbox,
  inProgressLocalStorage } from '../Functions/handleInProgressCheckbox';
import Loading from './Loading';
import './RecipeInProgress.css';

const HALF_SECOND = 500;

function RecipeInProgress({ type }) {
  const {
    recipe,
    setIsDisabled,
  } = useContext(AppContext);

  const [ingredients, setIngredients] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const validateButton = (id, param) => {
    const ingredientLs = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const mealsProgress = ingredientLs.meals[`${id}`];
    const cocktailsProgress = ingredientLs.cocktails[`${id}`];

    if (type === 'Meal' && mealsProgress) {
      const result = ingredientLs.meals[id].length;
      return result === param;
    }
    if (type === 'Drink' && cocktailsProgress) {
      const result = ingredientLs.cocktails[id].length;
      return result === param;
    }
    return false;
  };

  useEffect(() => {
    const getIngredients = () => {
      const recipeArray = Object.entries(recipe);
      const recipeIngredients = recipeArray
        .filter((element) => element[0].includes('strIngredient') && element[1]);
      setIngredients(recipeIngredients.length);
      return recipeIngredients.length;
    };

    const checkLocalStorage = (param) => {
      if (localStorage.getItem('inProgressRecipes') !== null) {
        setIsChecked(checkStepsCheckbox(type, recipe[`id${type}`]));
        const result = validateButton(recipe[`id${type}`], param);
        setIsDisabled(!result);
      }
    };

    const ingredientsLength = getIngredients();

    checkLocalStorage(ingredientsLength);

    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, [recipe, type, setIsDisabled]);

  const handleCheckbox = (pageType, id, index, event) => {
    const { checked } = event.target;

    if (!checked) {
      removeEqualIngredient(pageType, id, index);
    } else {
      inProgressLocalStorage(pageType, id, index);
    }
    setIsDisabled(!validateButton(id, ingredients));
  };

  if (isChecked.length === 0 && isLoading) {
    return (
      <section>
        <h3>Ingredients</h3>
        <div>
          <Loading />
        </div>
      </section>
    );
  }

  return (
    <section className="section-ingredients">
      <h3
        className="ingredients-title"
      >
        Ingredients
      </h3>
      <div className="in-progress-ingredients-container">
        {Array(ingredients).fill().map((_, index) => {
          const recipeMeasure = recipe[`strMeasure${index + 1}`];
          const recipeIngredient = recipe[`strIngredient${index + 1}`];
          const recipeId = recipe[`id${type}`];
          const stepIndex = index + 1;
          return (
            <label
              htmlFor={ `${index}-ingredient-step` }
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              className="form-check-label"
            >
              <input
                name={ `${index}-ingredient-step` }
                type="checkbox"
                className="input-ingredient form-check-input"
                value={ recipeMeasure }
                onChange={
                  (event) => handleCheckbox(type, recipeId, stepIndex, event)
                }
                // defaultChecked={ isChecked.includes(index) }
                defaultChecked={ isChecked.includes(stepIndex) }
              />
              <span>{`${recipeMeasure} ${recipeIngredient}`}</span>
            </label>
          );
        })}
      </div>
    </section>
  );
}

RecipeInProgress.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,
  type: PropTypes.string.isRequired,
};

export default RecipeInProgress;
