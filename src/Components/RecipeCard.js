import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

function RecipeCard({ name, thumb, index, id, pageTitle }) {
  return (
    <Link to={ `/${pageTitle}/${id}` } className="recipe-link">
      <div
        data-testid={ `${index}-recipe-card` }
        className="card card-recipe"
      >
        <img
          src={ thumb }
          alt={ name }
          className="card-img-top"
          data-testid={ `${index}-card-img` }
        />
        <h5
          className="card-title"
          data-testid={ `${index}-card-name` }
        >
          {name}

        </h5>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default RecipeCard;
