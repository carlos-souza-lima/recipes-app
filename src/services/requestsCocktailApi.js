const urlBase = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const fetchCocktailApi = async (radio, inputName) => {
  let url = urlBase;

  if (radio === 'Ingredient') {
    url += `filter.php?i=${inputName}`;
  } else if (radio === 'Name') {
    url += `search.php?s=${inputName}`;
  } else if (radio === 'First letter') {
    url += `search.php?f=${inputName}`;
  } else {
    url += 'search.php?s=';
  }

  const request = await fetch(url);
  const data = await request.json();
  return data;
};

export const cocktailCategoryRequest = async () => {
  let url = urlBase;
  url += 'list.php?c=list';

  const request = await fetch(url);
  const data = await request.json();
  return data.drinks;
};

export const cocktailRequestForCategoryBtn = async (category) => {
  let url = urlBase;
  url += `filter.php?c=${category}`;

  const request = await fetch(url);
  const data = await request.json();
  return data;
};

export const fetchCocktailByIdAPI = async (id) => {
  let url = urlBase;
  url += `lookup.php?i=${id}`;

  const request = await fetch(url);
  const data = await request.json();
  return data;
};

export const cocktailFetchRandom = async () => {
  let url = urlBase;
  url += 'random.php';

  const request = await fetch(url);
  const data = await request.json();
  return data.drinks;
};

export const cocktailIngredientsList = async () => {
  let url = urlBase;
  url += 'list.php?i=list';

  const request = await fetch(url);
  const data = await request.json();
  return data.drinks;
};

export const filterByIngredientDrinks = async (ingredient) => {
  let url = urlBase;
  url += `filter.php?i=${ingredient}`;

  const request = await fetch(url);
  const data = await request.json();
  return data;
};
