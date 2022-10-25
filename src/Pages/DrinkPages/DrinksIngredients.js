import React, { useContext, useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { cocktailIngredientsList } from '../../services/requestsCocktailApi';
import AppContext from '../../context/AppContext';
import Loading from '../../Components/Loading';
import './DrinksIngredients.css';

const MAX_LENGTH = 12;
const HALF_SECOND = 500;

function DrinksIngredients({ history }) {
  const {
    arrayIngredientsDrinks,
    setArrayIngredientsDrinks,
    setAccessDrinks,
    setIngredientDrinks,
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiRequest = async () => {
      const apiIngredientDrinks = await cocktailIngredientsList();
      setArrayIngredientsDrinks(apiIngredientDrinks);
    };
    apiRequest();
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, [setArrayIngredientsDrinks]);

  const redirectFromDrinks = (param) => {
    setIngredientDrinks(param);
    setAccessDrinks(true);
    history.push('/drinks');
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="drinks-ingredients-page">
      <Header title="Explore Ingredients" />
      <div className="drinks-ingredients">
        { arrayIngredientsDrinks.map((el, index) => (
          index < MAX_LENGTH
        && (
          <div className="drinks-ingredients-options">
            <button
              type="button"
              className="btn-ingredient-drinks"
              key={ el.strIngredient1 }
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => redirectFromDrinks(el.strIngredient1) }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ `
              https://www.thecocktaildb.com/images/ingredients/${el.strIngredient1}-Small.png` }
                alt={ el.strIngredient1 }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                { el.strIngredient1 }
              </p>
            </button>
          </div>
        )
        ))}
      </div>
      <Footer />
    </div>
  );
}

DrinksIngredients.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

export default DrinksIngredients;
