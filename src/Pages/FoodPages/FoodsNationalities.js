import React, { useContext, useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { filterByNationality,
  filterByEachNationality, fetchMealApi } from '../../services/requestsMealApi';
import AppContext from '../../context/AppContext';
import Loading from '../../Components/Loading';
import './FoodsNationality.css';

const HALF_SECOND = 500;
const MAX_LENGTH = 12;

function FoodsNationalities({ history }) {
  const {
    nationalities,
    setNationalities,
    apiNationality,
    setApiNationality,
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFilterByNationality = async () => {
      const getNationalities = await filterByNationality();
      setNationalities(getNationalities);
      const mealApiInicial = await fetchMealApi();
      setApiNationality(mealApiInicial);
    };
    getFilterByNationality();
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, [setNationalities, setApiNationality]);

  const onChangeOption = async ({ target }) => {
    if (target.value !== 'All') {
      const getFilterByEachNationality = await filterByEachNationality(target.value);
      setApiNationality(getFilterByEachNationality);
    } else {
      const mealApiInicial = await fetchMealApi();
      setApiNationality(mealApiInicial);
    }
  };

  const onClickCard = (id) => {
    history.push(`/foods/${id}`);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="foods-nationality-page">
      <Header title="Explore Nationalities" />
      <select
        className="foods-nationality-options form-control"
        data-testid="explore-by-nationality-dropdown"
        onChange={ onChangeOption }
      >
        <option
          value="All"
          data-testid="All-option"
        >
          All
        </option>
        { nationalities.map((nationality, index) => (
          <option
            data-testid={ `${nationality.strArea}-option` }
            key={ index }
            value={ nationality.strArea }
          >
            { nationality.strArea }
          </option>
        )) }
      </select>
      <div className="foods-nationality">
        { apiNationality.meals.map((nationality, index) => (
          index < MAX_LENGTH
          && (
            <div className="foods-nationalities">
              <button
                key={ index }
                type="button"
                className="btn-nationality"
                data-testid={ `${index}-recipe-card` }
                onClick={ () => onClickCard(nationality.idMeal) }
              >
                <img
                  className="img-foods"
                  src={ nationality.strMealThumb }
                  alt={ nationality.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  { nationality.strMeal }
                </p>
              </button>
            </div>
          )
        )) }
      </div>
      <Footer />
    </div>
  );
}

FoodsNationalities.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

export default FoodsNationalities;
