import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchCocktailByIdAPI } from '../../services/requestsCocktailApi';
import '../RecipeDetails.css';
import RecipeHeader from '../../Components/RecipeHeader';
import RecipeDetailsIngredients from '../../Components/RecipeDetailsIngredients';
import Loading from '../../Components/Loading';
import RecipeInstructions from '../../Components/RecipeInstructions';
import RecipeCarousel from '../../Components/RecipeCarousel';
import AppContext from '../../context/AppContext';

const HALF_SECOND = 500;

function DrinkRecipeDetail({ match }) {
  const { recipe, setRecipe } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  const { id } = match.params;
  const history = useHistory();

  useEffect(() => {
    const getCocktailById = async () => {
      const { drinks } = await fetchCocktailByIdAPI(id);
      setRecipe(drinks[0]);
    };
    getCocktailById();
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, [id, setRecipe]);

  const handleStartRecipeButton = () => {
    if (localStorage.getItem('doneRecipes') === null) {
      return false;
    }
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    return doneRecipes.some((doneRecipe) => doneRecipe.id === id);
  };

  const changeButtonName = () => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      return false;
    }

    const inProgressRecipes = Object.keys(
      JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails,
    );

    return inProgressRecipes.some((inProgressRecipe) => inProgressRecipe === id);
  };

  if (isLoading) {
    return <Loading />;
  }
  const { strDrinkThumb, strDrink } = recipe;

  return (
    <>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid="recipe-photo"
        className="recipe-details-photo"
      />

      <RecipeHeader type="Drink" />
      <RecipeDetailsIngredients />
      <RecipeInstructions />
      <RecipeCarousel type="Meal" />

      {handleStartRecipeButton() ? null : (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="recipe-details-button btn btn-danger"
          onClick={ () => history.push(`/drinks/${id}/in-progress`) }
        >
          { changeButtonName() ? 'Continue Recipe' : 'Start Recipe' }
        </button>
      )}
    </>
  );
}

DrinkRecipeDetail.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.objectOf(PropTypes.string).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default DrinkRecipeDetail;
