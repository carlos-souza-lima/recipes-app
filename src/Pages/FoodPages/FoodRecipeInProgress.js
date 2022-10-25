import PropTypes from 'prop-types';
import React, { useEffect, useState,
  useContext } from 'react';
import { fetchMealByIdAPI } from '../../services/requestsMealApi';
import '../RecipeDetails.css';
import RecipeHeader from '../../Components/RecipeHeader';
import Loading from '../../Components/Loading';
import AppContext from '../../context/AppContext';
import RecipeInstructions from '../../Components/RecipeInstructions';
import RecipeInProgress from '../../Components/RecipeInProgress';

const HALF_SECOND = 500;

function FoodRecipeInProgressTest({ match, history }) {
  const {
    recipe,
    setRecipe,
    isDisabled,
  } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = match.params;

  useEffect(() => {
    const getMealById = async () => {
      const { meals } = await fetchMealByIdAPI(id);
      setRecipe(meals[0]);
    };
    getMealById();
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, [id, setRecipe]);

  if (isLoading) {
    return <Loading />;
  }

  const { strMealThumb, strMeal } = recipe;

  const redirectFinishRecipe = () => {
    history.push('/done-recipes');
  };

  return (
    <>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        className="card-img-top"
        data-testid="recipe-photo"
      />

      <RecipeHeader type="Meal" />
      <RecipeInProgress type="Meal" />
      <RecipeInstructions />

      <button
        type="button"
        className="btn-recipe btn btn-danger"
        data-testid="finish-recipe-btn"
        disabled={ isDisabled }
        onClick={ redirectFinishRecipe }
      >
        Finish Recipe
      </button>
    </>
  );
}

FoodRecipeInProgressTest.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.objectOf(PropTypes.string).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default FoodRecipeInProgressTest;
