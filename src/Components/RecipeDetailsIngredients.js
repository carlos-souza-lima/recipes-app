import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

function RecipeDetailsIngredients() {
  const { recipe } = useContext(AppContext);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getIngredients = () => {
      const recipeArray = Object.entries(recipe);

      const recipeIngredients = recipeArray
        .filter((element) => element[0].includes('strIngredient') && element[1]);
      setIngredients(recipeIngredients.length);
    };
    getIngredients();
  }, [recipe]);

  return (
    <section>
      <h3>Ingredients</h3>
      <ul>
        {Array(ingredients).fill().map((_, index) => {
          const recipeMeasure = recipe[`strMeasure${index + 1}`];
          const recipeIngredient = recipe[`strIngredient${index + 1}`];

          return (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${recipeMeasure} ${recipeIngredient}`}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default RecipeDetailsIngredients;
