const urlBase = 'https://www.themealdb.com/api/json/v1/1/';

export const fetchMealApi = async (radio, inputName) => {
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

export const mealCategoryRequest = async () => {
  let url = urlBase;
  url += 'list.php?c=list';

  const request = await fetch(url);
  const data = await request.json();
  return data.meals;
};
//
export const mealRequestForCategoryBtn = async (category) => {
  let url = urlBase;
  url += `filter.php?c=${category}`;

  const request = await fetch(url);
  const data = await request.json();
  return data;
};

export const fetchMealByIdAPI = async (id) => {
  let url = urlBase;
  url += `lookup.php?i=${id}`;

  const request = await fetch(url);
  const data = await request.json();
  return data;
};

export const mealFetchRandom = async () => {
  let url = urlBase;
  url += 'random.php';

  const request = await fetch(url);
  const data = await request.json();
  return data.meals;
};

export const mealIngredientsList = async () => {
  let url = urlBase;
  url += 'list.php?i=list';

  const request = await fetch(url);
  const data = await request.json();
  return data.meals;
};

export const filterByIngredientMeal = async (ingredient) => {
  let url = urlBase;
  url += `filter.php?i=${ingredient}`;

  const request = await fetch(url);
  const data = await request.json();
  return data;
};

export const filterByNationality = async () => {
  let url = urlBase;
  url += 'list.php?a=list';

  const request = await fetch(url);
  const data = await request.json();
  return data.meals;
};

export const filterByEachNationality = async (nationality) => {
  let url = urlBase;
  url += `filter.php?a=${nationality}`;

  const request = await fetch(url);
  const data = await request.json();
  return data;
};
