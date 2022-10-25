import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { mealFetchRandom } from '../services/requestsMealApi';
import Loading from '../Components/Loading';
import './ExploreFoods.css';

const HALF_SECOND = 500;

function ExploreFoods({ history }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, []);

  const redirectForIngredientExplore = () => {
    history.push('/explore/foods/ingredients');
  };

  const redirectForNationalityExplore = () => {
    history.push('/explore/foods/nationalities');
  };

  const surprise = async () => {
    const api = await mealFetchRandom();
    const id = api[0].idMeal;
    history.push(`/foods/${id}`);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="explore-foods-page">
      <Header title="Explore Foods" />
      <div className="explore-foods">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ redirectForIngredientExplore }
          className="btn btn-danger explore-foods-btn"
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ redirectForNationalityExplore }
          className="btn btn-danger explore-foods-btn"
        >
          By Nationality
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ surprise }
          className="btn btn-warning explore-foods-btn"
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

ExploreFoods.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

export default ExploreFoods;
