import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { cocktailFetchRandom } from '../services/requestsCocktailApi';
import Loading from '../Components/Loading';
import './ExploreDrinks.css';

const HALF_SECOND = 500;

function ExploreDrinks({ history }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, []);

  const redirectForIngredientExplore = () => {
    history.push('/explore/drinks/ingredients');
  };

  const surprise = async () => {
    const api = await cocktailFetchRandom();
    const id = api[0].idDrink;
    history.push(`/drinks/${id}`);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="explore-drinks-page">
      <Header title="Explore Drinks" />
      <div className="explore-drinks">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ redirectForIngredientExplore }
          className="btn btn-danger explore-drinks-btn"
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ surprise }
          className="btn btn-warning explore-drinks-btn"
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

export default ExploreDrinks;
