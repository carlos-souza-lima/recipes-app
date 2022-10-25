import React, { useContext, useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { mealIngredientsList } from '../../services/requestsMealApi';
import AppContext from '../../context/AppContext';
import Loading from '../../Components/Loading';
import './FoodsIngredients.css';

const HALF_SECOND = 500;
const MAX_LENGTH = 12;

function FoodsIngredients({ history }) {
  const {
    arrayIngredientsFoods,
    setArrayIngredientsFoods,
    setAccessFoods,
    setIngredientFoods,
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiRequest = async () => {
      const apiIngredientFoods = await mealIngredientsList();
      setArrayIngredientsFoods(apiIngredientFoods);
    };
    apiRequest();
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, [setArrayIngredientsFoods]);

  const redirectFromFoods = (param) => {
    setIngredientFoods(param);
    setAccessFoods(true);
    history.push('/foods');
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="foods-ingredients-page">
      <Header title="Explore Ingredients" />
      <div className="foods-ingredients">
        { arrayIngredientsFoods.map((el, index) => (
          index < MAX_LENGTH
        && (
          <div className="foods-ingredients-options">
            <button
              type="button"
              className="btn-ingredient"
              key={ el.strIngredient }
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => redirectFromFoods(el.strIngredient) }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${el.strIngredient}-Small.png` }
                alt={ el.strIngredient }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                { el.strIngredient }
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

FoodsIngredients.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

export default FoodsIngredients;
