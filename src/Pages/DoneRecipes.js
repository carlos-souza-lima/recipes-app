import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';

const HALF_SECOND = 500;

function DoneRecipes() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Header title="Done Recipes" />
      <h2>Tela de Receitas feitas</h2>
    </>
  );
}

export default DoneRecipes;
