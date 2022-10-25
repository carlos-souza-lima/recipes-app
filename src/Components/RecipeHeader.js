import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import Snackbar from './Snackbar';
import AppContext from '../context/AppContext';
import { checkFavoriteButton, favoriteLocalStorage,
  removeEqualFavorite } from '../Functions/handleFavoriteButton';

const THREE_SECONDS = 3000;

function RecipeHeader({ type }) {
  const { recipe } = useContext(AppContext);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const setFavorite = () => {
      setIsFavorite(checkFavoriteButton(recipe, type));
    };
    setFavorite();
  }, [type, recipe]);

  const handleShareButton = () => {
    if (type === 'Meal') {
      navigator.clipboard.writeText(`http://localhost:3000/foods/${recipe[`id${type}`]}`);
    } else {
      navigator.clipboard.writeText(`http://localhost:3000/drinks/${recipe[`id${type}`]}`);
    }
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, THREE_SECONDS);
  };

  const handleFavoriteButton = () => {
    if (isFavorite) {
      removeEqualFavorite(recipe[`id${type}`]);
    } else {
      favoriteLocalStorage(recipe, type);
    }
    setIsFavorite((prevState) => !prevState);
  };

  return (
    <header className="recipe-details-header">
      <h1 data-testid="recipe-title">{ recipe[`str${type}`] }</h1>

      <div className="recipe-details-info">
        <h5 data-testid="recipe-category">
          { type === 'Meal' ? recipe.strCategory : recipe.strAlcoholic }
        </h5>

        <div className="recipe-details-icons">
          <input
            type="image"
            src={ ShareIcon }
            alt="Share Icon"
            data-testid="share-btn"
            onClick={ handleShareButton }
          />
          <Snackbar
            open={ showSnackbar }
            onClose={ () => setShowSnackbar(false) }
          >
            Link copied!
          </Snackbar>
          <input
            type="image"
            src={ isFavorite ? BlackHeartIcon : WhiteHeartIcon }
            alt={ isFavorite ? 'Black Heart Icon' : 'White Heart Icon' }
            data-testid="favorite-btn"
            onClick={ handleFavoriteButton }
          />
        </div>
      </div>
    </header>
  );
}

RecipeHeader.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeHeader;
