import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function RecomendationRecipeCard({ name, thumb, index, id, pageTitle }) {
  return (
    <Link to={ `/${pageTitle}/${id}` }>
      <div data-testid={ `${index}-recomendation-card` } className="item">
        <img
          className="recomendation-img"
          src={ thumb }
          alt={ name }
          data-testid={ `${index}-card-img` }
        />
        <h3 data-testid={ `${index}-recomendation-title` }>{name}</h3>
      </div>
    </Link>
  );
}

RecomendationRecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default RecomendationRecipeCard;
