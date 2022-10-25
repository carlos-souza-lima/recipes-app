export const favoriteLocalStorage = (recipe, type) => {
  let favoriteRecipes;
  if (localStorage.getItem('favoriteRecipes') === null) {
    favoriteRecipes = [];
  } else {
    favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  }
  const favoriteRecipe = {
    id: recipe[`id${type}`],
    type: type === 'Meal' ? 'food' : 'drink',
    nationality: type === 'Meal' ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: type === 'Meal' ? '' : recipe.strAlcoholic,
    name: recipe[`str${type}`],
    image: recipe[`str${type}Thumb`],
  };

  favoriteRecipes.push(favoriteRecipe);
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
};

export const checkFavoriteButton = (recipe, type) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const id = recipe[`id${type}`];

  return favoriteRecipes?.some((favRecipe) => favRecipe.id === id);
};

export const removeEqualFavorite = (id) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const removeFavoriteRecipe = favoriteRecipes.filter((recipe) => recipe.id !== id);

  localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavoriteRecipe));

  return removeFavoriteRecipe;
};
