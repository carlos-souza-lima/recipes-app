import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Loading from '../Components/Loading';
import './Explore.css';

const HALF_SECOND = 500;

function Explore({ history }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, []);

  const redirectForFoodsExplore = () => {
    history.push('/explore/foods');
  };

  const redirectForDrinksExplore = () => {
    history.push('/explore/drinks');
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="explore-page">
      <Header title="Explore" />
      <div className="explore">
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ redirectForFoodsExplore }
          className="btn btn-danger explore-btn"
        >
          Explore Foods
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ redirectForDrinksExplore }
          className="btn btn-danger explore-btn"
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </div>
  );
}

Explore.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

export default Explore;
