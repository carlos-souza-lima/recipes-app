import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function RecipeInstructions() {
  const { recipe } = useContext(AppContext);

  return (
    <section className="recipe-details-instructions">
      <h3>Instructions</h3>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
    </section>
  );
}

export default RecipeInstructions;
