export const inProgressLocalStorage = (type, id, index) => {
  let recipesInProgress;
  if (localStorage.getItem('inProgressRecipes') === null) {
    recipesInProgress = {
      cocktails: {},
      meals: {},
    };
  } else {
    recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  }

  const recipeInProgress = { ...recipesInProgress };

  const mealsProgress = recipeInProgress.meals[`${id}`];
  const cocktailsProgress = recipeInProgress.cocktails[`${id}`];

  if (type === 'Meal') {
    if (!mealsProgress) {
      recipeInProgress.meals = {
        ...recipeInProgress.meals,
        [id]: [],
      };
    }
    recipeInProgress.meals[`${id}`].push(index);
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipeInProgress));
  }

  if (type === 'Drink') {
    if (!cocktailsProgress) {
      recipeInProgress.cocktails = {
        ...recipeInProgress.cocktails,
        [id]: [],
      };
    }
    recipeInProgress.cocktails[`${id}`].push(index);
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipeInProgress));
  }
};

export const checkStepsCheckbox = (type, id) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const emptyArray = [];
  const mealsProgress = inProgressRecipes.meals[`${id}`];
  const cocktailsProgress = inProgressRecipes.cocktails[`${id}`];

  if (type === 'Meal' && mealsProgress) {
    return inProgressRecipes.meals[`${id}`];
  }
  if (type === 'Drink' && cocktailsProgress) {
    return inProgressRecipes.cocktails[`${id}`];
  }
  return emptyArray;
};

export const removeEqualIngredient = (type, id, index) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (type === 'Meal') {
    const removeStep = inProgressRecipes.meals[`${id}`].filter((step) => step !== index);

    inProgressRecipes.meals[`${id}`] = removeStep;

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  } else {
    const removeStep = inProgressRecipes.cocktails[`${id}`]
      .filter((step) => step !== index);

    inProgressRecipes.cocktails[`${id}`] = removeStep;

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }
};
