import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import ShareIcon from '../images/shareIcon.svg';
import Snackbar from '../Components/Snackbar';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import Loading from '../Components/Loading';
import { removeEqualFavorite } from '../Functions/handleFavoriteButton';
import './Favorites.css';

const THREE_SECONDS = 3000;
const HALF_SECOND = 500;

function Favorites() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
    const getFavoriteRecipes = () => {
      setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    };
    getFavoriteRecipes();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (favoriteRecipes === null || favoriteRecipes.length === 0) {
    return (
      <>
        <Header title="Favorite Recipes" />
        <h4>Você ainda não favoritou nenhuma receita</h4>
      </>

    );
  }

  const removeFavorites = (id) => {
    setFavoriteRecipes(removeEqualFavorite(id));
  };

  const filterFavorites = ({ value }) => {
    const favoriteRecipesLocalStorage = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    if (value === 'all') {
      setFavoriteRecipes(favoriteRecipesLocalStorage);
    } else {
      const filteredFavorites = favoriteRecipesLocalStorage
        .filter(({ type }) => type === value);
      setFavoriteRecipes(filteredFavorites);
    }
  };
  return (
    <>
      <Header title="Favorite Recipes" />
      <div className="div-buttons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          name="All"
          onClick={ (event) => filterFavorites(event.target) }
          value="all"
          className="btn btn-danger"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          name="Food"
          onClick={ (event) => filterFavorites(event.target) }
          value="food"
          className="btn btn-danger"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          name="Drink"
          onClick={ (event) => filterFavorites(event.target) }
          value="drink"
          className="btn btn-danger"
        >
          Drink
        </button>
      </div>
      { favoriteRecipes.map((favRecipe, index) => {
        const { image,
          name,
          type,
          id,
          category,
          nationality,
          alcoholicOrNot } = favRecipe;

        const handleShareButton = () => {
          navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
          setShowSnackbar(true);
          setTimeout(() => {
            setShowSnackbar(false);
          }, THREE_SECONDS);
        };
        return (
          <div key={ index }>
            <Link to={ `/${type}s/${id}` }>
              <div>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                  className="fav-recipe-img"
                />
                <div className="fav-recipe-info">
                  <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { type === 'food'
                      ? `${nationality} - ${category}`
                      : `${alcoholicOrNot}`}
                  </p>
                </div>
              </div>
            </Link>
            <div className="fav-page-icons">
              <input
                type="image"
                src={ ShareIcon }
                alt="Share Icon"
                data-testid={ `${index}-horizontal-share-btn` }
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
                src={ BlackHeartIcon }
                alt="Black Heart Icon"
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => removeFavorites(id) }
              />
            </div>
          </div>

        );
      }) }
    </>
  );
}

export default Favorites;
